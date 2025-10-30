<template>
  <div>
    <div
      @click="goToGeminiChat"
      class="z-[9999] ai w-20 h-20 rounded-full bg-[var(--main-color-500)] flex items-center justify-center right-4 bottom-4 fixed cursor-pointer hover:bg-[var(--main-color-600)] transition-colors"
    >
      <img src="../../src/assets/aiicon.svg" alt="" class="w-8" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToGeminiChat() {
      this.$router.push("/gemini-chat");
    },
  },
};
</script>

<style lang="scss" scoped></style>
