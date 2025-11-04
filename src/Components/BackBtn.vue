<template>
   <div class="back flex gap-2 items-center justify-start">

  <button v-if="isSignup" @click="dialogOpen = true" class="flex gap-2 items-center justify-start cursor-pointer">
            <div class="icon">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z"/></svg>
            </div>
            <p class="text-xl text-black dark:text-white">{{$t("Back")}}</p>
        </button>
        <button v-else class="flex gap-2 items-center justify-start cursor-pointer" @click="$router.go(-1)">
            <div class="icon">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z"/></svg>
            </div>
            <p class="text-xl">{{$t("Back")}}</p>
        </button>
<UiModal v-model="dialogOpen" title="Lose information">
  <div class="sm:flex sm:items-start">
    <div class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 text-red-600">
        <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
      <h3 id="dialog-title" class="text-base font-semibold text-gray-900">Lose information</h3>
      <div class="mt-2">
        <p class="text-sm text-gray-500">Are you sure you want to back to choose role page? will lose information that you added.</p>
      </div>
    </div>
  </div>
  <template #footer>
    <button type="button" @click="dialogOpen = false" class="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3">Stay here</button>
    <router-link to="/">
      <button type="button" @click="dialogOpen = false" class="ml-2 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs">{{$t("Back")}}</button>
    </router-link>
  </template>
</UiModal>
  </div>
</template>

<script>
import UiModal from './UI/Modal.vue';

export default {
  name: 'BackBtn',
  data() {
    return { dialogOpen: false };
  },
  computed: {
    isSignup() {
      return this.$route.path === '/patientSignup' || this.$route.path === '/doctorSignup';
    },
  },
  components: { UiModal },
};
</script>

<style scoped>

</style>