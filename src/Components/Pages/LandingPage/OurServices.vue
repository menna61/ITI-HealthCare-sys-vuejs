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
        class="bg-[var(--main-color-25)] dark:bg-gray-800 rounded-2xl p-6 flex flex-col justify-between service-card"
        v-for="(service, index) in landingData.services"
        :key="service"
        :style="{ transitionDelay: `${index * 0.1}s` }"
      >
        <div class="svg mb-6" v-html="service.img"></div>
        <h1 class="text-xl md:text-2xl font-medium mb-4 text-gray-900 dark:text-white">
          {{ $t(service.titleKey) }}
        </h1>
        <p class="text-gray-600 dark:text-gray-300 text-sm md:text-base">
          {{ $t(service.descriptionKey) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import landingData from "@/assets/landingData.json";

export default {
  name: "OurServices",
  data() {
    return {
      landingData,
    };
  },
  mounted() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".service-card");
            cards.forEach((card) => card.classList.add("animate-in"));
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(this.$el);
  },
};
</script>

<style scoped>
.service-card {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.service-card.animate-in {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
