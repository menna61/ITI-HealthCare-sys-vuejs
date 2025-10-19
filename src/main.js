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
import { auth } from '/src/firebase.js'


const vueApp = createApp(App)
vueApp.config.globalProperties.$auth = auth


const routes = [
  {path:"/",component:SignupCards},
  {path:"/doctorSignup",component:DoctorSignup},
  {path:"/success",component:AccountCreated},
  {path:"/login",component:LogIn},
  {path:"/doctorDashboard",component:DoctorDashboard},
  {path:"/patientSignup",component:PatientSignup},
  {path:"/:pathMatch(.*)*",component:NotFound}
]

const router = createRouter({history:createWebHashHistory(),routes})
vueApp.use(router)
vueApp.mount('#app')
