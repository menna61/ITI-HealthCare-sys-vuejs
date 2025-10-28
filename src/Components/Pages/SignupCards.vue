<template>
  <div class="cont flex justify-center items-center flex-col gap-16">
    <div class="top flex flex-col gap-4 items-center">
      <h1
        class="text-5xl font-bold text-center text-gray-900 dark:text-white"
        v-html="
          $t('welcomemsg', { appName: `<span class='text-[#0CB8B6]'>${$t('appName')}</span>` })
        "
      ></h1>
      <p class="text-gray-600 text-xl dark:text-gray-300">{{ $t("chooserole") }}</p>
    </div>
    <div class="bottom flex flex-col gap-6 2xl:flex-row w-full">
      <div class="patient p-8 bg-white rounded-xl flex flex-col gap-9 w-full dark:bg-gray-800">
        <div class="top flex flex-col items-center justify-center">
          <div
            class="icon w-20 h-20 flex justify-center items-center rounded-full bg-[#EEF1FF] mb-4"
          >
            <svg
              fill="#5271FF"
              class="w-12 h-12"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
              <path
                d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"
              />
            </svg>
          </div>
          <div class="titles flex flex-col items-center justify-center">
            <p class="mb-2 text-xl text-gray-900 dark:text-white">{{ $t("patient") }}</p>
            <p class="text-gray-500 w-full md:w-[600px] text-center dark:text-gray-300">
              {{ $t("proledesc") }}
            </p>
          </div>
        </div>
        <div class="bottom flex flex-col gap-6">
          <div class="services flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <svg
                class="w-4 h-4 fill-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path
                  d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"
                />
              </svg>
              <p class="text-gray-500">{{ $t("book") }}</p>
            </div>
            <div class="flex items-center gap-2">
              <svg
                class="w-4 h-4 fill-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path
                  d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"
                />
              </svg>
              <p class="text-gray-500">{{ $t("medicalrecords") }}</p>
            </div>
            <div class="flex items-center gap-2">
              <svg
                class="w-4 h-4 fill-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path
                  d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"
                />
              </svg>
              <p class="text-gray-500">{{ $t("communicate") }}</p>
            </div>
            <div class="flex items-center gap-2">
              <svg
                class="w-4 h-4 fill-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path
                  d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"
                />
              </svg>
              <p class="text-gray-500">{{ $t("videoconsultation") }}</p>
            </div>
          </div>
          <router-link to="/patientSignup"
            ><button
              class="w-full bg-[#5271FF] border-none rounded-lg font-semibold h-12 text-white cursor-pointer"
            >
              {{ $t("signupprole") }}
            </button></router-link
          >
        </div>
      </div>

      <div class="doctor p-8 bg-white rounded-xl flex flex-col gap-9 w-full">
        <div class="top flex flex-col items-center justify-center">
          <div
            class="icon w-20 h-20 flex justify-center items-center rounded-full bg-[#E7F8F8] mb-4"
          >
            <svg
              class="w-12 h-12"
              fill="#0CB8B6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
              <path
                d="M64 112C64 85.5 85.5 64 112 64L160 64C177.7 64 192 78.3 192 96C192 113.7 177.7 128 160 128L128 128L128 256C128 309 171 352 224 352C277 352 320 309 320 256L320 128L288 128C270.3 128 256 113.7 256 96C256 78.3 270.3 64 288 64L336 64C362.5 64 384 85.5 384 112L384 256C384 333.4 329 398 256 412.8L256 432C256 493.9 306.1 544 368 544C429.9 544 480 493.9 480 432L480 346.5C442.7 333.3 416 297.8 416 256C416 203 459 160 512 160C565 160 608 203 608 256C608 297.8 581.3 333.4 544 346.5L544 432C544 529.2 465.2 608 368 608C270.8 608 192 529.2 192 432L192 412.8C119 398 64 333.4 64 256L64 112zM512 288C529.7 288 544 273.7 544 256C544 238.3 529.7 224 512 224C494.3 224 480 238.3 480 256C480 273.7 494.3 288 512 288z"
              />
            </svg>
          </div>
          <div class="titles flex flex-col items-center justify-center">
            <p class="mb-2 text-xl text-gray-900">{{ $t("doctor") }}</p>
            <p class="text-gray-500 w-full md:w-[600px] text-center">
              {{ $t("droledesc") }}
            </p>
          </div>
        </div>
        <div class="bottom flex flex-col gap-6">
          <div class="services flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <svg
                class="w-4 h-4 fill-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path
                  d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"
                />
              </svg>
              <p class="text-gray-500">{{ $t("manageschedule") }}</p>
            </div>
            <div class="flex items-center gap-2">
              <svg
                class="w-4 h-4 fill-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path
                  d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"
                />
              </svg>
              <p class="text-gray-500">{{ $t("patientrecords") }}</p>
            </div>
            <div class="flex items-center gap-2">
              <svg
                class="w-4 h-4 fill-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path
                  d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"
                />
              </svg>
              <p class="text-gray-500">{{ $t("prescribe") }}</p>
            </div>
            <div class="flex items-center gap-2">
              <svg
                class="w-4 h-4 fill-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path
                  d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"
                />
              </svg>
              <p class="text-gray-500">{{ $t("videoconsultation") }}</p>
            </div>
          </div>
          <router-link to="/doctorSignup"
            ><button
              class="w-full bg-[#5271FF] border-none rounded-lg font-semibold h-12 text-white cursor-pointer"
            >
              {{ $t("signupdrole") }}
            </button></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
