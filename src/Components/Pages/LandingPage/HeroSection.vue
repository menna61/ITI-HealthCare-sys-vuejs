<template>
  <div class="cont flex flex-col md:flex-row justify-between items-center" id="hero">
    <div class="left md:w-1/2">
      <h1
        class="w-full md:w-[600px] leading-16 mb-4 text-capitalize text-4xl md:text-6xl font-semibold text-gray-900 dark:text-white"
        v-html="
          $t('heroword', {
            healthcare: `<span class='text-[var(--main-color-500)]'>${$t('healthcare')}</span>`,
          })
        "
      ></h1>
      <p class="mb-8 text-gray-500 dark:text-gray-300 text-sm md:text-base">{{ $t("herotext") }}</p>
      <button
        class="h-12 rounded-lg text-white px-6 md:px-10 bg-[var(--main-color-500)] font-semibold cursor-pointer hover:bg-white hover:border hover:border-[var(--main-color-500)] hover:text-[var(--main-color-500)] transition-all ease-in-out"
      >
        {{ $t("getstart") }}
      </button>
    </div>
    <div
      class="right w-full md:w-1/2 flex justify-center md:justify-end relative mt-8 md:mt-0"
      :class="{ 'justify-center md:justify-end': $i18n.locale === 'ar' }"
    >
      <img src="../../../assets/landingimg.png" alt="" class="z-10 max-w-md md:max-w-none w-[500px]"  />
      <div
        class="w-[120px] md:w-[180px] h-[120px] md:h-[180px] rounded-full bg-[var(--sec-color-500)] blur-[50px] md:blur-[100px] absolute top-[200px] md:top-[500px] right-[24px] md:right-[48px]"
        :class="{ 'right-0 left-0': $i18n.locale === 'ar' }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroSection",
};
</script>

<style lang="scss" scoped></style>
