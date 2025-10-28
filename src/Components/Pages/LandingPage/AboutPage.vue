<template>
  <div class="cont flex flex-col md:flex-row justify-between items-center" id="about">
    <!--Left section - img-->
    <div class="left relative order-2 md:order-1">
      <div class="relative w-fit z-10">
        <img
          src="../../../assets/doctor1.png"
          alt=""
          class="w-full max-w-sm md:max-w-none"
          :class="{ 'rotate-y-180': $i18n.locale === 'ar' }"
        />
        <img
          class="absolute bottom-0 right-[-14px] w-[140px] md:w-[170px] lg:w-[204px]"
          src="../../../assets/doctor2.png"
          alt=""
          :class="{ 'rotate-y-180 right-[378px]': $i18n.locale === 'ar' }"
        />
      </div>
      <div
        class="w-[120px] md:w-[180px] h-[120px] md:h-[180px] rounded-full bg-[var(--sec-color-500)] blur-[50px] md:blur-[100px] absolute top-[300px] md:top-[600px] left-[24px] md:left-[48px]"
      ></div>
    </div>

    <!--Right section-->
    <div class="right flex flex-col w-full md:w-1/2 order-1 md:order-2 mb-8 md:mb-0">
      <div
        class="w-fit px-4 h-8 rounded-2xl flex items-center justify-center tag bg-[#CEF1F0] dark:bg-gray-700 mb-4"
      >
        <p>{{ $t("about") }}</p>
      </div>
      <p
        class="text-3xl md:text-[56px] mb-4 font-bold w-full md:w-[400px] leading-16 text-gray-900 dark:text-white"
      >
        {{ $t("aboutword") }}
      </p>
      <p class="text-gray-500 dark:text-gray-300 mb-4 text-sm md:text-base">
        {{ $t("aboutdesc1") }}
      </p>
      <p class="text-gray-500 dark:text-gray-300 mb-8 text-sm md:text-base">
        {{ $t("aboutdesc2") }}
      </p>

      <!--Numbers will come from database-->
      <div class="numbers flex flex-wrap gap-6 md:gap-10">
        <div class="flex flex-col gap-2">
          <p class="text-2xl text-[var(--main-color-500)] font-bold">+400</p>
          <p class="text-gray-700 dark:text-gray-300 text-sm md:text-base">
            {{ $t("expertdoctors") }}
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <p class="text-2xl text-[var(--sec-color-500)] font-bold">+500</p>
          <p class="text-gray-700 dark:text-gray-300 text-sm md:text-base">
            {{ $t("recoverpatients") }}
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <p class="text-2xl text-[var(--main-color-500)] font-bold">98%</p>
          <p class="text-gray-700 dark:text-gray-300 text-sm md:text-base">
            {{ $t("satisfiedrate") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style scoped></style>
