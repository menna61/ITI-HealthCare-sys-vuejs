<template>
  <div class="cont flex items-center justify-center">
    <div class="h-full p-8 bg-white dark:bg-gray-800 rounded-2xl flex flex-col gap-10 w-[500px]">
      <div class="top flex flex-col gap-10">
        <back-btn />
        <div class="stepper flex flex-col gap-8">
          <div class="top flex flex-col gap-4">
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white">Login</h1>
            <p class="text-gray-600 dark:text-gray-300 text-xl">Enter your credentials</p>
          </div>
        </div>
      </div>

      <div class="bottom flex gap-10">
        <div class="form w-full">
          <form class="flex flex-col gap-6" @submit.prevent="loginUser">
            <google-card />
            <div class="or flex gap-2 items-center justify-center">
              <div class="w-full h-0.5 bg-gray-100 dark:bg-gray-600"></div>
              <p class="text-gray-600 dark:text-gray-300">or</p>
              <div class="w-full h-0.5 bg-gray-100 dark:bg-gray-600"></div>
            </div>

            <div class="flex flex-col gap-8 items-end">
              <div class="inputs w-full flex flex-col gap-4">
                <div class="name flex gap-4 items-center w-full">
                  <div class="fname flex flex-col gap-2 w-full">
                    <label class="text-gray-700 dark:text-gray-300">Mobile or Email</label>
                    <div
                      class="flex gap-2 h-12 px-4 border border-gray-200 dark:border-gray-600 rounded-lg items-center bg-white dark:bg-gray-700"
                    >
                      <input
                        v-model="email"
                        type="text"
                        placeholder="Enter mobile or email"
                        class="w-full h-12 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <div class="pass flex gap-4 items-center w-full">
                  <div class="pass flex flex-col gap-2 w-full items-end">
                    <div class="flex flex-col gap-2 w-full">
                      <label class="text-gray-700 dark:text-gray-300">Password</label>
                      <div
                        class="flex gap-2 h-12 px-4 border border-gray-200 dark:border-gray-600 rounded-lg items-center bg-white dark:bg-gray-700"
                      >
                        <input
                          v-model="password"
                          type="password"
                          placeholder="Enter your password"
                          class="w-full h-12 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        />
                      </div>
                    </div>
                    <div class="forgot cursor-pointer">
                      <router-link
                        to="/forgot-password"
                        class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >Forgot password?</router-link
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="error" class="text-red-600 dark:text-red-400 text-sm">{{ error }}</div>
          </form>
        </div>
      </div>

      <div class="btn w-full flex justify-end gap-4">
        <button
          @click="loginUser"
          :disabled="loading"
          class="flex gap-2 items-center justify-center h-12 rounded-lg bg-[#5271FF] text-white w-fit px-10 cursor-pointer disabled:opacity-60"
        >
          <svg
            v-if="loading"
            class="animate-spin h-5 w-5 text-white mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <p>{{ loading ? "Signing in..." : "Login" }}</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BackBtn from "../BackBtn.vue";
import GoogleCard from "../GoogleCard.vue";
import { doc, getDoc } from "firebase/firestore";

export default {
  components: { GoogleCard, BackBtn },
  name: "LogIn",
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      error: null,
    };
  },
  methods: {
    async loginUser() {
      if (this.loading) return;
      this.error = null;
      this.loading = true;

      try {
        if (!this.$auth || !this.$auth.loginWithEmail) throw new Error("Auth not initialized");
        const cred = await this.$auth.loginWithEmail(this.email, this.password);
        const user = cred.user;

        // Get role from Firestore
        let role = null;
        const uid = user.uid;
        const db = this.$auth.db;

        if (db) {
          const patientSnap = await getDoc(doc(db, "patients", uid));
          if (patientSnap.exists()) {
            role = patientSnap.data()?.role || "patient";
          } else {
            const doctorSnap = await getDoc(doc(db, "doctors", uid));
            if (doctorSnap.exists()) {
              role = doctorSnap.data()?.role || "doctor";
            } else {
              const adminSnap = await getDoc(doc(db, "admin", uid));
              if (adminSnap.exists()) {
                role = adminSnap.data()?.role || "admin";
              }
            }
          }
        }

        // console.log("User role:", role);

        if (role === "patient") return this.$router.push("/patient/home");
        if (role === "doctor") return this.$router.push("/dashboard/calendar");
        if (role === "admin") return this.$router.push("/admin/dashboard");

        // return this.$router.push("/");
      } catch (err) {
        console.error("Login error", err);
        this.error = err?.message || String(err);
      } finally {
        this.loading = false;
      }
      }
    }
  }

</script>

<style scoped>
/* Add your styles here if needed */
</style>
