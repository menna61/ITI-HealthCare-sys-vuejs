<template>
  <div class="w-[302px] bg-[#212D66] dark:bg-gray-800 pt-10 flex flex-col items-center gap-20 h-screen fixed">
    <img src="../../../assets/pattern.svg" alt="" class="absolute bottom-0" />
    <div class="logo">
      <img src="../../../assets/logo-white.svg" alt="" />
    </div>
    <div class="links w-full flex flex-col gap-6 z-50">
      <router-link
        to="/admin/dashboard"
        exact-active-class="bg-gradient-to-r from-slate-900 to-slate-900/0 border-l-4 border-white"
      >
        <div class="calendar flex gap-4 justify-start items-center w-full h-12 px-4">
        <svg class="w-6 h-6 fill-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path d="M480 160L352 160L352 288L480 288L480 160zM544 288L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 160C96 124.7 124.7 96 160 96L480 96C515.3 96 544 124.7 544 160L544 288zM160 352L160 480L288 480L288 352L160 352zM288 288L288 160L160 160L160 288L288 288zM352 352L352 480L480 480L480 352L352 352z"/></svg>
          <p class="text-xl text-gray-300">Dashboard</p>
        </div>
      </router-link>
      <router-link   to="/admin/users" exact-active-class="bg-gradient-to-r from-slate-900 to-slate-900/0 border-l-4 border-white"
      >
        <div class="calendar flex gap-4 justify-start items-center w-full h-12 px-4">
          <svg class="w-6 h-6 fill-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M320 80C377.4 80 424 126.6 424 184C424 241.4 377.4 288 320 288C262.6 288 216 241.4 216 184C216 126.6 262.6 80 320 80zM96 152C135.8 152 168 184.2 168 224C168 263.8 135.8 296 96 296C56.2 296 24 263.8 24 224C24 184.2 56.2 152 96 152zM0 480C0 409.3 57.3 352 128 352C140.8 352 153.2 353.9 164.9 357.4C132 394.2 112 442.8 112 496L112 512C112 523.4 114.4 534.2 118.7 544L32 544C14.3 544 0 529.7 0 512L0 480zM521.3 544C525.6 534.2 528 523.4 528 512L528 496C528 442.8 508 394.2 475.1 357.4C486.8 353.9 499.2 352 512 352C582.7 352 640 409.3 640 480L640 512C640 529.7 625.7 544 608 544L521.3 544zM472 224C472 184.2 504.2 152 544 152C583.8 152 616 184.2 616 224C616 263.8 583.8 296 544 296C504.2 296 472 263.8 472 224zM160 496C160 407.6 231.6 336 320 336C408.4 336 480 407.6 480 496L480 512C480 529.7 465.7 544 448 544L192 544C174.3 544 160 529.7 160 512L160 496z"/></svg>
          <p class="text-xl text-gray-300">Users</p>
        </div>
      </router-link>

       <router-link   to="/admin/doctors" exact-active-class="bg-gradient-to-r from-slate-900 to-slate-900/0 border-l-4 border-white"
      >
        <div class="calendar flex gap-4 justify-start items-center w-full h-12 px-4">
            <svg
            class="w-6 h-6 fill-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
          >
            <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
            <path
              d="M320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72zM380 384.8C374.6 384.3 369 384 363.4 384L276.5 384C270.9 384 265.4 384.3 259.9 384.8L259.9 452.3C276.4 459.9 287.9 476.6 287.9 495.9C287.9 522.4 266.4 543.9 239.9 543.9C213.4 543.9 191.9 522.4 191.9 495.9C191.9 476.5 203.4 459.8 219.9 452.3L219.9 393.9C157 417 112 477.6 112 548.6C112 563.7 124.3 576 139.4 576L500.5 576C515.6 576 527.9 563.7 527.9 548.6C527.9 477.6 482.9 417.1 419.9 394L419.9 431.4C443.2 439.6 459.9 461.9 459.9 488L459.9 520C459.9 531 450.9 540 439.9 540C428.9 540 419.9 531 419.9 520L419.9 488C419.9 477 410.9 468 399.9 468C388.9 468 379.9 477 379.9 488L379.9 520C379.9 531 370.9 540 359.9 540C348.9 540 339.9 531 339.9 520L339.9 488C339.9 461.9 356.6 439.7 379.9 431.4L379.9 384.8z"
            />
          </svg>
          <p class="text-xl text-gray-300">All Doctors</p>
        </div>
      </router-link>

      <router-link
        to="/admin/totalAppointments"
        exact-active-class="bg-gradient-to-r from-slate-900 to-slate-900/0 border-l-4 border-white"
      >
        <div class="calendar flex gap-4 justify-start items-center w-full h-12 px-4">
          <svg class="w-6 h-6 fill-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L308 576C285.3 544.5 272 505.8 272 464C272 363.4 349.4 280.8 448 272.7L448 234.6C448 217.6 441.3 201.3 429.3 189.3L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM608 464C608 384.5 543.5 320 464 320C384.5 320 320 384.5 320 464C320 543.5 384.5 608 464 608C543.5 608 608 543.5 608 464zM521.4 403.1C528.5 408.3 530.1 418.3 524.9 425.4L460.9 513.4C458.1 517.2 453.9 519.6 449.2 519.9C444.5 520.2 439.9 518.6 436.6 515.3L396.6 475.3C390.4 469.1 390.4 458.9 396.6 452.7C402.8 446.5 413 446.5 419.2 452.7L446 479.5L499 406.6C504.2 399.5 514.2 397.9 521.4 403.1z"/></svg>
          <p class="text-xl text-gray-300">Total Appointments</p>
        </div>
      </router-link>
       <router-link
        to="/admin/doctorAvailability"
        exact-active-class="bg-gradient-to-r from-slate-900 to-slate-900/0 border-l-4 border-white"
      >
        <div class="calendar flex gap-4 justify-start items-center w-full h-12 px-4">
           <svg
            class="w-6 h-6 fill-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
          >
            <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
            <path
              d="M320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72zM380 384.8C374.6 384.3 369 384 363.4 384L276.5 384C270.9 384 265.4 384.3 259.9 384.8L259.9 452.3C276.4 459.9 287.9 476.6 287.9 495.9C287.9 522.4 266.4 543.9 239.9 543.9C213.4 543.9 191.9 522.4 191.9 495.9C191.9 476.5 203.4 459.8 219.9 452.3L219.9 393.9C157 417 112 477.6 112 548.6C112 563.7 124.3 576 139.4 576L500.5 576C515.6 576 527.9 563.7 527.9 548.6C527.9 477.6 482.9 417.1 419.9 394L419.9 431.4C443.2 439.6 459.9 461.9 459.9 488L459.9 520C459.9 531 450.9 540 439.9 540C428.9 540 419.9 531 419.9 520L419.9 488C419.9 477 410.9 468 399.9 468C388.9 468 379.9 477 379.9 488L379.9 520C379.9 531 370.9 540 359.9 540C348.9 540 339.9 531 339.9 520L339.9 488C339.9 461.9 356.6 439.7 379.9 431.4L379.9 384.8z"
            />
          </svg> <p class="text-xl text-gray-300">Doctors Availability</p>
        </div>
      </router-link>

    

      <div
        @click="showLogoutModal = true"
        class="logout flex gap-4 justify-start items-center w-full h-12 px-4 cursor-pointer hover:bg-gradient-to-r hover:from-slate-900 hover:to-slate-900/0 hover:border-l-4 hover:border-white"
      >
        <svg class="w-6 h-6 fill-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          

          <path
            d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
          />
        </svg>
        <p class="text-xl text-gray-300">Logout</p>
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
              

              <path
                d="M569 337C578.4 327.6 578.4 312.4 569 303.1L425 159C418.1 152.1 407.8 150.1 398.8 153.8C389.8 157.5 384 166.3 384 176L384 256L272 256C245.5 256 224 277.5 224 304L224 336C224 362.5 245.5 384 272 384L384 384L384 464C384 473.7 389.8 482.5 398.8 486.2C407.8 489.9 418.1 487.9 425 481L569 337zM224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160z"
              />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 id="dialog-title" class="text-base font-semibold text-gray-900 dark:text-white">
              Logout
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Are you sure you want to logout ?
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
            Stay here
          </button>

          <button
            type="button"
            @click="logout"
            class="ml-2 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs"
          >
            Logout
          </button>
        </template>
      </UiModal>
    </div>
  </div>
</template>

<script>
import { signOutUser } from "/src/authHandler.js";
import UiModal from "../../UI/Modal.vue";

export default {
  name: "SideMenu",
  components: { UiModal },

  data() {
    return {
      showLogoutModal: false,
    };
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