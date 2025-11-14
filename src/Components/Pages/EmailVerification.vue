<template>
  <div class="cont h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">
    <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="flex flex-col gap-6">
        <!-- Header -->
        <div class="text-center">
          <div
            class="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4"
          >
            <svg
              class="w-8 h-8 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {{ $t("verify_email") }}
          </h1>
          <p class="text-gray-600 dark:text-gray-300">
            {{ $t("otp_sent_to") }} <span class="font-semibold">{{ email }}</span>
          </p>
        </div>

        <!-- OTP Input -->
        <div class="flex flex-col gap-4">
          <label class="text-gray-900 dark:text-white font-medium text-center">
            {{ $t("enter_otp") }}
          </label>
          <div class="flex gap-2 justify-center" dir="ltr">
            <input
              v-for="(digit, index) in otpDigits"
              :key="index"
              :ref="(el) => (otpInputs[index] = el)"
              v-model="otpDigits[index]"
              @input="handleInput(index, $event)"
              @keydown="handleKeyDown(index, $event)"
              @paste="handlePaste"
              type="text"
              maxlength="1"
              class="w-12 h-14 text-center text-2xl font-bold border-2 rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
              :class="{ 'border-red-500': errorMsg }"
            />
          </div>
        </div>

        <!-- Timer -->
        <div class="text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ $t("otp_expires_in") }}:
            <span class="font-semibold text-blue-600 dark:text-blue-400">
              {{ formatTime(remainingTime) }}
            </span>
          </p>
        </div>

        <!-- Error Message -->
        <div
          v-if="errorMsg"
          class="text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900 border border-red-100 dark:border-red-800 p-3 rounded-lg text-center"
        >
          {{ errorMsg }}
        </div>

        <!-- Success Message -->
        <div
          v-if="successMsg"
          class="text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900 border border-green-100 dark:border-green-800 p-3 rounded-lg text-center"
        >
          {{ successMsg }}
        </div>

        <!-- Verify Button -->
        <button
          @click="verifyOTP"
          :disabled="loading || otpDigits.some((d) => !d)"
          class="w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <svg
            v-if="loading"
            class="animate-spin h-5 w-5 text-white"
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
          <span>{{ loading ? $t("verifying") : $t("verify") }}</span>
        </button>

        <!-- Resend OTP -->
        <div class="text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ $t("didnt_receive_code") }}
          </p>
          <button
            @click="resendOTP"
            :disabled="resendDisabled || resending"
            class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {{
              resending
                ? $t("sending")
                : resendDisabled
                ? `${$t("resend_in")} ${resendTimer}s`
                : $t("resend_otp")
            }}
          </button>
        </div>

        <!-- Back to Signup -->
        <button
          @click="goBack"
          class="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors"
        >
          ← {{ $t("back_to_signup") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { verifyOTP as verifyOTPService, sendOTP } from "../../services/emailVerification.js";
import { registerWithEmail, db } from "../../authHandler.js";
import { doc, setDoc } from "firebase/firestore";

export default {
  name: "EmailVerification",
  data() {
    return {
      otpDigits: ["", "", "", "", "", ""],
      otpInputs: [],
      email: "",
      userData: null,
      userType: "", // 'patient' or 'doctor'
      loading: false,
      resending: false,
      errorMsg: "",
      successMsg: "",
      remainingTime: 300, // 5 minutes in seconds
      resendTimer: 60,
      resendDisabled: true,
      timerInterval: null,
      resendInterval: null,
    };
  },
  mounted() {
    // Get data from sessionStorage
    const storedData = sessionStorage.getItem("verificationData");

    if (!storedData) {
      this.$router.push("/signupcards");
      return;
    }

    try {
      const data = JSON.parse(storedData);

      if (!data.email || !data.userData || !data.userType) {
        this.$router.push("/signupcards");
        return;
      }

      this.email = data.email;
      this.userData = data.userData;
      this.userType = data.userType;
    } catch (error) {
      console.error("Error parsing verification data:", error);
      this.$router.push("/signupcards");
      return;
    }

    // Focus first input
    this.$nextTick(() => {
      if (this.otpInputs[0]) {
        this.otpInputs[0].focus();
      }
    });

    // Start timer
    this.startTimer();
    this.startResendTimer();
  },
  beforeUnmount() {
    this.clearTimers();
  },
  methods: {
    handleInput(index, event) {
      const value = event.target.value;

      // Only allow numbers
      if (!/^\d*$/.test(value)) {
        this.otpDigits[index] = "";
        return;
      }

      this.otpDigits[index] = value;

      // Move to next input
      if (value && index < 5) {
        this.otpInputs[index + 1]?.focus();
      }

      // Clear error when user types
      if (this.errorMsg) {
        this.errorMsg = "";
      }
    },
    handleKeyDown(index, event) {
      // Handle backspace
      if (event.key === "Backspace" && !this.otpDigits[index] && index > 0) {
        this.otpInputs[index - 1]?.focus();
      }

      // Handle arrow keys
      if (event.key === "ArrowLeft" && index > 0) {
        this.otpInputs[index - 1]?.focus();
      }
      if (event.key === "ArrowRight" && index < 5) {
        this.otpInputs[index + 1]?.focus();
      }
    },
    handlePaste(event) {
      event.preventDefault();
      const pastedData = event.clipboardData.getData("text").trim();

      if (/^\d{6}$/.test(pastedData)) {
        this.otpDigits = pastedData.split("");
        this.otpInputs[5]?.focus();
      }
    },
    async verifyOTP() {
      const otp = this.otpDigits.join("");

      if (otp.length !== 6) {
        this.errorMsg = this.$t("enter_complete_otp");
        return;
      }

      this.loading = true;
      this.errorMsg = "";

      // Verify OTP
      const result = verifyOTPService(this.email, otp);

      if (result.success) {
        this.successMsg = this.$t("verification_successful");

        // Create account
        await this.createAccount();
      } else {
        this.errorMsg = result.error;
        this.loading = false;
      }
    },
    getFirebaseErrorMessage(error) {
      const errorCode = error?.code || "";

      // Map Firebase error codes to translation keys
      const errorMap = {
        "auth/email-already-in-use": "email_already_in_use",
        "auth/invalid-email": "invalid_email",
        "auth/operation-not-allowed": "operation_not_allowed",
        "auth/weak-password": "weak_password",
        "auth/network-request-failed": "network_error",
      };

      const translationKey = errorMap[errorCode];
      if (translationKey) {
        return this.$t(translationKey);
      }

      // Return original message if no mapping found
      return error?.message || this.$t("account_creation_failed");
    },
    async createAccount() {
      try {
        const cred = await registerWithEmail(this.email, this.userData.password);
        const uid = cred.user.uid;

        if (this.userType === "patient") {
          await this.createPatientAccount(uid);
        } else if (this.userType === "doctor") {
          await this.createDoctorAccount(uid);
        }

        this.successMsg = this.$t("account_created_successfully");

        // Clear sessionStorage after successful account creation
        sessionStorage.removeItem("verificationData");

        setTimeout(() => {
          if (this.userType === "doctor") {
            this.$router.push("/success");
          } else {
            this.$router.push("/login");
          }
        }, 1500);
      } catch (error) {
        console.error("Error creating account:", error);
        this.errorMsg = this.getFirebaseErrorMessage(error);
      } finally {
        this.loading = false;
      }
    },
    async createPatientAccount(uid) {
      const age = this.calculateAge(this.userData.birthdate);

      await setDoc(doc(db, "patients", uid), {
        firstName: this.userData.firstName,
        lastName: this.userData.lastName,
        email: this.email,
        phoneNumber: this.userData.phoneNumber,
        gender: this.userData.selectedGender,
        birthdate: this.userData.birthdate,
        age: age,
        role: "patient",
      });
    },
    async createDoctorAccount(uid) {
      await setDoc(doc(db, "doctors", uid), {
        firstName: this.userData.firstName,
        lastName: this.userData.lastName,
        email: this.email,
        phoneNumber: this.userData.phoneNumber,
        yearsOfExperience: this.userData.yearsOfExperience,
        medicalLicenseNumber: this.userData.medicalLicenseNumber,
        clinicName: this.userData.clinicName,
        clinicAddress: this.userData.clinicAddress,
        degree: this.userData.selectedDegree,
        speciality: this.userData.selectedSpeciality,
        bio: this.userData.bio,
        profileImageUrl: this.userData.profileImageUrl,
        unionMembershipCardUrl: "",
        role: "doctor",
        approved: false,
      });

      // Initialize default availability
      await this.initializeDefaultAvailability(uid);
    },
    async initializeDefaultAvailability(doctorId) {
      try {
        const days = [];
        const today = new Date();
        const dayNames = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];

        for (let i = 0; i < 7; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          days.push({
            date: date.toISOString().split("T")[0],
            name: dayNames[date.getDay()],
            available: false,
            start: "",
            end: "",
          });
        }

        await setDoc(doc(db, "doctorAvailability", doctorId), {
          availability: days,
        });
      } catch (error) {
        console.error("Error initializing availability:", error);
      }
    },
    calculateAge(birthdate) {
      const today = new Date();
      const birthDate = new Date(birthdate);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    async resendOTP() {
      this.resending = true;
      this.errorMsg = "";

      const name = `${this.userData.firstName} ${this.userData.lastName}`;
      const result = await sendOTP(this.email, name, this.userType);

      if (result.success) {
        this.successMsg = this.$t("otp_resent");
        this.remainingTime = 300;
        this.resendTimer = 60;
        this.resendDisabled = true;
        this.otpDigits = ["", "", "", "", "", ""];
        this.otpInputs[0]?.focus();

        setTimeout(() => {
          this.successMsg = "";
        }, 3000);
      } else {
        this.errorMsg = result.error;
      }

      this.resending = false;
    },
    startTimer() {
      this.timerInterval = setInterval(() => {
        if (this.remainingTime > 0) {
          this.remainingTime--;
        } else {
          this.clearTimers();
          this.errorMsg = this.$t("otp_expired");
        }
      }, 1000);
    },
    startResendTimer() {
      this.resendInterval = setInterval(() => {
        if (this.resendTimer > 0) {
          this.resendTimer--;
        } else {
          this.resendDisabled = false;
          clearInterval(this.resendInterval);
        }
      }, 1000);
    },
    clearTimers() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }
      if (this.resendInterval) {
        clearInterval(this.resendInterval);
      }
    },
    formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    },
    goBack() {
      this.clearTimers();
      // Clear sessionStorage when going back
      sessionStorage.removeItem("verificationData");
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
