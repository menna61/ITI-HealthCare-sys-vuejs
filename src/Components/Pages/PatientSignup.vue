<template>
  <div class="h-full cont p-8  bg-white dark:bg-gray-800 flex flex-col lg:flex-row gap-14 rounded-xl">

    <div class="left relative">
      <div class="img relative">
        <div class="overlay bg-gradient-to-t from-[var(--sec-color-500)]/90 to-transparent  w-full h-full absolute rounded-xl z-1"></div>
        <img src="../../../public/images/signuppatient.png" alt="" class="w-[1600px] rounded-2xl rotate-y-180 z-0">
      </div>

      <div class="absolute top-3/4 pl-8 z-3">
          <p class="text-4xl font-bold text-white mb-4 max-w-[600px]">Join our healthcare network</p>
          <p class="text-white text-xl">Your health, our priority.</p>
      </div>
    </div>

    <div class="right flex flex-col gap-10 w-full">
       <div class="top flex flex-col gap-10">
      <back-btn />
      <div class="stepper flex flex-col gap-8">
        <div class="top flex flex-col gap-4">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
            {{ $t("Sign_up_as_patient") }}
          </h1>
          <p class="text-gray-400 dark:text-gray-300 text-xl">
            {{ $t("Create_your_patient_account") }}
          </p>
        </div>
      </div>
    </div>

    <div class="bottom flex gap-10">
      <div class="right w-full">
        <form class="flex flex-col gap-6" @submit.prevent="registerPatient">
          <google-card />

          <!-- Feedback messages -->
          <div
            v-if="errorMsg"
            class="text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900 border border-red-100 dark:border-red-800 p-3 rounded"
          >
            {{ errorMsg }}
          </div>
          <div
            v-if="successMsg"
            class="text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900 border border-green-100 dark:border-green-800 p-3 rounded"
          >
            {{ successMsg }}
          </div>

          <fieldset :disabled="loading" class="flex flex-col gap-6 border-0 p-0">
            <div class="or flex gap-2 items-center justify-center">
              <div class="w-full h-0.5 bg-gray-100 dark:bg-gray-600"></div>
              <p class="text-gray-600 dark:text-gray-300">or</p>
              <div class="w-full h-0.5 bg-gray-100 dark:bg-gray-600"></div>
            </div>

            <div class="flex flex-col gap-8 items-end">
              <div class="inputs w-full flex flex-col gap-4">
                <!-- Name -->
                <div class="name flex flex-col gap-4 w-full">
                  <div class="fname w-full flex flex-col gap-2">
                    <label class="text-gray-900 dark:text-white">{{ $t("First_name") }}</label>
                    <input
                      v-model="firstName"
                      required
                      type="text"
                      :placeholder="$t('Enter_first_name')"
                      class="focus:outline-none w-full h-12 px-4 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div class="sname w-full flex flex-col gap-2">
                    <label class="text-gray-900 dark:text-white">{{ $t("Last_name") }}</label>
                    <input
                      v-model="lastName"
                      required
                      type="text"
                      :placeholder="$t('Enter_last_name')"
                      class="focus:outline-none w-full h-12 px-4 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <!-- Email & Phone -->
                <div class="flex flex-col gap-4 w-full">
                  <div class="email w-full flex flex-col gap-2">
                    <label class="text-gray-900 dark:text-white">{{ $t("Email") }}</label>
                    <input
                      v-model="email"
                      required
                      type="email"
                      :placeholder="$t('Enter_email')"
                      class="focus:outline-none w-full h-12 px-4 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div class="phone w-full flex flex-col gap-2">
                    <label class="text-gray-900 dark:text-white">{{ $t("Phone_number") }}</label>
                    <input
                      v-model="phoneNumber"
                      @input="validatePhoneOnInput"
                      required
                      type="text"
                      :placeholder="$t('Enter_phone_number')"
                      :class="[
                        'focus:outline-none w-full h-12 px-4 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
                        phoneNumberError
                          ? 'border-red-500 dark:border-red-400'
                          : 'border-gray-300 dark:border-gray-600',
                      ]"
                    />
                    <p v-if="phoneNumberError" class="text-red-500 dark:text-red-400 text-sm">
                      Please enter a valid phone number (e.g., 01123456789, +20123456789,
                      +20103456789 or 0103456789)
                    </p>
                  </div>
                </div>

                <!-- Gender & Birthdate -->
                <div class="flex flex-col gap-4 w-full">
                  <div class="gender w-full flex flex-col gap-2">
                    <label class="text-gray-900 dark:text-white">{{ $t("Gender") }}</label>
                    <select
                      v-model="selectedGender"
                      required
                      class="focus:outline-none w-full h-12 px-4 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    >
                      <option disabled value="">{{ $t("Select_gender") }}</option>
                      <option value="male">{{ $t("Male") }}</option>
                      <option value="female">{{ $t("Female") }}</option>
                    </select>
                  </div>
                  <div class="birthdate w-full flex flex-col gap-2">
                    <label class="text-gray-900 dark:text-white">{{ $t("Birthdate") }}</label>
                    <input
                      v-model="birthdate"
                      required
                      type="date"
                      class="focus:outline-none w-full h-12 px-4 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <!-- Password -->
                <div class="pass w-full flex flex-col gap-2">
                  <label class="text-gray-900 dark:text-white">{{ $t("Password") }}</label>
                  <div
                    class="flex gap-2 h-12 px-4 border rounded-lg items-center bg-white dark:bg-gray-700"
                    :class="
                      passwordError
                        ? 'border-red-500 dark:border-red-400'
                        : 'border-gray-200 dark:border-gray-600'
                    "
                  >
                    <input
                      v-model="password"
                      @input="validatePasswordOnInput"
                      required
                      :type="showPassword ? 'text' : 'password'"
                      :placeholder="$t('Enter_password')"
                      class="focus:outline-none w-full h-12 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                    <!-- Eye icon when password is hidden -->
                    <svg
                      v-if="!showPassword"
                      @click="togglePasswordVisibility"
                      class="w-6 h-6 fill-gray-400 cursor-pointer hover:fill-gray-600 dark:hover:fill-gray-300 transition-colors"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                    >
                      <path
                        d="M320 96C178.6 96 64 208 64 320s114.6 224 256 224 256-112 256-224S461.4 96 320 96zm0 384c-88.4 0-160-71.6-160-160s71.6-160 160-160 160 71.6 160 160-71.6 160-160 160zm0-256c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96z"
                      />
                    </svg>
                    <!-- Eye-slash icon when password is visible -->
                    <svg
                      v-else
                      @click="togglePasswordVisibility"
                      class="w-6 h-6 fill-gray-400 cursor-pointer hover:fill-gray-600 dark:hover:fill-gray-300 transition-colors"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                    >
                      <path
                        d="M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L504.5 470.8C507.2 468.4 509.9 466 512.5 463.6C559.3 420.1 590.6 368.2 605.5 332.5C608.8 324.6 608.8 315.8 605.5 307.9C590.6 272.2 559.3 220.2 512.5 176.8C465.4 133.1 400.7 96.2 319.9 96.2C263.1 96.2 214.3 114.4 173.9 140.4L73 39.1zM236.5 202.7C260 185.9 288.9 176 320 176C399.5 176 464 240.5 464 320C464 351.1 454.1 379.9 437.3 403.5L402.6 368.8C415.3 347.4 419.6 321.1 412.7 295.1C399 243.9 346.3 213.5 295.1 227.2C286.5 229.5 278.4 232.9 271.1 237.2L236.4 202.5zM357.3 459.1C345.4 462.3 332.9 464 320 464C240.5 464 176 399.5 176 320C176 307.1 177.7 294.6 180.9 282.7L101.4 203.2C68.8 240 46.4 279 34.5 307.7C31.2 315.6 31.2 324.4 34.5 332.3C49.4 368 80.7 420 127.5 463.4C174.6 507.1 239.3 544 320.1 544C357.4 544 391.3 536.1 421.6 523.4L357.4 459.2z"
                      />
                    </svg>
                  </div>
                  <p v-if="passwordError" class="text-red-500 dark:text-red-400 text-sm">
                    Password must be at least 6 characters long and include at least one uppercase
                    letter, one lowercase letter, one number, and one special character.
                  </p>
                </div>

                <!-- Submit Button -->
                <div class="w-full flex justify-end">
                  <button
                    type="button"
                    @click="handleCreateAccountClick"
                    :disabled="loading || !isFormValid"
                    class="px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 disabled:opacity-60"
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
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    <span>{{ loading ? $t("Creating_account") : $t("Create_account") }}</span>
                  </button>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>

    </div>
   
    <!-- Terms and Conditions Modal -->
    <Modal v-model="showTermsModal" title="Terms and conditions">
      <div class="flex flex-col gap-4 text-gray-700 dark:text-gray-300">
        <ul class="flex flex-col gap-3 list-disc list-inside">
          <li>{{ $t("terms_cancel_12h") }}</li>
          <li>{{ $t("terms_cancel_6h") }}</li>
          <li>{{ $t("terms_doctor_cancel") }}</li>
        </ul>
      </div>
      <template #footer>
        <button
          @click="showTermsModal = false"
          class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {{ $t("Decline") }}
        </button>
        <button
          @click="acceptTermsAndRegister"
          :disabled="loading"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors flex items-center gap-2"
        >
          <svg
            v-if="loading"
            class="animate-spin h-4 w-4 text-white"
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
          {{ $t("Accept") }}
        </button>
      </template>
    </Modal>
  </div>
</template>

<script>
import BackBtn from "../BackBtn.vue";
import GoogleCard from "../GoogleCard.vue";
import Modal from "../UI/Modal.vue";
import { sendOTP } from "../../services/emailVerification.js";
import { checkEmailExists, checkEmailInDB } from "../../authHandler.js";

export default {
  components: { GoogleCard, BackBtn, Modal },
  name: "PatientSignup",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordError: false,
      showPassword: false,
      phoneNumber: "",
      phoneNumberError: false,
      selectedGender: "",
      birthdate: "",
      loading: false,
      errorMsg: "",
      successMsg: "",
      showTermsModal: false,
    };
  },
  computed: {
    isFormValid() {
      return (
        this.firstName &&
        this.lastName &&
        this.email &&
        this.phoneNumber &&
        this.password &&
        this.selectedGender &&
        this.birthdate &&
        !this.phoneNumberError &&
        !this.passwordError
      );
    },
  },
  methods: {
    validatePhoneNumber(phone) {
      // Egyptian phone number patterns
      const egyptianRegex = /^(\+20|0)?1[0-2,5]\d{8}$/;
      // International format (10-15 digits with optional +)
      const internationalRegex = /^\+?\d{10,15}$/;
      return egyptianRegex.test(phone) || internationalRegex.test(phone);
    },
    validatePhoneOnInput() {
      if (this.phoneNumber && !this.validatePhoneNumber(this.phoneNumber)) {
        this.phoneNumberError = true;
      } else {
        this.phoneNumberError = false;
      }
    },
    validatePassword(password) {
      // At least 6 characters, one uppercase, one lowercase, one number, one special character
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      return passwordRegex.test(password);
    },
    validatePasswordOnInput() {
      if (this.password && !this.validatePassword(this.password)) {
        this.passwordError = true;
      } else {
        this.passwordError = false;
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async handleCreateAccountClick() {
      // Check if form is valid
      const form = this.$el.querySelector("form");
      if (form && form.checkValidity()) {
        // Validate phone number
        if (!this.validatePhoneNumber(this.phoneNumber)) {
          this.phoneNumberError = true;
          this.errorMsg = "Please enter a valid phone number (e.g., +20123456789 or 0123456789).";
          return;
        } else {
          this.phoneNumberError = false;
        }

        // Check if email already exists in Auth or DB
        this.loading = true;
        const authExists = await checkEmailExists(this.email);
        const dbExists = await checkEmailInDB(this.email);
        this.loading = false;

        if (authExists || dbExists) {
          this.errorMsg =
            "This email is already registered. Please use a different email or try logging in.";
          return;
        }

        this.showTermsModal = true;
      } else {
        // Trigger HTML5 validation
        form.reportValidity();
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
    async registerPatient() {
      try {
        this.loading = true;
        this.errorMsg = "";

        // Send OTP to email
        const name = `${this.firstName} ${this.lastName}`;
        const result = await sendOTP(this.email, name, "patient");

        if (!result.success) {
          this.errorMsg = result.error || "Failed to send verification code. Please try again.";
          this.loading = false;
          return;
        }

        // Store user data in sessionStorage
        sessionStorage.setItem(
          "verificationData",
          JSON.stringify({
            email: this.email,
            userData: {
              firstName: this.firstName,
              lastName: this.lastName,
              password: this.password,
              phoneNumber: this.phoneNumber,
              selectedGender: this.selectedGender,
              birthdate: this.birthdate,
            },
            userType: "patient",
          })
        );

        // Navigate to verification page
        this.$router.push("/verify-email");
      } catch (error) {
        console.error("Error during signup:", error);
        this.errorMsg = error?.message || "Something went wrong. Please try again.";
      } finally {
        this.loading = false;
      }
    },
    acceptTermsAndRegister() {
      this.showTermsModal = false;
      this.registerPatient();
    },
  },
};
</script>

<style scoped></style>
