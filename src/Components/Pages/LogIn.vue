<template>
    <div class="mx-[600px] h-full p-8 bg-white rounded-2xl flex flex-col gap-10">
        <div class="top flex flex-col gap-10">
            <div class="back flex gap-2 items-center justify-start">
                <div class="icon">
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z"/></svg>
                </div>
                <p class="text-xl">Back</p>
            </div>
            <div class="stepper flex flex-col gap-8">
                <div class="top flex flex-col gap-4">
                    <h1 class="text-4xl font-bold">Login</h1>
                    <p class="text-gray-600 text-xl">Enter your credentials</p>
                </div>


            </div>
        </div>



        <div class="bottom flex gap-10">
                <div class="form w-full">
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
                                        <label for="">Mobile or Email</label>
                                        <div class="flex gap-2 h-12 px-4 border border-gray-200 rounded-lg items-center ">
                                            <input type="text" placeholder="Enter mobile or email" class="w-full h-12">
                                        </div>
                                    </div>
                                </div>
                        
                                 <div class="pass flex gap-4 items-center w-full">
                                    <div class="pass flex flex-col gap-2 w-full">
                                        <label for="">Password</label>
                                        <div class="flex gap-2 h-12 px-4 border border-gray-200 rounded-lg items-center ">
                                            <svg class="w-6 h-6 fill-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M256 160L256 224L384 224L384 160C384 124.7 355.3 96 320 96C284.7 96 256 124.7 256 160zM192 224L192 160C192 89.3 249.3 32 320 32C390.7 32 448 89.3 448 160L448 224C483.3 224 512 252.7 512 288L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 288C128 252.7 156.7 224 192 224z"/></svg>
                                            <input type="text" placeholder="Enter your password" class="w-full h-12">
                                            <svg class="w-6 h-6 fill-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L504.5 470.8C507.2 468.4 509.9 466 512.5 463.6C559.3 420.1 590.6 368.2 605.5 332.5C608.8 324.6 608.8 315.8 605.5 307.9C590.6 272.2 559.3 220.2 512.5 176.8C465.4 133.1 400.7 96.2 319.9 96.2C263.1 96.2 214.3 114.4 173.9 140.4L73 39.1zM236.5 202.7C260 185.9 288.9 176 320 176C399.5 176 464 240.5 464 320C464 351.1 454.1 379.9 437.3 403.5L402.6 368.8C415.3 347.4 419.6 321.1 412.7 295.1C399 243.9 346.3 213.5 295.1 227.2C286.5 229.5 278.4 232.9 271.1 237.2L236.4 202.5zM357.3 459.1C345.4 462.3 332.9 464 320 464C240.5 464 176 399.5 176 320C176 307.1 177.7 294.6 180.9 282.7L101.4 203.2C68.8 240 46.4 279 34.5 307.7C31.2 315.6 31.2 324.4 34.5 332.3C49.4 368 80.7 420 127.5 463.4C174.6 507.1 239.3 544 320.1 544C357.4 544 391.3 536.1 421.6 523.4L357.4 459.2z"/></svg>
                                        </div>
                                    </div>
                                
                                </div>
                            </div>


                        </div>
                    </form>
                </div>
        </div>     
        <div class="btn w-full flex justify-end gap-4">            
            <router-link to="/doctorDashboard">
                <button class="flex gap-2 items-center justify-center h-12 rounded-lg bg-[#5271FF] text-white w-fit px-10 cursor-pointer">
                    <p>Login</p>
                </button>
            </router-link>
           
        </div>
</div>
</template>

<script>
import GoogleCard from '../GoogleCard.vue';

    export default {
        components:{GoogleCard},
        name:'LogIn'
    }
</script>

<style scoped>

</style>