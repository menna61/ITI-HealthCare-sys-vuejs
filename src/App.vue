<template>
  <div class="flex flex-col gap-12">
    <nav-bar/>
    <div>
      <RouterView></RouterView>
    </div>
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


<style>
  .cont{
    margin: 0 80px;
  }
</style>
