import { createApp } from 'vue'
import App from './App.vue'
import 'flowbite'
import { initAuth } from './Auth.js'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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
  measurementId: "G-NQ8JLQQBS8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

// Initialize our auth helpers and expose them to components via globalProperties
const authApi = initAuth(firebaseApp)

const vueApp = createApp(App)
vueApp.config.globalProperties.$auth = authApi

vueApp.mount('#app')
