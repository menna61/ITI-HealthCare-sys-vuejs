<template>
  <div :class="[$i18n.locale === 'ar' ? 'lg:mr-[302px]' : 'lg:ml-[302px]', 'w-dwh']">
    <main-nav />
    <div :class="[$i18n.locale === 'ar' ? 'pr-8 pl-20' : 'pl-8 pr-20', 'mt-8 flex flex-col gap-6']">
      <!--Page titles-->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold dark:text-white">Appointments</h1>
        <p class="text-gray-500 dark:text-gray-400">Manage your appointments and schedule</p>
      </div>

      <!-- Tabs -->
      <div class="flex gap-4 mb-6">
        <button
          @click="activeTab = 'upcoming'"
          :class="[
            'px-4 py-2 rounded-lg font-medium',
            activeTab === 'upcoming'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
          ]"
        >
          Upcoming
        </button>
        <button
          @click="activeTab = 'history'"
          :class="[
            'px-4 py-2 rounded-lg font-medium',
            activeTab === 'history'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
          ]"
        >
          History
        </button>
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
      <div
        v-else-if="currentAppointments.length === 0"
        class="text-center text-gray-500 dark:text-gray-400"
      >
        No appointments found.
      </div>
      <div v-else class="grid grid-cols-1 gap-4 h-fit">
        <div
          v-for="appointment in currentAppointments"
          :key="appointment.id"
          class="cardPayment bg-blue-50 dark:bg-gray-800 flex flex-col gap-4 rounded-xl p-4 dark:border dark:border-gray-700"
        >
          <div class="flex justify-between">
            <h2 class="Internal text-[var(--main-color-500)] dark:text-gray-300">
              {{ appointment.speciality || "Appointment" }}
            </h2>
            <div class="flex w-fit justify-end gap-2">
              <span :class="getStatusClass(appointment.status)">{{ appointment.status }}</span>
            </div>
          </div>
          <div class="flex justify-start items-center w-full">
            <div class="imgDoc mx-2">
              <img :src="appointment.doctorImage || '/images/imgProfile.jpg'" alt="" />
            </div>
            <div class="w-full">
              <div class="flex justify-between w-full">
                <h2 class="nameDoc dark:text-white">{{ appointment.doctorName }}</h2>
                <span class="linkVido dark:text-gray-300">{{ appointment.service }}</span>
              </div>
              <div class="flex flex-row justify-between">
                <span class="time dark:text-gray-400"
                  >{{ appointment.time }} , {{ appointment.date }}</span
                >
                <span class="linkVido dark:text-gray-300">{{
                  appointment.medicalDetails ? "Details Added" : ""
                }}</span>
              </div>
            </div>
          </div>
          <div v-if="activeTab === 'upcoming'" class="flex gap-2 mt-2">
            <button
              v-if="appointment.service && appointment.service.toLowerCase() === 'telemedicine'"
              :disabled="!isJoinEnabled(appointment) || !appointment.roomLink"
              @click="openRoom(appointment.roomLink)"
              :class="[
                'px-4 py-2 rounded text-white',
                isJoinEnabled(appointment) && appointment.roomLink
                  ? 'bg-[var(--main-color-500)] hover:bg-blue-700 cursor-pointer'
                  : 'bg-gray-400 cursor-not-allowed',
              ]"
              title="Join your telemedicine session"
            >
              {{
                !appointment.roomLink
                  ? "Room link not set"
                  : isJoinEnabled(appointment)
                  ? "Join Telemedicine"
                  : "Telemedicine (available at session time)"
              }}
            </button>
            <button
              @click="openCancelModal(appointment)"
              class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
            >
              Cancel appointment
            </button>
          </div>
        </div>
      </div>

      <Modal v-model="showCancelModal" title="Cancel appointment?" @close="closeCancelModal">
        <div>
          <p class="text-gray-600 dark:text-gray-300">
            Are you sure you want to cancel this appointment?
          </p>
          <p v-if="appointmentToCancel" class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {{ appointmentToCancel.doctorName }} • {{ appointmentToCancel.date }} •
            {{ appointmentToCancel.time }}
          </p>
        </div>
        <template #footer>
          <button
            @click="closeCancelModal"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Keep
          </button>
          <button
            @click="cancelAppointmentConfirmed"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
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
import { signOutUser, db, auth } from "@/authHandler.js";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  addDoc,
  writeBatch,
  updateDoc,
  onSnapshot,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { getStorage, ref as storageRef, getDownloadURL } from "firebase/storage";
import { firebaseApp } from "/src/firebase.js";
import { calculateRefund } from "@/utils/refundUtils.js";
import { sendTelemedicineEmail, sendCancellationEmail } from "@/utils/emailService.js";

export default {
  name: "PatientAppointments",
  components: { MainNav, Modal },
  data() {
    return {
      appointments: [],
      loading: true,
      showCancelModal: false,
      appointmentToCancel: null,
      activeTab: "upcoming",
    };
  },
  async mounted() {
    await this.processPendingBooking();
    this.listenToAppointments();
  },
  computed: {
    currentAppointments() {
      if (this.activeTab === "upcoming") {
        console.log("📊 Computing upcomingAppointments...");
        return this.upcomingAppointments;
      } else {
        console.log("📊 Computing historyAppointments...");
        return this.historyAppointments;
      }
    },
    upcomingAppointments() {
      const upcoming = this.appointments.filter((app) => {
        const isConfirmed = app.status.toLowerCase() === "confirmed";
        console.log(
          `🔍 Checking appointment ${app.id}: status="${app.status}", isConfirmed=${isConfirmed}`
        );
        return isConfirmed;
      });
      console.log("✅ Upcoming appointments count:", upcoming.length);
      console.log("✅ Upcoming appointments:", upcoming);
      return upcoming;
    },
    historyAppointments() {
      const history = this.appointments.filter((app) => {
        return app.status.toLowerCase() !== "confirmed";
      });
      console.log("📜 History appointments count:", history.length);
      return history;
    },
  },
  methods: {
    // ---------- Process Pending Booking After Payment ----------
    async processPendingBooking() {
      try {
        const pendingBookingStr = localStorage.getItem("pendingBooking");
        if (!pendingBookingStr) {
          console.log("✅ No pending booking found in localStorage");
          return;
        }

        console.log("🔄 Processing pending booking after payment...");
        const bookingData = JSON.parse(pendingBookingStr);
        console.log("📦 Booking data from localStorage:", bookingData);

        const user = auth.currentUser;
        if (!user) {
          console.error("❌ No user logged in");
          localStorage.removeItem("pendingBooking");
          return;
        }

        // Verify this booking belongs to current user
        if (bookingData.patientId !== user.uid) {
          console.error("❌ Booking doesn't belong to current user");
          localStorage.removeItem("pendingBooking");
          return;
        }

        // Save booking to Firebase
        console.log("💾 Saving booking to Firebase...");
        const bookingsRef = collection(db, "bookings");
        const bookingDoc = await addDoc(bookingsRef, {
          ...bookingData,
          createdAt: new Date(),
          status: "confirmed",
        });
        console.log("✅ Booking saved with ID:", bookingDoc.id);

        // Save payment record
        console.log("💰 Saving payment record...");
        const paymentsRef = collection(db, "payments");
        await addDoc(paymentsRef, {
          patientId: bookingData.patientId,
          doctorId: bookingData.doctorId,
          doctorName: bookingData.doctorName,
          speciality: bookingData.speciality,
          service: bookingData.service,
          amount: bookingData.price,
          date: bookingData.date,
          time: bookingData.time,
          createdAt: new Date(),
          status: "paid",
        });
        console.log("✅ Payment record saved");

        // Send notification to doctor
        console.log("📧 Sending notification to doctor...");
        const notificationsRef = collection(db, "notifications");
        await addDoc(notificationsRef, {
          userId: bookingData.doctorId,
          message: `New booking from ${bookingData.patientName || "Patient"} for ${
            bookingData.date
          } at ${bookingData.time}`,
          read: false,
          createdAt: new Date(),
          type: "new_booking",
          bookingId: bookingDoc.id,
        });
        console.log("✅ Notification sent to doctor");

        // Send email to patient if it's a telemedicine appointment
        if (bookingData.service && bookingData.service.toLowerCase() === "telemedicine") {
          try {
            // Get roomLink from booking data or fetch from doctor's service
            let roomLink = bookingData.roomLink || "";

            // If roomLink is missing, try to get it from doctor's service
            if (!roomLink && bookingData.doctorId) {
              console.log("🔍 RoomLink not found in booking, fetching from doctor's service...");
              const servicesRef = collection(db, "doctors", bookingData.doctorId, "services");
              const servicesSnap = await getDocs(servicesRef);
              const teleService = servicesSnap.docs
                .map((s) => ({ id: s.id, ...s.data() }))
                .find(
                  (s) =>
                    s &&
                    s.name &&
                    typeof s.name === "string" &&
                    s.name.toLowerCase() === "telemedicine" &&
                    s.roomLink
                );
              if (teleService && typeof teleService.roomLink === "string") {
                roomLink = teleService.roomLink;
                console.log("✅ RoomLink found in doctor's service:", roomLink);

                // Update the booking with the roomLink
                await updateDoc(doc(db, "bookings", bookingDoc.id), {
                  roomLink: roomLink,
                });
                console.log("✅ Booking updated with roomLink");
              }
            }

            // Send email only if roomLink is available
            if (roomLink) {
              console.log("📧 Sending telemedicine email to patient...");
              await sendTelemedicineEmail({
                patientEmail: user.email,
                patientName: bookingData.patientName || user.displayName || "Patient",
                doctorName: bookingData.doctorName,
                appointmentDate: bookingData.date,
                appointmentTime: bookingData.time,
                sessionLink: roomLink,
              });
              console.log("✅ Telemedicine email sent successfully");
            } else {
              console.warn(
                "⚠️ Cannot send email: RoomLink not available for telemedicine appointment"
              );
            }
          } catch (emailError) {
            console.error("❌ Error sending telemedicine email:", emailError);
            // Don't fail the booking if email fails
          }
        }

        // Clear localStorage
        localStorage.removeItem("pendingBooking");
        console.log("✅ Pending booking processed successfully and cleared from localStorage");
      } catch (error) {
        console.error("❌ Error processing pending booking:", error);
        // Don't remove from localStorage if there's an error, so user can retry
      }
    },

    async logout() {
      try {
        await signOutUser();
        this.$router.push("/login");
      } catch (error) {
        console.error("Logout error:", error);
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
          return;
        }
        const appointment = appointmentSnap.data();

        // Check if already cancelled to prevent duplicate refunds
        if (appointment.status === "cancelled") {
          this.closeCancelModal();
          return;
        }

        // Check if refund transaction already exists
        const transactionsRef = collection(db, "patients", user.uid, "transactions");
        const q = query(transactionsRef, where("bookingId", "==", appointmentSnap.id));
        const existingTransactions = await getDocs(q);
        if (!existingTransactions.empty) {
          // Refund already processed
          this.closeCancelModal();
          return;
        }

        // Calculate refund based on terms and conditions
        const { refundAmount, refundType, doctorEarnings, adminCommission } = calculateRefund(
          appointment,
          "patient"
        );

        console.log("Cancellation refund calculation:");
        console.log("Total price:", appointment.price);
        console.log("Patient refund:", refundAmount);
        console.log("Doctor earnings:", doctorEarnings);
        console.log("Admin commission:", adminCommission);

        // Update the status to 'cancelled' and save doctor earnings
        await updateDoc(appointmentRef, {
          status: "cancelled",
          cancelledAt: new Date(),
          cancelledBy: user.uid,
          cancelledByRole: "patient",
          doctorEarnings: doctorEarnings, // حفظ مبلغ الدكتور
          adminCommission: adminCommission, // حفظ عمولة الأدمن
        });

        // If there's admin commission (late cancellation), add it to admin wallet
        if (adminCommission > 0) {
          console.log("Adding admin commission from late cancellation:", adminCommission);

          const adminWalletRef = doc(db, "admin", "wallet");
          const adminWalletSnap = await getDoc(adminWalletRef);

          if (adminWalletSnap.exists()) {
            const currentBalance = parseFloat(adminWalletSnap.data().balance) || 0;
            await updateDoc(adminWalletRef, {
              balance: currentBalance + adminCommission,
            });
          } else {
            await setDoc(adminWalletRef, {
              balance: adminCommission,
              createdAt: new Date(),
            });
          }

          // Get patient name from database
          const patientRef = doc(db, "patients", user.uid);
          const patientSnap = await getDoc(patientRef);
          let patientName = appointment.patientName || "Patient";
          if (patientSnap.exists()) {
            const patientData = patientSnap.data();
            patientName =
              `${patientData.firstName || ""} ${patientData.lastName || ""}`.trim() || patientName;
          }

          // Add transaction record for admin
          await addDoc(collection(db, "admin", "wallet", "transactions"), {
            amount: adminCommission,
            type: "cancellation_commission",
            bookingId: appointmentSnap.id,
            doctorId: appointment.doctorId,
            doctorName: appointment.doctorName,
            patientName: patientName,
            service: appointment.service,
            date: new Date(),
            description: `5% commission from late cancellation by ${patientName}`,
          });

          console.log("Admin commission added successfully");
        }

        const patientRef = doc(db, "patients", user.uid);
        const patientSnap = await getDoc(patientRef);
        if (patientSnap.exists()) {
          const currentWallet = patientSnap.data().wallet || 0;
          const newWallet = currentWallet + refundAmount;
          await updateDoc(patientRef, { wallet: newWallet });

          // Add transaction record with bookingId to prevent duplicates
          await addDoc(collection(db, "patients", user.uid, "transactions"), {
            description: `${refundType} for cancelled appointment with ${
              appointment.doctorName || "Doctor"
            }`,
            amount: refundAmount,
            date: new Date(),
            bookingId: appointmentSnap.id,
          });
        }

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

        // Send cancellation email to patient
        try {
          console.log("📧 Sending cancellation email to patient...");
          await sendCancellationEmail({
            patientEmail: user.email,
            patientName: appointment.patientName || user.displayName || "Patient",
            doctorName: appointment.doctorName,
            appointmentDate: appointment.date,
            appointmentTime: appointment.time,
            refundAmount: refundAmount,
            cancellationReason: "Cancelled by patient",
          });
          console.log("✅ Cancellation email sent successfully");
        } catch (emailError) {
          console.error("❌ Error sending cancellation email:", emailError);
          // Don't fail the cancellation if email fails
        }

        this.closeCancelModal();
      } catch (error) {
        console.error("Error canceling appointment:", error);
        this.closeCancelModal();
      }
    },

    isJoinEnabled(app) {
      try {
        const start = new Date(`${app.date} ${app.time}`);
        const now = new Date();
        return now >= start;
      } catch {
        return false;
      }
    },
    openRoom(url) {
      if (!url) return;
      window.open(url, "_blank", "noopener");
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

        console.log("👤 PatientAppointments: Current user ID:", user.uid);

        // عرفنا bookingsRef هنا قبل ما نستخدمه
        const bookingsRef = collection(db, "bookings");

        // لو عايزة تجيبي مواعيد المريض الحالي:
        const q = query(bookingsRef, where("patientId", "==", user.uid));

        console.log("🔍 PatientAppointments: Listening to bookings for patient:", user.uid);

        // Use onSnapshot for real-time updates
        this.unsubscribe = onSnapshot(q, async (querySnapshot) => {
          console.log(
            "📡 PatientAppointments: Received snapshot with",
            querySnapshot.docs.length,
            "documents"
          );
          const storage = getStorage(firebaseApp);
          const batch = writeBatch(db);
          const appointmentsData = await Promise.all(
            querySnapshot.docs.map(async (docSnap) => {
              const booking = { id: docSnap.id, ...docSnap.data() };

              // حاول نجيب اسم الدكتور من collection doctors لو موجود doctorId
              let doctorName = booking.doctorName || "Unknown Doctor";
              let doctorImage = "/images/imgProfile.jpg";

              // Check for overdue appointments (wait 15 minutes after appointment time)
              if (booking.status && booking.status.toLowerCase() === "confirmed") {
                const appointmentDateTime = new Date(`${booking.date} ${booking.time}`);
                const now = new Date();
                const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000);
                if (appointmentDateTime < fifteenMinutesAgo) {
                  const appointmentRef = doc(db, "bookings", booking.id);
                  batch.update(appointmentRef, { status: "Overdue" });
                  booking.status = "Overdue"; // Optimistically update for immediate UI change
                }
              }

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

              // Ensure roomLink is present for telemedicine by backfilling from doctor's service if missing
              let resolvedRoomLink = booking.roomLink || "";
              try {
                const isTelemedicine =
                  booking.service && typeof booking.service === "string"
                    ? booking.service.toLowerCase() === "telemedicine"
                    : false;
                if (!resolvedRoomLink && isTelemedicine && booking.doctorId) {
                  const servicesRef = collection(db, "doctors", booking.doctorId, "services");
                  const servicesSnap = await getDocs(servicesRef);
                  const teleService = servicesSnap.docs
                    .map((s) => ({ id: s.id, ...s.data() }))
                    .find(
                      (s) =>
                        s &&
                        s.name &&
                        typeof s.name === "string" &&
                        s.name.toLowerCase() === "telemedicine" &&
                        s.roomLink
                    );
                  if (teleService && typeof teleService.roomLink === "string") {
                    resolvedRoomLink = teleService.roomLink;
                  }
                }
              } catch {
                // Non-fatal: keep existing empty link if any error occurs
              }

              // Check if medical details exist for this booking
              let hasMedicalDetails = false;
              try {
                const detailsRef = collection(db, "bookings", booking.id, "medicalDetails");
                const detailsSnapshot = await getDocs(detailsRef);
                hasMedicalDetails = !detailsSnapshot.empty;
              } catch (error) {
                console.error(`Error checking medical details for booking ${booking.id}:`, error);
              }

              return {
                id: booking.id,
                doctorName,
                doctorImage,
                service: booking.service,
                roomLink: resolvedRoomLink,
                speciality: booking.speciality || "Unknown Speciality",
                date: booking.date,
                time: booking.time,
                status: booking.status,
                patientId: booking.patientId,
                patientName: booking.patientName || "",
                dayName: booking.dayName || "",
                doctorId: booking.doctorId || "",
                medicalDetails: hasMedicalDetails,
              };
            })
          );
          // Keep all appointments and deduplicate by doctor/date/time
          // Priority: confirmed > pending > cancelled/completed
          const dedupedMap = new Map();
          for (const app of appointmentsData) {
            const key = `${app.doctorId || ""}-${app.date}-${app.time}`;
            const existing = dedupedMap.get(key);

            if (!existing) {
              // No existing appointment with this key, add it
              dedupedMap.set(key, app);
            } else {
              // There's an existing appointment, decide which one to keep
              const existingStatus = (existing.status || "").toLowerCase();
              const currentStatus = (app.status || "").toLowerCase();

              // Priority order: confirmed > pending > other statuses
              const statusPriority = {
                confirmed: 3,
                pending: 2,
                completed: 1,
                cancelled: 0,
                overdue: 0,
              };

              const existingPriority = statusPriority[existingStatus] || 0;
              const currentPriority = statusPriority[currentStatus] || 0;

              // Keep the appointment with higher priority
              // If same priority, keep the newer one (by createdAt)
              if (currentPriority > existingPriority) {
                dedupedMap.set(key, app);
              } else if (currentPriority === existingPriority) {
                // If same priority, prefer the one with more recent createdAt
                const existingDate = existing.createdAt?.toDate?.() || new Date(0);
                const currentDate = app.createdAt?.toDate?.() || new Date(0);
                if (currentDate > existingDate) {
                  dedupedMap.set(key, app);
                }
              }
            }
          }
          const deduped = Array.from(dedupedMap.values());
          deduped.sort((a, b) => new Date(b.date) - new Date(a.date));
          this.appointments = deduped;

          console.log(
            "📋 PatientAppointments: Total appointments after dedup:",
            this.appointments.length
          );
          console.log("📋 PatientAppointments: All appointments:", this.appointments);

          // Log each appointment's status
          this.appointments.forEach((app, index) => {
            console.log(`📌 Appointment ${index + 1}:`, {
              id: app.id,
              doctorName: app.doctorName,
              date: app.date,
              time: app.time,
              status: app.status,
              statusLowerCase: app.status?.toLowerCase(),
            });
          });

          this.loading = false;

          // Commit any status updates for overdue appointments
          await batch.commit();
        });
      } catch (error) {
        console.error("Error listening to appointments:", error);
        this.loading = false;
      }
    },
    getStatusClass(status) {
      const lowerStatus = status.toLowerCase();
      if (lowerStatus === "confirmed") {
        return "Confirmed";
      } else if (lowerStatus === "pending") {
        return "Pending";
      } else if (lowerStatus === "cancelled") {
        return "Canceled";
      } else if (lowerStatus === "overdue") {
        return "Overdue";
      } else {
        return "done";
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
}

.Confirmed,
.Pending,
.Overdue,
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
.Overdue {
  color: #b42318;
  background: #fef3f2;
  font-size: 12px;
  margin: 0px 5px;
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
