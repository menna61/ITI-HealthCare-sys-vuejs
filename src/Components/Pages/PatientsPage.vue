<template>
  <div :class="$i18n.locale === 'ar' ? 'lg:ml-0 , lg:mr-[302px]' : 'lg:ml-[302px]'" class="w-dwh">
    <main-nav />
    <div class="px-4 lg:pl-8 lg:pr-20 mt-8 flex flex-col gap-6">
      <!--Page title-->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold">{{ $t("patients_page_title") }}</h1>
        <p class="text-gray-500">{{ $t("manage_patients_data") }}</p>
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
                  :placeholder="$t('search_patient')"
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
                    <th scope="col" class="px-6 py-3">{{ $t("name") }}</th>
                    <th scope="col" class="px-6 py-3">{{ $t("age") }}</th>
                    <th scope="col" class="px-6 py-3">{{ $t("gender") }}</th>
                    <th scope="col" class="px-6 py-3">{{ $t("email") }}</th>
                    <th scope="col" class="px-6 py-3">{{ $t("actions") }}</th>
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
                        >{{ $t("view_details") }}</a
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
                    >{{ $t("previous") }}</a
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
                    >{{ $t("next") }}</a
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
      :title="$t('medical_details_for') + ' ' + (selectedPatient ? selectedPatient.name : '')"
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
            {{ $t("visit_history") }}
          </button>
        </div>
      </div>

      <!-- Visit History Tab -->
      <div v-if="activeTab === 'history'" class="space-y-4">
        <div
          v-for="booking in patientBookings"
          :key="booking.id"
          class="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ formatDate(booking.date) }} at {{ booking.time }}
                </p>
                <span
                  class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                  :class="{
                    'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200':
                      booking.status === 'completed',
                    'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200':
                      booking.status === 'confirmed',
                  }"
                >
                  {{ booking.status }}
                </span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
                <span class="font-medium">{{ $t("doctor") }}:</span> {{ booking.doctorName }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                <span class="font-medium">{{ $t("speciality") }}:</span> {{ booking.speciality }}
              </p>
            </div>
            <button
              v-if="booking.hasDetails"
              @click="viewBookingDetails(booking.id)"
              class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
            >
              {{ $t("view_details_btn") }}
            </button>
            <span v-else class="text-sm text-gray-500 dark:text-gray-400">
              {{ $t("no_details_available") }}
            </span>
          </div>
        </div>
        <div
          v-if="patientBookings.length === 0"
          class="text-center py-4 text-gray-500 dark:text-gray-400"
        >
          {{ $t("no_visit_history") }}
        </div>
      </div>

      <!-- Medical Details Modal for specific booking -->
      <UiModal
        v-model="showBookingDetailsModal"
        :title="
          $t('medical_details_for') +
          ' ' +
          (selectedBooking ? formatDate(selectedBooking.date) : '') +
          ' ' +
          $t('at') +
          ' ' +
          (selectedBooking ? selectedBooking.time : '')
        "
      >
        <!-- Doctor Info Header -->
        <div
          v-if="selectedMedicalDetails.doctorName"
          class="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
        >
          <div class="flex items-center gap-2">
            <svg
              class="w-5 h-5 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                {{ selectedMedicalDetails.doctorName }}
              </p>
              <p class="text-xs text-gray-600 dark:text-gray-400">
                {{ selectedMedicalDetails.speciality }}
              </p>
            </div>
          </div>
        </div>

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
              {{ $t("complaint") }}
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
              {{ $t("prescription") }}
            </button>
            <button
              @click="detailsActiveTab = 'requirements'"
              :class="[
                'py-2 px-4 text-sm font-medium transition-colors',
                detailsActiveTab === 'requirements'
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
              ]"
            >
              {{ $t("medicalRequirements") }}
            </button>
          </div>
        </div>

        <!-- Complaint Tab -->
        <div v-if="detailsActiveTab === 'complaint'" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ $t("patient_complaint") }}
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
              {{ $t("diagnosis") }}
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
              {{ $t("instructions") }}
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
              {{ $t("allergies") }}
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
                  {{ $t("medication_name") }}
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
                  {{ $t("dosage") }}
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
                  {{ $t("frequency") }}
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
                  {{ $t("duration") }}
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
            {{ $t("no_prescriptions_available") }}
          </div>
        </div>

        <!-- Medical Requirements Tab -->
        <div v-if="detailsActiveTab === 'requirements'" class="space-y-4">
          <div
            v-for="(requirement, index) in selectedMedicalDetails.medicalRequirements"
            :key="index"
            class="border border-gray-200 dark:border-gray-600 rounded-lg p-4"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {{ $t("requirementType") }}
                </label>
                <input
                  :value="
                    requirement.type === 'lab'
                      ? $t('labTest')
                      : requirement.type === 'radiology'
                      ? $t('radiology')
                      : $t('otherRequirement')
                  "
                  readonly
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm bg-gray-100 dark:bg-gray-600 cursor-not-allowed dark:text-white"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {{ $t("priority") }}
                </label>
                <input
                  :value="
                    requirement.priority === 'urgent'
                      ? $t('urgent')
                      : requirement.priority === 'normal'
                      ? $t('normal')
                      : $t('optional')
                  "
                  readonly
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm bg-gray-100 dark:bg-gray-600 cursor-not-allowed dark:text-white"
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {{ $t("requirementName") }}
                </label>
                <input
                  v-model="requirement.name"
                  readonly
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm bg-gray-100 dark:bg-gray-600 cursor-not-allowed dark:text-white"
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {{ $t("requirementNotes") }}
                </label>
                <textarea
                  v-model="requirement.notes"
                  readonly
                  class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm bg-gray-100 dark:bg-gray-600 cursor-not-allowed dark:text-white"
                  rows="2"
                ></textarea>
              </div>
              <div v-if="requirement.imageUrl" class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ $t("uploadResults") }}
                  <span v-if="requirement.fileType" class="ml-2 text-xs text-gray-500"
                    >({{ requirement.fileType.toUpperCase() }})</span
                  >
                </label>
                <a
                  :href="requirement.imageUrl"
                  :download="
                    requirement.fileType === 'pdf' ? `${requirement.name || 'document'}.pdf` : true
                  "
                  target="_blank"
                  class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                >
                  <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    ></path>
                  </svg>
                  {{ requirement.fileType === "pdf" ? "Download PDF" : $t("viewImage") }}
                </a>
              </div>
            </div>
          </div>
          <div
            v-if="selectedMedicalDetails.medicalRequirements.length === 0"
            class="text-center py-4 text-gray-500 dark:text-gray-400"
          >
            {{ $t("noRequirementsAdded") }}
          </div>
        </div>

        <template #footer>
          <button
            @click="showBookingDetailsModal = false"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            {{ $t("close") }}
          </button>
        </template>
      </UiModal>

      <template #footer>
        <button
          @click="showDetailsModal = false"
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          {{ $t("close") }}
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
        medicalRequirements: [],
      },
      detailsActiveTab: "complaint",
      medicalDetails: {
        patientComplaint: "",
        diagnosis: "",
        instructions: "",
        allergies: "",
        prescriptions: [],
        medicalRequirements: [],
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
        // Find ALL bookings for this patient (regardless of doctor)
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

          // Get doctor information for this booking
          let doctorName = "Unknown Doctor";
          let speciality = "General";

          try {
            if (bookingData.doctorId) {
              const doctorRef = doc(db, "doctors", bookingData.doctorId);
              const doctorSnap = await getDoc(doctorRef);
              if (doctorSnap.exists()) {
                const doctorData = doctorSnap.data();
                doctorName =
                  `Dr. ${doctorData.firstName || ""} ${doctorData.lastName || ""}`.trim() ||
                  "Unknown Doctor";
                speciality = doctorData.speciality || "General";
              }
            }
          } catch (error) {
            console.error("Error fetching doctor info:", error);
          }

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
              medicalRequirements: data.medicalRequirements || [],
              doctorName: doctorName,
              speciality: speciality,
            };
            this.patientMedicalDetails.set(bookingId, medicalDetails);

            // Check if this is the most recent
            const bookingDate = new Date(bookingData.date + " " + bookingData.time);
            if (!latestBookingDate || bookingDate > latestBookingDate) {
              latestBookingDate = bookingDate;
              latestMedicalDetails = medicalDetails;
            }
          }

          // Add ALL bookings (completed and confirmed) to show full history
          if (bookingData.status === "completed" || bookingData.status === "confirmed") {
            this.patientBookings.push({
              id: bookingId,
              date: bookingData.date,
              time: bookingData.time,
              status: bookingData.status,
              hasDetails: hasDetails,
              doctorName: doctorName,
              speciality: speciality,
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
            medicalRequirements: [],
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
          medicalRequirements: [],
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
    viewImage(imageUrl) {
      window.open(imageUrl, "_blank");
    },
  },
};
</script>
