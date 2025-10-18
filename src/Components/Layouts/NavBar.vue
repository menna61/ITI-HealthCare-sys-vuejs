<template>
    <div>
        <nav class="bg-white">
            <div class="cont py-4 flex justify-between items-center">
                <div class="left">
                    <img src="../../assets/Group 1.svg" alt="">
                </div>
                <div class="right flex gap-4">
                    <div class="lang w-12 h-12 rounded-full flex items-center justify-center border border-gray-200 relative cursor-pointer" @click="showLang">
                        <img src="../../assets/usa-flag.svg" alt="">
                         <div class="degrees w-fit p-4 shadow-xl rounded-lg absolute top-14 flex flex-col gap-4 bg-white" v-show="langShow">
                            <div class="hover:bg-gray-100 cursor-pointer p-4 rounded-lg wrap flex items-center gap-2" v-for="(language,index) in languages" :key="index" >
                                <p class="order-2">{{language.lang}}</p>
                                <div class="img w-8 h-8 border-gray-200 order-1">
                                    <img :src="language.img" alt="">
                                </div>
                            </div>
                        </div>
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
    import egypt from "../../assets/egypt-flag.svg"
    import usa from '../../assets/usa-flag.svg'

    export default {
        name:"NavBar",
        computed:{
            isLoginPage(){
                return this.$route.path === '/login'
            }
        },
        data(){
            return{
                languages:[
                    {
                        lang:'English',
                        img:usa
                    },
                    {
                        lang:'Arabic',
                        img:egypt
                    }

                ],
                langShow:false,
            }

        },
        methods:{
            showLang(){
                this.langShow = !this.langShow
            }
        }
    }
</script>

<style scoped>

</style>