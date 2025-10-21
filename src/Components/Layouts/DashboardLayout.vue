<template>
  <div class="flex w-full">
    <side-menu/>
    <div class="w-full">
        <RouterView></RouterView>
    </div>
  </div>
</template>

<script>
import SideMenu from '../SideMenu.vue'


export default {
  name: 'DashboardLayout',
  components: { SideMenu}
}
</script>
