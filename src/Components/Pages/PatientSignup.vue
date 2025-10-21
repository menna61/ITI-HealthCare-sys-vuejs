<template>
  <div class="cont h-full p-8 bg-white rounded-2xl flex flex-col gap-10">
    <div class="top flex flex-col gap-10">
      <back-btn />
      <div class="stepper flex flex-col gap-8">
        <div class="top flex flex-col gap-4">
          <h1 class="text-4xl font-bold">Sign up as a user</h1>
          <p class="text-gray-600 text-xl">Create your user account</p>
        </div>
      </div>
    </div>

    <div class="bottom flex gap-10">
      <div class="right w-full">
        <form class="flex flex-col gap-6" @submit.prevent="registerDoctor">
          <google-card />

          <!-- Feedback messages -->
          <div v-if="errorMsg" class="text-red-700 bg-red-50 border border-red-100 p-3 rounded">
            {{ errorMsg }}
          </div>
          <div
            v-if="successMsg"
            class="text-green-700 bg-green-50 border border-green-100 p-3 rounded"
          >
            {{ successMsg }}
          </div>

          <fieldset :disabled="loading" class="flex flex-col gap-6 border-0 p-0">
            <div class="or flex gap-2 items-center justify-center">
              <div class="w-full h-0.5 bg-gray-100"></div>
              <p>or</p>
              <div class="w-full h-0.5 bg-gray-100"></div>
            </div>

            <div class="flex flex-col gap-8 items-end">
              <div class="inputs w-full flex flex-col gap-4">
                <!-- Name -->
                <div class="name flex gap-4 w-full">
                  <div class="fname w-full">
                    <label>First name</label>
                    <input
                      v-model="firstName"
                      required
                      type="text"
                      placeholder="Enter first name"
                      class="w-full h-12 px-4 border rounded-lg"
                    />
                  </div>
                  <div class="sname w-full">
                    <label>Last name</label>
                    <input
                      v-model="lastName"
                      required
                      type="text"
                      placeholder="Enter last name"
                      class="w-full h-12 px-4 border rounded-lg"
                    />
                  </div>
                </div>

                <!-- Email & Phone -->
                <div class="flex gap-4 w-full">
                  <div class="email w-full">
                    <label>Email</label>
                    <input
                      v-model="email"
                      required
                      type="email"
                      placeholder="Enter email"
                      class="w-full h-12 px-4 border rounded-lg"
                    />
                  </div>
                  <div class="phone w-full">
                    <label>Phone number</label>
                    <input
                      v-model="phoneNumber"
                      required
                      type="text"
                      placeholder="+20 1234 223 43"
                      class="w-full h-12 px-4 border rounded-lg"
                    />
                  </div>
                </div>

                <!-- Gender & Birthdate -->
                <div class="flex gap-4 w-full">
                  <div class="gender w-full">
                    <label>Gender</label>
                    <select
                      v-model="selectedGender"
                      required
                      class="w-full h-12 px-4 border rounded-lg bg-white"
                    >
                      <option disabled value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div class="birthdate w-full">
                    <label>Birthdate</label>
                    <input
                      v-model="birthdate"
                      required
                      type="date"
                      class="w-full h-12 px-4 border rounded-lg"
                    />
                  </div>
                </div>

                <!-- Password -->
                <div class="pass w-full">
                  <label>Password</label>
                  <input
                    v-model="password"
                    required
                    type="password"
                    placeholder="Enter your password"
                    class="w-full h-12 px-4 border rounded-lg"
                  />
                </div>
              </div>

              <!-- Submit Button -->
              <div class="w-full flex justify-end">
                <button
                  type="submit"
                  :disabled="loading"
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
                  <span>{{ loading ? "Creating account..." : "Create account" }}</span>
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import BackBtn from "../BackBtn.vue";
import GoogleCard from "../GoogleCard.vue";
import { registerWithEmail, db } from "../../authHandler.js";
import { doc, setDoc } from "firebase/firestore";

export default {
  components: { GoogleCard, BackBtn },
  name: "DoctorSignup",
  data() {
    return {
      currentStep: 1,
      loading: false,
      errorMsg: "",
      successMsg: "",
      // Step 1
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      selectedGender: "",
      birthdate: "",
      // Step 2
      experienceYears: "",
      licenseNumber: "",
      clinicName: "",
      clinicAddress: "",
      selectedDegree: "",
      selectedSpeciality: "",
      degrees: ["PhD", "Bachelor's", "Master's", "Diploma"],
      specialities: [
        "Cardiology",
        "Dermatology",
        "Neurology",
        "Pediatrics",
        "Orthopedics",
        "Dentistry",
        "Psychiatry",
        "Ophthalmology",
        "General Surgery",
      ],
      // Step 3
      bio: "",
    };
  },
  methods: {
    nextStep() {
      if (this.currentStep < 3) this.currentStep++;
      else this.registerDoctor();
    },
    prevStep() {
      if (this.currentStep > 1) this.currentStep--;
    },
    async registerDoctor() {
      if (this.loading) return;
      this.errorMsg = "";
      this.successMsg = "";
      this.loading = true;

      try {
        const cred = await registerWithEmail(this.email, this.password);
        const uid = cred.user.uid;

        await setDoc(doc(db, "doctors", uid), {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phone: this.phoneNumber,
          gender: this.selectedGender,
          birthdate: this.birthdate,
          experienceYears: this.experienceYears,
          licenseNumber: this.licenseNumber,
          clinicName: this.clinicName,
          clinicAddress: this.clinicAddress,
          degree: this.selectedDegree,
          speciality: this.selectedSpeciality,
          bio: this.bio,
          role: "doctor",
        });

        this.successMsg = "Account created. Redirecting to dashboard...";
        setTimeout(() => {
          this.$router.push("/doctorDashboard");
        }, 1000);
      } catch (error) {
        console.error("Error signing up:", error);
        this.errorMsg = error?.message || String(error);
      } finally {
        this.loading = false;
      }
    },
    selectDegree(degree) {
      this.selectedDegree = degree;
    },
    selectSpec(speciality) {
      this.selectedSpeciality = speciality;
    },
  },
};
</script>

<style scoped></style>
