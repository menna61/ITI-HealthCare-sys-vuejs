<template>
  <div
    class="google flex w-full border border-gray-200 py-4 items-center justify-center rounded-lg gap-6 cursor-pointer"
    @click="signIn"
  >
    <img src="../assets/google.svg" alt="" />
    <p v-if="isSignup" class="text-gray-500">Sign up with google</p>
    <p v-else class="text-gray-500">Continue with google</p>
    <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "GoogleCard",
  data() {
    return {
      error: null,
      user: null,
    };
  },
  computed: {
    isSignup() {
      return this.$route.path === "/doctorSignup" || this.$route.path === "/patientSignup";
    },
  },
  methods: {
    async signIn() {
      this.error = null;
      try {
        const user = await this.$auth.signInWithGoogle();
        this.user = user;
        if (this.$route.path === "/doctorSignup") {
          this.$router.push("/login");
        } else if (this.$route.path === "/patientSignup") {
          this.$router.push("/login");
        } else {
          this.$router.push("/");
        }
      } catch (err) {
        if (err.code === "auth/popup-closed-by-user") {
          this.error = "Sign-in popup was closed before completing the sign-in. Please try again.";
        } else {
          this.error = err.message || String(err);
        }
      }
    },
  },
};
</script>

<style scoped></style>
