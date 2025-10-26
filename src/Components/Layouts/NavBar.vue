<template>
  <div class="w-full">
    <nav class="bg-white w-full">
      <div
        :class="isAuthPages ? 'cont' : 'mr-20 ml-8'"
        class="py-4 flex justify-between items-center"
      >
        <div v-if="isAuthPages">
          <router-link to="/">
            <div class="left">
              <img src="../../assets/Group 1.svg" alt="" />
            </div>
          </router-link>
        </div>
        <div v-if="!isAuthPages" class="search">
          <form class="w-96">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >Search</label
            >
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                required
              />
            </div>
          </form>
        </div>
        <div class="right flex gap-4">
          <div
            v-if="!isAuthPages"
            class="w-12 h-12 rounded-full flex items-center justify-center border border-gray-200 relative cursor-pointer"
          >
            <svg
              class="w-6 h-6 fill-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
              <path
                d="M320 64C302.3 64 288 78.3 288 96L288 99.2C215 114 160 178.6 160 256L160 277.7C160 325.8 143.6 372.5 113.6 410.1L103.8 422.3C98.7 428.6 96 436.4 96 444.5C96 464.1 111.9 480 131.5 480L508.4 480C528 480 543.9 464.1 543.9 444.5C543.9 436.4 541.2 428.6 536.1 422.3L526.3 410.1C496.4 372.5 480 325.8 480 277.7L480 256C480 178.6 425 114 352 99.2L352 96C352 78.3 337.7 64 320 64zM258 528C265.1 555.6 290.2 576 320 576C349.8 576 374.9 555.6 382 528L258 528z"
              />
            </svg>
            <!--  -->
          </div>

          <lang-drop />

          <div
            v-if="!isAuthPages || this.$route.path === '/dashboard'"
            class="w-12 h-12 rounded-full flex items-center justify-center border border-gray-200 relative cursor-pointer"
          >
            <img  @click="goToDocProfile"
              v-if="currentUser && currentUser.profileImageUrl"
              :src="currentUser.profileImageUrl"
              alt="Profile"
              class="w-full h-full rounded-full object-cover"
            />
            <svg v-else class="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div
            v-if="this.$route.path==='patient'"
            class="w-12 h-12 rounded-full bg-gray-300 mr-4 flex items-center justify-center"
          >
            <svg class="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>

          <div v-if="isAuthPages">
            <router-link to="/signupcards" v-if="isLoginPage">
              <button
                class="h-12 rounded-lg border border-[#5271FF] px-10 text-[#5271FF] font-semibold cursor-pointer"
              >
                {{ $t("signup") }}
              </button>
            </router-link>
            <router-link to="/login" v-else>
              <button
                class="h-12 rounded-lg border border-[#5271FF] px-10 text-[#5271FF] font-semibold cursor-pointer"
              >
                {{ $t("login") }}
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import LangDrop from "../LangDrop.vue";
import { db, auth } from "/src/authHandler.js";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export default {
  name: "NavBar",
  components: { LangDrop },
  data() {
    return {
      doctors: [],
      currentUser: null,
    };
  },
  mounted() {
    this.fetchDoctors();
    this.getCurrentUser();
  },
  methods: {
    showLang() {
      this.langShow = !this.langShow;
    },
    changeLanguage(language) {
      this.$i18n.locale = language.code;
      this.langShow = false;
    },
    goToDocProfile(){
        this.$router.push("/dashboard/profile");
    },
    async fetchDoctors() {
      try {
        const doctorsCollection = collection(db, "doctors");
        const doctorsSnapshot = await getDocs(doctorsCollection);
        const doctorsData = await Promise.all(
          doctorsSnapshot.docs.map(async (doctorDoc) => {
            const doctorData = { id: doctorDoc.id, ...doctorDoc.data() };
            // Fetch availability from doctorAvailability collection
            try {
              const availRef = doc(db, "doctorAvailability", doctorData.id);
              const availSnap = await getDoc(availRef);
              if (availSnap.exists()) {
                doctorData.availability = availSnap.data().availability;
              }
            } catch (error) {
              console.error("Error fetching availability for doctor", doctorData.id, error);
            }
            return doctorData;
          })
        );
        this.doctors = doctorsData;
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        this.loading = false;
      }
    },
    async getCurrentUser() {
      try {
        const user = auth.currentUser;
        if (user) {
          // Check if user is a doctor
          const doctorDoc = await getDoc(doc(db, "doctors", user.uid));
          if (doctorDoc.exists()) {
            this.currentUser = { id: user.uid, ...doctorDoc.data() };
          } else {
            // Check if user is a patient
            const patientDoc = await getDoc(doc(db, "patients", user.uid));
            if (patientDoc.exists()) {
              this.currentUser = { id: user.uid, ...patientDoc.data() };
            }
          }
        }
      } catch (error) {
        console.error("Error getting current user:", error);
      }
    },
  },
  computed: {
    isLoginPage() {
      return this.$route.path === "/login";
    },
    currentLanguage() {
      return this.languages.find((lang) => lang.code === this.$i18n.locale) || this.languages[0];
    },
    isAuthPages() {
      return (
        this.$route.path === "/login" ||
        this.$route.path === "/signupcards" ||
        this.$route.path === "/patientSignup" ||
        this.$route.path === "/doctorSignup" ||
        this.$route.path === "/success"
      );
    },
  },
};
</script>

<style scoped></style>
