<template>
  <div class="z-20">
    <div
      class="lang w-12 h-12 rounded-full flex items-center justify-center border border-gray-200 relative cursor-pointer"
      @click="showLang"
    >
      <img :src="currentLanguage.img" alt="" />
    </div>
    <div
      class="absolute dark:text-white degrees w-fit p-4 shadow-xl rounded-lg top-20 flex flex-col gap-4 bg-white z-[100000] dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      :class="getDropdownPosition"
      v-show="langShow"
    >
      <!-- Add .stop to prevent event bubbling -->
      <div
        @click.stop="changeLanguage(language)"
        class="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer p-4 rounded-lg wrap flex items-center gap-2"
        v-for="(language, index) in languages"
        :key="index"
      >
        <p class="order-2">{{ language.lang }}</p>
        <div class="img w-8 h-8 border-gray-200 order-1">
          <img :src="language.img" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import egypt from "../assets/egypt-flag.svg";
import usa from "../assets/usa-flag.svg";

export default {
  name: "LangDrop",
  data() {
    return {
      languages: [
        {
          lang: "English",
          img: usa,
          code: "en",
        },
        {
          lang: "Arabic",
          img: egypt,
          code: "ar",
        },
      ],
      langShow: false,
    };
  },
  methods: {
    showLang() {
      this.langShow = !this.langShow;
      // Emit event to close other dropdowns
      if (this.langShow) {
        window.dispatchEvent(new CustomEvent("dropdown-opened", { detail: "language" }));
      }
    },
    changeLanguage(language) {
      this.$i18n.locale = language.code;
      localStorage.setItem("lang", language.code);
      this.langShow = false;

      // Force update document direction
      document.documentElement.setAttribute("dir", language.code === "ar" ? "rtl" : "ltr");
      document.documentElement.setAttribute("lang", language.code);
    },
    handleClickOutside(e) {
      if (!this.$el.contains(e.target)) {
        this.langShow = false;
      }
    },
    handleOtherDropdownOpened(event) {
      // Close this dropdown if another one opened
      if (event.detail !== "language") {
        this.langShow = false;
      }
    },
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener("click", this.handleClickOutside);
    // Listen for other dropdowns opening
    window.addEventListener("dropdown-opened", this.handleOtherDropdownOpened);
  },
  beforeUnmount() {
    // Clean up event listener
    document.removeEventListener("click", this.handleClickOutside);
    window.removeEventListener("dropdown-opened", this.handleOtherDropdownOpened);
  },
  computed: {
    currentLanguage() {
      return this.languages.find((lang) => lang.code === this.$i18n.locale) || this.languages[0];
    },
    isRTL() {
      // Treat Arabic as RTL; fallback to document direction if available
      if (this.$i18n?.locale) {
        return this.$i18n.locale.toLowerCase().startsWith("ar");
      }
      if (typeof document !== "undefined") {
        return (document.dir || document.documentElement.getAttribute("dir")) === "rtl";
      }
      return false;
    },
    getDropdownPosition() {
      const isArabic = this.$i18n.locale === "ar";
      const currentPath = this.$route.path;

      // For Gemini Chat page
      if (currentPath === "/gemini-chat") {
        return isArabic ? "left-4" : "right-4";
      }

      // For admin pages
      if (currentPath.startsWith("/admin")) {
        return isArabic ? "left-4" : "right-4";
      }

      // For dashboard pages
      if (currentPath.startsWith("/dashboard")) {
        return isArabic ? "left-4" : "right-4";
      }

      // For patient pages
      if (currentPath.startsWith("/patient")) {
        return isArabic ? "left-4" : "right-4";
      }

      // For landing page
      if (currentPath === "/") {
        return isArabic ? "left-[344px]" : "right-[366px]";
      }

      // Default positioning
      return isArabic ? "left-4" : "right-[156px]";
    },
  },
};
</script>

<style scoped></style>
