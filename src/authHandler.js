import { firebaseApp } from "./firebase.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

// Initialize products
const authApi = getAuth(firebaseApp);
setPersistence(authApi, browserLocalPersistence);
const db = (function () {
  try {
    return getFirestore(firebaseApp);
  } catch (err) {
    console.warn("Firestore not available:", err);
    return null;
  }
})();

const provider = new GoogleAuthProvider();

const signInWithGoogle = () => signInWithPopup(authApi, provider);
const signOutUser = () => signOut(authApi);
const onAuthChange = (callback) => onAuthStateChanged(authApi, callback);

const registerWithEmail = (email, password) =>
  createUserWithEmailAndPassword(authApi, email, password);
const loginWithEmail = (email, password) => signInWithEmailAndPassword(authApi, email, password);
const resetPassword = async (email) => {
  // Send the reset email directly; Firebase will handle if the email exists
  await sendPasswordResetEmail(authApi, email);
};

const checkEmailExists = async (email) => {
  try {
    console.log(`Checking Auth for email: ${email}`);
    const signInMethods = await fetchSignInMethodsForEmail(authApi, email);
    console.log(`Sign-in methods for ${email}:`, signInMethods);
    const exists = signInMethods.length > 0;
    console.log(`Auth exists for ${email}: ${exists}`);
    return exists;
  } catch (error) {
    console.error("Error checking email existence:", error);
    return false;
  }
};

const checkEmailInDB = async (email) => {
  try {
    // Normalize email to lowercase for consistent comparison
    const normalizedEmail = email.toLowerCase().trim();
    console.log(`=== Checking DB for email: "${normalizedEmail}" ===`);
    console.log(`Original email: "${email}"`);
    console.log(`Email type: ${typeof email}, length: ${email.length}`);

    if (!db) {
      console.log("DB not available");
      throw new Error("Database not available");
    }

    let foundInAnyCollection = false;
    let hadPermissionError = false;

    // Check patients collection
    try {
      console.log("Checking patients collection...");
      const patientsRef = collection(db, "patients");
      const patientsSnapshot = await getDocs(patientsRef);
      console.log(`Total patients documents: ${patientsSnapshot.size}`);

      patientsSnapshot.forEach((doc) => {
        const docEmail = doc.data().email;
        if (docEmail && docEmail.toLowerCase().trim() === normalizedEmail) {
          console.log(`✓ Email ${normalizedEmail} exists in patients (doc: ${doc.id})`);
          foundInAnyCollection = true;
        }
      });
    } catch (error) {
      console.warn("Error checking patients collection:", error.message, error.code);
      if (error.code === "permission-denied") {
        hadPermissionError = true;
      }
    }

    // Check doctors collection
    try {
      console.log("Checking doctors collection...");
      const doctorsRef = collection(db, "doctors");
      const doctorsSnapshot = await getDocs(doctorsRef);
      console.log(`Total doctors documents: ${doctorsSnapshot.size}`);

      doctorsSnapshot.forEach((doc) => {
        const docEmail = doc.data().email;
        if (docEmail && docEmail.toLowerCase().trim() === normalizedEmail) {
          console.log(`✓ Email ${normalizedEmail} exists in doctors (doc: ${doc.id})`);
          foundInAnyCollection = true;
        }
      });
    } catch (error) {
      console.warn("Error checking doctors collection:", error.message, error.code);
      if (error.code === "permission-denied") {
        hadPermissionError = true;
      }
    }

    // Check admin collection
    try {
      console.log("Checking admin collection...");
      const adminRef = collection(db, "admin");
      const adminSnapshot = await getDocs(adminRef);
      console.log(`Total admin documents: ${adminSnapshot.size}`);

      adminSnapshot.forEach((doc) => {
        const docEmail = doc.data().email;
        console.log(`Admin doc ID: ${doc.id}, email: ${docEmail}`);
        if (docEmail && docEmail.toLowerCase().trim() === normalizedEmail) {
          console.log(`✓ Email ${normalizedEmail} exists in admin (doc: ${doc.id})`);
          foundInAnyCollection = true;
        }
      });
    } catch (error) {
      console.warn("Error checking admin collection:", error.message, error.code);
      if (error.code === "permission-denied") {
        hadPermissionError = true;
      }
    }

    if (foundInAnyCollection) {
      console.log(`✓✓✓ Email ${normalizedEmail} FOUND in database`);
      return true;
    }

    // If we had permission errors, we can't be sure the email doesn't exist
    if (hadPermissionError) {
      console.warn("⚠️ Had permission errors - cannot verify email doesn't exist");
      throw new Error("Unable to verify email due to permission restrictions");
    }

    console.log(`✗✗✗ Email ${normalizedEmail} NOT FOUND in any collection`);
    return false;
  } catch (error) {
    console.error("Error checking email in database:", error);
    throw error; // Re-throw to let caller handle it
  }
};

// Check if email exists - tries Auth first, then Firestore (if Auth fails)
const checkEmailExistsComplete = async (email) => {
  try {
    console.log(`Checking email: ${email}`);

    // First try Authentication check
    try {
      const signInMethods = await fetchSignInMethodsForEmail(authApi, email);
      console.log(`Sign-in methods found: ${signInMethods.length}`);
      if (signInMethods.length > 0) {
        console.log(`✓ Email exists in Authentication`);
        return true;
      }
      console.log(`Auth check returned empty array (might be due to Email Enumeration Protection)`);
    } catch (authError) {
      console.log("Auth check error:", authError.message);
    }

    // If Auth check fails or returns false, try Firestore (if permissions allow)
    try {
      const existsInDB = await checkEmailInDB(email);
      console.log(`Email exists in Firestore: ${existsInDB}`);
      if (existsInDB) {
        return true;
      }
    } catch (dbError) {
      console.log("Firestore check failed (permissions issue):", dbError.message);
    }

    // If both checks fail, assume email doesn't exist
    console.log(`✗ Email not found in Auth or Firestore`);
    return false;
  } catch (error) {
    console.error("Error checking email:", error);
    return false;
  }
};

export {
  signInWithGoogle,
  signOutUser,
  onAuthChange,
  registerWithEmail,
  loginWithEmail,
  resetPassword,
  checkEmailExists,
  checkEmailInDB,
  checkEmailExistsComplete,
};
export { authApi as auth, db };
