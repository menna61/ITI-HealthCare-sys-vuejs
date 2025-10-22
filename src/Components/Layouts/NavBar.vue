<template>
    <div class="w-full">
        <nav class="bg-white w-full">
            <div :class="isAuthPages ? 'cont' : 'mr-20 ml-8'"  class="py-4 flex justify-between items-center">
                <router-link to="/">
                    <div class="left" v-if="isAuthPages">
                        <img src="../../assets/Group 1.svg" alt="">
                    </div>
                </router-link>
                <div v-if="!isAuthPages" class="search flex gap-2 items-center border border-gray-200 rounded-lg px-4 h-12 w-96">
                    <svg class="w-6 h-6 fill-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"/></svg>
                    <p class="text-gray-500 text-[14px]">Search...</p>
                </div>
                <div class="right flex gap-4">
                    <div v-if="!isAuthPages" class="w-12 h-12 rounded-full flex items-center justify-center border border-gray-200 relative cursor-pointer">
                        <svg class="w-6 h-6 fill-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 64C302.3 64 288 78.3 288 96L288 99.2C215 114 160 178.6 160 256L160 277.7C160 325.8 143.6 372.5 113.6 410.1L103.8 422.3C98.7 428.6 96 436.4 96 444.5C96 464.1 111.9 480 131.5 480L508.4 480C528 480 543.9 464.1 543.9 444.5C543.9 436.4 541.2 428.6 536.1 422.3L526.3 410.1C496.4 372.5 480 325.8 480 277.7L480 256C480 178.6 425 114 352 99.2L352 96C352 78.3 337.7 64 320 64zM258 528C265.1 555.6 290.2 576 320 576C349.8 576 374.9 555.6 382 528L258 528z"/></svg>
                         <!--  -->
                    </div>


                    <lang-drop/>
                   

                    <div v-if="!isAuthPages" class="w-12 h-12 rounded-full flex items-center justify-center border border-gray-200 relative cursor-pointer">
                        <img src="../../assets/docimg.svg" alt=""><!--  -->
                    </div>

                    <div v-if="isAuthPages">
                        <router-link to="/" v-if="isLoginPage">
                            <button  class="h-12 rounded-lg border border-[#5271FF] px-10 text-[#5271FF] font-semibold cursor-pointer">{{ $t('signup') }}</button>
                        </router-link>
                        <router-link to="/login" v-else>
                            <button  class="h-12 rounded-lg border border-[#5271FF] px-10 text-[#5271FF] font-semibold cursor-pointer">{{ $t('login') }}</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import LangDrop from "../LangDrop.vue";

    export default {
        name:"NavBar",
        components:{LangDrop},
        data(){
            return{
               
            }

        },
        methods:{
            showLang(){
                this.langShow = !this.langShow
            },
            changeLanguage(language){
                this.$i18n.locale = language.code
                this.langShow = false
            }
        },
        computed:{
            isLoginPage(){
                return this.$route.path === '/login'
            },
            currentLanguage(){
                return this.languages.find(lang => lang.code === this.$i18n.locale) || this.languages[0]
            },
            isAuthPages(){
                return this.$route.path === '/login' || this.$route.path ==='/signupcards' || this.$route.path === '/patientSignup' || this.$route.path === '/doctorSignup'
            }
        },
    }
</script>

<style scoped>

</style>