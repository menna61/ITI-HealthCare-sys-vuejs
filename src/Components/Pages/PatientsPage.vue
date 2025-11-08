<template>
  <div class="w-dwh lg:ml-[302px] ml-0">
    <main-nav />
    <div class="px-4 lg:pl-8 lg:pr-20 mt-8 flex flex-col gap-6">
      <!--Page title-->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold">Patients</h1>
        <p class="text-gray-500">Manage your patients data</p>
      </div>

      <!--page content-->

      <div class="tablediv p-6 bg-white dark:bg-gray-800 rounded-xl">
        <div class="tableandsearch flex flex-col gap-4">
          <!--Search component-->
          <div class="search w-full lg:w-auto">
            <form class="w-full lg:w-96">
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >Search</label
              >
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search patient..."
                  required
                />
              </div>
            </form>
          </div>

          <!--Table component-->
          <div class="table w-full">
            <div class="relative overflow-x-auto border border-gray-200 sm:rounded-lg w-full">
              <table
                class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                <thead
                  class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                >
                  <tr>
                    <th scope="col" class="px-6 py-3">Name</th>
                    <th scope="col" class="px-6 py-3">Age</th>
                    <th scope="col" class="px-6 py-3">Gender</th>
                    <th scope="col" class="px-6 py-3">Email</th>
                    <th scope="col" class="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="patient in displayedPatients"
                    :key="patient.id"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {{ patient.name }}
                    </td>
                    <td class="px-6 py-4">
                      {{ patient.age }}
                    </td>
                    <td class="px-6 py-4">
                      {{ patient.gender }}
                    </td>
                    <td class="px-6 py-4">
                      {{ patient.email }}
                    </td>
                    <td class="px-6 py-4">
                      <a
                        @click="viewPatientDetails(patient.id)"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                        >View details</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!--Pagination-->
          <div v-if="totalPages > 1" class="pagination w-full flex justify-center items-center">
            <nav aria-label="Page navigation example">
              <ul class="inline-flex -space-x-px text-base h-10">
                <li>
                  <a
                    @click="previousPage"
                    :class="[
                      'flex items-center justify-center px-4 h-10 ms-0 leading-tight border border-e-0 border-gray-300 rounded-s-lg cursor-pointer',
                      currentPage === 1
                        ? 'text-gray-300 bg-gray-100 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                        : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
                    ]"
                    >Previous</a
                  >
                </li>
                <li v-for="page in totalPages" :key="page">
                  <a
                    @click="goToPage(page)"
                    :class="[
                      'flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 cursor-pointer',
                      page === currentPage
                        ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                        : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
                    ]"
                    >{{ page }}</a
                  >
                </li>
                <li>
                  <a
                    @click="nextPage"
                    :class="[
                      'flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 rounded-e-lg cursor-pointer',
                      currentPage === totalPages
                        ? 'text-gray-300 bg-gray-100 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                        : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
                    ]"
                    >Next</a
                  >
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Patient Details Modal -->
    <UiModal
      v-model="showDetailsModal"
      :title="'Medical Details for ' + (selectedPatient ? selectedPatient.name : '')"
    >
      <!-- Tab Navigation -->
      <div class="mb-6">
        <div class="flex border-b border-gray-200 dark:border-gray-700">
          <button
            @click="activeTab = 'history'"
            :class="[
              'py-2 px-4 text-sm font-medium transition-colors',
              activeTab === 'history'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
            ]"
          >
            Visit History
          </button>
        </div>
      </div>

      <!-- Visit History Tab -->
      <div v-if="activeTab === 'history'" class="space-y-4">
        <div
          v-for="booking in patientBookings"
          :key="booking.id"
          class="border border-gray-200 dark:border-gray-600 rounded-lg p-4"
        >
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                {{ formatDate(booking.date) }} at {{ booking.time }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Status: {{ booking.status }}</p>
            </div>
            <button
              v-if="booking.hasDetails"
              @click="viewBookingDetails(booking.id)"
              class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
            >
              View Details
            </button>
            <span v-else class="text-sm text-gray-500 dark:text-gray-400">
              No details available
            </span>
          </div>
        </div>
        <div
          v-if="patientBookings.length === 0"
          class="text-center py-4 text-gray-500 dark:text-gray-400"
        >
          No visit history available
        </div>
      </div>

      <!-- Medical Details Modal for specific booking -->
      <UiModal
        v-model="showBookingDetailsModal"
        :title="
          'Medical Details for ' +
          (selectedBooking ? formatDate(selectedBooking.date) : '') +
          ' at ' +
          (selectedBooking ? selectedBooking.time : '')
        "
      >
        <!-- Tab Navigation -->
        <div class="mb-6">
          <div class="flex border-b border-gray-200 dark:border-gray-700">
            <button
              @click="detailsActiveTab = 'complaint'"
              :class="[
                'py-2 px-4 text-sm font-medium transition-colors',
                detailsActiveTab === 'complaint'
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
              ]"
            >
              Complaint
            </button>
            <button
              @click="detailsActiveTab = 'prescription'"
              :class="[
                'py-2 px-4 text-sm font-medium transition-colors',
                detailsActiveTab === 'prescription'
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
              ]"
            >
              Prescription
            </button>
          </div>
        </div>

        <!-- Complaint Tab -->
        <div v-if="detailsActiveTab === 'complaint'" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Patient Complaint
            </label>
            <textarea
              v-model="selectedMedicalDetails.patientComplaint"
              readonly
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm bg-gray-100 dark:bg-gray-600 cursor-not-allowed dark:text-white"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Diagnosis
            </label>
            <textarea
              v-model="selectedMedicalDetails.diagnosis"
              readonly
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm bg-gray-100 dark:bg-gray-600 cursor-not-allowed dark:text-white"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Instructions
            </label>
            <textarea
              v-model="selectedMedicalDetails.instructions"
              readonly
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm bg-gray-100 dark:bg-gray-600 cursor-not-allowed dark:text-white"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Allergies
            </label>
            <textarea
              v-model="selectedMedicalDetails.allergies"
              readonly
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm bg-gray-100 dark:bg-gray-600 cursor-not-allowed dark:text-white"
              rows="2"
            ></textarea>
          </div>
        </div>

        <!-- Prescription Tab -->
        <div v-if="detailsActiveTab === 'prescription'" class="space-y-4">
          <div
            v-for="(medication, index) in selectedMedicalDetails.prescriptions"
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
                  readonly
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm bg-gray-100 dark:bg-gray-600 cursor-not-allowed dark:text-white"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Dosage
                </label>
                <input
                  v-model="medication.dosage"
                  readonly
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm bg-gray-100 dark:bg-gray-600 cursor-not-allowed dark:text-white"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Frequency
                </label>
                <input
                  v-model="medication.frequency"
                  readonly
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm bg-gray-100 dark:bg-gray-600 cursor-not-allowed dark:text-white"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Duration
                </label>
                <input
                  v-model="medication.duration"
                  readonly
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm bg-gray-100 dark:bg-gray-600 cursor-not-allowed dark:text-white"
                />
              </div>
            </div>
          </div>
          <div
            v-if="selectedMedicalDetails.prescriptions.length === 0"
            class="text-center py-4 text-gray-500 dark:text-gray-400"
          >
            No prescriptions available
          </div>
        </div>

        <template #footer>
          <button
            @click="showBookingDetailsModal = false"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </template>
      </UiModal>

      <template #footer>
        <button
          @click="showDetailsModal = false"
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Close
        </button>
      </template>
    </UiModal>
  </div>
</template>

<script>
import MainNav from "../Layouts/MainNav.vue";
import UiModal from "../UI/Modal.vue";
import { collection, getDocs, query, where, getDoc, doc } from "firebase/firestore";
import { db, auth } from "@/firebase";

export default {
  name: "PatientsPage",
  components: { MainNav, UiModal },
  data() {
    return {
      patients: [],
      showDetailsModal: false,
      selectedPatient: null,
      activeTab: "history",
      showBookingDetailsModal: false,
      selectedBooking: null,
      selectedMedicalDetails: {
        patientComplaint: "",
        diagnosis: "",
        instructions: "",
        allergies: "",
        prescriptions: [],
      },
      detailsActiveTab: "complaint",
      medicalDetails: {
        patientComplaint: "",
        diagnosis: "",
        instructions: "",
        allergies: "",
        prescriptions: [],
      },
      patientBookings: [],
      patientMedicalDetails: new Map(),
      currentPage: 1,
      itemsPerPage: 6,
    };
  },
  computed: {
    displayedPatients() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.patients.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.patients.length / this.itemsPerPage);
    },
  },
  async mounted() {
    await this.fetchDoctorPatients();
  },
  methods: {
    calculateAge(birthdate) {
      if (!birthdate) return "";
      const today = new Date();
      const birthDate = new Date(birthdate);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    async fetchDoctorPatients() {
      try {
        const user = auth.currentUser;
        if (!user) return;

        // Fetch bookings for the current doctor
        const bookingsCollection = collection(db, "bookings");
        const q = query(bookingsCollection, where("doctorId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        // Collect unique patient IDs
        const patientIds = new Set();
        querySnapshot.forEach((doc) => {
          const booking = doc.data();
          if (booking.patientId) {
            patientIds.add(booking.patientId);
          }
        });

        // Fetch patient details for each unique patient ID
        const patients = [];
        for (const patientId of patientIds) {
          const patientRef = doc(db, "patients", patientId);
          const patientSnap = await getDoc(patientRef);
          if (patientSnap.exists()) {
            const patientData = patientSnap.data();
            let age = patientData.age;
            if (!age && patientData.birthdate) {
              age = this.calculateAge(patientData.birthdate);
            }
            patients.push({
              id: patientId,
              name: `${patientData.firstName || ""} ${patientData.lastName || ""}`.trim(),
              age: age || "",
              gender: patientData.gender || "",
              email: patientData.email || "",
            });
          }
        }

        this.patients = patients;
      } catch (error) {
        console.error("Error fetching doctor patients:", error);
      }
    },
    viewPatientDetails(patientId) {
      this.selectedPatient = this.patients.find((p) => p.id === patientId);
      if (this.selectedPatient) {
        this.fetchPatientMedicalDetails(patientId);
        this.showDetailsModal = true;
      }
    },
    formatDate(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
    viewBookingDetails(bookingId) {
      const details = this.patientMedicalDetails.get(bookingId);
      const booking = this.patientBookings.find((b) => b.id === bookingId);
      if (details && booking) {
        this.selectedMedicalDetails = { ...details };
        this.selectedBooking = booking;
        this.showBookingDetailsModal = true;
      }
    },
    async fetchPatientMedicalDetails(patientId) {
      try {
        // First, find all bookings for this patient
        const bookingsRef = collection(db, "bookings");
        const q = query(bookingsRef, where("patientId", "==", patientId));
        const bookingsSnapshot = await getDocs(q);

        this.patientBookings = [];
        this.patientMedicalDetails.clear();

        let latestMedicalDetails = null;
        let latestBookingDate = null;

        // Process each booking
        for (const bookingDoc of bookingsSnapshot.docs) {
          const bookingId = bookingDoc.id;
          const bookingData = bookingDoc.data();

          // Check if this booking has medical details
          const detailsRef = collection(db, "bookings", bookingId, "medicalDetails");
          const detailsSnapshot = await getDocs(detailsRef);

          let hasDetails = false;
          if (!detailsSnapshot.empty) {
            hasDetails = true;
            const doc = detailsSnapshot.docs[0];
            const data = doc.data();
            const medicalDetails = {
              id: doc.id,
              patientComplaint: data.patientComplaint || "",
              diagnosis: data.diagnosis || "",
              instructions: data.instructions || "",
              allergies: data.allergies || "",
              prescriptions: data.prescriptions || [],
            };
            this.patientMedicalDetails.set(bookingId, medicalDetails);

            // Check if this is the most recent
            const bookingDate = new Date(bookingData.date + " " + bookingData.time);
            if (!latestBookingDate || bookingDate > latestBookingDate) {
              latestBookingDate = bookingDate;
              latestMedicalDetails = medicalDetails;
            }
          }

          // Add booking to list only if completed
          if (bookingData.status === "completed") {
            this.patientBookings.push({
              id: bookingId,
              date: bookingData.date,
              time: bookingData.time,
              status: bookingData.status,
              hasDetails: hasDetails,
            });
          }
        }

        // Sort bookings by date descending (most recent first)
        this.patientBookings.sort(
          (a, b) => new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time)
        );

        // Set latest medical details for default view
        if (latestMedicalDetails) {
          this.medicalDetails = latestMedicalDetails;
        } else {
          this.medicalDetails = {
            patientComplaint: "",
            diagnosis: "",
            instructions: "",
            allergies: "",
            prescriptions: [],
          };
        }
      } catch (error) {
        console.error("Error fetching patient medical details:", error);
        this.medicalDetails = {
          patientComplaint: "",
          diagnosis: "",
          instructions: "",
          allergies: "",
          prescriptions: [],
        };
        this.patientBookings = [];
        this.patientMedicalDetails.clear();
      }
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
};
</script>
