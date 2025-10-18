<template>
    <div class="cont h-full p-8 bg-white rounded-2xl flex flex-col gap-10">
        <div class="top flex flex-col gap-10">
            <div class="back flex gap-2 items-center justify-start">
                <div class="icon">
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z"/></svg>
                </div>
                <p class="text-xl">Back</p>
            </div>
            <div class="stepper flex flex-col gap-8">
                <div class="top flex flex-col gap-4">
                    <h1 class="text-4xl font-bold">Sign up as a user</h1>
                    <p class="text-gray-600 text-xl">Create your user account</p>
                </div>


            </div>
        </div>
        <div class="bottom flex gap-10">
            <div class="right w-full">


                <div class="form">
                    <form class="flex flex-col gap-6" action="">
                        <google-card/>
                        <div class="or flex gap-2 items-center justify-center">
                            <div class="w-full h-0.5 bg-gray-100"></div>
                            <p>or</p>
                            <div class="w-full h-0.5 bg-gray-100"></div>
                        </div>

                        <div class="flex flex-col gap-8 items-end">
                            <div class="inputs w-full flex flex-col gap-4">
                                <div class="name flex gap-4 items-center w-full">
                                    <div class="fname flex flex-col gap-2 w-full">
                                        <label for="">First name</label>
                                        <div class="flex gap-2 h-12 px-4 border border-gray-200 rounded-lg items-center ">
                                            <svg class="w-6 h-6 fill-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"/></svg>
                                            <input required type="text" placeholder="Enter first name" class="w-full h-12">
                                        </div>
                                    </div>
                                    <div class="sname flex flex-col gap-2 w-full">
                                        <label for="">Last name</label>
                                        <div class="flex gap-2 h-12 px-4 border border-gray-200 rounded-lg items-center ">
                                            <svg class="w-6 h-6 fill-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"/></svg>
                                            <input required type="text" placeholder="Enter last name" class="w-full h-12">
                                        </div>
                                    </div>
                                </div>
                                <div class="phone,email flex gap-4 items-center w-full">
                                    <div class="email flex flex-col gap-2 w-full">
                                        <label for="">Email</label>
                                        <div class="flex gap-2 h-12 px-4 border border-gray-200 rounded-lg items-center ">
                                            <svg class="w-6 h-6 fill-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z"/></svg>
                                            <input required type="email" placeholder="Enter email" class="w-full h-12">
                                        </div>
                                    </div>
                                    <div class="sname flex flex-col gap-2 w-full">
                                        <label for="">Phone number</label>
                                        <div class="flex gap-2 h-12 px-4 border border-gray-200 rounded-lg items-center ">
                                            <svg class="w-6 h-6 fill-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z"/></svg>
                                            <input required type="text" placeholder="+20 1234 223 43" class="w-full h-12">
                                        </div>
                                    </div>
                                </div>
                                <div class="flex gap-4 items-center w-full">
                                    <div class="flex flex-col gap-2 w-full relative" @click="showGenders">
                                        <label for="">Gender</label>
                                        <div class="flex gap-2 h-12 px-4 border border-gray-200 rounded-lg items-center ">
                                            <input v-model="selectedGender" required type="text" placeholder="Select gender" class="w-full h-12">
                                            <svg class="w-6 h-6 fill-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z"/></svg>
                                        </div>
                                        <div class="degrees w-full p-4 shadow-xl rounded-lg absolute top-20 flex flex-col gap-4 bg-white" v-show="isShow===true">
                                            <p @click="selectGender(gender)"  v-for="gender in genders" :key="gender" class="py-2 px-3 hover:bg-gray-100 cursor-pointer rounded-lg">{{gender}}</p>
                                        </div>
                                    </div>
                                    <div class="flex flex-col gap-2 w-full">
                                        <label for="">Birthdate</label>
                                        <div class="flex gap-2 h-12 px-4 border border-gray-200 rounded-lg items-center ">
                                            <input required type="date" placeholder="Select your birthdate" class="w-full h-12">
                                        </div>
                                    </div>
                                </div>
                                <div class="pass flex gap-4 items-center w-full">
                                    <div class="pass flex flex-col gap-2 w-full">
                                        <label for="">Password</label>
                                        <div class="flex gap-2 h-12 px-4 border border-gray-200 rounded-lg items-center ">
                                            <svg class="w-6 h-6 fill-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M256 160L256 224L384 224L384 160C384 124.7 355.3 96 320 96C284.7 96 256 124.7 256 160zM192 224L192 160C192 89.3 249.3 32 320 32C390.7 32 448 89.3 448 160L448 224C483.3 224 512 252.7 512 288L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 288C128 252.7 156.7 224 192 224z"/></svg>
                                            <input required type="password" placeholder="Enter your password" class="w-full h-12">
                                            <svg class="w-6 h-6 fill-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L504.5 470.8C507.2 468.4 509.9 466 512.5 463.6C559.3 420.1 590.6 368.2 605.5 332.5C608.8 324.6 608.8 315.8 605.5 307.9C590.6 272.2 559.3 220.2 512.5 176.8C465.4 133.1 400.7 96.2 319.9 96.2C263.1 96.2 214.3 114.4 173.9 140.4L73 39.1zM236.5 202.7C260 185.9 288.9 176 320 176C399.5 176 464 240.5 464 320C464 351.1 454.1 379.9 437.3 403.5L402.6 368.8C415.3 347.4 419.6 321.1 412.7 295.1C399 243.9 346.3 213.5 295.1 227.2C286.5 229.5 278.4 232.9 271.1 237.2L236.4 202.5zM357.3 459.1C345.4 462.3 332.9 464 320 464C240.5 464 176 399.5 176 320C176 307.1 177.7 294.6 180.9 282.7L101.4 203.2C68.8 240 46.4 279 34.5 307.7C31.2 315.6 31.2 324.4 34.5 332.3C49.4 368 80.7 420 127.5 463.4C174.6 507.1 239.3 544 320.1 544C357.4 544 391.3 536.1 421.6 523.4L357.4 459.2z"/></svg>
                                        </div>
                                    </div>
                                
                                </div>
                            </div>


                        </div>
                    </form>
                </div>


            </div>
        </div>


      
        <div class="btn w-full flex justify-end gap-4">
         
            
            <router-link to="/success">
                <button class="flex gap-2 items-center justify-center h-12 rounded-lg bg-[#5271FF] text-white w-fit px-10 cursor-pointer">
                    <p>Sign up</p>
                </button>
            </router-link>
           
        </div>
</div>
</template>

<script>
import GoogleCard from '../GoogleCard.vue';

    export default {
        components:{GoogleCard},
        data(){
            return{
                genders:["male","female"],
                isShow:false,
                selectedGender:""
            }
        },
        methods:{
            showGenders(){
                this.isShow = !this.isShow
            },
            selectGender(gender){
                this.selectedGender = gender
            }
        }
    }
</script>

<style scoped>

</style>