<template>
  <div class="w-dwh lg:ml-[302px] ml-0">
    <main-nav />
    <div class="px-4 lg:pl-8 lg:pr-20 mt-8 flex flex-col gap-6">
      <!--Page titles-->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold dark:text-white">My Appointments</h1>
        <p class="text-gray-500">Manage your scheduled appointments</p>
      </div>

      <div class="appointments">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-fade-in">
          <div class="relative overflow-x-auto">
            <table class="min-w-full">
              <thead class="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <tr>
                  <th class="py-4 px-6 text-left font-semibold">Patient Name</th>
                  <th class="py-4 px-6 text-left font-semibold">Patient Email</th>
                  <th class="py-4 px-6 text-left font-semibold">Patient Phone</th>
                  <th class="py-4 px-6 text-left font-semibold">Service</th>
                  <th class="py-4 px-6 text-left font-semibold">Date</th>
                  <th class="py-4 px-6 text-left font-semibold">Time</th>
                  <th class="py-4 px-6 text-left font-semibold">Status</th>
                  <th class="py-4 px-6 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr
                  v-for="(appointment, index) in appointments"
                  :key="appointment.id"
                  class="hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-sm"
                  :style="{ animationDelay: `${index * 0.1}s` }"
                >
                  <td
                    class="py-4 px-6 text-gray-900 dark:text-white font-medium animate-slide-in-left"
                  >
                    {{ appointment.patientName }}
                  </td>
                  <td
                    class="py-4 px-6 text-gray-700 dark:text-gray-300 animate-slide-in-left"
                    :style="{ animationDelay: `${index * 0.1 + 0.1}s` }"
                  >
                    {{ appointment.patientEmail }}
                  </td>
                  <td
                    class="py-4 px-6 text-gray-700 dark:text-gray-300 animate-slide-in-left"
                    :style="{ animationDelay: `${index * 0.1 + 0.2}s` }"
                  >
                    {{ appointment.patientPhone }}
                  </td>
                  <td
                    class="py-4 px-6 text-gray-700 dark:text-gray-300 animate-slide-in-left"
                    :style="{ animationDelay: `${index * 0.1 + 0.3}s` }"
                  >
                    {{ appointment.service }}
                  </td>
                  <td
                    class="py-4 px-6 text-gray-900 dark:text-white animate-slide-in-left"
                    :style="{ animationDelay: `${index * 0.1 + 0.4}s` }"
                  >
                    {{ appointment.date }}
                  </td>
                  <td
                    class="py-4 px-6 text-gray-900 dark:text-white animate-slide-in-left"
                    :style="{ animationDelay: `${index * 0.1 + 0.5}s` }"
                  >
                    {{ appointment.time }}
                  </td>
                  <td
                    class="py-4 px-6 animate-slide-in-left"
                    :style="{ animationDelay: `${index * 0.1 + 0.6}s` }"
                  >
                    <span
                      class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 transition-all duration-300 hover:bg-green-200 dark:hover:bg-green-800 hover:scale-105"
                    >
                      {{ appointment.status }}
                    </span>
                  </td>
                  <td
                    class="py-4 px-6 animate-slide-in-left"
                    :style="{ animationDelay: `${index * 0.1 + 0.7}s` }"
                  >
                    <div class="flex gap-2">
                      <button
                        v-if="appointment.status === 'pending'"
                        @click="acceptAppointment(appointment.id)"
                        class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
                      >
                        Accept
                      </button>
                      <button
                        v-if="
                          appointment.status === 'confirmed' &&
                          appointment.date > new Date().toISOString().split('T')[0]
                        "
                        @click="cancelAppointment(appointment.id)"
                        class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        v-if="appointment.status === 'confirmed'"
                        @click="markCompleted(appointment.id)"
                        class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                      >
                        Mark Completed
                      </button>
                      <button
                        @click="deleteAppointment(appointment.id)"
                        class="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="appointments.length === 0" class="text-center py-12 animate-fade-in">
            <div class="text-gray-500 dark:text-gray-400 text-lg">No appointments found</div>
            <div class="text-gray-400 dark:text-gray-500 text-sm mt-2">
              Your scheduled appointments will appear here
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from "@/Components/Layouts/MainNav.vue";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "@/firebase";

export default {
  name: "DoctorAppointments",
  components: {
    MainNav,
  },
  data() {
    return {
      appointments: [],
    };
  },
  async mounted() {
    await this.fetchAppointments();
  },
  methods: {
    async fetchAppointments() {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const bookingsCollection = collection(db, "bookings");
        const q = query(bookingsCollection, where("doctorId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const appointments = [];
        for (const docSnap of querySnapshot.docs) {
          const appointment = { id: docSnap.id, ...docSnap.data() };
          if ((appointment.status || "").toLowerCase() === "cancelled") continue;

          // Check if past and pending, set to late
          const today = new Date().toISOString().split("T")[0];
          if (appointment.date < today && appointment.status === "pending") {
            appointment.status = "late";
          }

          // Fetch patient details
          if (appointment.patientId) {
            const patientRef = doc(db, "patients", appointment.patientId);
            const patientSnap = await getDoc(patientRef);
            if (patientSnap.exists()) {
              const patientData = patientSnap.data();
              appointment.patientEmail = patientData.email || "";
              appointment.patientPhone = patientData.phone || "";
            }
          }

          appointments.push(appointment);
        }

        this.appointments = appointments;
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    },
    async cancelAppointment(appointmentId) {
      try {
        // Get appointment details
        const appointmentRef = doc(db, "bookings", appointmentId);
        const appointmentSnap = await getDoc(appointmentRef);
        if (!appointmentSnap.exists()) {
          return;
        }
        const appointment = appointmentSnap.data();

        // Update the status to 'cancelled' in Firebase
        await updateDoc(appointmentRef, { status: "cancelled" });

        // Refund money to patient wallet
        const patientRef = doc(db, "patients", appointment.patientId);
        const patientSnap = await getDoc(patientRef);
        const refundAmount = parseFloat(appointment.price) || 0;
        if (patientSnap.exists()) {
          const patientData = patientSnap.data();
          const currentWallet = parseFloat(patientData.wallet) || 0;
          await updateDoc(patientRef, {
            wallet: currentWallet + refundAmount,
          });
        } else {
          await setDoc(patientRef, { wallet: refundAmount }, { merge: true });
        }

        // Add transaction record
        const transactionRef = collection(db, "patients", appointment.patientId, "transactions");
        await addDoc(transactionRef, {
          description: `Refund for cancelled appointment with ${appointment.doctorName}`,
          amount: refundAmount,
          date: new Date(),
          type: "refund",
        });

        // Update local state
        this.appointments = this.appointments.filter((app) => app.id !== appointmentId);
      } catch (error) {
        console.error("Error cancelling appointment:", error);
      }
    },
    async acceptAppointment(appointmentId) {
      try {
        await updateDoc(doc(db, "bookings", appointmentId), { status: "confirmed" });
        await this.fetchAppointments();
      } catch (error) {
        console.error("Error accepting appointment:", error);
      }
    },
    async markCompleted(appointmentId) {
      try {
        await updateDoc(doc(db, "bookings", appointmentId), { status: "completed" });
        await this.fetchAppointments();
      } catch (error) {
        console.error("Error marking completed:", error);
      }
    },

    async deleteAppointment(appointmentId) {
      try {
        await deleteDoc(doc(db, "bookings", appointmentId));
        this.appointments = this.appointments.filter((app) => app.id !== appointmentId);
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.animate-slide-in-left {
  animation: slideInLeft 0.5s ease-out forwards;
  opacity: 0;
}
</style>
