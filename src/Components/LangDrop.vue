<template>
    <div>
        <div class="lang w-12 h-12 rounded-full flex items-center justify-center border border-gray-200 relative cursor-pointer" @click="showLang">
                        <img :src="currentLanguage.img" alt="">
                         <div class="degrees w-fit p-4 shadow-xl rounded-lg absolute top-14 left-0 flex flex-col gap-4 bg-white" v-show="langShow">
                            <!-- Add .stop to prevent event bubbling -->
                            <div  @click.stop="changeLanguage(language)" class="hover:bg-gray-100 cursor-pointer p-4 rounded-lg wrap flex items-center gap-2" v-for="(language,index) in languages" :key="index" >
                                <p class="order-2">{{language.lang}}</p>
                                <div class="img w-8 h-8 border-gray-200 order-1">
                                    <img :src="language.img" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    
    </div>
</template>

<script>
    import egypt from "../assets/egypt-flag.svg"
    import usa from '../assets/usa-flag.svg'

    export default {
        name:"LangDrop",
        data(){
            return{
                languages:[
                    {
                        lang:'English',
                        img:usa,
                        code:'en',
                    },
                    {
                        lang:'Arabic',
                        img:egypt,
                        code:'ar'
                    }

                ],
                langShow:false,
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
            currentLanguage(){
                return this.languages.find(lang => lang.code === this.$i18n.locale) || this.languages[0]
            },
        },
    }
</script>



<style scoped>

</style>