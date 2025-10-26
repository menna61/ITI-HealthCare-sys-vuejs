<template>
    <div class="cont flex justify-between items-center" id="hero">
        <div class="left">
            <h1 class=" w-[600px] leading-16 mb-4 text-capitalize text-6xl font-semibold" v-html="$t('heroword', { healthcare: `<span class='text-[var(--main-color-500)]'>${$t('healthcare')}</span>` })"></h1>
            <p class="mb-8 text-gray-500">{{ $t('herotext') }}</p>
            <button  class="h-12 rounded-lg text-white px-10 bg-[var(--main-color-500)] font-semibold cursor-pointer hover:bg-white hover:border hover:border-[var(--main-color-500)] hover:text-[var(--main-color-500)] transition-all ease-in-out">{{ $t('getstart') }}</button>
        </div>
        <div class="right w-full flex justify-end relative" :class="{'justify-end':$i18n.locale === 'ar'}">
            <img src="../../../assets/landingimg.png" alt="" class="z-10">
            <div  class="w-[180px] h-[180px] rounded-full bg-[var(--sec-color-500)] blur-[100px] absolute top-[500px] right-[48px]" :class="{'right-0 left-0' : $i18n.locale === 'ar'}" ></div>
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