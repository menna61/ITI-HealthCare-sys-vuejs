<template>
  <div>
    <div
      class="z-[999999] w-[302px] bg-[#212D66] pt-10 flex flex-col items-center gap-20 h-screen fixed dark:bg-gray-800 transform transition-transform duration-300"
      :class="[
        isRTL ? 'right-0' : 'left-0',
        {
          'translate-x-full': isRTL && !isOpen,
          '-translate-x-full': !isRTL && !isOpen,
          'translate-x-0': isOpen,
          'lg:translate-x-0': true,
        },
      ]"
    >
      <img src="../assets/pattern.svg" alt="" class="absolute bottom-0" />
      <div class="logo">
        <img src="../assets/logo-white.svg" alt="" />
      </div>
      <div class="links w-full flex flex-col gap-6 z-[40]">
        <router-link
          to="/dashboard/calendar"
          :exact-active-class="
            isRTL
              ? 'bg-gradient-to-l from-slate-900 to-slate-900/0 border-r-4 border-white'
              : 'bg-gradient-to-r from-slate-900 to-slate-900/0 border-l-4 border-white'
          "
        >
          <div class="calendar flex gap-4 justify-start items-center w-full h-12 px-4">
            <svg
              class="w-6 h-6 fill-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
              <path
                d="M224 64C241.7 64 256 78.3 256 96L256 128L384 128L384 96C384 78.3 398.3 64 416 64C433.7 64 448 78.3 448 96L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 96C192 78.3 206.3 64 224 64zM160 304L160 336C160 344.8 167.2 352 176 352L208 352C216.8 352 224 344.8 224 336L224 304C224 295.2 216.8 288 208 288L176 288C167.2 288 160 295.2 160 304zM288 304L288 336C288 344.8 295.2 352 304 352L336 352C344.8 352 352 344.8 352 336L352 304C352 295.2 344.8 288 336 288L304 288C295.2 288 288 295.2 288 304zM432 288C423.2 288 416 295.2 416 304L416 336C416 344.8 423.2 352 432 352L464 352C472.8 352 480 344.8 480 336L480 304C480 295.2 472.8 288 464 288L432 288zM160 432L160 464C160 472.8 167.2 480 176 480L208 480C216.8 480 224 472.8 224 464L224 432C224 423.2 216.8 416 208 416L176 416C167.2 416 160 423.2 160 432zM304 416C295.2 416 288 423.2 288 432L288 464C288 472.8 295.2 480 304 480L336 480C344.8 480 352 472.8 352 464L352 432C352 423.2 344.8 416 336 416L304 416zM416 432L416 464C416 472.8 423.2 480 432 480L464 480C472.8 480 480 472.8 480 464L480 432C480 423.2 472.8 416 464 416L432 416C423.2 416 416 423.2 416 432z"
              />
            </svg>
            <p class="text-xl text-gray-300">{{ $t("calendar") }}</p>
          </div>
        </router-link>

        <router-link
          to="/dashboard/availability"
          :exact-active-class="
            isRTL
              ? 'bg-gradient-to-l from-slate-900 to-slate-900/0 border-r-4 border-white'
              : 'bg-gradient-to-r from-slate-900 to-slate-900/0 border-l-4 border-white'
          "
        >
          <div class="calendar flex gap-4 justify-start items-center w-full h-12 px-4">
            <svg
              class="w-6 h-6 fill-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
              <path
                d="M377.9 130.8C388.3 116.5 385.1 96.5 370.8 86.1C356.5 75.7 336.5 78.9 326.1 93.2L220.1 238.9L182.6 201.4C170.1 188.9 149.8 188.9 137.3 201.4C124.8 213.9 124.8 234.2 137.3 246.7L201.3 310.7C207.9 317.3 217.1 320.7 226.4 320C235.7 319.3 244.3 314.5 249.8 306.9L377.8 130.9zM505.9 266.8C516.3 252.5 513.1 232.5 498.8 222.1C484.5 211.7 464.5 214.9 454.1 229.2L284.1 462.9L214.6 393.4C202.1 380.9 181.8 380.9 169.3 393.4C156.8 405.9 156.8 426.2 169.3 438.7L265.3 534.7C271.9 541.3 281.1 544.7 290.4 544C299.7 543.3 308.3 538.5 313.8 530.9L505.8 266.9z"
              />
            </svg>
            <p class="text-xl text-gray-300">{{ $t("availability") }}</p>
          </div>
        </router-link>

        <router-link
          to="/dashboard/patients"
          :exact-active-class="
            isRTL
              ? 'bg-gradient-to-l from-slate-900 to-slate-900/0 border-r-4 border-white'
              : 'bg-gradient-to-r from-slate-900 to-slate-900/0 border-l-4 border-white'
          "
        >
          <div class="calendar flex gap-4 justify-start items-center w-full h-12 px-4">
            <svg
              class="w-6 h-6 fill-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
              <path
                d="M320 80C377.4 80 424 126.6 424 184C424 241.4 377.4 288 320 288C262.6 288 216 241.4 216 184C216 126.6 262.6 80 320 80zM96 152C135.8 152 168 184.2 168 224C168 263.8 135.8 296 96 296C56.2 296 24 263.8 24 224C24 184.2 56.2 152 96 152zM0 480C0 409.3 57.3 352 128 352C140.8 352 153.2 353.9 164.9 357.4C132 394.2 112 442.8 112 496L112 512C112 523.4 114.4 534.2 118.7 544L32 544C14.3 544 0 529.7 0 512L0 480zM521.3 544C525.6 534.2 528 523.4 528 512L528 496C528 442.8 508 394.2 475.1 357.4C486.8 353.9 499.2 352 512 352C582.7 352 640 409.3 640 480L640 512C640 529.7 625.7 544 608 544L521.3 544zM472 224C472 184.2 504.2 152 544 152C583.8 152 616 184.2 616 224C616 263.8 583.8 296 544 296C504.2 296 472 263.8 472 224zM160 496C160 407.6 231.6 336 320 336C408.4 336 480 407.6 480 496L480 512C480 529.7 465.7 544 448 544L192 544C174.3 544 160 529.7 160 512L160 496z"
              />
            </svg>
            <p class="text-xl text-gray-300">{{ $t("patients") }}</p>
          </div>
        </router-link>

        <router-link
          to="/dashboard/financial"
          :exact-active-class="
            isRTL
              ? 'bg-gradient-to-l from-slate-900 to-slate-900/0 border-r-4 border-white'
              : 'bg-gradient-to-r from-slate-900 to-slate-900/0 border-l-4 border-white'
          "
        >
          <div class="calendar flex gap-4 justify-start items-center w-full h-12 px-4">
            <svg
              class="w-6 h-6 fill-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
              <path
                d="M296 88C296 74.7 306.7 64 320 64C333.3 64 344 74.7 344 88L344 128L400 128C417.7 128 432 142.3 432 160C432 177.7 417.7 192 400 192L285.1 192C260.2 192 240 212.2 240 237.1C240 259.6 256.5 278.6 278.7 281.8L370.3 294.9C424.1 302.6 464 348.6 464 402.9C464 463.2 415.1 512 354.9 512L344 512L344 552C344 565.3 333.3 576 320 576C306.7 576 296 565.3 296 552L296 512L224 512C206.3 512 192 497.7 192 480C192 462.3 206.3 448 224 448L354.9 448C379.8 448 400 427.8 400 402.9C400 380.4 383.5 361.4 361.3 358.2L269.7 345.1C215.9 337.5 176 291.4 176 237.1C176 176.9 224.9 128 285.1 128L296 128L296 88z"
              />
            </svg>
            <p class="text-xl text-gray-300">{{ $t("financial") }}</p>
          </div>
        </router-link>

        <router-link
          to="/dashboard/services"
          :exact-active-class="
            isRTL
              ? 'bg-gradient-to-l from-slate-900 to-slate-900/0 border-r-4 border-white'
              : 'bg-gradient-to-r from-slate-900 to-slate-900/0 border-l-4 border-white'
          "
        >
          <div class="calendar flex gap-4 justify-start items-center w-full h-12 px-4">
            <svg
              class="w-6 h-6 fill-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
              <path
                d="M264 112L376 112C380.4 112 384 115.6 384 120L384 160L256 160L256 120C256 115.6 259.6 112 264 112zM208 120L208 160L128 160C92.7 160 64 188.7 64 224L64 320L576 320L576 224C576 188.7 547.3 160 512 160L432 160L432 120C432 89.1 406.9 64 376 64L264 64C233.1 64 208 89.1 208 120zM576 368L384 368L384 384C384 401.7 369.7 416 352 416L288 416C270.3 416 256 401.7 256 384L256 368L64 368L64 480C64 515.3 92.7 544 128 544L512 544C547.3 544 576 515.3 576 480L576 368z"
              />
            </svg>
            <p class="text-xl text-gray-300">{{ $t("services") }}</p>
          </div>
        </router-link>

        <router-link
          to="/dashboard/appointments"
          :exact-active-class="
            isRTL
              ? 'bg-gradient-to-l from-slate-900 to-slate-900/0 border-r-4 border-white'
              : 'bg-gradient-to-r from-slate-900 to-slate-900/0 border-l-4 border-white'
          "
        >
          <div class="calendar flex gap-4 justify-start items-center w-full h-12 px-4">
            <svg
              class="w-6 h-6 fill-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
              <path
                d="M224 64C241.7 64 256 78.3 256 96L256 128L384 128L384 96C384 78.3 398.3 64 416 64C433.7 64 448 78.3 448 96L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 96C192 78.3 206.3 64 224 64zM160 304L160 336C160 344.8 167.2 352 176 352L208 352C216.8 352 224 344.8 224 336L224 304C224 295.2 216.8 288 208 288L176 288C167.2 288 160 295.2 160 304zM288 304L288 336C288 344.8 295.2 352 304 352L336 352C344.8 352 352 344.8 352 336L352 304C352 295.2 344.8 288 336 288L304 288C295.2 288 288 295.2 288 304zM432 288C423.2 288 416 295.2 416 304L416 336C416 344.8 423.2 352 432 352L464 352C472.8 352 480 344.8 480 336L480 304C480 295.2 472.8 288 464 288L432 288zM160 432L160 464C160 472.8 167.2 480 176 480L208 480C216.8 480 224 472.8 224 464L224 432C224 423.2 216.8 416 208 416L176 416C167.2 416 160 423.2 160 432zM304 416C295.2 416 288 423.2 288 432L288 464C288 472.8 295.2 480 304 480L336 480C344.8 480 352 472.8 352 464L352 432C352 423.2 344.8 416 336 416L304 416zM416 432L416 464C416 472.8 423.2 480 432 480L464 480C472.8 480 480 472.8 480 464L480 432C480 423.2 472.8 416 464 416L432 416C423.2 416 416 423.2 416 432z"
              />
            </svg>
            <p class="text-xl text-gray-300">{{ $t("appointments") }}</p>
          </div>
        </router-link>

        <div
          @click="showLogoutModal = true"
          :class="[
            'logout flex gap-4 justify-start items-center w-full h-12 px-4 cursor-pointer',
            isRTL
              ? 'hover:bg-gradient-to-l hover:from-slate-900 hover:to-slate-900/0 hover:border-r-4 hover:border-white'
              : 'hover:bg-gradient-to-r hover:from-slate-900 hover:to-slate-900/0 hover:border-l-4 hover:border-white',
          ]"
        >
          <svg
            class="w-6 h-6 fill-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
            <path
              d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
            />
          </svg>
          <p class="text-xl text-gray-300">{{ $t("logout") }}</p>
        </div>
      </div>
    </div>

    <!-- Logout Confirmation Modal -->
    <UiModal v-model="showLogoutModal" title="">
      <div class="sm:flex sm:items-start z-50">
        <div
          class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10"
        >
          <svg
            class="w-6 h-6 fill-red-500 rotate-y-180"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
          >
            <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
            <path
              d="M569 337C578.4 327.6 578.4 312.4 569 303.1L425 159C418.1 152.1 407.8 150.1 398.8 153.8C389.8 157.5 384 166.3 384 176L384 256L272 256C245.5 256 224 277.5 224 304L224 336C224 362.5 245.5 384 272 384L384 384L384 464C384 473.7 389.8 482.5 398.8 486.2C407.8 489.9 418.1 487.9 425 481L569 337zM224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160z"
            />
          </svg>
        </div>
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 id="dialog-title" class="text-base font-semibold text-gray-900 dark:text-white">
            {{ $t("logout") }}
          </h3>
          <div class="mt-2">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ $t("logout_confirmation") }}
            </p>
          </div>
        </div>
      </div>
      <template #footer>
        <button
          type="button"
          @click="showLogoutModal = false"
          class="inline-flex justify-center rounded-md bg-[var(--main-color-500)] px-3 py-2 text-sm font-semibold text-white shadow-xs sm:ml-3"
        >
          {{ $t("stay_here") }}
        </button>

        <button
          type="button"
          @click="logout"
          class="ml-2 inline-flex justify-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-xs"
        >
          {{ $t("logout") }}
        </button>
      </template>
    </UiModal>
  </div>
</template>

<script>
import { signOutUser } from "/src/authHandler.js";
import UiModal from "./UI/Modal.vue";

export default {
  name: "SideMenu",
  components: { UiModal },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      showLogoutModal: false,
    };
  },

  computed: {
    isRTL() {
      return this.$i18n.locale === "ar";
    },
  },

  methods: {
    async logout() {
      try {
        await signOutUser();
        this.$router.push("/login");
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
  },
};
</script>

<style scoped></style>
