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
      <div v-else class="flex flex-col gap-6">
        <div
          v-for="appointment in appointments"
          :key="appointment.id"
          class="cardPayment cardPayment1 bg-blue-50 flex flex-col gap-4 rounded-xl h-[121px]"
        >
          <div class="flex justify-between">
            <h2 class="Internal">{{ appointment.speciality }}</h2>
            <div class="flex w-fit justify-end gap-2">
              <button v-if="appointment.status === 'Confirmed'"
                class="Confirmed hover:cursor-pointer"
              >
                {{ appointment.status }}
              </button>
               <button v-else
                class="Canceled hover:cursor-pointer"
              >
                {{ appointment.status }}
              </button>
            </div>
          </div>
          <div class="flex justify-start items-center w-full">
            <div class="imgDoc mx-2">
              <img :src="appointment.doctorImage" alt="" />
            </div>
            <div class="w-full">
              <div class="flex justify-between w-full">
                <h2 class="nameDoc">{{ appointment.doctorName }}</h2>
                <span class="done">Session Type : {{ appointment.service }}</span>
              </div>
              <div class="flex flex-row justify-between">
                <span class="time">{{ appointment.time }}, {{ appointment.date }}</span>
                <span class="linkVido">www.link.com</span>
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
import { signOutUser, db, auth } from "/src/authHandler.js";
import { collection,query, where, doc, getDoc, addDoc, updateDoc, onSnapshot } from "firebase/firestore";

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
    this.checkAndSavePendingBooking();
    this.listenToAppointments();
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

    async checkAndSavePendingBooking() {
      const pendingBooking = localStorage.getItem('pendingBooking');
      if (pendingBooking) {
        try {
          const bookingData = JSON.parse(pendingBooking);
          await addDoc(collection(db, "bookings"), bookingData);
          localStorage.removeItem('pendingBooking'); // Remove after saving
          console.log("Booking saved after payment");
        } catch (error) {
          console.error("Error saving booking after payment:", error);
        }
      }
    },

    async cancelAppointment(appointmentId) {
      if (confirm("Are you sure you want to cancel this appointment?")) {
        try {
          // Update the status to 'canceled' in Firebase
          const appointmentRef = doc(db, "bookings", appointmentId);
          await updateDoc(appointmentRef, { status: "canceled" });
          // No need to refresh, onSnapshot will update automatically
          alert("Appointment canceled successfully.");
        } catch (error) {
          console.error("Error canceling appointment:", error);
          alert("Failed to cancel appointment. Please try again.");
        }
      }
    },

    // ---------- Listen to Appointments with Real-time Updates ----------
    listenToAppointments() {
      try {
        const user = auth.currentUser;

        // لو مش مسجّل دخول — مفروض ترجع للـ login
        if (!user) {
          this.$router.push("/login");
          return;
        }

        // عرفنا bookingsRef هنا قبل ما نستخدمه
        const bookingsRef = collection(db, "bookings");

        // لو عايزة تجيبي مواعيد المريض الحالي:
        const q = query(bookingsRef, where("patientId", "==", user.uid));

        // Use onSnapshot for real-time updates
        this.unsubscribe = onSnapshot(q, async (querySnapshot) => {
          const appointmentsData = await Promise.all(
            querySnapshot.docs.map(async (docSnap) => {
              const booking = { id: docSnap.id, ...docSnap.data() };

              // حاول نجيب اسم الدكتور من collection doctors لو موجود doctorId
              let doctorName = booking.doctorName || "Unknown Doctor";
              let doctorImage = "/images/imgProfile.jpg";
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
                patientName: booking.patientName || "",
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
.patient-appointments {
  min-height: 100vh;
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
.done{
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
</style>