<template>
  <div class="cont flex flex-col items-center gap-4 justify-center px-4" id="contact">
    <div class="top flex flex-col items-center justify-center text-center">
      <div
        class="w-fit px-4 h-8 rounded-2xl flex items-center justify-center tag bg-[#CEF1F0] dark:bg-gray-700 mb-4"
      >
        <p>{{ $t("contact") }}</p>
      </div>
      <p class="text-3xl md:text-[56px] font-bold mb-4 text-gray-900 dark:text-white">
        {{ $t("getintouch") }}
      </p>
      <p class="text-gray-500 dark:text-gray-300 mb-4 text-sm md:text-base">{{ $t("haveques") }}</p>
    </div>
    <div
      class="bottom bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 flex flex-col md:flex-row gap-8 w-full"
    >
      <div class="left w-full md:pr-8 md:border-r border-gray-200 dark:border-gray-600">
        <form class="flex flex-col gap-6" action="">
          <div class="fname flex flex-col gap-2 w-full">
            <label for="" class="text-gray-700 dark:text-gray-300 text-sm md:text-base">{{
              $t("fullname")
            }}</label>
            <div
              class="flex gap-2 h-12 px-4 border border-gray-200 dark:border-gray-600 rounded-lg items-center bg-white dark:bg-gray-700"
            >
              <svg
                class="w-6 h-6 fill-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path
                  d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"
                />
              </svg>
              <input
                type="text"
                :placeholder="$t('entername')"
                class="w-full h-12 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm md:text-base"
              />
            </div>
          </div>

          <div class="flex flex-col gap-2 w-full">
            <label for="" class="text-gray-700 dark:text-gray-300 text-sm md:text-base">{{
              $t("email")
            }}</label>
            <div
              class="flex gap-2 h-12 px-4 border border-gray-200 dark:border-gray-600 rounded-lg items-center bg-white dark:bg-gray-700"
            >
              <svg
                class="w-6 h-6 fill-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path
                  d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z"
                />
              </svg>
              <input
                type="text"
                :placeholder="$t('enteremail')"
                class="w-full h-12 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm md:text-base"
              />
            </div>
          </div>

          <div class="flex flex-col gap-2 w-full">
            <label for="" class="text-gray-700 dark:text-gray-300 text-sm md:text-base">{{
              $t("phone")
            }}</label>
            <div
              class="flex gap-2 h-12 px-4 border border-gray-200 dark:border-gray-600 rounded-lg items-center bg-white dark:bg-gray-700"
            >
              <svg
                class="w-6 h-6 fill-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path
                  d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z"
                />
              </svg>
              <input
                type="text"
                placeholder="+20"
                class="w-full h-12 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm md:text-base"
              />
            </div>
          </div>

          <div class="flex flex-col gap-2 w-full">
            <label for="" class="text-gray-700 dark:text-gray-300 text-sm md:text-base">{{
              $t("msgdesc")
            }}</label>
            <div
              class="flex gap-2 h-44 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            >
              <textarea
                :placeholder="$t('msg')"
                class="w-full h-full p-4 resize-none outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm md:text-base"
              ></textarea>
            </div>
          </div>

          <button
            class="h-12 rounded-lg text-white px-6 md:px-10 bg-[var(--main-color-500)] font-semibold cursor-pointer hover:bg-white hover:border hover:border-[var(--main-color-500)] hover:text-[var(--main-color-500)] transition-all ease-in-out"
          >
            {{ $t("sendmsg") }}
          </button>
        </form>
      </div>
      <div
        class="right w-full rounded-lg p-4 md:p-6 bg-[#212D66] dark:bg-gray-900 text-white flex flex-col gap-8 relative"
      >
        <div class="title">
          <h1 class="text-2xl md:text-3xl font-medium">{{ $t("contactinfo") }}</h1>
        </div>
        <div class="info flex flex-col gap-6">
          <div class="flex gap-4 items-center">
            <div
              class="icon w-10 h-10 flex items-center justify-center bg-[var(--main-color-25)] rounded-lg"
            >
              <svg
                class="w-6 h-6 fill-[var(--main-color-500)]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path
                  d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"
                />
              </svg>
            </div>
            <div class="text">
              <p class="w-full md:w-[300px] text-sm md:text-base">
                {{ landingData.contact.address }}
              </p>
            </div>
          </div>

          <div class="flex gap-4 items-center">
            <div
              class="icon w-10 h-10 flex items-center justify-center bg-[var(--main-color-25)] rounded-lg"
            >
              <svg
                class="w-6 h-6 fill-[var(--sec-color-500)]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path
                  d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z"
                />
              </svg>
            </div>
            <div class="text">
              <p class="w-full md:w-[300px] text-sm md:text-base">{{ landingData.contact.email }}</p>
            </div>
          </div>

          <div class="flex gap-4 items-center">
            <div
              class="icon w-10 h-10 flex items-center justify-center bg-[var(--main-color-25)] rounded-lg"
            >
              <svg
                class="w-6 h-6 fill-[var(--main-color-500)]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path
                  d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z"
                />
              </svg>
            </div>
            <div class="text">
              <p class="w-full md:w-[300px] text-sm md:text-base">{{ landingData.contact.phone }}</p>
            </div>
          </div>
        </div>

        <img
          src="../../../assets/pattern2.svg"
          class="absolute right-0 top-0 h-full hidden md:block"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>

import landingData from '@/assets/landingData.json';

    export default {
        name:"ContactusPage",
        data() {
            return {
                landingData
            };
            
        }
    }

</script>

<style scoped></style>