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
  fetchSignInMethodsForEmail,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
  // Check if the email exists by fetching sign-in methods
  const signInMethods = await fetchSignInMethodsForEmail(authApi, email);
  if (signInMethods.length === 0) {
    throw new Error("No account found with this email address.");
  }
  // If email exists, send the reset email
  await sendPasswordResetEmail(authApi, email);
};

export {
  signInWithGoogle,
  signOutUser,
  onAuthChange,
  registerWithEmail,
  loginWithEmail,
  resetPassword,
};
export { authApi as auth, db };
