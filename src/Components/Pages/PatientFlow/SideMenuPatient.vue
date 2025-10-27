<template>
  <div class="w-[302px] bg-[#212D66] pt-10 flex flex-col items-center gap-20 h-screen fixed">
    <img src="../../../assets/pattern.svg" alt="" class="absolute bottom-0" />
    <div class="logo">
      <img src="../../../assets/logo-white.svg" alt="" />
    </div>
    <div class="links w-full flex flex-col gap-6 z-50">
      <router-link
        to="/patient/home"
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
              d="M224 64C241.7 64 256 78.3 256 96L256 128L384 128L384 96C384 78.3 398.3 64 416 64C433.7 64 448 78.3 448 96L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 96C192 78.3 206.3 64 224 64zM160 304L160 336C160 344.8 167.2 352 176 352L208 352C216.8 352 224 344.8 224 336L224 304C224 295.2 216.8 288 208 288L176 288C167.2 288 160 295.2 160 304zM288 304L288 336C288 344.8 295.2 352 304 352L336 352C344.8 352 352 344.8 352 336L352 304C352 295.2 344.8 288 336 288L304 288C295.2 288 288 295.2 288 304zM432 288C423.2 288 416 295.2 416 304L416 336C416 344.8 423.2 352 432 352L464 352C472.8 352 480 344.8 480 336L480 304C480 295.2 472.8 288 464 288L432 288zM160 432L160 464C160 472.8 167.2 480 176 480L208 480C216.8 480 224 472.8 224 464L224 432C224 423.2 216.8 416 208 416L176 416C167.2 416 160 423.2 160 432zM304 416C295.2 416 288 423.2 288 432L288 464C288 472.8 295.2 480 304 480L336 480C344.8 480 352 472.8 352 464L352 432C352 423.2 344.8 416 336 416L304 416zM416 432L416 464C416 472.8 423.2 480 432 480L464 480C472.8 480 480 472.8 480 464L480 432C480 423.2 472.8 416 464 416L432 416C423.2 416 416 423.2 416 432z"
            />
          </svg>
          <p class="text-xl text-gray-300">Home</p>
        </div>
      </router-link>
      <router-link
        to="/patient/doctors"
        exact-active-class="bg-gradient-to-r from-slate-900 to-slate-900/0 border-l-4 border-white"
      >
        <div class="calendar flex gap-4 justify-start items-center w-full h-12 px-4">
         <svg class="w-6 h-6 fill-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72zM380 384.8C374.6 384.3 369 384 363.4 384L276.5 384C270.9 384 265.4 384.3 259.9 384.8L259.9 452.3C276.4 459.9 287.9 476.6 287.9 495.9C287.9 522.4 266.4 543.9 239.9 543.9C213.4 543.9 191.9 522.4 191.9 495.9C191.9 476.5 203.4 459.8 219.9 452.3L219.9 393.9C157 417 112 477.6 112 548.6C112 563.7 124.3 576 139.4 576L500.5 576C515.6 576 527.9 563.7 527.9 548.6C527.9 477.6 482.9 417.1 419.9 394L419.9 431.4C443.2 439.6 459.9 461.9 459.9 488L459.9 520C459.9 531 450.9 540 439.9 540C428.9 540 419.9 531 419.9 520L419.9 488C419.9 477 410.9 468 399.9 468C388.9 468 379.9 477 379.9 488L379.9 520C379.9 531 370.9 540 359.9 540C348.9 540 339.9 531 339.9 520L339.9 488C339.9 461.9 356.6 439.7 379.9 431.4L379.9 384.8z"/></svg>
          <p class="text-xl text-gray-300">Doctors</p>
        </div>
      </router-link>

      <router-link
        to="/patient/payments"
        exact-active-class="bg-gradient-to-r from-slate-900 to-slate-900/0 border-l-4 border-white"
      >
        <div class="calendar flex gap-4 justify-start items-center w-full h-12 px-4">
          <svg
            class="w-6 h-6 fill-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
          >
            <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
            <path
              d="M377.9 130.8C388.3 116.5 385.1 96.5 370.8 86.1C356.5 75.7 336.5 78.9 326.1 93.2L220.1 238.9L182.6 201.4C170.1 188.9 149.8 188.9 137.3 201.4C124.8 213.9 124.8 234.2 137.3 246.7L201.3 310.7C207.9 317.3 217.1 320.7 226.4 320C235.7 319.3 244.3 314.5 249.8 306.9L377.8 130.9zM505.9 266.8C516.3 252.5 513.1 232.5 498.8 222.1C484.5 211.7 464.5 214.9 454.1 229.2L284.1 462.9L214.6 393.4C202.1 380.9 181.8 380.9 169.3 393.4C156.8 405.9 156.8 426.2 169.3 438.7L265.3 534.7C271.9 541.3 281.1 544.7 290.4 544C299.7 543.3 308.3 538.5 313.8 530.9L505.8 266.9z"
            />
          </svg>
          <p class="text-xl text-gray-300">Payments</p>
        </div>
      </router-link>

      <router-link
        to="/patient/appointments"
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
              d="M224 64C241.7 64 256 78.3 256 96L256 128L384 128L384 96C384 78.3 398.3 64 416 64C433.7 64 448 78.3 448 96L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 96C192 78.3 206.3 64 224 64zM160 304L160 336C160 344.8 167.2 352 176 352L208 352C216.8 352 224 344.8 224 336L224 304C224 295.2 216.8 288 208 288L176 288C167.2 288 160 295.2 160 304zM288 304L288 336C288 344.8 295.2 352 304 352L336 352C344.8 352 352 344.8 352 336L352 304C352 295.2 344.8 288 336 288L304 288C295.2 288 288 295.2 288 304zM432 288C423.2 288 416 295.2 416 304L416 336C416 344.8 423.2 352 432 352L464 352C472.8 352 480 344.8 480 336L480 304C480 295.2 472.8 288 464 288L432 288zM160 432L160 464C160 472.8 167.2 480 176 480L208 480C216.8 480 224 472.8 224 464L224 432C224 423.2 216.8 416 208 416L176 416C167.2 416 160 423.2 160 432zM304 416C295.2 416 288 423.2 288 432L288 464C288 472.8 295.2 480 304 480L336 480C344.8 480 352 472.8 352 464L352 432C352 423.2 344.8 416 336 416L304 416zM416 432L416 464C416 472.8 423.2 480 432 480L464 480C472.8 480 480 472.8 480 464L480 432C480 423.2 472.8 416 464 416L432 416C423.2 416 416 423.2 416 432z"
            />
          </svg>
          <p class="text-xl text-gray-300">Appointments</p>
        </div>
      </router-link>

      <div
        @click="showLogoutModal = true"
        class="logout flex gap-4 justify-start items-center w-full h-12 px-4 cursor-pointer hover:bg-gradient-to-r hover:from-slate-900 hover:to-slate-900/0 hover:border-l-4 hover:border-white"
      >
        <svg class="w-6 h-6 fill-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
          <path
            d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
          />
        </svg>
        <p class="text-xl text-gray-300">Logout</p>
      </div>

      <!-- Logout Confirmation Modal -->
    <UiModal v-model="showLogoutModal" title="">
  <div class="sm:flex sm:items-start z-50">
    <div class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
      <svg class="w-6 h-6 fill-red-500 rotate-y-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M569 337C578.4 327.6 578.4 312.4 569 303.1L425 159C418.1 152.1 407.8 150.1 398.8 153.8C389.8 157.5 384 166.3 384 176L384 256L272 256C245.5 256 224 277.5 224 304L224 336C224 362.5 245.5 384 272 384L384 384L384 464C384 473.7 389.8 482.5 398.8 486.2C407.8 489.9 418.1 487.9 425 481L569 337zM224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160z"/></svg>
    </div>
    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
      <h3 id="dialog-title" class="text-base font-semibold text-gray-900">Logout</h3>
      <div class="mt-2">
        <p class="text-sm text-gray-500">Are you sure you want to logout ?</p>
      </div>
    </div>
  </div>
  <template #footer>
    <button type="button" @click="showLogoutModal = false" class="inline-flex justify-center rounded-md bg-[var(--main-color-500)] px-3 py-2 text-sm font-semibold text-white shadow-xs sm:ml-3">Stay here</button>

    <button type="button" @click="logout" class="ml-2 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs">Logout</button>

  </template>
</UiModal>


    </div>
  </div>
</template>

<script>
import { signOutUser } from "/src/authHandler.js";
import UiModal from '../../UI/Modal.vue';

export default {
  name: "SideMenu",
    components:{UiModal},

 
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
