<template>
    <div class="cont py-44 px-20 2xl:p-44 bg-white rounded-2xl flex flex-col gap-10 justify-center items-center">
        <div class="check w-24 h-24 rounded-full flex items-center justify-center bg-green-100">
            <svg class="w-14 h-14 fill-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/></svg>
        </div>
        <div class="titles flex flex-col items-center justify-center gap-4">
            <p class="text-2xl text-center">Your account created successfully</p>
            <router-link to="/login"><button class="w-fit bg-[#5271FF] border-none rounded-lg font-semibold h-12 px-6 text-white cursor-pointer">Login</button></router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name:"AccountCreated"
    }
</script>

<style scoped>

</style>