<template>

  
  <div id="app" class="flex flex-col gap-12">
    <!-- <div class="flex h-dvh items-center justify-center">
      <signup-cards/>
    </div> -->
    
 
    <nav-bar/>
    <div>
      <RouterView></RouterView>
    </div>


  
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



<style>
#app {font-family: system-ui, -apple-system, 'Segoe UI', Roboto }
.cont{
  margin: 0 80px;
}
</style>
