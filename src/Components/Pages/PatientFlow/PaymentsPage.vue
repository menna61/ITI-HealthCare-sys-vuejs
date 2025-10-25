<template>
     <div class="w-dwh ml-[302px]">
        <main-nav/>
        <div class="pl-8 pr-20 mt-8 flex flex-col gap-6">
                <!--Page titles-->
                <div class="title flex flex-col gap-4">
                    <h1 class="text-2xl font-bold">Doctors</h1>
                    <p class="text-gray-500">Manage your appointments and schedule</p>
                </div>

                <!--Page content-->
                <div class="patient-dashboard"></div>
        </div>
    </div>

</template>

<script>
import MainNav from '@/Components/Layouts/MainNav.vue';

    export default {
        name:"PaymentsPage",
        components:{MainNav}
    }
</script>

<style scoped>

</style>