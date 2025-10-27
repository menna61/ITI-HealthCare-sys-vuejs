<template>
  <div class="w-dwh ml-[302px]">
    <main-nav />
    <div class="pl-8 pr-20 mt-8 flex flex-col gap-6">
      <!--Page titles-->

      <!--Page content-->
      <div v-if="currentPatient" class="welcome-message bg-blue-100 p-6 rounded-lg mb-6">
        <h2 class="text-2xl font-semibold text-blue-800">
          Welcome, {{ currentPatient.firstName }} {{ currentPatient.lastName }}!
        </h2>
        <p class="text-blue-600 mt-2">
          We're glad to have you back. Here's an overview of your health dashboard.
        </p>
      </div>
      <p v-else>
        Welcome to your patient dashboard. This is a placeholder for patient-specific content.
      </p>

      <!-- Payments and Appointments Sections -->
      <div class="flex gap-6 mt-6">
        <div class="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Payments</h3>
          <p class="text-gray-600">Manage your payment history and outstanding balances.</p>
          <!-- Add payment-related content here -->
        </div>
        <div class="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Appointments</h3>
          <p class="text-gray-600">View and schedule your upcoming appointments.</p>
          <!-- Add appointment-related content here -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from "@/Components/Layouts/MainNav.vue";
import { signOutUser, db, auth } from "/src/authHandler.js";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export default {
  name: "PatientHome",
  components: { MainNav },
  data() {
    return {
      doctors: [],
      loading: true,
      currentPatient: null,
    };
  },
  async mounted() {
    await this.getCurrentPatient();
    this.fetchDoctors();
  },
  methods: {
    async logout() {
      try {
        await signOutUser();
        this.$router.push("/login");
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
    async getCurrentPatient() {
      try {
        const user = auth.currentUser;
        if (user) {
          const patientDoc = await getDoc(doc(db, "patients", user.uid));
          if (patientDoc.exists()) {
            this.currentPatient = { id: user.uid, ...patientDoc.data() };
          }
        }
      } catch (error) {
        console.error("Error getting current patient:", error);
      }
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
  },
};
</script>

<style lang="scss" scoped></style>
