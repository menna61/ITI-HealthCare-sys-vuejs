<template>
  <div class="w-dwh ml-[302px]">
    <main-nav />
    <div class="pl-8 pr-20 mt-8 flex flex-col gap-6">
      <!--Page titles-->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold">Appointments</h1>
        <p class="text-gray-500">Manage your appointments and schedule</p>
      </div>

      <!--Page content-->
      <div v-if="loading" class="text-center w-full flex items-center justify-center">
        <div role="status flex flex-col items-center justify-center">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </div>
      <div v-else-if="appointments.length === 0" class="text-center">No appointments found.</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-fit">
        <div
          v-for="appointment in appointments"
          :key="appointment.id"
          class="doc p-4 bg-white rounded-xl flex flex-col gap-4"
        >
          <div class="top w-full relative">
            <img
              :src="appointment.doctorImage"
              alt=""
              v-if="appointment.doctorImage"
              class="rounded-lg h-75 w-full"
            />
            <div
              v-else
              class="w-full rounded-lg bg-gray-300 mr-4 flex items-center justify-center h-full"
            >
              <svg class="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div class="exp p-2 px-4 bg-blue-50 rounded-full w-fit absolute top-4 right-4">
              <p class="text-blue-600 font-medium">{{ appointment.service }}</p>
            </div>
          </div>
          <div class="bottom flex flex-col gap-4">
            <div class="name flex flex-col gap-2">
              <div class="flex justify-between items-start">
                <div>
                  <h1 class="text-xl font-medium">{{ appointment.doctorName }}</h1>
                  <p class="text-lg text-gray-500">{{ appointment.speciality }}</p>
                </div>
                <div>
                  <span class="Confirmed">Confirmed</span>
                </div>
              </div>
            </div>

            <div class="flex gap-2 items-center text-sm text-gray-500">
              <svg
                class="w-5 h-5 fill-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <path
                  d="M352 96C369.7 96 384 110.3 384 128L384 160 480 160C515.3 160 544 188.7 544 224L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 224C96 188.7 124.7 160 160 160L256 160 256 128C256 110.3 270.3 96 288 96 305.7 96 320 110.3 320 128L320 160 352 160zM448 288L192 288C174.3 288 160 302.3 160 320 160 337.7 174.3 352 192 352L448 352C465.7 352 480 337.7 480 320 480 302.3 465.7 288 448 288z"
                />
              </svg>
              <span
                >{{ appointment.dayName }} • {{ appointment.date }} • {{ appointment.time }}</span
              >
            </div>

            <div class="flex gap-2 mt-2">
              <button
                @click="openCancelModal(appointment)"
                class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal v-model="showCancelModal" title="Cancel appointment?" @close="closeCancelModal">
        <div>
          <p class="text-gray-600">Are you sure you want to cancel this appointment?</p>
          <p v-if="appointmentToCancel" class="text-sm text-gray-500 mt-2">
            {{ appointmentToCancel.doctorName }} • {{ appointmentToCancel.date }} •
            {{ appointmentToCancel.time }}
          </p>
        </div>
        <template #footer>
          <button
            @click="closeCancelModal"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Keep
          </button>
          <button
            @click="cancelAppointmentConfirmed"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Cancel appointment
          </button>
        </template>
      </Modal>
    </div>
  </div>
</template>

<script>
import MainNav from "@/Components/Layouts/MainNav.vue";
import Modal from "@/Components/UI/Modal.vue";
import { signOutUser, db, auth } from "/src/authHandler.js";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { getStorage, ref as storageRef, getDownloadURL } from "firebase/storage";
import { firebaseApp } from "/src/firebase.js";

export default {
  name: "PatientAppointments",
  components: { MainNav, Modal },
  data() {
    return {
      appointments: [],
      loading: true,
      showCancelModal: false,
      appointmentToCancel: null,
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
      const pendingBooking = localStorage.getItem("pendingBooking");
      if (pendingBooking) {
        try {
          const bookingData = JSON.parse(pendingBooking);
          // Save booking after successful payment
          const docRef = await addDoc(collection(db, "bookings"), bookingData);
          // Record payment entry (Stripe) for patient history
          try {
            await addDoc(collection(db, "payments"), {
              patientId: bookingData.patientId,
              doctorId: bookingData.doctorId,
              bookingId: docRef.id,
              amount: bookingData.price,
              currency: "USD",
              method: "stripe",
              status: "succeeded",
              createdAt: new Date(),
              service: bookingData.service,
              speciality: bookingData.speciality,
              doctorName: bookingData.doctorName,
              date: bookingData.date,
              time: bookingData.time,
            });
          } catch (e) {
            console.warn("Failed to record payment document", e);
          }
          // Notify doctor after successful booking save
          if (bookingData.doctorId) {
            await addDoc(collection(db, "notifications"), {
              userId: bookingData.doctorId,
              message: `A patient ${bookingData.patientName} has booked an appointment.`,
              read: false,
              createdAt: new Date(),
              type: "appointment_booked",
              bookingId: docRef.id,
            });
          }
          localStorage.removeItem("pendingBooking"); // Remove after saving
          console.log("Booking saved after payment");
        } catch (error) {
          console.error("Error saving booking after payment:", error);
        }
      }
    },

    openCancelModal(appointment) {
      this.appointmentToCancel = appointment;
      this.showCancelModal = true;
    },
    closeCancelModal() {
      this.showCancelModal = false;
      this.appointmentToCancel = null;
    },
    async cancelAppointmentConfirmed() {
      try {
        const user = auth.currentUser;
        if (!user || !this.appointmentToCancel) return;

        // Get appointment details (fresh from DB)
        const appointmentRef = doc(db, "bookings", this.appointmentToCancel.id);
        const appointmentSnap = await getDoc(appointmentRef);
        if (!appointmentSnap.exists()) {
          this.closeCancelModal();
          alert("Appointment not found.");
          return;
        }
        const appointment = appointmentSnap.data();

        // Update the status to 'cancelled'
        await updateDoc(appointmentRef, {
          status: "cancelled",
          cancelledAt: new Date(),
          cancelledBy: user.uid,
          cancelledByRole: "patient",
        });

        // Notify doctor about cancellation
        if (appointment.doctorId) {
          await addDoc(collection(db, "notifications"), {
            userId: appointment.doctorId,
            message: `Patient ${appointment.patientName || ""} cancelled the booking for ${
              appointment.date
            } ${appointment.time}.`,
            read: false,
            createdAt: new Date(),
            type: "appointment_cancelled",
            bookingId: this.appointmentToCancel.id,
          });
        }

        this.closeCancelModal();
      } catch (error) {
        console.error("Error canceling appointment:", error);
        this.closeCancelModal();
        alert("Failed to cancel appointment. Please try again.");
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
          const storage = getStorage(firebaseApp);
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
                    // Prefer explicit URL if present
                    if (d.profileImageUrl && typeof d.profileImageUrl === "string") {
                      doctorImage = d.profileImageUrl;
                    } else if (d.image && typeof d.image === "string") {
                      // If it's a storage path, resolve to download URL
                      if (!d.image.startsWith("http")) {
                        try {
                          const url = await getDownloadURL(storageRef(storage, d.image));
                          doctorImage = url;
                        } catch (e) {
                          console.warn("Failed to load doctor image from storage", e);
                        }
                      } else {
                        doctorImage = d.image;
                      }
                    }
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
                dayName: booking.dayName || "",
                doctorId: booking.doctorId || "",
              };
            })
          );
          // Keep only confirmed appointments and deduplicate by doctor/date/time
          const onlyConfirmed = appointmentsData.filter(
            (app) => app.status && app.status.toLowerCase() === "confirmed"
          );
          const dedupedMap = new Map();
          for (const app of onlyConfirmed) {
            const key = `${app.doctorId || ""}-${app.date}-${app.time}`;
            // Prefer keeping the first encountered; adjust if priority rules change
            if (!dedupedMap.has(key)) {
              dedupedMap.set(key, app);
            }
          }
          const deduped = Array.from(dedupedMap.values());
          deduped.sort((a, b) => new Date(b.date) - new Date(a.date));
          this.appointments = deduped;
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
</style>
