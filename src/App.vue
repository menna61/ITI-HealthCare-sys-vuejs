<template>
  <div class="flex flex-col gap-12">
    <nav-bar/>
    <div>
      <RouterView></RouterView>
    </div>
    <!-- <div class="flex h-dvh items-center justify-center">
      <signup-cards/>
    </div> -->

    
  <div id="app">
    <h1>Auth demo</h1>
    <AuthButton />
  </div>
  </div>
</template>


<script>
import AuthButton from './Components/AuthButton.vue';
import NavBar from './Components/Layouts/NavBar.vue';
// import SignupCards from './Components/Pages/SignupCards.vue';

export default {
  name:"App",
    components:{
      NavBar,
      AuthButton
      // SignupCards
    }

  }
</script>


<style>
  .cont{
    margin: 0 80px;
  }
  #app { font-family: system-ui, -apple-system, 'Segoe UI', Roboto }

</style>
