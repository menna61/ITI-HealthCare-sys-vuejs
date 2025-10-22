<template>
    <div>
        <div class="mb-14">
            <home-nav/>
            
        </div>

        <div class="content flex flex-col gap-28">
            <hero-section/>
            <about-page/>
            <our-services/>
            <start-today/>
            <contactus-page/>
            <foo-ter/>
        </div>
    </div>
</template>

<script>
import FooTer from '@/Components/Layouts/FooTer.vue';
import AboutPage from './AboutPage.vue';
import ContactusPage from './ContactusPage.vue';
import HeroSection from './HeroSection.vue';
import HomeNav from './HomeNav.vue';
import OurServices from './OurServices.vue';
import StartToday from './StartToday.vue';

    export default {
        name:"LandingPage",
        components:{
            HomeNav,
            HeroSection,
            AboutPage,
            OurServices,
            StartToday,
            ContactusPage,
            FooTer,
        }
    }
</script>

<style scoped>

</style>