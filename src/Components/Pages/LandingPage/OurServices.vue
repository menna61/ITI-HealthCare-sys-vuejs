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
        v-for="service in services"
        :key="service"
      >
        <div class="svg mb-6" v-html="service.img"></div>
        <h1 class="text-xl md:text-2xl font-medium mb-4 text-gray-900 dark:text-white">
          {{ $t(service.title) }}
        </h1>
        <p class="text-gray-600 dark:text-gray-300 text-sm md:text-base">
          {{ $t(service.description) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OurServices",
  data() {
    return {
      services: [
        {
          title: "easyapp",
          description: "easydesc",
          img: '<svg class="w-12 h-12 fill-[var(--main-color-500)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M64 112C64 85.5 85.5 64 112 64L160 64C177.7 64 192 78.3 192 96C192 113.7 177.7 128 160 128L128 128L128 256C128 309 171 352 224 352C277 352 320 309 320 256L320 128L288 128C270.3 128 256 113.7 256 96C256 78.3 270.3 64 288 64L336 64C362.5 64 384 85.5 384 112L384 256C384 333.4 329 398 256 412.8L256 432C256 493.9 306.1 544 368 544C429.9 544 480 493.9 480 432L480 346.5C442.7 333.3 416 297.8 416 256C416 203 459 160 512 160C565 160 608 203 608 256C608 297.8 581.3 333.4 544 346.5L544 432C544 529.2 465.2 608 368 608C270.8 608 192 529.2 192 432L192 412.8C119 398 64 333.4 64 256L64 112zM512 288C529.7 288 544 273.7 544 256C544 238.3 529.7 224 512 224C494.3 224 480 238.3 480 256C480 273.7 494.3 288 512 288z"/></svg>',
        },
        {
          title: "virtualword",
          description: "virtualdesc",
          img: '<svg class="w-12 h-12 fill-[var(--main-color-500)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M128 128C92.7 128 64 156.7 64 192L64 448C64 483.3 92.7 512 128 512L384 512C419.3 512 448 483.3 448 448L448 192C448 156.7 419.3 128 384 128L128 128zM496 400L569.5 458.8C573.7 462.2 578.9 464 584.3 464C597.4 464 608 453.4 608 440.3L608 199.7C608 186.6 597.4 176 584.3 176C578.9 176 573.7 177.8 569.5 181.2L496 240L496 400z"/></svg>',
        },
        {
          title: "digitalword",
          description: "digitaldesc",
          img: '<svg class="w-12 h-12 fill-[var(--main-color-500)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M128 176C128 149.5 149.5 128 176 128C202.5 128 224 149.5 224 176L224 288L128 288L128 176zM64 176L64 464C64 525.9 114.1 576 176 576C237.9 576 288 525.9 288 464L288 358.2L404.3 527.7C439.8 579.4 509.6 592 560.3 555.8C611 519.6 623.3 448.3 587.8 396.6L459.3 209.3C423.8 157.6 354 145 303.3 181.2C297.7 185.2 292.6 189.6 288 194.3L288 176C288 114.1 237.9 64 176 64C114.1 64 64 114.1 64 176zM328.6 304.2C312.6 280.9 318.6 248.9 340.5 233.2C361.7 218.1 391 222.9 406.5 245.4L473.5 343L393.6 398.9L328.6 304.1z"/></svg>',
        },
        {
          title: "smartword",
          description: "smartdesc",
          img: '<svg class="w-12 h-12 fill-[var(--main-color-500)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M420.9 448C428.2 425.7 442.8 405.5 459.3 388.1C492 353.7 512 307.2 512 256C512 150 426 64 320 64C214 64 128 150 128 256C128 307.2 148 353.7 180.7 388.1C197.2 405.5 211.9 425.7 219.1 448L420.8 448zM416 496L224 496L224 512C224 556.2 259.8 592 304 592L336 592C380.2 592 416 556.2 416 512L416 496zM312 176C272.2 176 240 208.2 240 248C240 261.3 229.3 272 216 272C202.7 272 192 261.3 192 248C192 181.7 245.7 128 312 128C325.3 128 336 138.7 336 152C336 165.3 325.3 176 312 176z"/></svg>',
        },
      ],
    };
  },
};
</script>

<style scoped></style>
