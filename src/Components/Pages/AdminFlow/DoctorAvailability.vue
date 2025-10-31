<template>
  <div class="w-dwh ml-[302px]">
    <main-nav />
    <div class="pl-8 pr-20 mt-8 flex flex-col gap-6">
      <!--Page titles-->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold dark:text-white">Doctors with Appointments</h1>
        <p class="text-gray-500">View doctors who have active appointments</p>
      </div>
      <div class="tableDoctors">
        <div class="bg-white rounded-lg shadow-md overflow-hidden animate-fade-in">
          <table class="min-w-full">
            <thead class="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <tr>
                <th class="py-4 px-6 text-left font-semibold">Doctor Name</th>
                <th class="py-4 px-6 text-left font-semibold">Email</th>
                <th class="py-4 px-6 text-left font-semibold">Speciality</th>
                <th class="py-4 px-6 text-left font-semibold">Phone</th>
                <th class="py-4 px-6 text-left font-semibold">Appointments</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="(doctor, index) in doctorsWithAppointments" :key="doctor.id" class="hover:bg-blue-50 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-sm" :style="{ animationDelay: `${index * 0.1}s` }">
                <td class="py-4 px-6 text-gray-900 font-medium animate-slide-in-left">{{ doctor.firstName }} {{ doctor.lastName }}</td>
                <td class="py-4 px-6 text-gray-700 animate-slide-in-left" :style="{ animationDelay: `${index * 0.1 + 0.1}s` }">{{ doctor.email }}</td>
                <td class="py-4 px-6 animate-slide-in-left" :style="{ animationDelay: `${index * 0.1 + 0.2}s` }">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 transition-all duration-300 hover:bg-green-200 hover:scale-105">
                    {{ doctor.speciality }}
                  </span>
                </td>
                <td class="py-4 px-6 text-gray-700 animate-slide-in-left" :style="{ animationDelay: `${index * 0.1 + 0.3}s` }">{{ doctor.phone }}</td>
                <td class="py-4 px-3 animate-slide-in-left text-center mx-auto" :style="{ animationDelay: `${index * 0.1 + 0.4}s` }">
                  <span class="inline-flex items-center px-3  py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 transition-all duration-300 hover:bg-purple-200 hover:scale-105">
                    {{ doctor.appointmentsCount }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="doctorsWithAppointments.length === 0" class="text-center py-12 animate-fade-in">
            <div class="text-gray-500 text-lg">No doctors with appointments found</div>
            <div class="text-gray-400 text-sm mt-2">Doctors will appear here once they have active appointments</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from "@/Components/Layouts/MainNav.vue";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase';

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
        // First, get all bookings to find doctors with appointments
        const bookingsCollection = collection(db, "bookings");
        const bookingsSnapshot = await getDocs(bookingsCollection);

        // Get unique doctor IDs from bookings
        const doctorIds = [...new Set(bookingsSnapshot.docs.map(doc => doc.data().doctorId))];

        if (doctorIds.length === 0) {
          this.doctorsWithAppointments = [];
          return;
        }

        // Fetch doctor details for these IDs
        const doctorsCollection = collection(db, "doctors");
        const doctorsPromises = doctorIds.map(doctorId =>
          getDocs(query(doctorsCollection, where("__name__", "==", doctorId)))
        );

        const doctorsSnapshots = await Promise.all(doctorsPromises);

        // Process doctors data and count appointments
        const doctorsData = [];
        for (let i = 0; i < doctorsSnapshots.length; i++) {
          const snapshot = doctorsSnapshots[i];
          if (!snapshot.empty) {
            const doctorDoc = snapshot.docs[0];
            const doctorData = { id: doctorDoc.id, ...doctorDoc.data() };

            // Count appointments for this doctor
            const appointmentsCount = bookingsSnapshot.docs.filter(
              doc => doc.data().doctorId === doctorData.id
            ).length;

            doctorsData.push({
              ...doctorData,
              appointmentsCount,
            });
          }
        }

        this.doctorsWithAppointments = doctorsData;
      } catch (error) {
        console.error('Error fetching doctors with appointments:', error);
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