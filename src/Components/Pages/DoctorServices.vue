<template>
    <div class="w-dwh ml-[302px]">
        <main-nav/>
        <div class="pl-8 pr-20 mt-8 flex flex-col gap-6">
                <!--Page top-->
                <div class="flex justify-between items-start">
                    <!--Titles-->
                    <div class="title flex flex-col gap-4">
                        <h1 class="text-2xl font-bold">Services</h1>
                        <p class="text-gray-500">Track your services</p>
                    </div>

                    <!--Button at top right-->
                    
                </div>

                <!--Page content-->
                <div class="content flex gap-6 w-full">
                </div>
        </div>
    </div>
</template>

<script>
import MainNav from '../Layouts/MainNav.vue';

    export default {
        name:"DoctorServices",
        components:{MainNav}
    }
</script>

<style scoped>

</style>