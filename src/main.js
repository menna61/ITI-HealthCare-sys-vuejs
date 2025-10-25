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
import CalenDar from "./Components/Pages/CalenDar.vue";
import { auth } from "./authHandler";
import { createI18n } from "vue-i18n";
import en from "/locales/en.json";
import ar from "/locales/ar.json";
import DashboardLayout from "./Components/Layouts/DashboardLayout.vue";
import { watch } from "vue";
import AuthNavbar from "./Components/Layouts/AuthNavbar.vue";
import PatientsPage from "./Components/Pages/PatientsPage.vue";
import FinancialPage from "./Components/Pages/FinancialPage.vue";
import DoctorServices from "./Components/Pages/DoctorServices.vue";
import DoctorVideo from "./Components/Pages/DoctorVideo.vue";
import LandingPage from "./Components/Pages/LandingPage/LandingPage.vue";
import {
  db,
  signInWithGoogle,
  signOutUser,
  onAuthChange,
  registerWithEmail,
  loginWithEmail,
} from "/src/authHandler.js";
import DoctorAvail from "./Components/Pages/DoctorAvail.vue";
import { getAuth } from "firebase/auth";
import DoctorsPage from "./Components/Pages/PatientFlow/DoctorsPage.vue";
import PatientLayout from "./Components/Layouts/PatientLayout.vue";
import PaymentsPage from "./Components/Pages/PatientFlow/PaymentsPage.vue";
import PatientAppointments from "./Components/Pages/PatientFlow/PatientAppointments.vue";
import PatientHome from "./Components/Pages/PatientFlow/PatientHome.vue";
// import { h } from 'vue'

const i18n = createI18n({
  locale: "en", // اللغة الافتراضية
  fallbackLocale: "en",
  messages: { en, ar },
});

const vueApp = createApp(App);
vueApp.config.globalProperties.$auth = auth;

vueApp.config.globalProperties.$auth = {
  auth,
  db,
  signInWithGoogle,
  signOutUser,
  onAuthChange,
  registerWithEmail,
  loginWithEmail,
};

// const routes = [
//   {path:"/",component:SignupCards},
//   {path:"/doctorSignup",component:DoctorSignup},
//   {path:"/success",component:AccountCreated},
//   {path:"/login",component:LogIn},
//   {path:"/doctorDashboard",component:DoctorDashboard},
//   {path:"/patientSignup",component:PatientSignup},
//   {path:"/:pathMatch(.*)*",component:NotFound},
// ]
const routes = [
  { path: "/", component: LandingPage },
  {
    path: "/signupcards",
    component: AuthNavbar,
    children: [
      { path: "/signupcards", component: SignupCards },
      { path: "/doctorSignup", component: DoctorSignup },
      { path: "/patientSignup", component: PatientSignup },
      { path: "/success", component: AccountCreated },
      { path: "/login", component: LogIn },
    ],
  },

  // {
  //   path: '/doctorDashboard',
  //   component: DoctorDashboard,
  //   children: [
  //     { path:"/patients", component:PatientsPage }
  //   ]
  // },
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      { path: "calendar", component: CalenDar },
      { path: "patients", component: PatientsPage },
      { path: "financial", component: FinancialPage },
      { path: "services", component: DoctorServices },
      { path: "telemedicine", component: DoctorVideo },
      { path: "availability", component: DoctorAvail },
    ],
  },
  {
    path: "/patient",
    component: PatientLayout,
    children: [
      { path: "", component: PatientHome },
      { path: "doctors", component: DoctorsPage },
      { path: "payments", component: PaymentsPage },
      { path: "appointments", component: PatientAppointments },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

watch(
  () => i18n.global.locale,
  (newLocale) => {
    localStorage.setItem("lang", newLocale);
  }
);

const savedLang = localStorage.getItem("lang") || "en";
i18n.global.locale = savedLang;

const router = createRouter({ history: createWebHashHistory(), routes });

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const auth = getAuth();

  // Define protected routes
  const protectedRoutes = ["/dashboard", "/patient"];

  // Check if the route is protected
  const isProtected = protectedRoutes.some((route) => to.path.startsWith(route));

  if (isProtected) {
    // Wait for auth state to be determined
    const user = await new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      });
    });

    if (!user) {
      // Redirect to login if not authenticated
      next("/login");
    } else {
      // Allow navigation
      next();
    }
  } else {
    // Allow navigation for non-protected routes
    next();
  }
});

vueApp.use(router);
vueApp.use(i18n);
vueApp.mount("#app");
