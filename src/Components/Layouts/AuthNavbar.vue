<template>
  <div id="app" class="flex flex-col gap-12">
    <nav-bar/>
    <div>
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar.vue';

    export default {
        name:"AuthNavbar",
        components:{NavBar}
    }
</script>

<style lang="scss" scoped>

</style>