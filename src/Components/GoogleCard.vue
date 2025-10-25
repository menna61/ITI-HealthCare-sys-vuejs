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
import { db } from "../authHandler.js";
import { doc, setDoc, getDoc } from "firebase/firestore";

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
        const result = await this.$auth.signInWithGoogle();
        const user = result.user;
        this.user = user;

        if (this.isSignup) {
          // Signup logic
          const patientSnap = await getDoc(doc(db, "patients", user.uid));
          const doctorSnap = await getDoc(doc(db, "doctors", user.uid));

          if (patientSnap.exists() || doctorSnap.exists()) {
            this.error = "An account with this email already exists. Please log in instead.";
            return;
          }

          // Determine role based on current route
          let role = "patient"; // default
          let collection = "patients";
          if (this.$route.path === "/doctorSignup") {
            role = "doctor";
            collection = "doctors";
          } else if (this.$route.path === "/patientSignup") {
            role = "patient";
            collection = "patients";
          }

          // Save user data to Firestore with role
          await setDoc(doc(db, collection, user.uid), {
            firstName: user.displayName ? user.displayName.split(" ")[0] : "",
            lastName: user.displayName ? user.displayName.split(" ").slice(1).join(" ") : "",
            email: user.email,
            role: role,
            // Add other default fields if needed
          });

          // Redirect to login after signup
          this.$router.push("/login");
        } else {
          // Login logic
          const patientSnap = await getDoc(doc(db, "patients", user.uid));
          const doctorSnap = await getDoc(doc(db, "doctors", user.uid));

          if (patientSnap.exists()) {
            // Redirect to patient dashboard
            this.$router.push("/patient/doctors");
          } else if (doctorSnap.exists()) {
            // Redirect to doctor dashboard
            this.$router.push("/dashboard/calendar");
          } else {
            this.error = "Account not found. Please sign up first.";
            return;
          }
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
