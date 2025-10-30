<template>
  <div class="cont flex flex-col items-center justify-center gap-4 px-4" id="services">
    <div class="top flex flex-col items-center justify-center text-center">
      <div
        class="w-fit px-4 h-8 rounded-2xl flex items-center justify-center tag bg-[#CEF1F0] dark:bg-gray-700 mb-4"
      >
        <p>{{ $t("services") }}</p>
      </div>
      <p class="text-3xl md:text-[56px] font-bold mb-4 text-gray-900 dark:text-white">
        {{ $t("servword") }}
      </p>
      <p class="text-gray-500 dark:text-gray-300 mb-4 text-sm md:text-base">{{ $t("servdesc") }}</p>
    </div>
    <div class="bottom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        class="bg-[var(--main-color-25)] dark:bg-gray-800 rounded-2xl p-6 flex flex-col justify-between"
       v-for="service in landingData.services" :key="service"
      >
        <div class="svg mb-6" v-html="service.img"></div>
        <h1 class="text-xl md:text-2xl font-medium mb-4 text-gray-900 dark:text-white">
          {{ $t(service.titleKey)}}</h1>
        <p class="text-gray-600 dark:text-gray-300 text-sm md:text-base">
         {{ $t(service.descriptionKey) }}</p>
      </div>
    </div>
  </div>
</template>

<script>

import landingData from '@/assets/landingData.json';

    export default {
        name:"OurServices",
        data(){
          return{
            landingData
          }
        }
    }
</script>