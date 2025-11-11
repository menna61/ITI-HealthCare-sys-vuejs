<template>
  <div class="z-20">
    <div
      class="lang w-12 h-12 rounded-full flex items-center justify-center border border-gray-200 relative cursor-pointer"
      @click="showLang"
    >
      <img :src="currentLanguage.img" alt="" />
    </div>
    <div
      class="absolute dark:text-white degrees w-fit p-4 shadow-xl rounded-lg right-[156px] top-20 flex flex-col gap-4 bg-white z-[100000] dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      :class="[  $i18n.locale==='ar' && $route.path==='/dashboard' ? 'left-[10px]':'' , isRTL ? 'left-4' : 'right-4', $route.path === '/' ? 'right-[366px]' : '' , $i18n.locale === 'ar' ? 'left-[344px]' : '']"
      
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
    },
    changeLanguage(language) {
      this.$i18n.locale = language.code;
      this.langShow = false;
    },
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
  },
};
</script>

<style scoped></style>
