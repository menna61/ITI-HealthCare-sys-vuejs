<template>
  <div>
    <div
      @click="goToGeminiChat"
      class="z-[9999] ai w-20 h-20 rounded-full bg-[var(--main-color-500)] flex items-center justify-center bottom-4 fixed cursor-pointer transition-all duration-300"
      :class="isRTL ? 'left-4' : 'right-4'"
    >
      <img src="../../src/assets/aiicon.svg" alt="" class="w-8" />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isRTL() {
      return this.$i18n.locale === "ar";
    },
  },
  methods: {
    goToGeminiChat() {
      this.$router.push("/gemini-chat");
    },
  },
};
</script>

<style lang="scss" scoped></style>
