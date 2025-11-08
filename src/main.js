import { createApp } from "vue";
import App from "./App.vue";
import "flowbite";
import "../style.css";
import { createRouter, createWebHashHistory } from "vue-router";
// import VueToast from "vue-toast-notification";
// import "vue-toast-notification/dist/theme-sugar.css";
// import VueToast from "vue-toast-notification";
// import "vue-toast-notification/dist/theme-sugar.css";
import NotFound from "./Components/Pages/NotFound.vue";
import DoctorSignup from "./Components/Pages/DoctorSignup.vue";
import SignupCards from "./Components/Pages/SignupCards.vue";
import AccountCreated from "./Components/Pages/AccountCreated.vue";
import LogIn from "./Components/Pages/LogIn.vue";
import ForgotPassword from "./Components/Pages/ForgotPassword.vue";
import PatientSignup from "./Components/Pages/PatientSignup.vue";
import CalenDar from "./Components/Pages/CalenDar.vue";
import { auth } from "./authHandler";
// import en from "/locales/en.json";
// import ar from "/locales/ar.json";
import DashboardLayout from "./Components/Layouts/DashboardLayout.vue";
import { watch } from "vue";
import AuthNavbar from "./Components/Layouts/AuthNavbar.vue";
import PatientsPage from "./Components/Pages/PatientsPage.vue";
import FinancialPage from "./Components/Pages/FinancialPage.vue";
import DoctorServices from "./Components/Pages/DoctorServices.vue";
import DoctorVideo from "./Components/Pages/DoctorVideo.vue";
import LandingPage from "./Components/Pages/LandingPage/LandingPage.vue";
import { doc, getDoc } from "firebase/firestore";
import {
  db,
  signInWithGoogle,
  signOutUser,
  onAuthChange,
  registerWithEmail,
  loginWithEmail,
  resetPassword,
} from "/src/authHandler.js";
import DoctorAvail from "./Components/Pages/DoctorAvail.vue";
import DoctorsPage from "./Components/Pages/PatientFlow/DoctorsPage.vue";
import PatientLayout from "./Components/Layouts/PatientLayout.vue";
import PaymentsPage from "./Components/Pages/PatientFlow/PaymentsPage.vue";
import PatientAppointments from "./Components/Pages/PatientFlow/PatientAppointments.vue";
import PatientHome from "./Components/Pages/PatientFlow/PatientHome.vue";
import DoctorProfile from "./Components/Pages/DoctorProfile.vue";
import DoctorAppointments from "./Components/Pages/DoctorFlow/DoctorAppointments.vue";
import GeminiChat from "./Components/Pages/GeminiChat.vue";
import CancelPage from "./Components/Pages/CancelPage.vue";
import SuccessPage from "./Components/Pages/SuccessPage.vue";
import AdminLayout from "./Components/Layouts/AdminLayout.vue";
import AdminHome from "./Components/Pages/AdminFlow/AdminHome.vue";
import UsersPage from "./Components/Pages/AdminFlow/UsersPage.vue";
import AllDoctorsPage from "./Components/Pages/AdminFlow/AllDoctorsPage.vue";
import DoctorAvailability from "./Components/Pages/AdminFlow/DoctorAvailability.vue";
import TotalAppointments from "./Components/Pages/AdminFlow/TotalAppointments.vue";
import DocumentApproval from "./Components/Pages/AdminFlow/DocumentApproval.vue";
import PatientWallet from "./Components/Pages/PatientFlow/PatientWallet.vue";
import PatientProfile from "./Components/Pages/PatientFlow/PatientProfile.vue";

// import { h } from 'vue'
import { createI18n } from "vue-i18n";
import en from "../locales/en.json"
import ar from "../locales/ar.json";
import MedicalHistory from "./Components/Pages/PatientFlow/MedicalHistory.vue";
// import Vue3Toastify from 'vue3-toastify';
// import 'vue3-toastify/dist/index.css';

export const i18n = createI18n({
  locale: "ar",
  fallbackLocale: "en",
  messages: { en, ar },
});
// const i18n = createI18n({
//   locale: "en", // اللغة الافتراضية
//   fallbackLocale: "en",
//   messages: { en, ar },
// });

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
  resetPassword,
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
      { path: "/forgot-password", component: ForgotPassword },
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
    meta: { requiresAuth: true },
    children: [
      { path: "calendar", component: CalenDar },
      { path: "patients", component: PatientsPage },
      { path: "financial", component: FinancialPage },
      { path: "services", component: DoctorServices },
      { path: "telemedicine", component: DoctorVideo },
      { path: "availability", component: DoctorAvail },
      { path: "profile", component: DoctorProfile },
      { path: "appointments", component: DoctorAppointments },
    ],
  },

  //  {
  //     name: "Profile",
  //     path: "/profile",
  //     component: ProfileComponent,
  //     meta: {
  //       title: "Profile",
  //     },
  //     redirect: "/profile/home",
  //     children: [
  //       {
  //         name: "Home",
  //         path: "home",
  //         component: Home,
  //         meta: {
  //           title: "Home",
  //         },
  //       },
  //       {
  //         name: "Doctors",
  //         path: "Doctors",
  //         component: DoctorsComponent,
  //         meta: {
  //           title: "Doctors",
  //         },
  //       },
  //       {
  //         name: "infoDoctor",
  //         path: "infoDoctor/:id",
  //         component: InfoDoctor,
  //         meta: { title: "infoDoctor" },
  //       },
  //       {
  //         name: "Appointments",
  //         path: "Appointments",
  //         component: AppointmentsComponent,
  //         meta: {
  //           title: "Appointments",
  //         },
  //       },
  //       {
  //         name: "Payments",
  //         path: "Payments",
  //         component: PaymentsComponent,
  //         meta: {
  //           title: "Payments",
  //         },
  //       },
  //       {
  //         name: "Setting",
  //         path: "Setting",
  //         component: SettingComponent,
  //         meta: {
  //           title: "Setting",
  //         },
  //       },
  {
    path: "/patient",
    component: PatientLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "home", component: PatientHome },
      { path: "doctors", component: DoctorsPage },
      { path: "payments", component: PaymentsPage },
      { path: "appointments", component: PatientAppointments },
      { path: "wallet", component: PatientWallet },
      { path: "profile", component: PatientProfile },
      { path: "medical-history", component: MedicalHistory}
    ],
  },

  {
    path: "/admin",
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "dashboard", component: AdminHome },
      { path: "patients", component: UsersPage },
      { path: "doctors", component: AllDoctorsPage },
      { path: "documents", component: DocumentApproval },
      { path: "totalAppointments", component: TotalAppointments },
      { path: "doctorAvailability", component: DoctorAvailability },
    ],
  },

  {
    path: "/gemini-chat",
    component: GeminiChat,
  },
  {
    path: "/cancel",
    component: CancelPage,
  },
  {
    path: "/success",
    component: SuccessPage,
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
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (!requiresAuth) {
    next();
    return;
  }

  // Wait for auth state to be determined
  const user = await new Promise((resolve) => {
    const unsubscribe = onAuthChange((user) => {
      unsubscribe();
      resolve(user);
    });
  });

  if (!user) {
    // not logged in → redirect
    return next("/login");
  }

  try {
    const uid = user.uid;
    let role = null;

    const patientSnap = await getDoc(doc(db, "patients", uid));
    const doctorSnap = await getDoc(doc(db, "doctors", uid));
    const adminSnap = await getDoc(doc(db, "admin", uid));

    if (patientSnap.exists()) {
      role = "patient";
    } else if (doctorSnap.exists()) {
      role = "doctor";
    } else if (adminSnap.exists()) {
      role = "admin";
    }

    console.log("Main.js beforeEach - User role:", role, "To path:", to.path);

    // لو مفيش رول، نعتبره غير مصرح → login
    if (!role) {
      return next("/login");
    }

    // التوجيه بناءً على الدور
    if (role === "patient" && !to.path.startsWith("/patient")) {
      return next("/patient/home");
    } else if (role === "doctor" && !to.path.startsWith("/dashboard")) {
      return next("/dashboard/calendar");
    } else if (role === "admin" && !to.path.startsWith("/admin")) {
      return next("/admin/dashboard");
    }

    next();
  } catch (error) {
    console.error("Error determining user role:", error);
    next("/login");
  }
});

// router.beforeEach(async (to, from, next) => {
//   const authInstance = getAuth();

//   // Check if the route requires authentication
//   const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

//   if (requiresAuth) {
//     // Wait for auth state to be determined
//     const user = await new Promise((resolve) => {
//       const unsubscribe = authInstance.onAuthStateChanged((user) => {
//         unsubscribe();
//         resolve(user);
//       });
//     });

//     if (!user) {
//       // Redirect to login if not authenticated
//       next("/login");
//     } else {
//       // Check user role and redirect accordingly
//       try {
//         const uid = user.uid;
//         let role = null;

//         if (db) {
//           const patientSnap = await getDoc(doc(db, "patients", uid));
//           if (patientSnap.exists()) {
//             role = patientSnap.data()?.role || "patient";
//           } else {
//             const doctorSnap = await getDoc(doc(db, "doctors", uid));
//             if (doctorSnap.exists()) {
//               role = doctorSnap.data()?.role || "doctor";
//             }
//           }
//         }

//         // Redirect based on role
//         if (role === "patient" && !to.path.startsWith("/patient")) {
//           next("/patient/home");
//         } else if (role === "doctor" && !to.path.startsWith("/dashboard")) {
//           next("/dashboard/calendar");
//         } else {
//           next();
//         }
//       } catch (error) {
//         console.error("Error determining user role:", error);
//         next("/login");
//       }
//     }
//   } else {
//     // Allow navigation for non-protected routes
//     next();
//   }
// });

vueApp.use(router);
vueApp.use(i18n);
// vueApp.use(Vue3Toastify, { position: "top-right" });
// vueApp.use(VueToast, {
//   position: "top-right",
//   duration: 3000,
//   dismissible: true,
//   pauseOnHover: true,
//   closeOnClick: true,
//   maxToasts: 3,
//   newestOnTop: true,
//   type: "default",
//   className: "custom-toast",
//   containerClass: "custom-toast-container",
// });
vueApp.mount("#app");
