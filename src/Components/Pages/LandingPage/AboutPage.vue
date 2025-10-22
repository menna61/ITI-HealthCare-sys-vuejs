<template>
    <div class="cont flex justify-between items-center" id="about">
        <!--Left section - img-->
        <div class="left relative">
            <div class="relative w-fit z-10">
                <img src="../../../assets/doctor1.png" alt="">
                <img class="absolute bottom-0 right-[-14px]" src="../../../assets/doctor2.png" alt="">
            </div>
            <div class="w-[180px] h-[180px] rounded-full bg-[var(--sec-color-500)] blur-[100px] absolute top-[600px] left-[48px]"></div>
        </div>

        <!--Right section-->
        <div class="right flex flex-col w-1/2">
            <div class="w-fit px-4 h-8 rounded-2xl flex items-center justify-center tag bg-[#CEF1F0] mb-4">
                <p>About us</p>
            </div>
            <p class="text-[56px] mb-4 font-bold w-[400px] leading-16">Committed to Excellence in Healthcare</p>
            <p class="text-gray-500 mb-4">With over 20 years of experience, our clinic has been at the forefront of healthcare innovation. We combine traditional medical expertise with modern technology to provide the best possible care for our patients.</p>
            <p class="text-gray-500 mb-8">Our team of dedicated healthcare professionals is committed to your wellbeing, offering personalized treatment plans and compassionate care every step of the way.</p>

            <!--Numbers will come from database-->
            <div class="numbers flex gap-10">
                <div class="flex flex-col gap-2">
                    <p class="text-2xl text-[var(--main-color-500)] font-bold">+400</p>
                    <p>Experts doctors</p>
                </div>

                <div class="flex flex-col gap-2">
                    <p class="text-2xl text-[var(--sec-color-500)] font-bold">+500</p>
                    <p>Recover patients</p>
                </div>

                <div class="flex flex-col gap-2">
                    <p class="text-2xl text-[var(--main-color-500)] font-bold">98%</p>
                    <p>Satisfied rate</p>
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