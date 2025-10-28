<template>
  <div class="bg-white dark:bg-gray-800">
    <div class="cont flex py-4 justify-between items-center">
      <router-link to="/">
        <div class="left">
          <img src="../../../assets/Group 1.svg" alt="" />
        </div>
      </router-link>

      <!-- Desktop Navigation -->
      <div class="middle hidden lg:flex">
        <nav class="flex gap-10 font-medium text-gray-900 dark:text-white">
          <a @click="scrollToSection('hero')">{{ $t("home") }}</a>
          <a @click="scrollToSection('about')">{{ $t("about") }}</a>
          <a @click="scrollToSection('services')">{{ $t("services") }}</a>
          <a @click="scrollToSection('contact')">{{ $t("contact") }}</a>
        </nav>
      </div>

      <!-- Desktop Right Section -->
      <div class="right hidden lg:flex gap-4">
        <dark-mode-toggle />
        <lang-drop />
        <router-link to="/login">
          <button
            class="h-12 rounded-lg border border-[var(--main-color-500)] px-10 text-[#5271FF] font-semibold cursor-pointer hover:bg-[var(--main-color-500)] hover:text-white transition-all ease-in-out"
          >
            {{ $t("login") }}
          </button>
        </router-link>
        <router-link to="/signupcards"
          ><button
            class="h-12 rounded-lg text-white px-10 bg-[var(--main-color-500)] font-semibold cursor-pointer hover:bg-white hover:border hover:border-[var(--main-color-500)] hover:text-[var(--main-color-500)] transition-all ease-in-out"
          >
            {{ $t("signup") }}
          </button></router-link
        >
      </div>

      <!-- Mobile Hamburger Menu -->
      <div class="lg:hidden">
        <button @click="toggleMobileMenu" class="text-gray-900 dark:text-white focus:outline-none">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div v-if="mobileMenuOpen" class="fixed inset-0 z-50 lg:hidden">
      <div
        class="absolute inset-0 bg-black/50 transition-all duration-300 ease-in-out"
        :class="{ 'opacity-0': !mobileMenuOpen, 'opacity-100': mobileMenuOpen }"
        @click="toggleMobileMenu"
      ></div>
      <div
        class="absolute top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg transform transition-all duration-300 ease-in-out"
        :class="{
          'translate-x-0 opacity-100': mobileMenuOpen,
          'translate-x-full opacity-0': !mobileMenuOpen,
        }"
      >
        <div class="p-4">
          <button
            @click="toggleMobileMenu"
            class="float-right text-gray-900 dark:text-white focus:outline-none"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <div class="clear-both mt-8">
            <nav class="flex flex-col gap-6 font-medium text-gray-900 dark:text-white">
              <a @click="scrollToSectionMobile('hero')" class="block py-2">{{ $t("home") }}</a>
              <a @click="scrollToSectionMobile('about')" class="block py-2">{{ $t("about") }}</a>
              <a @click="scrollToSectionMobile('services')" class="block py-2">{{
                $t("services")
              }}</a>
              <a @click="scrollToSectionMobile('contact')" class="block py-2">{{
                $t("contact")
              }}</a>
            </nav>
            <div class="mt-8 flex flex-col gap-4">
              <dark-mode-toggle />
              <lang-drop />
              <router-link to="/login" @click="toggleMobileMenu">
                <button
                  class="w-full h-12 rounded-lg border border-[var(--main-color-500)] px-10 text-[#5271FF] font-semibold cursor-pointer hover:bg-[var(--main-color-500)] hover:text-white transition-all ease-in-out"
                >
                  {{ $t("login") }}
                </button>
              </router-link>
              <router-link to="/signupcards" @click="toggleMobileMenu">
                <button
                  class="w-full h-12 rounded-lg text-white px-10 bg-[var(--main-color-500)] font-semibold cursor-pointer hover:bg-white hover:border hover:border-[var(--main-color-500)] hover:text-[var(--main-color-500)] transition-all ease-in-out"
                >
                  {{ $t("signup") }}
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LangDrop from "@/Components/LangDrop.vue";
import DarkModeToggle from "@/Components/DarkModeToggle.vue";

export default {
  name: "HomeNav",
  components: { LangDrop, DarkModeToggle },
  data() {
    return {
      mobileMenuOpen: false,
    };
  },
  methods: {
    scrollToSection(id) {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
        });
      }
    },
    scrollToSectionMobile(id) {
      this.toggleMobileMenu();
      this.scrollToSection(id);
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
  },
};
</script>

<style scoped>
nav a {
  position: relative;
  text-decoration: none;
  color: #333;
  transition: color 0.3s ease;
  padding-bottom: 5px;
  cursor: pointer;
}

.dark nav a {
  color: #e5e7eb;
}

nav a::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0%;
  background-color: #2563eb; /* blue underline */
  transition: width 0.3s ease;
}

a:hover {
  color: #2563eb;
}

.dark a:hover {
  color: #60a5fa;
}

a:hover::after {
  width: 100%;
}

/* Active link style */
a.active {
  color: #2563eb;
}

.dark a.active {
  color: #60a5fa;
}

a.active::after {
  width: 100%;
}
</style>
