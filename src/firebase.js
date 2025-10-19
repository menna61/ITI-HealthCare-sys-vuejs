// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNJEbBIUmwPHPoxVft02LHZAa5FCb054Q",
  authDomain: "health-care-456db.firebaseapp.com",
  projectId: "health-care-456db",
  storageBucket: "health-care-456db.firebasestorage.app",
  messagingSenderId: "608298626819",
  appId: "1:608298626819:web:f1efad06cda58ebf920336",
  measurementId: "G-NQ8JLQQBS8",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);
// console.log("Firebase initialized", firebaseApp.options);
// console.log("Firebase initialized", firebaseApp.options.projectId);
// Initialize our auth helpers and expose them to components via globalProperties
const authApi = getAuth(firebaseApp);
// console.log("Firebase Auth initialized", authApi);
// Example of signing up a user with email and password
const email = "" //document.getElementById("PatientSignupEmail").value;
const password = "" //document.getElementById("PatientSignupPassword").value;
createUserWithEmailAndPassword(authApi, email, password)
  .then((userCredential) => {
    // Signed up
    // showLoggedInUI();
    console.log("User signed up:", userCredential.user);
  })
  .catch((error) => {
    console.error("Error signing up:", error.code, error.message);
  })

// Example of signing in a user with email and password
signInWithEmailAndPassword(authApi, email, password)
  .then((userCredential) => {
    // Signed in
    console.log("User signed in:", userCredential.user);
  })
  .catch((error) => {
    console.error("Error signing in:", error.code, error.message);
  })

const provider = new GoogleAuthProvider();
const signInWithGoogle = () => signInWithPopup(authApi, provider);
const signOutUser = () => signOut(authApi);
const onAuthChange = (callback) => onAuthStateChanged(authApi, callback);

const auth = {
  signInWithGoogle,
  signOutUser,
  onAuthChange,
};

export { auth };
