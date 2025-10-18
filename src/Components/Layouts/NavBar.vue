<template>
    <div>
        <nav class="bg-white">
            <div class="cont py-4 flex justify-between items-center">
                <div class="left">
                    <img src="../../assets/Group 1.svg" alt="">
                </div>
                <div class="right flex gap-4">
                    <div class="lang w-12 h-12 rounded-full flex items-center justify-center border border-gray-200">
                        <img src="../../assets/usa-flag.svg" alt="">
                    </div>
                    <router-link to="/" v-if="isLoginPage">
                        <button  class="h-12 rounded-lg border border-[#5271FF] px-10 text-[#5271FF] font-semibold cursor-pointer">Sign up</button>
                    </router-link>
                    <router-link to="/login" v-else>
                        <button  class="h-12 rounded-lg border border-[#5271FF] px-10 text-[#5271FF] font-semibold cursor-pointer">Login</button>
                    </router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name:"NavBar",
        computed:{
            isLoginPage(){
                return this.$route.path === '/login'
            }
        }
    }
</script>

<style scoped>

</style>