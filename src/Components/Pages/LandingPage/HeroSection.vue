<template>
    <div class="cont flex justify-between items-center" id="hero">
        <div class="left">
            <h1 class=" w-[600px] leading-16 mb-4 text-capitalize text-6xl font-semibold">Your complete digital <span class="text-[var(--main-color-500)]">healthcare</span> experience</h1>
            <p class="mb-8 text-gray-500">Your all-in-one platform for appointments and online consultations. Stay connected with your doctor and manage your health easily.</p>
            <button  class="h-12 rounded-lg text-white px-10 bg-[var(--main-color-500)] font-semibold cursor-pointer hover:bg-white hover:border hover:border-[var(--main-color-500)] hover:text-[var(--main-color-500)] transition-all ease-in-out">Get started</button>
        </div>
        <div class="right w-full flex justify-end relative">
            <img src="../../../assets/landingimg.png" alt="" class="z-10">
            <div class="w-[180px] h-[180px] rounded-full bg-[var(--sec-color-500)] blur-[100px] absolute top-[500px] right-[48px]"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'HeroSection',
    }
</script>

<style lang="scss" scoped>

</style>