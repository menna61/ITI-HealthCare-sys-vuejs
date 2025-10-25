<template>
  <div class="flex w-full">
    <side-menu-patient/>
    <div class="w-full">
        <RouterView></RouterView>
    </div>
  </div>
</template>

<script>
import SideMenuPatient from '../Pages/PatientFlow/SideMenuPatient.vue';


export default {
  name: 'DashboardLayout',
  components: { SideMenuPatient}
}
</script>
