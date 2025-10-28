<template>
  <div class="w-dwh ml-[302px]">
    <main-nav />
    <div class="pl-8 pr-20 mt-8 flex flex-col gap-6">
      <!--Page titles-->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold">Appintments</h1>
        <p class="text-gray-500">Manage your appointments and schedule</p>
      </div>

      <!--Page content-->

      <div v-if="loading" class="text-center">Loading appointments...</div>
      <div v-else-if="appointments.length === 0" class="text-center">No appointments found.</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="appointment in appointments"
          :key="appointment.id"
          class="appointment-card bg-white p-6 rounded-lg shadow-md border"
        >
          <div class="flex items-center mb-4">
            <div class="w-16 h-16 rounded-full bg-gray-300 mr-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold">{{ appointment.doctorName }}</h3>
              <p class="text-gray-600">{{ appointment.service }}</p>
            </div>
          </div>
          <p class="text-gray-500">Date: {{ appointment.date }}</p>
          <p class="text-gray-500">Time: {{ appointment.time }}</p>
          <p class="text-gray-700 mt-2">Status: {{ appointment.status }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from "@/Components/Layouts/MainNav.vue";
import { signOutUser, db, auth } from "/src/authHandler.js";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";

export default {
  name: "PatientAppointments",
  components: { MainNav },
  data() {
    return {
      appointments: [],
      loading: true,
    };
  },
  mounted() {
    this.fetchAppointments();
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
    async fetchAppointments() {
      try {
        const user = auth.currentUser;
        if (!user) {
          this.$router.push("/login");
          return;
        }

        const bookingsRef = collection(db, "bookings");
        const q = query(bookingsRef, where("patientId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const appointmentsData = await Promise.all(
          querySnapshot.docs.map(async (docSnap) => {
            const booking = { id: docSnap.id, ...docSnap.data() };
            // Fetch doctor name
            let doctorName = "Unknown Doctor";
            try {
              const doctorRef = doc(db, "doctors", booking.doctorId);
              const doctorSnap = await getDoc(doctorRef);
              if (doctorSnap.exists()) {
                const doctorData = doctorSnap.data();
                doctorName = `${doctorData.firstName} ${doctorData.lastName}`;
              }
            } catch (error) {
              console.error("Error fetching doctor name:", error);
            }

            return {
              id: booking.id,
              doctorName,
              service: booking.service,
              date: booking.date,
              time: booking.time,
              status: booking.status,
            };
          })
        );

        this.appointments = appointmentsData;
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.patient-appointments {
  min-height: 100vh;
}
</style>
