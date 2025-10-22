<template>
     <div class="w-dwh ml-[302px]">
        <main-nav/>
        <div class="pl-8 pr-20 mt-8 flex flex-col gap-6">
                    <!--Titles-->
                    <div class="title flex flex-col gap-4">
                        <h1 class="text-2xl font-bold">Telemedicine</h1>
                        <p class="text-gray-500">Track your telemedicine sessions</p>
                    </div>

                <!--Page content-->
                <div class="content">
                </div>
        </div>
    </div>
</template>

<script>
import MainNav from '../Layouts/MainNav.vue';

    export default {
        name:"DoctorVideo",
        components:{MainNav}
    }
</script>

<style scoped>

</style>