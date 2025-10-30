<template>
     <div class="flex w-full min-h-screen">
        <side-menu-admin/>
    <div class="w-full">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script>
import SideMenuAdmin from '../Pages/AdminFlow/SideMenuAdmin.vue';

    export default {
        name:"AdminLayout",
        components:{SideMenuAdmin}
    }
</script>

<style scoped>

</style>