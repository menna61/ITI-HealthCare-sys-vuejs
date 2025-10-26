<template>
    <div class="w-dwh ml-[302px]">
    <main-nav />
    <div class="pl-8 pr-20 mt-8 flex flex-col gap-6">
      <!--Page titles-->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold">Dashboard</h1>
        <p class="text-gray-500">Manage your appointments and schedule</p>
      </div>

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
      </div>
      </div>
</template>

<script>
import MainNav from "@/Components/Layouts/MainNav.vue";
import { signOutUser, db, auth } from "/src/authHandler.js";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export default {
  name: "PatientHome",
  components:{MainNav},
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

<style lang="scss" scoped>

</style>