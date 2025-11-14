<template>
  <div class="cont flex items-center justify-center">
    <div class="h-full p-8 bg-white dark:bg-gray-800 rounded-2xl flex flex-col gap-10 w-[500px]">
      <div class="top flex flex-col gap-10">
        <back-btn />
        <div class="stepper flex flex-col gap-8">
          <div class="top flex flex-col gap-4">
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
              {{ $t("Forgot_password") }}
            </h1>
            <p class="text-gray-600 dark:text-gray-300 text-xl">
              {{ $t("Enter_email_to_reset_password") }}
            </p>
          </div>
        </div>
      </div>

      <div class="bottom flex gap-10" v-if="!success">
        <div class="form w-full">
          <form class="flex flex-col gap-6" @submit.prevent="resetPassword">
            <div class="flex flex-col gap-8 items-end">
              <div class="inputs w-full flex flex-col gap-4">
                <div class="email flex gap-4 items-center w-full">
                  <div class="email flex flex-col gap-2 w-full">
                    <label class="text-gray-700 dark:text-gray-300">
                      {{ $t("Email") }}
                    </label>
                    <div
                      class="flex gap-2 h-12 px-4 border border-gray-200 dark:border-gray-600 rounded-lg items-center bg-white dark:bg-gray-700"
                    >
                      <input
                        v-model="email"
                        type="email"
                        :placeholder="$t('Enter_your_email')"
                        class="w-full h-12 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="error" class="text-red-600 dark:text-red-400 text-sm">{{ error }}</div>
          </form>
        </div>
      </div>

      <div v-if="success" class="text-green-600 dark:text-green-400 text-sm">
        {{ success }}
      </div>

      <div class="btn w-full flex justify-end gap-4">
        <button
          @click="success ? goToLogin() : resetPassword()"
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
          <p>
            {{ loading ? $t("Sending") : success ? $t("Login") : $t("Send_reset_email") }}
          </p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BackBtn from "../BackBtn.vue";

export default {
  components: { BackBtn },
  name: "ForgotPassword",
  data() {
    return {
      email: "",
      loading: false,
      error: null,
      success: null,
    };
  },
  methods: {
    async resetPassword() {
      if (this.loading) return;
      this.error = null;
      this.success = null;
      this.loading = true;

      try {
        if (!this.$auth || !this.$auth.resetPassword) throw new Error("Auth not initialized");

        // Check if email exists in database before sending reset email
        if (!this.$auth.checkEmailInDB) {
          throw new Error("checkEmailInDB not available");
        }

        console.log("Checking email:", this.email);
        const emailInDB = await this.$auth.checkEmailInDB(this.email);
        console.log("Email exists in DB:", emailInDB);

        if (!emailInDB) {
          this.error = this.$t("Email_not_found") || "This email is not registered in our system.";
          this.loading = false;
          return;
        }

        console.log("Sending reset email...");
        await this.$auth.resetPassword(this.email);
        this.success = "Password reset email sent! Check your inbox.";
      } catch (err) {
        console.error("Reset password error", err);
        this.error = err?.message || String(err);
      } finally {
        this.loading = false;
      }
    },
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>
