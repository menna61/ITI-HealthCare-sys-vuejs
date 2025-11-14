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
  browserSessionPersistence,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

// Initialize products
const authApi = getAuth(firebaseApp);
setPersistence(authApi, browserSessionPersistence);
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
    console.log(`=== Checking DB for email: "${email}" ===`);
    console.log(`Email type: ${typeof email}, length: ${email.length}`);

    if (!db) {
      console.log("DB not available");
      return false;
    }

    // Check patients collection
    console.log("Checking patients collection...");
    const patientsQuery = query(collection(db, "patients"), where("email", "==", email));
    const patientsSnapshot = await getDocs(patientsQuery);
    console.log(`Patients snapshot size: ${patientsSnapshot.size}`);
    if (!patientsSnapshot.empty) {
      console.log(`✓ Email ${email} exists in patients`);
      return true;
    }

    // Check doctors collection
    console.log("Checking doctors collection...");
    const doctorsQuery = query(collection(db, "doctors"), where("email", "==", email));
    const doctorsSnapshot = await getDocs(doctorsQuery);
    console.log(`Doctors snapshot size: ${doctorsSnapshot.size}`);
    if (!doctorsSnapshot.empty) {
      console.log(`✓ Email ${email} exists in doctors`);
      return true;
    }

    // Check admin collection
    console.log("Checking admin collection...");
    const adminQuery = query(collection(db, "admin"), where("email", "==", email));
    const adminSnapshot = await getDocs(adminQuery);
    console.log(`Admin snapshot size: ${adminSnapshot.size}`);

    // Log all admin documents to debug
    adminSnapshot.forEach((doc) => {
      console.log(`Admin doc ID: ${doc.id}, email: ${doc.data().email}`);
    });

    if (!adminSnapshot.empty) {
      console.log(`✓ Email ${email} exists in admin`);
      return true;
    }

    console.log(`✗ Email ${email} not found in any collection`);
    return false;
  } catch (error) {
    console.error("Error checking email in database:", error);
    return false;
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
