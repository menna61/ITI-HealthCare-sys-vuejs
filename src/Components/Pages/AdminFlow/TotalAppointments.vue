<template>
  <div class="w-full dark:bg-gray-900 min-h-screen transition-all duration-300">
    <main-nav />
    <div class="pl-4 md:pl-8 pr-4 md:pr-20 mt-8 flex flex-col gap-6">
      <!--Page titles-->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold dark:text-white">{{ $t("allAppointments") }}</h1>
        <p class="text-gray-500 dark:text-gray-400">{{ $t("viewAllAppointments") }}</p>
      </div>

      <!--Page content-->
      <div v-if="loading" class="text-center animate-fade-in">{{ $t("loadingAppointments") }}</div>
      <div v-else-if="appointments.length === 0" class="text-center animate-fade-in">
        {{ $t("noAppointments") }}
      </div>
      <div v-else class="flex flex-col gap-6">
        <div
          v-for="(appointment, index) in appointments"
          :key="appointment.id"
          class="cardPayment cardPayment1 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 flex flex-col gap-4 rounded-xl h-[121px] shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] animate-slide-in-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="flex justify-between">
            <h2 class="Internal dark:text-gray-200">{{ appointment.speciality }}</h2>
            <div class="flex w-fit justify-end gap-2">
              <button
                v-if="appointment.status === 'Confirmed'"
                class="Confirmed hover:cursor-pointer transition-all duration-300 hover:scale-105 dark:bg-gray-600 dark:text-gray-300"
              >
                {{ $t("confirmed") }}
              </button>
              <button
                v-else-if="appointment.status === 'Pending'"
                class="Pending hover:cursor-pointer transition-all duration-300 hover:scale-105 dark:bg-blue-800 dark:text-blue-300"
              >
                {{ $t("pending") }}
              </button>
              <button
                v-else
                class="Canceled hover:cursor-pointer transition-all duration-300 hover:scale-105 dark:bg-red-800 dark:text-red-300"
              >
                {{ $t("canceled") }}
              </button>
            </div>
          </div>
          <div class="flex justify-start items-center w-full">
            <div class="imgDoc mx-2">
              <img :src="appointment.doctorImage" alt="" />
            </div>
            <div class="w-full">
              <div class="flex justify-between w-full">
                <h2 class="nameDoc dark:text-gray-100">{{ appointment.doctorName }}</h2>
                <span class="done dark:bg-green-800 dark:text-green-300"
                  >{{ $t("sessionType") }} : {{ appointment.service }}</span
                >
              </div>
              <div class="flex flex-row justify-between">
                <span class="time dark:text-gray-400"
                  >{{ appointment.time }}, {{ appointment.date }}</span
                >
                <span class="linkVido dark:text-gray-300"
                  >{{ $t("patient") }}: {{ appointment.patientName }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from "@/Components/Layouts/MainNav.vue";
import { db } from "@/firebase";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";

export default {
  name: "TotalAppointments",
  components: { MainNav },
  data() {
    return {
      appointments: [],
      loading: true,
    };
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
              let doctorImage = "https://via.placeholder.com/45x40/cccccc/000000?text=Doctor";
              try {
                if (booking.doctorId) {
                  const doctorRef = doc(db, "doctors", booking.doctorId);
                  const doctorSnap = await getDoc(doctorRef);
                  if (doctorSnap.exists()) {
                    const d = doctorSnap.data();
                    doctorName = `${d.firstName || ""} ${d.lastName || ""}`.trim() || doctorName;
                    doctorImage = d.image || doctorImage;
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
                doctorImage,
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

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.animate-slide-in-up {
  animation: slideInUp 0.5s ease-out forwards;
  opacity: 0;
}

/* Typography */
.h1 {
  font-size: 25px;
  line-height: 35px;
  font-weight: 600;
}
.lastPaymentWord {
  font-weight: 600;
  color: #5271ff;
}
.view {
  font-weight: 400;
  font-size: 16px;
  color: #f4f8f6;
}
.cardPayment {
  width: 100%;
  padding: 15px;
}

.view {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #027a48;
}

.Internal {
  font-weight: 600;
  font-size: 18px;
  line-height: 19px;
  color: #212d66;
}

.Confirmed,
.Pending,
.Canceled {
  padding: 3px 10px;
  color: #05603a;
  background: #d1fadf;
  border-radius: 18px;
}
.done {
  padding: 3px 10px;
  color: #05603a;
  background: #d1fadf;
  border-radius: 18px;
  font-size: 12px;
  margin: 1px 3px;
}
.Pending {
  color: #0cb8b6;
  background: #e7f8f8;
  font-size: 12px;
}
.Canceled {
  color: #f01818;
  background: #ffefef;
  font-size: 12px;
  margin: 0px 5px;
}
.Confirmed {
  color: #667085;
  background: #f0f1f3;
  font-size: 12px;
}

.imgDoc {
  width: 45px;
  height: 40px;
  border-radius: 50%;
}
.imgDoc img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.price {
  font-weight: 500;
  font-size: 15px;
  color: #667085;
}
.time {
  font-weight: 600;
  font-size: 12px;
  color: #667085;
  line-height: 14px;
}
.nameDoc {
  font-weight: 500;
  font-size: 16px;
  color: #101828;
}
.linkVido {
  font-size: 12px;
  font-weight: 500;
  padding: 1px 5px;
}
.cancelword {
  color: #f01818;
  font-size: 14px;
  padding: 2px 12px;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 1024px) {
  .h1 {
    font-size: 20px;
    line-height: 26px;
  }
  .cardPayment {
    padding: 10px;
  }
}

@media (max-width: 768px) {
  .cardPayment {
    flex-direction: column;
    height: auto;
    padding: 12px;
  }
  .imgDoc {
    width: 50px;
    height: 50px;
  }
  .nameDoc {
    font-size: 14px;
  }
  .time,
  .linkVido {
    font-size: 11px;
  }
  .Internal {
    font-size: 16px;
  }
  .Confirmed,
  .Pending,
  .Canceled,
  .done {
    font-size: 11px;
    padding: 2px 8px;
  }
}
</style>
