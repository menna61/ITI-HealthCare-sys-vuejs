import { createApp } from "vue";
import App from "./App.vue";
import "flowbite";
import { createRouter, createWebHashHistory } from "vue-router";
import NotFound from "./Components/Pages/NotFound.vue";
import DoctorSignup from "./Components/Pages/DoctorSignup.vue";
import SignupCards from "./Components/Pages/SignupCards.vue";
import AccountCreated from "./Components/Pages/AccountCreated.vue";
import LogIn from "./Components/Pages/LogIn.vue";
import PatientSignup from "./Components/Pages/PatientSignup.vue";
import DoctorDashboard from "./Components/Pages/DoctorDashboard.vue";
import { auth, db, signInWithGoogle, signOutUser, onAuthChange, registerWithEmail, loginWithEmail} from "/src/authHandler.js";
import { h } from 'vue'

const vueApp = createApp(App);
vueApp.config.globalProperties.$auth = {
  auth,
  db,
  signInWithGoogle,
  signOutUser,
  onAuthChange,
  registerWithEmail,
  loginWithEmail
};

const routes = [
  { path: "/", component: SignupCards },
  { path: "/doctorSignup", component: DoctorSignup },
  { path: "/success", component: AccountCreated },
  { path: "/login", component: LogIn },
  { path: "/doctorDashboard", component: DoctorDashboard },
  { path: "/patientDashboard", component: { render() { return h('div', [h('h2','Patient dashboard (placeholder)')]) } } },
  { path: "/patientSignup", component: PatientSignup },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({ history: createWebHashHistory(), routes });

vueApp.use(router);
vueApp.mount("#app");
