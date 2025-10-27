<template>

  
  <!-- <div id="app" class="flex flex-col gap-12">
    <nav-bar/>
    <div>
      <RouterView></RouterView>
    </div>
  </div> -->
  <div :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <router-view></router-view>
    <a-i-button/>

  </div>
</template>


<script>
import AIButton from './Components/AIButton.vue';


// import NavBar from './Components/Layouts/NavBar.vue';
// import SignupCards from './Components/Pages/SignupCards.vue';

export default {
    components:{
      // NavBar,
      // SignupCards,
      AIButton

    }
}
</script>



<style>
#app {font-family: system-ui, -apple-system, 'Segoe UI', Roboto }
.cont{
  margin: 0 80px;
}
:root{
  --main-color-500: #5271FF;
  --main-color-25:#EEF1FF;
  --sec-color-500: #0CB8B6;
  --sec-color-25: #E7F8F8;
  
}
</style>