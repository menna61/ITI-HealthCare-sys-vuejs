import { createApp } from 'vue'
import App from './App.vue'
import { createRouter,createWebHashHistory } from 'vue-router'
import NotFound from './Components/Pages/NotFound.vue'
import DoctorSignup from './Components/Pages/DoctorSignup.vue'
import SignupCards from './Components/Pages/SignupCards.vue'
import AccountCreated from './Components/Pages/AccountCreated.vue'
import LogIn from './Components/Pages/LogIn.vue'
import PatientSignup from './Components/Pages/PatientSignup.vue'
import DoctorDashboard from './Components/Pages/DoctorDashboard.vue'

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
