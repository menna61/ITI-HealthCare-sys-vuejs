<template>
  <div class="w-full dark:bg-gray-900 min-h-screen transition-all duration-300">
    <main-nav />
    <div class="pl-4 md:pl-8 pr-4 md:pr-8 lg:pr-20 mt-8 flex flex-col gap-6 overflow-hidden">
      <!-- Page titles -->
      <div class="title flex flex-col gap-4 px-4">
        <h1 class="text-xl sm:text-2xl font-bold dark:text-white">{{ $t("allAppointments") }}</h1>
        <p class="text-gray-500 text-sm sm:text-base dark:text-gray-400">
          {{ $t("viewAllAppointments") }}
        </p>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="text-center animate-fade-in dark:text-white px-4">
        {{ $t("loadingAppointments") }}
      </div>

      <!-- Empty state -->
      <div
        v-else-if="appointments.length === 0"
        class="text-center animate-fade-in dark:text-white px-4"
      >
        {{ $t("noAppointments") }}
      </div>

      <!-- Appointments table -->
      <div v-else class="tableAppointments px-4">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gradient-to-r from-blue-500 to-purple-600">
              <tr>
                <th
                  class="py-4 px-6 text-left font-semibold text-white uppercase tracking-wider whitespace-nowrap"
                >
                  {{ $t("doctorName") }}
                </th>
                <th
                  class="py-4 px-6 text-left font-semibold text-white uppercase tracking-wider whitespace-nowrap"
                >
                  {{ $t("elpatient") }}
                </th>
                <th
                  class="py-4 px-6 text-left font-semibold text-white uppercase tracking-wider whitespace-nowrap"
                >
                  {{ $t("speciality") }}
                </th>
                <th
                  class="py-4 px-6 text-left font-semibold text-white uppercase tracking-wider whitespace-nowrap"
                >
                  {{ $t("service") }}
                </th>
                <th
                  class="py-4 px-6 text-left font-semibold text-white uppercase tracking-wider whitespace-nowrap"
                >
                  {{ $t("date") }}
                </th>
                <th
                  class="py-4 px-6 text-left font-semibold text-white uppercase tracking-wider whitespace-nowrap"
                >
                  {{ $t("time") }}
                </th>
                <th
                  class="py-4 px-6 text-left font-semibold text-white uppercase tracking-wider whitespace-nowrap"
                >
                  {{ $t("status") }}
                </th>
                <th
                  class="py-4 px-6 text-left font-semibold text-white uppercase tracking-wider whitespace-nowrap"
                >
                  {{ $t("actions") }}
                </th>
              </tr>
            </thead>
            <tbody
              class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 text-left"
            >
              <tr
                v-for="(appointment, index) in paginatedAppointments"
                :key="appointment.id"
                class="hover:from-blue-50 hover:to-indigo-50 dark:hover:from-gray-700 dark:hover:to-gray-600 cursor-pointer transition-all duration-500 animate-fadeInUp hover:scale-[1.02] hover:shadow-lg"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                >
                  {{ appointment.doctorName }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {{ appointment.patientName }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {{ appointment.speciality }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {{ appointment.service }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {{ appointment.date }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {{ appointment.time }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <span
                    v-if="appointment.status === 'confirmed'"
                    class="status-badge status-confirmed"
                  >
                    {{ $t("confirmed") }}
                  </span>
                  <span
                    v-else-if="appointment.status === 'pending'"
                    class="status-badge status-pending"
                  >
                    {{ $t("pending") }}
                  </span>
                  <span
                    v-else-if="appointment.status === 'cancelled'"
                    class="status-badge status-cancelled"
                  >
                    {{ $t("canceled") }}
                  </span>
                  <span
                    v-else-if="appointment.status === 'completed'"
                    class="status-badge status-completed"
                  >
                    {{ $t("completed") }}
                  </span>
                  <span v-else class="status-badge status-default">
                    {{ appointment.status }}
                  </span>
                </td>
                <td
                  class="px-1 py-4 whitespace-nowrap text-sm font-medium flex justify-center gap-2"
                >
                  <button
                    @click.stop="removeFromView(appointment.id)"
                    class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900"
                    :title="$t('delete')"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="!loading && appointments.length > 0" class="flex justify-center mt-6 px-4">
        <div
          class="flex items-center flex-wrap gap-2"
          :class="$i18n.locale === 'ar' ? 'flex-row-reverse' : 'flex-row'"
        >
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors text-sm sm:text-base"
          >
            {{ $t("previous") }}
          </button>
          <span
            class="px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg text-sm sm:text-base"
          >
            {{ $t("pageOf", { current: currentPage, total: totalPages }) }}
          </span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors text-sm sm:text-base"
          >
            {{ $t("next") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from "@/Components/Layouts/MainNav.vue";
import { db } from "@/firebase";
import { collection, doc, getDoc, onSnapshot, deleteDoc } from "firebase/firestore";

export default {
  name: "TotalAppointments",
  components: { MainNav },
  data() {
    return {
      appointments: [],
      loading: true,
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    paginatedAppointments() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.appointments.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.appointments.length / this.itemsPerPage);
    },
  },
  mounted() {
    this.listenToAllAppointments();
  },
  methods: {
    // Listen to all appointments with real-time updates
    listenToAllAppointments() {
      try {
        const bookingsRef = collection(db, "bookings");

        // Use onSnapshot for real-time updates
        this.unsubscribe = onSnapshot(bookingsRef, async (querySnapshot) => {
          const appointmentsData = await Promise.all(
            querySnapshot.docs.map(async (docSnap) => {
              const booking = { id: docSnap.id, ...docSnap.data() };

              // Get doctor details
              let doctorName = booking.doctorName || "Unknown Doctor";
              try {
                if (booking.doctorId) {
                  const doctorRef = doc(db, "doctors", booking.doctorId);
                  const doctorSnap = await getDoc(doctorRef);
                  if (doctorSnap.exists()) {
                    const d = doctorSnap.data();
                    doctorName = `${d.firstName || ""} ${d.lastName || ""}`.trim() || doctorName;
                  }
                }
              } catch (err) {
                console.error("Error fetching doctor name:", err);
              }

              // Get patient details
              let patientName = booking.patientName || "Unknown Patient";
              try {
                if (booking.patientId) {
                  const patientRef = doc(db, "patients", booking.patientId);
                  const patientSnap = await getDoc(patientRef);
                  if (patientSnap.exists()) {
                    const p = patientSnap.data();
                    patientName = `${p.firstName || ""} ${p.lastName || ""}`.trim() || patientName;
                  }
                }
              } catch (err) {
                console.error("Error fetching patient name:", err);
              }

              return {
                id: booking.id,
                doctorName,
                service: booking.service,
                speciality: booking.speciality || "Unknown Speciality",
                date: booking.date,
                time: booking.time,
                status: booking.status,
                patientId: booking.patientId,
                patientName,
              };
            })
          );
          appointmentsData.sort((a, b) => new Date(b.date) - new Date(a.date));
          this.appointments = appointmentsData;
          this.loading = false;
        });
      } catch (error) {
        console.error("Error listening to appointments:", error);
        this.loading = false;
      }
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    async removeFromView(appointmentId) {
      try {
        // Delete appointment from database
        await deleteDoc(doc(db, "bookings", appointmentId));

        console.log("✅ Appointment deleted successfully from database");

        // The onSnapshot listener will automatically update the UI
        // But we can also manually remove it for immediate feedback
        this.appointments = this.appointments.filter((app) => app.id !== appointmentId);

        // Adjust current page if needed
        if (this.paginatedAppointments.length === 0 && this.currentPage > 1) {
          this.currentPage--;
        }
      } catch (error) {
        console.error("❌ Error deleting appointment:", error);
        alert("Failed to delete appointment. Please try again.");
      }
    },
  },
  beforeUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },
};
</script>

<style scoped>
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

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Status badges */
.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
  transition: all 0.3s ease;
}

.status-confirmed {
  color: #667085;
  background: linear-gradient(135deg, #f0f1f3 0%, #e5e7eb 100%);
  border: 2px solid #d1d5db;
}

.status-pending {
  color: #0cb8b6;
  background: linear-gradient(135deg, #e7f8f8 0%, #ccf3f2 100%);
  border: 2px solid #0cb8b6;
}

.status-cancelled {
  color: #f01818;
  background: linear-gradient(135deg, #ffefef 0%, #fecaca 100%);
  border: 2px solid #f87171;
}

.status-completed {
  color: #05603a;
  background: linear-gradient(135deg, #d1fadf 0%, #a7f3d0 100%);
  border: 2px solid #34d399;
}

.status-default {
  color: #6b7280;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  border: 2px solid #d1d5db;
}

/* Responsive */
@media (max-width: 768px) {
  .status-badge {
    font-size: 10px;
    padding: 4px 8px;
  }
}
</style>
