<template>
  <div class="relative">
    <!-- زر الهمبرجر في الشاشات الصغيرة -->
    <button
      class="lg:hidden fixed top-4 z-50 p-3 rounded-xl text-white bg-[#212D66] shadow-lg hover:bg-[#1a2558] transition-all duration-200 hover:scale-105"
      @click="toggleMenu"
      :class="isRTL ? 'right-4' : 'left-4'"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>

    <!-- الخلفية الداكنة عند فتح القائمة -->
    <div
      v-if="menuOpen"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
      @click="toggleMenu"
    ></div>

    <!-- القائمة الجانبية -->
    <div
      class="sidebar w-[302px] bg-[#212D66] dark:bg-gray-800 pt-10 flex flex-col items-center gap-20 h-screen fixed top-0 shadow-2xl transform transition-transform duration-300"
      :class="[
        isRTL ? 'right-0' : 'left-0',
        {
          'translate-x-full': isRTL && !menuOpen,
          '-translate-x-full': !isRTL && !menuOpen,
          'translate-x-0': menuOpen,
          'lg:translate-x-0': true,
          'z-50': true,
        },
      ]"
    >
      <img src="../../../assets/pattern.svg" alt="" class="absolute bottom-0" />
      <div class="logo">
        <img src="../../../assets/logo-white.svg" alt="" />
      </div>

      <div class="links w-full flex flex-col gap-6 z-50">
        <!-- الروابط -->
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :exact-active-class="
            isRTL
              ? 'bg-gradient-to-l from-slate-900 to-slate-900/0 border-r-4 border-white'
              : 'bg-gradient-to-r from-slate-900 to-slate-900/0 border-l-4 border-white'
          "
          @click="closeSidebar"
        >
          <div class="calendar flex gap-4 justify-start items-center w-full h-12 px-4">
            <div v-html="link.icon"></div>
            <p class="text-xl text-gray-300">{{ $t(link.labelKey) }}</p>
          </div>
        </router-link>

        <!-- زر Logout -->
        <div
          @click="confirmLogout"
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
            <path
              d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
            />
          </svg>
          <p class="text-xl text-gray-300">{{ $t("Sign_out") }}</p>
        </div>
      </div>
    </div>
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
            <path
              d="M569 337C578.4 327.6 578.4 312.4 569 303.1L425 159C418.1 152.1 407.8 150.1 398.8 153.8C389.8 157.5 384 166.3 384 176L384 256L272 256C245.5 256 224 277.5 224 304L224 336C224 362.5 245.5 384 272 384L384 384L384 464C384 473.7 389.8 482.5 398.8 486.2C407.8 489.9 418.1 487.9 425 481L569 337zM224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160z"
            />
          </svg>
        </div>
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 id="dialog-title" class="text-base font-semibold text-gray-900 dark:text-white">
            {{ $t("Sign_out") }}
          </h3>
          <div class="mt-2">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ $t("confirm_logout") }}
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
          {{ $t("cancel") }}
        </button>

        <button
          type="button"
          @click="logout"
          class="ml-2 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs"
        >
          {{ $t("Sign_out") }}
        </button>
      </template>
    </UiModal>
  </div>
</template>

<script>
import UiModal from "../../UI/Modal.vue";
import { signOutUser } from "/src/authHandler.js";

export default {
  name: "SideMenu",
  components: { UiModal },
  props: {
    menuOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showLogoutModal: false,
      links: [
        {
          to: "/admin/dashboard",
          labelKey: "dashboard",
          icon: `<svg class="w-6 h-6 fill-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M0 96C0 60.7 28.7 32 64 32H192 320c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM160 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm32 64a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM128 192a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM416 96c0-35.3 28.7-64 64-64H608c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H480c-35.3 0-64-28.7-64-64V96zm128 32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM512 256a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/>
          </svg>`,
        },
        {
          to: "/admin/patients",
          labelKey: "patients",
          icon: `<svg class="w-6 h-6 fill-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/>
          </svg>`,
        },
        {
          to: "/admin/doctors",
          labelKey: "allDoctors",
          icon: `<svg class="w-6 h-6 fill-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72zM380 384.8C374.6 384.3 369 384 363.4 384L276.5 384C270.9 384 265.4 384.3 259.9 384.8L259.9 452.3C276.4 459.9 287.9 476.6 287.9 495.9C287.9 522.4 266.4 543.9 239.9 543.9C213.4 543.9 191.9 522.4 191.9 495.9C191.9 476.5 203.4 459.8 219.9 452.3L219.9 393.9C157 417 112 477.6 112 548.6C112 563.7 124.3 576 139.4 576L500.5 576C515.6 576 527.9 563.7 527.9 548.6C527.9 477.6 482.9 417.1 419.9 394L419.9 431.4C443.2 439.6 459.9 461.9 459.9 488L459.9 520C459.9 531 450.9 540 439.9 540C428.9 540 419.9 531 419.9 520L419.9 488C419.9 477 410.9 468 399.9 468C388.9 468 379.9 477 379.9 488L379.9 520C379.9 531 370.9 540 359.9 540C348.9 540 339.9 531 339.9 520L339.9 488C339.9 461.9 356.6 439.7 379.9 431.4L379.9 384.8z"/>
          </svg>`,
        },
        {
          to: "/admin/totalAppointments",
          labelKey: "totalAppointments",
          icon: `<svg class="w-6 h-6 fill-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M224 64C241.7 64 256 78.3 256 96L256 128L384 128L384 96C384 78.3 398.3 64 416 64C433.7 64 448 78.3 448 96L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 96C192 78.3 206.3 64 224 64zM160 304L160 336C160 344.8 167.2 352 176 352L208 352C216.8 352 224 344.8 224 336L224 304C224 295.2 216.8 288 208 288L176 288C167.2 288 160 295.2 160 304zM288 304L288 336C288 344.8 295.2 352 304 352L336 352C344.8 352 352 344.8 352 336L352 304C352 295.2 344.8 288 336 288L304 288C295.2 288 288 295.2 288 304zM432 288C423.2 288 416 295.2 416 304L416 336C416 344.8 423.2 352 432 352L464 352C472.8 352 480 344.8 480 336L480 304C480 295.2 472.8 288 464 288L432 288zM160 432L160 464C160 472.8 167.2 480 176 480L208 480C216.8 480 224 472.8 224 464L224 432C224 423.2 216.8 416 208 416L176 416C167.2 416 160 423.2 160 432zM304 416C295.2 416 288 423.2 288 432L288 464C288 472.8 295.2 480 304 480L336 480C344.8 480 352 472.8 352 464L352 432C352 423.2 344.8 416 336 416L304 416zM416 432L416 464C416 472.8 423.2 480 432 480L464 480C472.8 480 480 472.8 480 464L480 432C480 423.2 472.8 416 464 416L432 416C423.2 416 416 423.2 416 432z"/>
          </svg>`,
        },
        {
          to: "/admin/doctorAvailability",
          labelKey: "doctorAvailability",
          icon: `<svg class="w-6 h-6 fill-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
          </svg>`,
        },
        {
          to: "/admin/wallet",
          labelKey: "adminwallettitle",
          icon: `<svg class="w-6 h-6 fill-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M128 96C92.7 96 64 124.7 64 160L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 256C576 220.7 547.3 192 512 192L136 192C122.7 192 112 181.3 112 168C112 154.7 122.7 144 136 144L520 144C533.3 144 544 133.3 544 120C544 106.7 533.3 96 520 96L128 96zM480 320C497.7 320 512 334.3 512 352C512 369.7 497.7 384 480 384C462.3 384 448 369.7 448 352C448 334.3 462.3 320 480 320z"/>
          </svg>`,
        },
      ],
    };
  },
  computed: {
    isRTL() {
      return this.$i18n.locale === "ar";
    },
  },
  methods: {
    toggleMenu() {
      this.$emit("toggle");
    },
    closeSidebar() {
      if (window.innerWidth < 1024) {
        this.$emit("toggle");
      }
    },
    confirmLogout() {
      this.closeSidebar();
      this.showLogoutModal = true;
    },
    async logout() {
      try {
        this.closeSidebar();
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
