<template>
    <div class="google flex w-full border border-gray-200 py-4 items-center justify-center rounded-lg gap-6 cursor-pointer">
        <img src="../assets/google.svg" alt="">
        <p v-if="isSignup" class="text-gray-500">Sign up with google</p>
        <p v-else class="text-gray-500">Continue with google</p>
    </div>
</template>

<script>
    export default {
        name:"GoogleCard",
        computed:{
            isSignup(){
                return this.$route.path === '/doctorSignup' || this.$route.path === '/patientSignup'
            }
        }
    }
</script>

<style scoped>

</style>