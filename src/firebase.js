import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNJEbBIUmwPHPoxVft02LHZAa5FCb054Q",
  authDomain: "health-care-456db.firebaseapp.com",
  projectId: "health-care-456db",
  storageBucket: "health-care-456db.appspot.com",
  messagingSenderId: "608298626819",
  appId: "1:608298626819:web:f1efad06cda58ebf920336",
  measurementId: "G-NQ8JLQQBS8",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { firebaseApp, db, auth };