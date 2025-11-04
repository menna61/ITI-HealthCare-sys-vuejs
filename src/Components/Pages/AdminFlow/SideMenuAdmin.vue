<template>
  <div class="relative ">
    <!-- زر الهمبرجر في الشاشات الصغيرة -->
    <button
      class="lg:hidden fixed top-4 z-50 p-3 rounded-xl text-white bg-[#212D66] shadow-lg hover:bg-[#1a2558] transition-all duration-200 hover:scale-105"
      @click="toggleMenu"
      :class="isRTL ? 'right-4' : 'left-4'"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>

    <!-- الخلفية الداكنة عند فتح القائمة -->
    <div
      v-if="menuOpen"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
      @click="toggleMenu"
    ></div>

    <!-- القائمة الجانبية -->
    <div
      class="sidebar w-full max-w-xs lg:w-[302px] bg-[#212D66] dark:bg-gray-800 pt-10 flex flex-col items-center gap-20 h-screen fixed top-0 z-50 transition-transform duration-300 shadow-2xl"
      :class="[
        isRTL ? 'right-0' : 'left-0',
        menuOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full',
        'md:translate-x-0 md:w-[302px]'
      ]"
    >
      <img src="../../../assets/pattern.svg" alt="" class="absolute bottom-0" />
      <div class="logo">
        <img src="../../../assets/logo-white.svg" alt="" />
      </div>

      <div class="links w-full flex flex-col gap-4 z-50 px-4">
        <!-- الروابط -->
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          exact-active-class="bg-gradient-to-r from-slate-900 to-slate-900/0 border-l-4 border-white"
          @click="closeSidebar"
        >
          <div class="calendar flex gap-3 justify-start items-center w-full h-12 px-4 hover:bg-[#1a2558] rounded-lg transition-all duration-200 hover:scale-105">
            <component :is="link.icon" class="w-5 h-5 fill-gray-300" />
            <p class="text-lg text-gray-300">{{ link.label }}</p>
          </div>
        </router-link>

        <!-- زر Logout -->
        <div
          @click="confirmLogout"
          class="logout flex gap-3 justify-start items-center w-full h-12 px-4 cursor-pointer hover:bg-[#1a2558] rounded-lg transition-all duration-200 hover:scale-105"
        >
          <svg class="w-5 h-5 fill-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9
              c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1
              c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9z"/>
          </svg>
          <p class="text-lg text-gray-300">Logout</p>
        </div>

        <!-- Logout Modal -->
        <UiModal v-model="showLogoutModal" title="">
          <div class="sm:flex sm:items-start z-50">
            <div class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
              <svg class="w-6 h-6 fill-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path
                  d="M569 337C578.4 327.6 578.4 312.4 569 303.1L425 159C418.1 152.1 407.8 150.1 398.8 153.8C389.8 157.5
                  384 166.3 384 176L384 256L272 256C245.5 256 224 277.5 224 304L224 336C224 362.5 245.5 384 272 384L384 384L384
                  464C384 473.7 389.8 482.5 398.8 486.2C407.8 489.9 418.1 487.9 425 481L569 337z"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-base font-semibold text-gray-900 dark:text-white">Logout</h3>
              <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Are you sure you want to logout?
              </p>
            </div>
          </div>
          <template #footer>
            <button
              @click="showLogoutModal = false"
              class="inline-flex justify-center rounded-md bg-[var(--main-color-500)] px-3 py-2 text-sm font-semibold text-white shadow-xs sm:ml-3"
            >
              Stay here
            </button>
            <button
              @click="logout"
              class="ml-2 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs"
            >
              Logout
            </button>
          </template>
        </UiModal>
      </div>
    </div>
  </div>
</template>

<script>
import UiModal from "../../UI/Modal.vue";
import { signOutUser } from "/src/authHandler.js";

export default {
  name: "SideMenu",
  components: { UiModal },
  data() {
    return {
      showLogoutModal: false,
      menuOpen: false,
      links: [
        { to: "/admin/dashboard", label: "Dashboard", icon: "DashboardIcon" },
        { to: "/admin/users", label: "Users", icon: "UsersIcon" },
        { to: "/admin/doctors", label: "All Doctors", icon: "DoctorsIcon" },
        { to: "/admin/totalAppointments", label: "Total Appointments", icon: "AppointmentsIcon" },
        { to: "/admin/doctorAvailability", label: "Doctors Availability", icon: "AvailabilityIcon" },
      ],
    };
  },
  computed: {
    isRTL() {
      return document.documentElement.dir === "rtl";
    },
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeSidebar() {
      if (window.innerWidth < 768) {
        this.menuOpen = false;
      }
    },
    confirmLogout() {
      this.closeSidebar(); // اخفاء القائمة في الموبايل
      this.showLogoutModal = true;
    },
    async logout() {
      try {
        this.closeSidebar(); // اخفاء القائمة بعد logout
        await signOutUser();
        this.$router.push("/login");
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 302px !important;
}
@media (min-width: 768px) {
  .sidebar {
    transform: translateX(0) !important;
  }
}
</style>