<template>
  <div :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'" class="flex w-full min-h-screen">
    <side-menu-patient :isOpen="isSidebarOpen" />
    <div class="w-full">
      <!-- Mobile top bar with hamburger -->
      <div class="lg:hidden p-4">
        <button
          class="inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 p-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Open sidebar"
          aria-controls="patient-sidebar"
          aria-expanded="isSidebarOpen ? 'true' : 'false'"
          @click="isSidebarOpen = true"
        >
          <svg
            class="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3.75 5.25a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 6a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 6a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <!-- Backdrop when sidebar open on mobile -->
      <div
        v-if="isSidebarOpen"
        class="fixed inset-0 bg-black/40 z-40 lg:hidden"
        @click="isSidebarOpen = false"
      ></div>
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script>
import SideMenuPatient from "../Pages/PatientFlow/SideMenuPatient.vue";

export default {
  name: "DashboardLayout",
  components: { SideMenuPatient },
  data() {
    return {
      isSidebarOpen: false,
    };
  },
};
</script>
