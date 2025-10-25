<template>
    <div class="cont flex justify-between items-center" id="about">
        <!--Left section - img-->
        <div class="left relative">
            <div class="relative w-fit z-10">
                <img src="../../../assets/doctor1.png" alt="" :class="{'rotate-y-180':$i18n.locale === 'ar'}">
                <img class="absolute bottom-0 right-[-14px]" src="../../../assets/doctor2.png" alt="" :class="{'rotate-y-180 right-[378px]':$i18n.locale === 'ar'}">
            </div>
            <div class="w-[180px] h-[180px] rounded-full bg-[var(--sec-color-500)] blur-[100px] absolute top-[600px] left-[48px]"></div>
        </div>

        <!--Right section-->
        <div class="right flex flex-col w-1/2">
            <div class="w-fit px-4 h-8 rounded-2xl flex items-center justify-center tag bg-[#CEF1F0] mb-4">
                <p>{{ $t('about') }}</p>
            </div>
            <p class="text-[56px] mb-4 font-bold w-[400px] leading-16">{{$t('aboutword')}}</p>
            <p class="text-gray-500 mb-4">{{$t('aboutdesc1')}}</p>
            <p class="text-gray-500 mb-8">{{$t('aboutdesc2')}}</p>

            <!--Numbers will come from database-->
            <div class="numbers flex gap-10">
                <div class="flex flex-col gap-2">
                    <p class="text-2xl text-[var(--main-color-500)] font-bold">+400</p>
                    <p>{{ $t('expertdoctors') }}</p>
                </div>

                <div class="flex flex-col gap-2">
                    <p class="text-2xl text-[var(--sec-color-500)] font-bold">+500</p>
                    <p>{{ $t('recoverpatients') }}</p>
                </div>

                <div class="flex flex-col gap-2">
                    <p class="text-2xl text-[var(--main-color-500)] font-bold">98%</p>
                    <p>{{ $t('satisfiedrate') }}</p>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"AboutPage"
    }
</script>

<style scoped>

</style>