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
import CalenDar from './Components/Pages/CalenDar.vue'
import { auth } from '/src/firebase.js'
import {createI18n} from 'vue-i18n'
import en from '/locales/en.json'
import ar from '/locales/ar.json'
import DashboardLayout from './Components/Layouts/DashboardLayout.vue'
import { watch } from 'vue'
import AuthNavbar from './Components/Layouts/AuthNavbar.vue'
import PatientsPage from './Components/Pages/PatientsPage.vue'
import FinancialPage from './Components/Pages/FinancialPage.vue'
import DoctorServices from './Components/Pages/DoctorServices.vue'
import DoctorVideo from './Components/Pages/DoctorVideo.vue'

const i18n = createI18n({
  locale: 'en', // اللغة الافتراضية
  fallbackLocale: 'en',
  messages: { en, ar }
})

const vueApp = createApp(App)
vueApp.config.globalProperties.$auth = auth


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
  {
    path: '/',
    component: AuthNavbar,
    children: [
      { path: '/', component: SignupCards },
      { path: '/doctorSignup', component: DoctorSignup },
      { path: '/patientSignup', component: PatientSignup },
      { path: '/success', component: AccountCreated },
      { path: '/login', component: LogIn }
    ]
  },

  // {
  //   path: '/doctorDashboard',
  //   component: DoctorDashboard,
  //   children: [
  //     { path:"/patients", component:PatientsPage }
  //   ]
  // },
   {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      { path: 'calendar', component: CalenDar },
      { path: 'patients', component: PatientsPage },
      {path:'financial', component: FinancialPage},
      {path:'services',component:DoctorServices},
      {path:'telemedicine',component:DoctorVideo}
      
    ]
  },
  

  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
]



watch(() => i18n.global.locale, (newLocale) => {
  localStorage.setItem('lang', newLocale)
})

const savedLang = localStorage.getItem('lang') || 'en'
i18n.global.locale = savedLang

const router = createRouter({history:createWebHashHistory(),routes})
vueApp.use(router)
vueApp.use(i18n)
vueApp.mount('#app')


