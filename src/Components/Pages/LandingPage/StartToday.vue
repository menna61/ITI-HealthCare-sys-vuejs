<template>
  <div class="cont px-4">
    <div
      class="relative img bg-[url('../../../../public/src/startnow.png')] bg-no-repeat bg-cover h-[300px] md:h-[400px] rounded-[16px]"
    >
      <div
        class="absolute overlay bg-[var(--sec-color-500)] w-full h-full inset-0 rounded-[16px] opacity-50"
      ></div>
      <div
        class="text absolute z-10 flex flex-col gap-4 items-center justify-center h-full w-full text-center px-4"
      >
        <h1
          class="text-3xl md:text-[56px] font-medium w-full md:w-[900px] text-white dark:text-white"
        >
          {{ $t("readytext") }}
        </h1>
        <router-link
          to="/signupcards"
          class="h-12 rounded-lg border border-[var(--sec-color-500)] px-6 md:px-10 text-[var(--sec-color-500)] bg-white font-semibold cursor-pointer hover:bg-[var(--sec-color-500)] hover:text-white transition-all ease-in-out inline-flex items-center justify-center"
        >
          {{ $t("getstart") }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StartToday",
};
</script>

<style scoped></style>
