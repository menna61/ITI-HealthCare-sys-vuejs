<template>
  <div class="flex flex-col w-full">
    <nav-bar @toggle-mobile-menu="handleMobileMenuToggle" />
    <RouterView></RouterView>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";

export default {
  name: "MainNav",
  components: { NavBar },
  methods: {
    handleMobileMenuToggle(isOpen) {
      // Emit to parent or handle globally
      this.$emit("mobile-menu-toggle", isOpen);
    },
  },
};
</script>

<style lang="scss" scoped></style>
