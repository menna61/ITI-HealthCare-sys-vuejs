<template>
    <div class="bg-white">
        <div class="cont flex py-4 justify-between items-center">
            <router-link to="/">
                <div class="left">
                    <img src="../../../assets/Group 1.svg" alt="">
                </div>
            </router-link>

            <div class="middle">
                <nav class="flex gap-10 font-medium">
                    <a  @click="scrollToSection('hero')">Home</a>
                    <a  @click="scrollToSection('about')">About us</a>
                    <a  @click="scrollToSection('services')">Services</a>
                    <a  @click="scrollToSection('contact')">Contact us</a>
                </nav>
            </div>

            <div class="right flex gap-4">      
               
                <lang-drop/>
                <router-link to="/login">
                    <button  class="h-12 rounded-lg border border-[var(--main-color-500)] px-10 text-[#5271FF] font-semibold cursor-pointer hover:bg-[var(--main-color-500)] hover:text-white transition-all ease-in-out">Login</button>
                </router-link>
                <router-link to="/signupcards"><button  class="h-12 rounded-lg text-white px-10 bg-[var(--main-color-500)] font-semibold cursor-pointer hover:bg-white hover:border hover:border-[var(--main-color-500)] hover:text-[var(--main-color-500)] transition-all ease-in-out">Sign up</button></router-link>
            </div>
        </div>
    </div>
</template>

<script>
import LangDrop from '@/Components/LangDrop.vue';


    export default {
        name:"HomeNav",
        components:{LangDrop},
        data(){
            return{
               
            }
        },
        methods:{
           scrollToSection(id) {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
        });
      }
    },
  },

    }
    
</script>

<style scoped>
nav a {
  position: relative;
  text-decoration: none;
  color: #333;
  transition: color 0.3s ease;
  padding-bottom: 5px;
  cursor: pointer;
}
nav a::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0%;
  background-color: #2563eb; /* blue underline */
  transition: width 0.3s ease;
} 

a:hover {
  color: #2563eb;
}

a:hover::after {
  width: 100%;
}

/* Active link style */
 a.active {
  color: #2563eb;
}

a.active::after {
  width: 100%;
}
</style>