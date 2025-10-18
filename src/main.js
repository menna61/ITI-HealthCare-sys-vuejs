import { createApp } from 'vue'
import App from './App.vue'
import 'flowbite'
import { createRouter,createWebHashHistory } from 'vue-router'
import NotFound from './Components/Pages/NotFound.vue'
import DoctorSignup from './Components/Pages/DoctorSignup.vue'
import SignupCards from './Components/Pages/SignupCards.vue'
import AccountCreated from './Components/Pages/AccountCreated.vue'
import LogIn from './Components/Pages/LogIn.vue'
import PatientSignup from './Components/Pages/PatientSignup.vue'
import DoctorDashboard from './Components/Pages/DoctorDashboard.vue'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
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

// Initialize our auth helpers and expose them to components via globalProperties
const authApi = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const signInWithGoogle = () => signInWithPopup(authApi, provider);
const signOutUser = () => signOut(authApi);
const onAuthChange = (callback) => onAuthStateChanged(authApi, callback);


const auth = {
  signInWithGoogle,
  signOutUser,
  onAuthChange,
}


const vueApp = createApp(App)
vueApp.config.globalProperties.$auth = auth
vueApp.mount('#app')



const routes = [
    {path:"/",component:SignupCards},
    {path:"/doctorSignup",component:DoctorSignup},
    {path:"/:pathMatch(.*)*",component:NotFound},
    {path:"/success",component:AccountCreated},
    {path:"/login",component:LogIn},
    {path:"/doctorDashbaord",component:DoctorDashboard},
    {path:"/patientSignup",component:PatientSignup}
]

const router = createRouter({history:createWebHashHistory(),routes})
createApp(App).use(router).mount('#app')
