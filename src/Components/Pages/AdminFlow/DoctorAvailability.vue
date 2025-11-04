<template>
  <div class="w-full dark:bg-gray-900 min-h-screen transition-all duration-300">
    <main-nav />
    <div class="pl-4 md:pl-8 pr-4 md:pr-20 mt-8 flex flex-col gap-6">
      <!-- Page titles -->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold dark:text-white">{{ $t('doctorsWithAppointments') }}</h1>
        <p class="text-gray-500 dark:text-gray-400">{{ $t('viewDoctorsWithActiveAppointments') }}</p>
      </div>

      <div class="tableDoctors px-4">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gradient-to-r from-blue-500 to-purple-600">
              <tr>
                <th class="py-4 px-6 text-left font-semibold text-white uppercase tracking-wider whitespace-nowrap">
                  {{ $t('doctorName') }}
                </th>
                <th class="py-4 px-6 text-left font-semibold text-white uppercase tracking-wider whitespace-nowrap">
                  {{ $t('email') }}
                </th>
                <th class="py-4 px-6 text-left font-semibold text-white uppercase tracking-wider whitespace-nowrap">
                  {{ $t('speciality') }}
                </th>
                <th class="py-4 px-6 text-left font-semibold text-white uppercase tracking-wider whitespace-nowrap">
                  {{ $t('phone') }}
                </th>
                <th class="py-4 px-6 text-left font-semibold text-white uppercase tracking-wider whitespace-nowrap">
                  {{ $t('appointments') }}
                </th>
              </tr>
            </thead>

            <tbody
              class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 text-left"
            >
              <tr
                v-for="(doctor, index) in doctorsWithAppointments"
                :key="doctor.id"
                class="hover:from-blue-50 hover:to-indigo-50 dark:hover:from-gray-700 dark:hover:to-gray-600 cursor-pointer transition-all duration-500 animate-fadeInUp hover:scale-[1.02] hover:shadow-lg"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {{ doctor.firstName }} {{ doctor.lastName }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {{ doctor.email }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 transition-all duration-300 hover:bg-green-200 dark:hover:bg-green-700 hover:scale-105"
                  >
                    {{ doctor.speciality }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {{ doctor.phone }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-300 transition-all duration-300 hover:bg-purple-200 dark:hover:bg-purple-700 hover:scale-105"
                  >
                    {{ doctor.appointmentsCount }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Empty state -->
          <div v-if="doctorsWithAppointments.length === 0" class="text-center py-12 animate-fade-in">
            <div class="text-gray-500 dark:text-gray-400 text-lg">{{ $t('noDoctorsFound') }}</div>
            <div class="text-gray-400 dark:text-gray-500 text-sm mt-2">{{ $t('doctorsWillAppear') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from "@/Components/Layouts/MainNav.vue";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  name: "DoctorAvailability",
  components: {
    MainNav,
  },
  data() {
    return {
      doctorsWithAppointments: [],
    };
  },
  async mounted() {
    await this.fetchDoctorsWithAppointments();
  },
  methods: {
    async fetchDoctorsWithAppointments() {
      try {
        const bookingsCollection = collection(db, "bookings");
        const bookingsSnapshot = await getDocs(bookingsCollection);

        const doctorIds = [...new Set(bookingsSnapshot.docs.map((doc) => doc.data().doctorId))];

        if (doctorIds.length === 0) {
          this.doctorsWithAppointments = [];
          return;
        }

        const doctorsCollection = collection(db, "doctors");
        const doctorsPromises = doctorIds.map((doctorId) =>
          getDocs(query(doctorsCollection, where("__name__", "==", doctorId)))
        );

        const doctorsSnapshots = await Promise.all(doctorsPromises);

        const doctorsData = [];
        for (let i = 0; i < doctorsSnapshots.length; i++) {
          const snapshot = doctorsSnapshots[i];
          if (!snapshot.empty) {
            const doctorDoc = snapshot.docs[0];
            const doctorData = { id: doctorDoc.id, ...doctorDoc.data() };

            const appointmentsCount = bookingsSnapshot.docs.filter(
              (doc) => doc.data().doctorId === doctorData.id
            ).length;

            doctorsData.push({
              ...doctorData,
              appointmentsCount,
            });
          }
        }

        this.doctorsWithAppointments = doctorsData;
      } catch (error) {
        console.error("Error fetching doctors with appointments:", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
}

.animate-fade-in {
  animation: fadeInUp 0.6s ease-out forwards;
}

@media (max-width: 768px) {
  .tableDoctors {
    overflow-x: auto;
  }
  table {
    min-width: 600px;
  }
  th,
  td {
    padding: 8px 12px;
    font-size: 14px;
  }
  th {
    font-size: 12px;
  }
  .title h1 {
    font-size: 20px;
  }
}
</style>