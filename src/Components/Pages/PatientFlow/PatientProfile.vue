<template>
  <div class="w-dwh lg:ml-[302px] ml-0">
    <main-nav />
    <div class="pl-8 pr-20 mt-8 flex flex-col gap-6">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Patient Profile</h1>

      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>

      <div v-else-if="patient" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div class="flex items-center gap-6 mb-6">
          <div class="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
            <svg
              v-if="!patient.profileImageUrl"
              class="w-12 h-12 text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <img
              v-else
              :src="patient.profileImageUrl"
              alt="Profile"
              class="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">
              {{ patient.firstName }} {{ patient.lastName }}
            </h2>
            <p class="text-gray-600 dark:text-gray-400">{{ patient.email }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >First Name</label
              >
              <p class="mt-1 text-gray-900 dark:text-white">{{ patient.firstName }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Last Name</label
              >
              <p class="mt-1 text-gray-900 dark:text-white">{{ patient.lastName }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Email</label
              >
              <p class="mt-1 text-gray-900 dark:text-white">{{ patient.email }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Phone</label
              >
              <p class="mt-1 text-gray-900 dark:text-white">
                {{ patient.phone || "Not provided" }}
              </p>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Date of Birth</label
              >
              <p class="mt-1 text-gray-900 dark:text-white">
                {{ patient.dateOfBirth || "Not provided" }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Gender</label
              >
              <p class="mt-1 text-gray-900 dark:text-white">
                {{ patient.gender || "Not provided" }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Address</label
              >
              <p class="mt-1 text-gray-900 dark:text-white">
                {{ patient.address || "Not provided" }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Medical History</label
              >
              <p class="mt-1 text-gray-900 dark:text-white">
                {{ patient.medicalHistory || "Not provided" }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <p class="text-center text-gray-600 dark:text-gray-400">Patient data not found.</p>
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from "@/Components/Layouts/MainNav.vue";
import { db, auth } from "/src/authHandler.js";
import { doc, getDoc } from "firebase/firestore";

export default {
  name: "PatientProfile",
  components: { MainNav },
  data() {
    return {
      patient: null,
      loading: true,
    };
  },
  async mounted() {
    await this.fetchPatientData();
  },
  methods: {
    async fetchPatientData() {
      try {
        const user = auth.currentUser;
        if (user) {
          const patientDoc = await getDoc(doc(db, "patients", user.uid));
          if (patientDoc.exists()) {
            this.patient = { id: user.uid, ...patientDoc.data() };
          }
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
