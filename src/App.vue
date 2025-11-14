<template>
  <!-- <div id="app" class="flex flex-col gap-12">
    <nav-bar/>
    <div>
      <RouterView></RouterView>
    </div>
  </div> -->
  <div :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
    <router-view></router-view>
    <a-i-button v-if="!isGeminiChatPage" />
  </div>
</template>

<script>
import AIButton from "./Components/AIButton.vue";

// import NavBar from './Components/Layouts/NavBar.vue';
// import SignupCards from './Components/Pages/SignupCards.vue';

export default {
  components: {
    // NavBar,
    // SignupCards,
    AIButton,
  },
  computed: {
    isGeminiChatPage() {
      return this.$route.path === "/gemini-chat";
    },
  },
};
</script>

<style>
#app {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto;
}
.cont {
  margin: 0 80px;
}
:root {
  --main-color-500: #5271ff;
  --main-color-25: #eef1ff;
  --sec-color-500: #0cb8b6;
  --sec-color-25: #e7f8f8;
}
.dark {
  --main-color-500: #6b73ff;
  --main-color-600: #1542a2ff;
  --main-color-25: #374151;
  --sec-color-500: #0cb8b6;
  --sec-color-25: #374151;
}
button{
  cursor: pointer
}
</style>
