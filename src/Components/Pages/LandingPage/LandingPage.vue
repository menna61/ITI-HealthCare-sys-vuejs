<template>
  <div class="text-gray-900 dark:text-white min-h-screen">
    <div class="mb-14">
      <home-nav />
    </div>

    <div class="content flex flex-col gap-28 text-gray-900 dark:text-white min-h-screen">
      <hero-section class="scroll-animate" />
      <about-page class="scroll-animate" />
      <our-services class="scroll-animate" />
      <start-today class="scroll-animate" />
      <contactus-page class="scroll-animate" />
      <foo-ter class="scroll-animate" />
    </div>
  </div>
</template>

<script>
import FooTer from "@/Components/Layouts/FooTer.vue";
import AboutPage from "./AboutPage.vue";
import ContactusPage from "./ContactusPage.vue";
import HeroSection from "./HeroSection.vue";
import HomeNav from "./HomeNav.vue";
import OurServices from "./OurServices.vue";
import StartToday from "./StartToday.vue";

export default {
  name: "LandingPage",
  components: {
    HomeNav,
    HeroSection,
    AboutPage,
    OurServices,
    StartToday,
    ContactusPage,
    FooTer,
  },
  mounted() {
    this.initScrollAnimations();
  },
  methods: {
    initScrollAnimations() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      }, observerOptions);

      const animatedElements = document.querySelectorAll(".scroll-animate");
      animatedElements.forEach((el) => observer.observe(el));
    },
  },
};
</script>

<style scoped>
.scroll-animate {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.scroll-animate.animate-in {
  opacity: 1;
  transform: translateY(0);
}
</style>
