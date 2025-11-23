<template>
  <div :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'" class="flex w-full min-h-screen">
    <side-menu-admin :menuOpen="isMobileMenuOpen" @toggle="isMobileMenuOpen = !isMobileMenuOpen" />
    <div
      class="w-full transition-all duration-300"
      :class="$i18n.locale === 'ar' ? 'lg:mr-[302px]' : 'lg:ml-[302px]'"
    >
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script>
import SideMenuAdmin from "../Pages/AdminFlow/SideMenuAdmin.vue";

export default {
  name: "AdminLayout",
  components: { SideMenuAdmin },
  data() {
    return {
      isMobileMenuOpen: false,
    };
  },
};
</script>

<style scoped></style>
