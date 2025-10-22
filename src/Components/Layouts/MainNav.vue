<template >
  
    
    <div class="flex flex-col w-full">
      <nav-bar/>
      <RouterView></RouterView>
    </div>
 
</template>

<script>

import NavBar from './NavBar.vue';

    export default {
        name:"MainNav",
        components:{NavBar}
    }
</script>

<style lang="scss" scoped>

</style>