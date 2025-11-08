<template>
  <div class="flex w-full min-h-screen">
    <!-- Sidebar -->
    <side-menu-admin
      :class="{
        'fixed inset-0 z-50 bg-white dark:bg-gray-800': isMobileMenuOpen,
        'hidden md:block': !isMobileMenuOpen,
      }"
    >
      <div class="md:hidden p-4">
        <button @click="isMobileMenuOpen = false" class="text-red-500">✕ Close</button>
      </div>
    </side-menu-admin>

    <!-- Main Content -->
    <div class="w-full md:ml-[302px]">
      <div class="md:hidden p-4 bg-gray-100 dark:bg-gray-900">
        <button @click="isMobileMenuOpen = true" class="text-gray-700 dark:text-white">
          ☰ Menu
        </button>
      </div>
      <div class="flex-1">
        <RouterView></RouterView>
      </div>
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
