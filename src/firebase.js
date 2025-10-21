import { initializeApp } from "firebase/app";

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

export { firebaseApp };
