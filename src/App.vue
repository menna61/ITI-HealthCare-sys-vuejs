<template>

  <div id="app">
    <nav-bar/>
    <div>
      <RouterView></RouterView>
    </div>
  </div>
  <div class="flex flex-col gap-12">
    <!-- <div class="flex h-dvh items-center justify-center">
      <signup-cards/>
    </div> -->


  </div>
</template>


<script>

import NavBar from './Components/Layouts/NavBar.vue';
// import SignupCards from './Components/Pages/SignupCards.vue';

export default {
    components:{
      NavBar,
      // SignupCards
    }
}
</script>



<style scoped>
#app { padding: 1.5rem; font-family: system-ui, -apple-system, 'Segoe UI', Roboto }
.cont{
  margin: 0 80px;
}
</style>
