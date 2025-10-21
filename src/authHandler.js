import { firebaseApp } from "./firebase.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize products
const authApi = getAuth(firebaseApp);
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

export { signInWithGoogle, signOutUser, onAuthChange, registerWithEmail, loginWithEmail };
export { authApi as auth, db};
