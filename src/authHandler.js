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
    console.log(`Checking DB for email: ${email}`);
    if (!db) {
      console.log("DB not available");
      return false;
    }

    // Check patients collection
    const patientsQuery = query(collection(db, "patients"), where("email", "==", email));
    const patientsSnapshot = await getDocs(patientsQuery);
    console.log(`Patients found for ${email}: ${!patientsSnapshot.empty}`);
    if (!patientsSnapshot.empty) {
      console.log(`Email ${email} exists in patients`);
      return true;
    }

    // Check doctors collection
    const doctorsQuery = query(collection(db, "doctors"), where("email", "==", email));
    const doctorsSnapshot = await getDocs(doctorsQuery);
    console.log(`Doctors found for ${email}: ${!doctorsSnapshot.empty}`);
    if (!doctorsSnapshot.empty) {
      console.log(`Email ${email} exists in doctors`);
      return true;
    }

    console.log(`Email ${email} not found in DB`);
    return false;
  } catch (error) {
    console.error("Error checking email in database:", error);
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
};
export { authApi as auth, db };
