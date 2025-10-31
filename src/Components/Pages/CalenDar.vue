<template>
  <div>
    <div class="w-dwh ml-[302px]">
      <main-nav />
      <div class="pl-8 pr-20 mt-8 flex flex-col gap-6">
        <!--Page titles-->
        <div class="title flex flex-col gap-4">
          <h1 class="text-2xl font-bold">Calendar & Bookings</h1>
          <p class="text-gray-500">Manage your appointments and schedule</p>
        </div>

        <!--Page content-->

        <div class="content flex gap-6 w-full">
          <!--Calendar component-->
          <div class="cal w-full">
            <FullCalendar :options="calendarOptions" />
          </div>

          <!--Appointments card or Services card for new doctors-->
          <div class="appointments" v-if="hasServices">
            <h1 class="mb-4 text-xl font-semibold text-nowrap">{{ selectedDateText }}</h1>
            <!--Appointments cards-->

            <div class="appCard flex flex-col gap-4" v-if="filteredAppointments.length > 0">
              <div
                class="p-4 rounded-xl bg-white w-[378px] flex flex-col gap-4"
                v-for="appointment in filteredAppointments"
                :key="appointment.id"
              >
                <!--Appointment top tags-->

                <!--Client info and actions-->
                <div class="client flex justify-between items-start">
                  <div class="user flex gap-2 items-center">
                    <div
                      class="img w-10 h-10 rounded-full bg-[#EEF1FF] flex items-center justify-center"
                    >
                      <svg
                        class="w-6 h-6 fill-[#5271FF]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                      >
                        <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                        <path
                          d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"
                        />
                      </svg>
                    </div>
                    <div class="name flex flex-col gap-2">
                      <p>{{ appointment.name }}</p>
                      <div class="date flex gap-2">
                        <svg
                          class="w-4 h-4 fill-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 640 640"
                        >
                          <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                          <path
                            d="M320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z"
                          />
                        </svg>
                        <p class="text-gray-500 text-xs">{{ appointment.time }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex gap-4">
                    <button
                      v-for="action in appointment.actions"
                      :key="action"
                      :class="getActionClass(action)"
                      class="cursor-pointer"
                      @click="handleAction(action, appointment)"
                    >
                      {{ action }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="p-4 rounded-xl bg-gray-50 w-[378px] text-center">
              <p class="text-gray-500">No appointments for this day</p>
            </div>
          </div>

          <!-- Card for new doctors -->
          <div v-else class="services-card">
            <!-- Union Membership Card Reminder -->
            <div class="mb-4" v-if="!isApproved">
              <div
                class="p-4 rounded-xl w-[378px] flex flex-col gap-4"
                :class="
                  hasUnionCard
                    ? 'bg-yellow-50 border border-yellow-300'
                    : 'bg-red-50 border border-red-200'
                "
              >
                <div class="flex items-center gap-3" v-if="hasUnionCard">
                  <svg
                    class="w-8 h-8 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <div>
                    <h4 class="text-yellow-900 font-semibold">Documents Uploaded</h4>
                    <p class="text-yellow-700 text-sm">
                      You have uploaded the document and we will notify you once it is reviewed.
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-3" v-else>
                  <svg
                    class="w-8 h-8 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    ></path>
                  </svg>
                  <div>
                    <h4 class="text-red-800 font-semibold">Upload Union Membership Card</h4>
                    <p class="text-red-600 text-sm">Required to access services and appointments</p>
                  </div>
                </div>
                <div v-if="!hasUnionCard" class="flex flex-col gap-2">
                  <input
                    ref="unionCardInput"
                    type="file"
                    accept="image/*"
                    @change="handleUnionCardUpload"
                    class="hidden"
                  />
                  <button
                    @click="triggerUnionCardInput"
                    :disabled="uploading"
                    class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg inline-flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <svg v-if="uploading" class="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                        fill="none"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    <svg
                      v-else
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    {{ uploading ? "Uploading..." : "Upload Card" }}
                  </button>
                </div>
                <div v-if="uploadError" class="text-red-600 text-sm">{{ uploadError }}</div>
                <div v-if="uploadSuccess && !hasUnionCard" class="text-green-600 text-sm">
                  {{ uploadSuccess }}
                </div>
              </div>
            </div>
            <!-- Approval notification message moved to notification popup. (Was: Your union membership card has been approved! You can now create services and start accepting appointments.) Removed from inline display. -->

            <!-- Services Card -->
            <div
              class="p-6 rounded-xl bg-white w-[378px] flex flex-col gap-4 items-center text-center"
            >
              <svg
                class="w-16 h-16 text-gray-300 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                ></path>
              </svg>
              <h3 class="text-xl font-semibold text-gray-900">Create services</h3>
              <p class="text-gray-500">Create your services to start taking appointments</p>
              <button
                @click="goToServices"
                :disabled="!isApproved"
                :class="[
                  'font-medium py-2 px-6 rounded-lg inline-flex items-center gap-2',
                  isApproved
                    ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                    : 'bg-gray-400 text-white cursor-not-allowed',
                ]"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                Go to services
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Cancel Confirmation Modal -->
    <Modal v-model="showCancelModal" title="Confirm Cancellation" @close="closeCancelModal">
      <p>Are you sure you want to cancel this appointment?</p>
      <template #footer>
        <button
          @click="closeCancelModal"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          No
        </button>
        <button
          @click="confirmCancel"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Yes, Cancel
        </button>
      </template>
    </Modal>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import MainNav from "../Layouts/MainNav.vue";
import Modal from "../UI/Modal.vue";
import { db, auth } from "../../authHandler.js";
import { collection, getDocs, doc, getDoc, updateDoc, addDoc, setDoc } from "firebase/firestore";

export default {
  name: "CalenDar",
  components: { MainNav, FullCalendar, Modal },
  data() {
    return {
      selectedDateText: this.formatDate(new Date()),
      selectedDate: new Date().toISOString().split("T")[0], // YYYY-MM-DD
      hasServices: false,
      hasUnionCard: false,
      isApproved: false,
      uploading: false,
      uploadError: "",
      uploadSuccess: "",
      allAppointments: [],
      showCancelModal: false,
      appointmentToCancel: null,
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        selectable: true,
        height: 600,
        dateClick: this.handleDateClick,
        headerToolbar: false,
        events: [],
      },
    };
  },
  async mounted() {
    await this.checkServices();
    await this.checkUnionCard();
    await this.checkApprovalStatus();
    await this.fetchAppointments();
    this.updateCalendarEvents();
  },
  computed: {
    filteredAppointments() {
      return this.allAppointments.filter((appointment) => appointment.date === this.selectedDate);
    },
  },
  methods: {
    async checkServices() {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const servicesRef = collection(db, "doctors", user.uid, "services");
        const querySnapshot = await getDocs(servicesRef);

        this.hasServices = querySnapshot.size > 0;
      } catch (error) {
        console.error("Error checking services:", error);
        this.hasServices = false;
      }
    },
    async checkUnionCard() {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const docRef = doc(db, "doctors", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          this.hasUnionCard = !!data.unionMembershipCardUrl;
        } else {
          this.hasUnionCard = false;
        }
      } catch (error) {
        console.error("Error checking union card:", error);
        this.hasUnionCard = false;
      }
    },
    async checkApprovalStatus() {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const docRef = doc(db, "doctors", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          this.isApproved = data.approved === true;
        } else {
          this.isApproved = false;
        }
      } catch (error) {
        console.error("Error checking approval status:", error);
        this.isApproved = false;
      }
    },
    handleDateClick(info) {
      this.selectedDateText = this.formatDate(new Date(info.dateStr));
      this.selectedDate = info.dateStr; // YYYY-MM-DD
    },
    formatDate(date) {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    },
    getActionClass(action) {
      switch (action) {
        case "Cancel":
          return "text-red-500 font-medium hover:underline";
        case "Approve":
          return "text-green-500 font-medium hover:underline";
        case "Reject":
          return "text-red-500 font-medium hover:underline";
        default:
          return "";
      }
    },
    goToServices() {
      this.$router.push("/dashboard/services");
    },
    triggerUnionCardInput() {
      this.$refs.unionCardInput.click();
    },
    async handleUnionCardUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.uploading = true;
        this.uploadError = "";
        this.uploadSuccess = "";
        await this.uploadUnionCardToCloudinary(file);
        this.uploading = false;
      }
    },
    async uploadUnionCardToCloudinary(file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary upload preset
      formData.append("cloud_name", "dtaqbcmmg"); // Replace with your Cloudinary cloud name

      try {
        console.log("Starting union card upload to Cloudinary...");
        const response = await fetch("https://api.cloudinary.com/v1_1/dtaqbcmmg/image/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        console.log("Union card Cloudinary response:", data);
        console.log("Response status:", response.status);
        if (response.ok && data.secure_url) {
          await this.saveUnionCardUrl(data.secure_url);
          this.uploadSuccess = "Union membership card uploaded successfully!";
          this.uploadError = "";
          this.hasUnionCard = true;
        } else {
          console.error("Union card upload failed:", data.error?.message || data);
          this.uploadError = `Failed to upload union card: ${
            data.error?.message || "Unknown error"
          }`;
        }
      } catch (error) {
        console.error("Error uploading union card:", error);
        this.uploadError = `Failed to upload union card: ${error.message}`;
      }
    },
    async saveUnionCardUrl(url) {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const docRef = doc(db, "doctors", user.uid);
        await updateDoc(docRef, {
          unionMembershipCardUrl: url,
        });
      } catch (error) {
        console.error("Error saving union card URL:", error);
      }
    },
    async fetchAppointments() {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const appointmentsRef = collection(db, "bookings");
        const querySnapshot = await getDocs(appointmentsRef);

        const appointments = await Promise.all(
          querySnapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((appointment) => appointment.doctorId === user.uid)
            .filter((appointment) => (appointment.status || "").toLowerCase() === "confirmed")
            .map(async (appointment) => {
              let patientName = appointment.patientName || "Patient";
              // Fetch patient name if it's "Patient" or empty
              if (patientName === "Patient" || !patientName) {
                try {
                  const patientRef = doc(db, "patients", appointment.patientId);
                  const patientSnap = await getDoc(patientRef);
                  if (patientSnap.exists()) {
                    const patientData = patientSnap.data();
                    patientName =
                      `${patientData.firstName || ""} ${patientData.lastName || ""}`.trim() ||
                      patientName;
                  }
                } catch (err) {
                  console.error("Error fetching patient name:", err);
                }
              }
              return {
                id: appointment.id,
                date: appointment.date, // Assume date is in YYYY-MM-DD
                name: patientName,
                time: appointment.time,
                type: appointment.type,
                status: appointment.status,
                patientId: appointment.patientId,
                price: appointment.price,
                actions: ["Cancel"],
              };
            })
        );

        // Ensure unique appointments by composite key to prevent duplicates
        const seen = new Set();
        const uniqueAppointments = appointments.filter((app) => {
          const key = `${app.date}-${app.time}-${app.patientId}`;
          if (seen.has(key)) {
            return false;
          }
          seen.add(key);
          return true;
        });

        this.allAppointments = uniqueAppointments;
        this.updateCalendarEvents();
      } catch (error) {
        console.error("Error fetching appointments:", error);
        this.allAppointments = [];
      }
    },
    updateCalendarEvents() {
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      const appointmentDates = new Set();

      // Collect unique dates with appointments, excluding today
      this.allAppointments.forEach((appointment) => {
        if (appointment.date !== today) {
          appointmentDates.add(appointment.date);
        }
      });

      // Create background events for each date with appointments
      const events = Array.from(appointmentDates).map((date) => ({
        start: date,
        display: "background",
        className: "red-dot-event",
      }));

      this.calendarOptions.events = events;
    },
    async handleAction(action, appointment) {
      if (action === "Cancel") {
        this.appointmentToCancel = appointment;
        this.showCancelModal = true;
      }
    },
    async cancelAppointment(appointment) {
      try {
        const user = auth.currentUser;
        if (!user) return;

        // Update appointment status to cancelled
        const appointmentRef = doc(db, "bookings", appointment.id);
        await updateDoc(appointmentRef, {
          status: "cancelled",
          cancelledAt: new Date(),
          cancelledBy: user.uid,
        });

        // Refund money to patient wallet
        const patientRef = doc(db, "patients", appointment.patientId);
        const patientSnap = await getDoc(patientRef);
        const refundAmount = parseFloat(appointment.price) || 0; // Assume price is stored in appointment
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
          description: `Refund for cancelled appointment with ${user.displayName || "Doctor"}`,
          amount: refundAmount,
          date: new Date(),
          type: "refund",
        });

        // Remove from local array
        this.allAppointments = this.allAppointments.filter((app) => app.id !== appointment.id);
      } catch (error) {
        console.error("Error cancelling appointment:", error);
      }
    },
    async confirmCancel() {
      if (this.appointmentToCancel) {
        await this.cancelAppointment(this.appointmentToCancel);
        this.showCancelModal = false;
        this.appointmentToCancel = null;
      }
    },
    closeCancelModal() {
      this.showCancelModal = false;
      this.appointmentToCancel = null;
    },
  },
};
</script>

<style scoped>
.red-dot-event {
  position: relative;
  background-color: transparent !important;
}

.red-dot-event::after {
  content: "";
  position: absolute;
  top: 2px;
  right: 2px;
  width: 6px;
  height: 6px;
  background-color: red;
  border-radius: 50%;
  z-index: 10;
}
</style>
