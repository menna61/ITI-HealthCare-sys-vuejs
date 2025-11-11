<template>
  <div class="w-dwh lg:ml-[302px] ml-0">
    <main-nav />
    <div class="px-4 lg:pl-8 lg:pr-20 mt-8 flex flex-col gap-6">
      <!--Page titles-->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold dark:text-white">Appointments</h1>
        <p class="text-gray-500">Manage your appointments</p>
      </div>

      <!-- Appointments Tab -->

      <!-- Appointments Tab -->
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
                  <th class="py-4 px-6 text-left font-semibold">Mark as Completed</th>
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
                    {{ appointment.patientPhone || "-" }}
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
                    <span :class="getStatusClass(appointment.status)">
                      {{ appointment.status }}
                    </span>
                  </td>
                  <td
                    class="py-4 px-6 animate-slide-in-left"
                    :style="{ animationDelay: `${index * 0.1 + 0.65}s` }"
                  >
                    <input
                      type="checkbox"
                      :checked="appointment.status === 'completed'"
                      :disabled="appointment.status !== 'confirmed'"
                      @change="markCompleted(appointment.id)"
                      class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
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
                        v-if="appointment.status === 'confirmed' && isTodayOrPast(appointment.date)"
                        @click="markCompleted(appointment.id)"
                        class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                      >
                        Mark Completed
                      </button>
                      <button
                        v-if="appointment.status.toLowerCase() !== 'cancelled'"
                        @click="addDetails(appointment.id)"
                        class="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors text-sm"
                      >
                        {{ hasMedicalDetails(appointment.id) ? "Edit Details" : "Add Details" }}
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

      <!-- Add Details Modal -->
      <UiModal v-model="showAddDetailsModal" title="Add Medical Details">
        <!-- Tab Navigation -->
        <div class="mb-6">
          <div class="flex border-b border-gray-200 dark:border-gray-700">
            <button
              @click="activeTab = 'complaint'"
              :class="[
                'py-2 px-4 text-sm font-medium transition-colors',
                activeTab === 'complaint'
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
              ]"
            >
              Complaint
            </button>
            <button
              @click="activeTab = 'prescription'"
              :class="[
                'py-2 px-4 text-sm font-medium transition-colors',
                activeTab === 'prescription'
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
              ]"
            >
              Prescription
            </button>
            <button
              @click="activeTab = 'requirements'"
              :class="[
                'py-2 px-4 text-sm font-medium transition-colors',
                activeTab === 'requirements'
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
              ]"
            >
              {{ $t("medicalRequirements") }}
            </button>
          </div>
        </div>

        <!-- Complaint Tab -->
        <div v-if="activeTab === 'complaint'" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Patient Complaint
            </label>
            <textarea
              v-model="medicalDetails.patientComplaint"
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              rows="3"
              placeholder="Describe the patient's complaint..."
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Diagnosis
            </label>
            <textarea
              v-model="medicalDetails.diagnosis"
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              rows="3"
              placeholder="Enter diagnosis..."
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Instructions
            </label>
            <textarea
              v-model="medicalDetails.instructions"
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              rows="3"
              placeholder="Provide instructions for the patient..."
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Allergies
            </label>
            <textarea
              v-model="medicalDetails.allergies"
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              rows="2"
              placeholder="List any known allergies..."
            ></textarea>
          </div>
        </div>

        <!-- Prescription Tab -->
        <div v-if="activeTab === 'prescription'" class="space-y-4">
          <div
            v-for="(medication, index) in medicalDetails.prescriptions"
            :key="index"
            class="border border-gray-200 dark:border-gray-600 rounded-lg p-4"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Medication Name
                </label>
                <input
                  v-model="medication.name"
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter medication name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Dosage
                </label>
                <input
                  v-model="medication.dosage"
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., 500mg"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Frequency
                </label>
                <input
                  v-model="medication.frequency"
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., twice daily"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Duration
                </label>
                <input
                  v-model="medication.duration"
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., 7 days"
                />
              </div>
            </div>
            <div class="mt-4 flex justify-end">
              <button
                @click="removeMedication(index)"
                class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
              >
                Remove
              </button>
            </div>
          </div>
          <div class="flex justify-center">
            <button
              @click="addMedication"
              class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Add Medication
            </button>
          </div>
        </div>

        <!-- Medical Requirements Tab -->
        <div v-if="activeTab === 'requirements'" class="space-y-4">
          <div
            v-for="(requirement, index) in medicalDetails.medicalRequirements"
            :key="index"
            class="border border-gray-200 dark:border-gray-600 rounded-lg p-4"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {{ $t("requirementType") }}
                </label>
                <select
                  v-model="requirement.type"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">{{ $t("selectRequirementType") }}</option>
                  <option value="lab">{{ $t("labTest") }}</option>
                  <option value="radiology">{{ $t("radiology") }}</option>
                  <option value="other">{{ $t("otherRequirement") }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {{ $t("priority") }}
                </label>
                <select
                  v-model="requirement.priority"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">{{ $t("selectPriority") }}</option>
                  <option value="urgent">{{ $t("urgent") }}</option>
                  <option value="normal">{{ $t("normal") }}</option>
                  <option value="optional">{{ $t("optional") }}</option>
                </select>
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {{ $t("requirementName") }}
                </label>
                <input
                  v-model="requirement.name"
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  :placeholder="$t('enterRequirementName')"
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {{ $t("requirementNotes") }}
                </label>
                <textarea
                  v-model="requirement.notes"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  rows="2"
                  :placeholder="$t('enterRequirementNotes')"
                ></textarea>
              </div>
            </div>
            <div class="mt-4 flex justify-end">
              <button
                @click="removeRequirement(index)"
                class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
              >
                {{ $t("removeRequirement") }}
              </button>
            </div>
          </div>
          <div
            v-if="medicalDetails.medicalRequirements.length === 0"
            class="text-center py-8 text-gray-500 dark:text-gray-400"
          >
            {{ $t("noRequirementsAdded") }}
          </div>
          <div class="flex justify-center">
            <button
              @click="addRequirement"
              class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              {{ $t("addRequirement") }}
            </button>
          </div>
        </div>

        <template #footer>
          <button
            @click="showAddDetailsModal = false"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="saveDetails"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Save Details
          </button>
        </template>
      </UiModal>
    </div>
  </div>
</template>

<script>
import MainNav from "@/Components/Layouts/MainNav.vue";
import UiModal from "@/Components/UI/Modal.vue";
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
//import { calculateRefund } from "@/utils/refundUtils.js";

export default {
  name: "DoctorAppointments",
  components: {
    MainNav,
    UiModal,
  },
  data() {
    return {
      appointments: [],
      showAddDetailsModal: false,
      selectedAppointment: null,
      activeTab: "complaint",
      medicalDetails: {
        patientComplaint: "",
        diagnosis: "",
        instructions: "",
        allergies: "",
        prescriptions: [],
        medicalRequirements: [],
      },
      pendingReminders: [],
      notificationInterval: null,
      appointmentsWithDetails: new Set(),
    };
  },
  async mounted() {
    await this.fetchAppointments();
    this.loadPendingReminders();
    if (this.pendingReminders.length > 0) {
      this.startNotificationInterval();
    }
  },
  beforeUnmount() {
    if (this.notificationInterval) {
      clearInterval(this.notificationInterval);
    }
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
        const uniquePatientIds = new Set();

        for (const docSnap of querySnapshot.docs) {
          const appointment = { id: docSnap.id, ...docSnap.data() };

          // Check if past and pending, set to late
          const today = new Date().toISOString().split("T")[0];
          if (appointment.date < today && appointment.status === "pending") {
            appointment.status = "late";
          }

          // Fetch patient details
          if (appointment.patientId) {
            uniquePatientIds.add(appointment.patientId);
            const patientRef = doc(db, "patients", appointment.patientId);
            const patientSnap = await getDoc(patientRef);
            if (patientSnap.exists()) {
              const patientData = patientSnap.data();
              appointment.patientName =
                `${patientData.firstName || ""} ${patientData.lastName || ""}`.trim() ||
                patientData.name ||
                patientData.fullName ||
                appointment.patientName ||
                "";
              appointment.patientEmail = patientData.email || "";
              appointment.patientPhone = patientData.phone || "";
            }
          }

          appointments.push(appointment);
        }

        this.appointments = appointments;

        // Check which appointments have medical details
        await this.checkAppointmentsWithDetails();
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    },
    isTodayOrPast(dateString) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to start of today
      const appointmentDate = new Date(dateString);
      return appointmentDate <= today;
    },
    getStatusClass(status) {
      const baseClass =
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105";
      if (status === "completed")
        return `${baseClass} bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800`;
      if (status === "confirmed")
        return `${baseClass} bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800`;
      return `${baseClass} bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200`;
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

          // Send cancellation email to patient
          try {
            const patientName =
              patientData.name || patientData.fullName || appointment.patientName || "Patient";
            await fetch("http://localhost:4242/send-cancellation-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                patientId: appointment.patientId,
                patientName,
                doctorName: appointment.doctorName || "Doctor",
                date: appointment.date,
                time: appointment.time,
              }),
            });
          } catch (e) {
            console.error("Failed to send cancellation email:", e);
          }
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
        // Check if medical details exist
        const detailsRef = collection(db, "bookings", appointmentId, "medicalDetails");
        const querySnapshot = await getDocs(detailsRef);
        if (querySnapshot.empty) {
          const appointment = this.appointments.find((app) => app.id === appointmentId);
          if (appointment) {
            this.pendingReminders.push({
              appointmentId,
              patientName: appointment.patientName,
            });
            this.savePendingReminders();
            this.startNotificationInterval();
          }
        }
        // Send notification to patient about completion
        await this.sendCompletionNotification(appointmentId);
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

    addDetails(appointmentId) {
      this.selectedAppointment = this.appointments.find((app) => app.id === appointmentId);
      if (this.selectedAppointment) {
        this.fetchMedicalDetails(appointmentId);
        this.activeTab = "complaint";
        this.showAddDetailsModal = true;
      }
    },

    async fetchMedicalDetails(appointmentId) {
      try {
        const detailsRef = collection(db, "bookings", appointmentId, "medicalDetails");
        const querySnapshot = await getDocs(detailsRef);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const data = doc.data();
          this.medicalDetails = {
            id: doc.id,
            patientComplaint: data.patientComplaint || "",
            diagnosis: data.diagnosis || "",
            instructions: data.instructions || "",
            allergies: data.allergies || "",
            prescriptions: data.prescriptions || [],
            medicalRequirements: data.medicalRequirements || [],
          };
        } else {
          this.medicalDetails = {
            patientComplaint: "",
            diagnosis: "",
            instructions: "",
            allergies: "",
            prescriptions: [],
            medicalRequirements: [],
          };
        }
      } catch (error) {
        console.error("Error fetching medical details:", error);
        this.medicalDetails = {
          patientComplaint: "",
          diagnosis: "",
          instructions: "",
          allergies: "",
          prescriptions: [],
          medicalRequirements: [],
        };
      }
    },
    async saveDetails() {
      if (this.selectedAppointment) {
        // Save from appointment modal
        try {
          const detailsRef = collection(
            db,
            "bookings",
            this.selectedAppointment.id,
            "medicalDetails"
          );

          // Check if medical details already exist for this appointment
          const existingDocs = await getDocs(detailsRef);
          if (!existingDocs.empty) {
            // Update existing document
            const existingDocId = existingDocs.docs[0].id;
            await updateDoc(
              doc(db, "bookings", this.selectedAppointment.id, "medicalDetails", existingDocId),
              {
                patientComplaint: this.medicalDetails.patientComplaint,
                diagnosis: this.medicalDetails.diagnosis,
                instructions: this.medicalDetails.instructions,
                allergies: this.medicalDetails.allergies,
                prescriptions: this.medicalDetails.prescriptions,
                medicalRequirements: this.medicalDetails.medicalRequirements,
                updatedAt: new Date(),
              }
            );
          } else {
            // Add new document
            await addDoc(detailsRef, {
              patientComplaint: this.medicalDetails.patientComplaint,
              diagnosis: this.medicalDetails.diagnosis,
              instructions: this.medicalDetails.instructions,
              allergies: this.medicalDetails.allergies,
              prescriptions: this.medicalDetails.prescriptions,
              medicalRequirements: this.medicalDetails.medicalRequirements,
              createdAt: new Date(),
            });
          }

          // Send notification to patient
          await this.sendNotificationToPatient(this.selectedAppointment.id);

          this.showAddDetailsModal = false;
          this.selectedAppointment = null;
          this.medicalDetails = {
            patientComplaint: "",
            diagnosis: "",
            instructions: "",
            allergies: "",
            prescriptions: [],
            medicalRequirements: [],
          };
          // Remove from pending reminders
          this.pendingReminders = this.pendingReminders.filter(
            (r) => r.appointmentId !== this.selectedAppointment.id
          );
          this.savePendingReminders();
          if (this.pendingReminders.length === 0 && this.notificationInterval) {
            clearInterval(this.notificationInterval);
            this.notificationInterval = null;
          }

          // Update the appointmentsWithDetails set
          this.appointmentsWithDetails.add(this.selectedAppointment.id);

          // Send notification to patient
          await addDoc(collection(db, "notifications"), {
            userId: this.selectedAppointment.patientId,
            message: `Your medical details for the appointment on ${this.selectedAppointment.date} at ${this.selectedAppointment.time} have been added by Dr. ${this.selectedAppointment.doctorName}.`,
            read: false,
            createdAt: new Date(),
            type: "medical_details_added",
            bookingId: this.selectedAppointment.id,
          });
        } catch (error) {
          console.error("Error saving medical details:", error);
        }
      }
    },
    addMedication() {
      this.medicalDetails.prescriptions.push({
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
      });
    },
    removeMedication(index) {
      this.medicalDetails.prescriptions.splice(index, 1);
    },
    addRequirement() {
      this.medicalDetails.medicalRequirements.push({
        type: "",
        name: "",
        notes: "",
        priority: "",
      });
    },
    removeRequirement(index) {
      this.medicalDetails.medicalRequirements.splice(index, 1);
    },
    loadPendingReminders() {
      const stored = localStorage.getItem("pendingReminders");
      if (stored) {
        this.pendingReminders = JSON.parse(stored);
      }
    },
    savePendingReminders() {
      localStorage.setItem("pendingReminders", JSON.stringify(this.pendingReminders));
    },
    startNotificationInterval() {
      if (this.notificationInterval) return;
      this.notificationInterval = setInterval(() => {
        this.pendingReminders.forEach((reminder) => {
          this.showNotification(reminder.patientName);
        });
      }, 30 * 60 * 1000); // 30 minutes
    },
    showNotification(patientName) {
      if ("Notification" in window) {
        if (Notification.permission === "granted") {
          new Notification("Medical Details Reminder", {
            body: `Please enter medical details for patient ${patientName}.`,
            icon: "/favicon.ico",
          });
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              new Notification("Medical Details Reminder", {
                body: `Please enter medical details for patient ${patientName}.`,
                icon: "/favicon.ico",
              });
            }
          });
        }
      }
    },
    async sendNotificationToPatient(appointmentId) {
      try {
        // Get appointment details to find patient ID
        const appointmentRef = doc(db, "bookings", appointmentId);
        const appointmentSnap = await getDoc(appointmentRef);

        if (appointmentSnap.exists()) {
          const appointmentData = appointmentSnap.data();

          if (appointmentData.patientId) {
            // Get doctor name
            const user = auth.currentUser;
            let doctorName = "Doctor";
            if (user) {
              const doctorRef = doc(db, "doctors", user.uid);
              const doctorSnap = await getDoc(doctorRef);
              if (doctorSnap.exists()) {
                const doctorData = doctorSnap.data();
                doctorName =
                  `Dr. ${doctorData.firstName || ""} ${doctorData.lastName || ""}`.trim() ||
                  "Doctor";
              }
            }

            // Create notification for patient
            const hasRequirements =
              this.medicalDetails.medicalRequirements &&
              this.medicalDetails.medicalRequirements.length > 0;
            const message = hasRequirements
              ? `${doctorName} has added medical details and requested ${this.medicalDetails.medicalRequirements.length} medical requirement(s) for your appointment on ${appointmentData.date}`
              : `${doctorName} has added medical details for your appointment on ${appointmentData.date}`;

            await addDoc(collection(db, "notifications"), {
              userId: appointmentData.patientId,
              message: message,
              read: false,
              createdAt: new Date(),
              type: "medical_details_added",
              bookingId: appointmentId,
              doctorName: doctorName,
              hasRequirements: hasRequirements,
            });
          }
        }
      } catch (error) {
        console.error("Error sending notification to patient:", error);
      }
    },
    hasMedicalDetails(appointmentId) {
      return this.appointmentsWithDetails.has(appointmentId);
    },
    async checkAppointmentsWithDetails() {
      this.appointmentsWithDetails.clear();
      for (const appointment of this.appointments) {
        try {
          const detailsRef = collection(db, "bookings", appointment.id, "medicalDetails");
          const querySnapshot = await getDocs(detailsRef);
          if (!querySnapshot.empty) {
            this.appointmentsWithDetails.add(appointment.id);
          }
        } catch (error) {
          console.error(`Error checking medical details for appointment ${appointment.id}:`, error);
        }
      }
    },
    async sendCompletionNotification(appointmentId) {
      try {
        // Get appointment details
        const appointmentRef = doc(db, "bookings", appointmentId);
        const appointmentSnap = await getDoc(appointmentRef);

        if (appointmentSnap.exists()) {
          const appointmentData = appointmentSnap.data();

          if (appointmentData.patientId) {
            // Get doctor name
            const user = auth.currentUser;
            let doctorName = "Doctor";
            if (user) {
              const doctorRef = doc(db, "doctors", user.uid);
              const doctorSnap = await getDoc(doctorRef);
              if (doctorSnap.exists()) {
                const doctorData = doctorSnap.data();
                doctorName =
                  `Dr. ${doctorData.firstName || ""} ${doctorData.lastName || ""}`.trim() ||
                  "Doctor";
              }
            }

            // Create notification for patient
            await addDoc(collection(db, "notifications"), {
              userId: appointmentData.patientId,
              message: `Your appointment on ${appointmentData.date} at ${appointmentData.time} has been marked as completed by ${doctorName}.`,
              read: false,
              createdAt: new Date(),
              type: "appointment_completed",
              bookingId: appointmentId,
              doctorName: doctorName,
            });
          }
        }
      } catch (error) {
        console.error("Error sending completion notification:", error);
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
