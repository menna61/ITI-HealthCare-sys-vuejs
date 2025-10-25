<template>
    
  <!-- Footer -->
  <div class="bg-[#212D66]">
      <footer class="cont text-gray-100 py-10">
        <div class="mx-auto grid md:grid-cols-3 gap-8 px-40">
          <!-- Column 1: Brand -->
          <div class="flex flex-col gap-2">
            <img src="../../assets/logo-white.svg" class="w-[151px] mb-2" alt="">
            <h2 class="text-xl font-semibold">Healthcare Plus</h2>
            <p class="text-gray-300 text-sm leading-relaxed">
              {{ $t('healthtxt') }}
            </p>
          </div>
          <!-- Column 2: Quick Links -->
          <div class="flex flex-col gap-2">
            <h3 class="font-semibold text-lg mb-3">{{ $t('quicklinks') }}</h3>
            <ul class="space-y-2 text-gray-300 text-sm">
              <li><a  @click="scrollToSection('hero')" class="hover:text-white transition cursor-pointer">{{ $t('home') }}</a></li>
              <li><a  @click="scrollToSection('about')" class="hover:text-white transition cursor-pointer">{{ $t('about') }}</a></li>
              <li><a  @click="scrollToSection('services')" class="hover:text-white transition cursor-pointer">{{ $t('services') }}</a></li>
              <li><a  @click="scrollToSection('contact')" class="hover:text-white transition cursor-pointer">{{ $t('contact') }}</a></li>
            </ul>
          </div>
          <!-- Column 3: Contact -->
          <div class="flex flex-col gap-2">
            <h3 class="font-semibold text-lg mb-3">{{ $t('contactinfo') }}</h3>
            <ul class="space-y-2 text-gray-300 text-sm flex flex-col gap-2">
              <li class="flex items-center gap-2">
                <svg class="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"/></svg>
                123 Health St, Wellness City
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z"/></svg>
                +1 (234) 567-8901
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z"/></svg>
                info@healthcareplus.com
              </li>
            </ul>
          </div>
        </div>
        <!-- Bottom bar -->
        <div class="border-t border-[#101733] mt-8 pt-4 text-center text-gray-400 text-sm">
          © 2025 Healthcare Plus. All rights reserved.
        </div>
      </footer>
  </div>
</template>
<script>
export default {
    name: "FooTer",
    methods:{
       scrollToSection(id) {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
        });
      }
    },
    }
}
</script>
<style scoped>
body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
}
</style>
