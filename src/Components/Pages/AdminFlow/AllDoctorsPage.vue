<template>
  <div class="w-full dark:bg-gray-900 min-h-screen transition-all duration-300">
    <main-nav />
    <div
      class="pl-2 sm:pl-4 md:pl-8 pr-2 sm:pr-4 md:pr-20 mt-4 sm:mt-8 flex flex-col gap-4 sm:gap-6"
    >
      <!--Page titles-->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold dark:text-white">{{ $t("allDoctors") }}</h1>
        <p class="text-gray-500 dark:text-gray-400">{{ $t("manageDoctors") }}</p>
      </div>

      <!-- Search and Filter Section -->
      <div class="search-filter-section mb-4 sm:mb-6">
        <div class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div class="flex flex-col md:flex-row gap-4 flex-1">
            <div class="search-box relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search doctors by name or speciality..."
                class="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <svg
                class="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <div class="filter-box">
              <select
                v-model="specialtyFilter"
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="">{{ $t("allSpecialties") }}</option>
                <option v-for="specialty in uniqueSpecialties" :key="specialty" :value="specialty">
                  {{ specialty }}
                </option>
              </select>
            </div>

            <div class="filter-box">
              <select
                v-model="statusFilter"
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="">{{ $t("allStatuses") }}</option>
                <option v-for="status in uniqueStatuses" :key="status" :value="status">
                  {{ status }}
                </option>
              </select>
            </div>
          </div>
          <div class="export-buttons flex flex-col sm:flex-row gap-2">
            <button
              @click="exportToCSV"
              class="px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {{ $t("exportCSV") }}
            </button>
            <button
              @click="exportToPDF"
              class="px-3 sm:px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {{ $t("exportPDF") }}
            </button>
          </div>
        </div>
      </div>

      <!-- Doctors Grid -->
      <div class="doctors-grid">
        <div
          v-if="loading"
          class="text-center w-full flex items-center justify-center py-8 sm:py-12"
        >
          <div class="flex flex-col items-center justify-center">
            <svg
              aria-hidden="true"
              class="w-8 h-8 text-gray-200 dark:text-gray-600 animate-spin fill-blue-600"
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
            <p class="mt-4 text-gray-600 dark:text-gray-400">{{ $t("loadingDoctors") }}</p>
          </div>
        </div>
        <div v-else-if="filteredDoctors.length === 0" class="text-center py-8 sm:py-12">
          <p class="text-gray-500 dark:text-gray-400 text-lg">
            {{
              specialtyFilter
                ? $t("noDoctorsInSpecialty", { specialty: specialtyFilter })
                : $t("noDoctorsFound")
            }}
          </p>
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div
            v-for="(doctor, index) in filteredDoctors"
            :key="doctor.id"
            class="doctor-card bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-700 overflow-hidden hover:shadow-2xl dark:hover:shadow-gray-600 transition-all duration-500 animate-fadeInUp cursor-pointer border border-gray-200 dark:border-gray-700 mx-2 sm:mx-0"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="relative bgDoc">
              <img
                :src="doctor.profileImageUrl"
                alt=""
                v-if="doctor.profileImageUrl"
                class="w-full h-48 object-contain m-auto"
              />
              <div v-else class="w-full h-48 flex items-center justify-center">
                <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div
                class="absolute top-4 right-4 backdrop-blur-sm rounded-full px-3 py-1 bg-blue-100 dark:bg-blue-900"
              >
                <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {{ doctor.yearsOfExperience }} {{ $t("yearsExp") }}
                </p>
              </div>
              <!-- <div class="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <h3 class="text-lg font-bold text-gray-800">
                  {{ doctor.firstName }} {{ doctor.lastName }}
                </h3>
                <p class="text-sm text-blue-600 font-medium">{{ doctor.speciality }}</p>
              </div> -->
            </div>
            <div class="p-4 sm:p-6">
              <div class="flex justify-between mb-2">
                <h1 class="text-lg font-bold text-gray-800 dark:text-gray-200">
                  {{ doctor.firstName }} {{ doctor.lastName }}
                </h1>
                <p class="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  {{ doctor.speciality }}
                </p>
              </div>
              <div class="flex items-center gap-2 mb-2 justify-between">
                <div class="flex">
                  <svg
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <a
                    :href="
                      'https://www.google.com/maps?q=' + encodeURIComponent(doctor.clinicAddress)
                    "
                    target="_blank"
                    class="text-sm text-gray-600 dark:text-gray-400 truncate hover:text-blue-600 dark:hover:text-blue-400"
                    @click.stop
                    >{{ doctor.clinicAddress }}</a
                  >
                </div>

                <p class="text-sm text-blue-600 dark:text-blue-400 font-medium px-1">
                  {{ doctor.degree }}
                </p>
              </div>
              <div class="flex items-center gap-2 mb-4 justify-between w-full">
                <div class="flex justify-between">
                  <svg
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16 7a1 1 0 10-2 0v1H5V7a1 1 0 00-2 0v1H2a2 2 0 00-2 2v7a2 2 0 002 2h16a2 2 0 002-2V10a2 2 0 00-2-2h-1V7zM4 5a1 1 0 011-1h10a1 1 0 011 1v1H4V5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <p
                    class="text-sm text-gray-600 dark:text-gray-400 cursor-pointer px-1 hover:text-blue-600 dark:hover:text-blue-400"
                    @click.stop="openBookingsModal(doctor)"
                  >
                    {{ doctor.patientCount || 0 }} {{ $t("patients") }}
                  </p>
                </div>
                <div class="flex flex-wrap gap-1">
                  <span class="text-sm text-blue-600 dark:text-blue-400 font-medium"
                    >{{ $t("services") }}:</span
                  >
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="service in doctor.services"
                      :key="service"
                      class="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full font-medium"
                    >
                      {{ service }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex flex-col sm:flex-row gap-2">
                <button
                  @click.stop="openDetailsModal(doctor)"
                  class="flex-1 bg-[#212D66] text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  {{ $t("viewDetails") }}
                </button>
                <button
                  @click.stop="openDeleteModal(doctor)"
                  class="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg font-medium hover:from-red-600 hover:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Doctor Details Modal -->
      <UiModal
        v-model="showDetailsModal"
        :title="'👨‍⚕️ Doctor Details'"
        @close="closeDetailsModal"
        class="doctor-details-modal w-full sm:w-auto"
      >
        <div v-if="selectedDoctor" class="doctor-details-content">
          <div class="doctor-avatar">
            <img
              :src="selectedDoctor.profileImageUrl"
              alt=""
              v-if="selectedDoctor.profileImageUrl"
              class="w-24 h-24 rounded-full object-cover border-4 border-blue-200 dark:border-blue-700"
            />
            <div
              v-else
              class="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center border-4 border-blue-200 dark:border-blue-700"
            >
              <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <div class="doctor-info">
            <div class="info-item">
              <span class="info-label">👤 {{ $t("name") }}:</span>
              <span class="info-value text-gray-900 dark:text-gray-100"
                >{{ selectedDoctor.firstName }} {{ selectedDoctor.lastName }}</span
              >
            </div>
            <div class="info-item">
              <span class="info-label">📧 {{ $t("email") }}:</span>
              <span class="info-value text-gray-900 dark:text-gray-100">{{
                selectedDoctor.email
              }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">📱 {{ $t("phone") }}:</span>
              <span class="info-value text-gray-900 dark:text-gray-100">{{
                selectedDoctor.phone
              }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">🏥 {{ $t("speciality") }}:</span>
              <span class="info-value text-gray-900 dark:text-gray-100">{{
                selectedDoctor.speciality
              }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">📍 {{ $t("clinicAddress") }}:</span>
              <span class="info-value text-gray-900 dark:text-gray-100">{{
                selectedDoctor.clinicAddress
              }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">⭐{{ $t("experience") }}</span>
              <span class="info-value text-gray-900 dark:text-gray-100"
                >{{ selectedDoctor.yearsOfExperience }} years</span
              >
            </div>
            <div class="info-item">
              <span class="info-label">📊 {{ $t("patientCount") }}:</span>
              <span class="info-value text-gray-900 dark:text-gray-100">{{
                selectedDoctor.patientCount || 0
              }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">📊 {{ $t("status") }}:</span>
              <span class="info-value text-gray-900 dark:text-gray-100">{{
                selectedDoctor.status || "pending"
              }}</span>
            </div>
          </div>
          <div class="modal-actions">
            <div class="flex gap-4 justify-center">
              <button @click="deleteFromDetails" class="modal-delete-btn">
                🗑️ {{ $t("deleteDoctor") }}
              </button>
            </div>
          </div>
        </div>
      </UiModal>

      <!-- Delete Confirmation Modal -->
      <UiModal
        v-model="showDeleteModal"
        :title="'⚠️ Confirm Delete'"
        @close="cancelDelete"
        class="delete-modal w-full sm:w-auto"
      >
        <div v-if="doctorToDelete" class="delete-modal-content">
          <div class="delete-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 class="delete-title text-gray-900 dark:text-gray-100">
            Are you sure you want to delete this doctor?
          </h3>
          <div class="delete-doctor-info">
            <p class="text-gray-900 dark:text-gray-100">
              <strong class="text-gray-700 dark:text-gray-300">{{ $t("name") }}:</strong>
              {{ doctorToDelete.firstName }} {{ doctorToDelete.lastName }}
            </p>
            <p class="text-gray-900 dark:text-gray-100">
              <strong class="text-gray-700 dark:text-gray-300">{{ $t("email") }}:</strong>
              {{ doctorToDelete.email }}
            </p>
            <p class="text-gray-900 dark:text-gray-100">
              <strong class="text-gray-700 dark:text-gray-300">{{ $t("speciality") }}:</strong>
              {{ doctorToDelete.speciality }}
            </p>
          </div>
          <div class="reason-input">
            <label for="delete-reason" class="reason-label">{{ $t("reasonForDeletion") }}</label>
            <textarea
              id="delete-reason"
              v-model="reason"
              placeholder="Enter the reason for deletion..."
              class="reason-textarea"
              rows="3"
            ></textarea>
          </div>
          <p class="delete-warning text-gray-700 dark:text-gray-300">
            {{ $t("deleteWarningDoc") }}
          </p>
        </div>
        <template #footer>
          <div class="delete-modal-footer">
            <button @click="cancelDelete" class="cancel-btn">{{ $t("cancel") }}</button>
            <button @click="confirmDelete" class="delete-btn" :disabled="!reason.trim()">
              {{ $t("yesDelete") }}
            </button>
          </div>
        </template>
      </UiModal>

      <!-- Bookings Modal -->
      <UiModal
        v-model="showBookingsModal"
        :title="'📅 Doctor Bookings'"
        @close="closeBookingsModal"
        class="bookings-modal w-full sm:w-auto"
      >
        <div v-if="selectedDoctorForBookings" class="bookings-content">
          <div class="doctor-info-section">
            <h3 class="doctor-name text-gray-900 dark:text-gray-100">
              {{ selectedDoctorForBookings.firstName }} {{ selectedDoctorForBookings.lastName }}
            </h3>
            <p class="doctor-speciality text-gray-600 dark:text-gray-400">
              {{ selectedDoctorForBookings.speciality }}
            </p>
          </div>
          <div v-if="bookings.length === 0" class="no-bookings">
            <p class="text-gray-500 dark:text-gray-400">{{ $t("noBookings") }}</p>
          </div>
          <div v-else class="bookings-list">
            <div
              v-for="booking in bookings"
              :key="booking.id"
              class="booking-item bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            >
              <div class="booking-header">
                <span class="booking-date text-gray-900 dark:text-gray-100">{{
                  formatDate(booking.date)
                }}</span>
                <span class="booking-time text-gray-600 dark:text-gray-400">{{
                  booking.time
                }}</span>
              </div>
              <div class="booking-details">
                <p class="text-gray-900 dark:text-gray-100">
                  <strong class="text-gray-700 dark:text-gray-300">{{ $t("patient") }}:</strong>
                  {{ booking.patientName }}
                </p>
                <p class="text-gray-900 dark:text-gray-100">
                  <strong class="text-gray-700 dark:text-gray-300">{{ $t("status") }}:</strong>
                  <span :class="getStatusClass(booking.status)">{{ booking.status }}</span>
                </p>
                <p class="text-gray-900 dark:text-gray-100">
                  <strong class="text-gray-700 dark:text-gray-300">{{ $t("notes") }}:</strong>
                  {{ booking.notes || $t("na") }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </UiModal>
    </div>
  </div>
</template>

<script>
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  query,
  where,
  addDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebase";

import UiModal from "@/Components/UI/Modal.vue";
import MainNav from "@/Components/Layouts/MainNav.vue";
import emailjs from "emailjs-com";
import axios from "axios";

export default {
  name: "AllDoctorsPage",
  components: {
    UiModal,
    MainNav,
  },
  data() {
    return {
      doctors: [],
      loading: true,
      showDetailsModal: false,
      selectedDoctor: null,
      showDeleteModal: false,
      doctorToDelete: null,
      reason: "",
      showBookingsModal: false,
      bookings: [],
      selectedDoctorForBookings: null,
      searchQuery: "",
      statusFilter: "",
      specialtyFilter: "",
      deleting: false,
    };
  },
  async mounted() {
    await this.fetchDoctors();
  },
  computed: {
    uniqueSpecialties() {
      const specialties = this.doctors.map((doctor) => doctor.speciality).filter(Boolean);
      return [...new Set(specialties)].sort();
    },
    uniqueStatuses() {
      const statuses = this.doctors.map((doctor) => doctor.status || "pending").filter(Boolean);
      return [...new Set(statuses)].sort();
    },
    filteredDoctors() {
      let filtered = this.doctors;

      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (doctor) =>
            `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(query) ||
            doctor.speciality.toLowerCase().includes(query)
        );
      }

      // Filter by status
      if (this.statusFilter) {
        filtered = filtered.filter((doctor) => doctor.status === this.statusFilter);
      }

      // Filter by specialty
      if (this.specialtyFilter) {
        filtered = filtered.filter((doctor) => doctor.speciality === this.specialtyFilter);
      }

      return filtered;
    },
  },
  methods: {
    async fetchDoctors() {
      try {
        const querySnapshot = await getDocs(collection(db, "doctors"));
        const doctorsData = await Promise.all(
          querySnapshot.docs.map(async (docSnap) => {
            const doctorData = { id: docSnap.id, ...docSnap.data() };

            // Fetch services
            try {
              const servicesRef = collection(db, "doctors", docSnap.id, "services");
              const servicesSnapshot = await getDocs(servicesRef);
              doctorData.services = servicesSnapshot.docs.map(
                (serviceDoc) => serviceDoc.data().name
              );
            } catch (error) {
              console.error("Error fetching services:", error);
              doctorData.services = [];
            }

            // Fetch availability
            try {
              const availabilityRef = doc(db, "doctorAvailability", docSnap.id);
              const availabilitySnap = await getDoc(availabilityRef);
              if (availabilitySnap.exists()) {
                const availabilityData = availabilitySnap.data().availability || [];
                doctorData.availableDays = availabilityData
                  .filter((day) => day.available)
                  .map((day) => day.name);
              } else {
                doctorData.availableDays = [];
              }
            } catch (error) {
              console.error("Error fetching availability:", error);
              doctorData.availableDays = [];
            }

            // Calculate patient count from bookings
            try {
              const bookingsRef = collection(db, "bookings");
              const q = query(bookingsRef, where("doctorId", "==", docSnap.id));
              const bookingsSnapshot = await getDocs(q);
              doctorData.patientCount = bookingsSnapshot.size;
            } catch (error) {
              console.error("Error fetching patient count:", error);
              doctorData.patientCount = 0;
            }

            return doctorData;
          })
        );

        this.doctors = doctorsData;
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        this.loading = false;
      }
    },
    openDetailsModal(doctor) {
      this.selectedDoctor = doctor;
      this.showDetailsModal = true;
    },
    closeDetailsModal() {
      this.showDetailsModal = false;
      this.selectedDoctor = null;
    },
    openDeleteModal(doctor) {
      this.doctorToDelete = doctor;
      this.showDeleteModal = true;
    },
    cancelDelete() {
      this.showDeleteModal = false;
      this.doctorToDelete = null;
      this.reason = "";
    },
    async confirmDelete() {
      if (!this.doctorToDelete || !this.reason.trim() || this.deleting) return;
      this.deleting = true;
      try {
        console.log(`🗑️ Starting deletion process for doctor: ${this.doctorToDelete.id}`);

        // 1. Query ALL bookings for the doctor (not just confirmed)
        const now = new Date();
        // Normalize current date to start of day for accurate comparison
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const allBookingsQuery = query(
          collection(db, "bookings"),
          where("doctorId", "==", this.doctorToDelete.id)
        );
        const querySnapshot = await getDocs(allBookingsQuery);

        console.log(`📋 Total bookings found: ${querySnapshot.docs.length}`);
        console.log(`📅 Today's date (normalized): ${today.toISOString().split("T")[0]}`);

        // Filter for upcoming confirmed bookings
        const upcomingBookings = querySnapshot.docs.filter((doc) => {
          const data = doc.data();
          // Parse the booking date and normalize to start of day
          const bookingDate = new Date(data.date);
          const normalizedBookingDate = new Date(
            bookingDate.getFullYear(),
            bookingDate.getMonth(),
            bookingDate.getDate()
          );

          // Compare dates without time component
          const isUpcoming = normalizedBookingDate >= today;
          const isConfirmed = data.status === "confirmed";

          console.log(
            `Booking ${doc.id}: date=${data.date}, normalizedDate=${
              normalizedBookingDate.toISOString().split("T")[0]
            }, status=${data.status}, isUpcoming=${isUpcoming}, isConfirmed=${isConfirmed}`
          );
          return isUpcoming && isConfirmed;
        });

        console.log(`📅 Upcoming confirmed bookings to process: ${upcomingBookings.length}`);

        let notificationsSent = 0;
        let emailsSent = 0;
        let emailsFailed = 0;

        // 2. For each upcoming booking, cancel, notify, and refund the patient.
        for (const bookingDoc of upcomingBookings) {
          const bookingData = bookingDoc.data();
          const bookingId = bookingDoc.id;

          // 2a. Update booking status to "cancelled"
          await updateDoc(doc(db, "bookings", bookingId), { status: "cancelled" });

          // 2b. Add a notification for the patient
          try {
            await addDoc(collection(db, "notifications"), {
              userId: bookingData.patientId,
              message: `Your appointment with Dr. ${this.doctorToDelete.firstName} ${this.doctorToDelete.lastName} on ${bookingData.date} at ${bookingData.time} has been cancelled due to doctor removal.`,
              type: "appointment_cancelled",
              read: false,
              createdAt: new Date(),
            });
            notificationsSent++;
            console.log(`✅ Notification sent to patient ${bookingData.patientId}`);
          } catch (notifError) {
            console.error(`❌ Failed to send notification for booking ${bookingId}:`, notifError);
          }

          // 2c. Refund the full amount to the patient's wallet
          const patientRef = doc(db, "patients", bookingData.patientId);
          const patientSnap = await getDoc(patientRef);

          // Convert price to number to ensure proper addition
          const refundAmount = parseFloat(bookingData.price) || 0;

          console.log(`Processing refund for patient ${bookingData.patientId}: $${refundAmount}`);

          if (patientSnap.exists()) {
            const currentBalance = parseFloat(patientSnap.data().wallet) || 0;
            const newBalance = currentBalance + refundAmount;

            console.log(`Current balance: $${currentBalance}, New balance: $${newBalance}`);

            await updateDoc(patientRef, { wallet: newBalance });
          } else {
            // If patient doc doesn't exist, create it with the refunded amount
            console.log(`Creating new patient wallet with $${refundAmount}`);
            await setDoc(patientRef, { wallet: refundAmount }, { merge: true });
          }

          // 2d. Add a transaction record for the refund
          await addDoc(collection(db, "patients", bookingData.patientId, "transactions"), {
            type: "refund",
            amount: refundAmount,
            description: `Refund for cancelled appointment with Dr. ${this.doctorToDelete.firstName} ${this.doctorToDelete.lastName}`,
            date: new Date(),
          });

          console.log(`✅ Refund processed successfully for booking ${bookingId}`);

          // 2e. Send a cancellation email to the patient
          try {
            await axios.post("http://localhost:4242/send-doctor-deletion-cancellation-email", {
              patientId: bookingData.patientId,
              patientName: bookingData.patientName,
              doctorName: `${this.doctorToDelete.firstName} ${this.doctorToDelete.lastName}`,
              date: bookingData.date,
              time: bookingData.time,
              refundAmount: bookingData.price,
            });
            emailsSent++;
            console.log(`✅ Email sent to patient ${bookingData.patientId}`);
          } catch (emailError) {
            emailsFailed++;
            console.error(`❌ Failed to send email for booking ${bookingId}:`, emailError);
            // Show warning but continue with deletion
            if (emailError.code === "ERR_NETWORK" || emailError.message.includes("ECONNREFUSED")) {
              console.warn(
                "⚠️ Email server not running on port 4242. Notifications sent via Firestore only."
              );
            }
          }
        }

        // Log summary
        console.log(`\n📊 Deletion Summary:`);
        console.log(`   - Total bookings found: ${querySnapshot.docs.length}`);
        console.log(`   - Upcoming bookings cancelled: ${upcomingBookings.length}`);
        console.log(`   - Notifications sent: ${notificationsSent}`);
        console.log(`   - Emails sent: ${emailsSent}`);
        console.log(`   - Emails failed: ${emailsFailed}`);

        // 3. Update all other (past) bookings to "cancelled" status to maintain historical integrity
        const pastBookingsQuery = query(
          collection(db, "bookings"),
          where("doctorId", "==", this.doctorToDelete.id)
        );
        const allBookingsSnapshot = await getDocs(pastBookingsQuery);
        const updatePromises = allBookingsSnapshot.docs
          .filter((doc) => doc.data().status !== "cancelled")
          .map((bookingDoc) =>
            updateDoc(doc(db, "bookings", bookingDoc.id), { status: "cancelled" })
          );
        await Promise.all(updatePromises);

        // 4. Clean up other related doctor data

        // Delete related payments (if any)
        const paymentsQuery = query(
          collection(db, "payments"),
          where("doctorId", "==", this.doctorToDelete.id)
        );
        const paymentsSnapshot = await getDocs(paymentsQuery);
        await Promise.all(paymentsSnapshot.docs.map((doc) => deleteDoc(doc.ref)));

        // Delete related notifications for the doctor
        const notificationsQuery = query(
          collection(db, "notifications"),
          where("userId", "==", this.doctorToDelete.id)
        );
        const notificationsSnapshot = await getDocs(notificationsQuery);
        await Promise.all(notificationsSnapshot.docs.map((doc) => deleteDoc(doc.ref)));

        // Delete the doctor's services subcollection
        const servicesRef = collection(db, "doctors", this.doctorToDelete.id, "services");
        const servicesSnapshot = await getDocs(servicesRef);
        await Promise.all(servicesSnapshot.docs.map((doc) => deleteDoc(doc.ref)));

        // Delete the doctor's availability document
        const availabilityDocRef = doc(db, "doctorAvailability", this.doctorToDelete.id);
        if ((await getDoc(availabilityDocRef)).exists()) {
          await deleteDoc(availabilityDocRef);
        }

        // 5. Finally, delete the doctor document itself
        await deleteDoc(doc(db, "doctors", this.doctorToDelete.id));

        // 6. Send a deletion confirmation email to the doctor
        await this.sendDeletionEmail(this.doctorToDelete, this.reason);

        // Show success message with summary
        const summaryMessage =
          upcomingBookings.length > 0
            ? `Doctor deleted successfully!\n\n📊 Summary:\n- ${
                upcomingBookings.length
              } upcoming appointment(s) cancelled\n- ${notificationsSent} notification(s) sent\n- ${emailsSent} email(s) sent${
                emailsFailed > 0 ? `\n- ${emailsFailed} email(s) failed (check server)` : ""
              }`
            : `Doctor deleted successfully!\n\nNo upcoming appointments were found.`;

        console.log(summaryMessage)

        // Close modal and refresh list
        this.showDeleteModal = false;
        this.doctorToDelete = null;
        this.reason = "";
        await this.fetchDoctors();
      } catch (error) {
        console.error("❌ Error deleting doctor:", error);
        alert(`Failed to delete doctor: ${error.message}\n\nPlease check the console for details.`);
      } finally {
        this.deleting = false;
      }
    },
    deleteFromDetails() {
      this.doctorToDelete = this.selectedDoctor;
      this.showDetailsModal = false;
      this.showDeleteModal = true;
    },
    exportToCSV() {
      const headers = [
        "Name",
        "Email",
        "Phone",
        "Speciality",
        "Clinic Address",
        "Experience",
        "Status",
        "Services",
        "Available Days",
        "Patient Count",
      ];
      const csvContent = [
        headers.join(","),
        ...this.filteredDoctors.map((doctor) =>
          [
            `"${doctor.firstName} ${doctor.lastName}"`,
            `"${doctor.email}"`,
            `"${doctor.phone}"`,
            `"${doctor.speciality}"`,
            `"${doctor.clinicAddress}"`,
            doctor.yearsOfExperience,
            doctor.status || "pending",
            doctor.services ? `"${doctor.services.join(", ")}"` : "N/A",
            doctor.availableDays ? `"${doctor.availableDays.join(", ")}"` : "N/A",
            doctor.patientCount || "0",
          ].join(",")
        ),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "doctors.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    exportToPDF() {
      import("jspdf").then(({ jsPDF }) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        let yPosition = margin;

        // Title
        doc.setFontSize(20);
        doc.text("Doctors List", pageWidth / 2, yPosition, { align: "center" });
        yPosition += 20;

        // Table headers
        const headers = [
          "Name",
          "Email",
          "Phone",
          "Speciality",
          "Clinic Address",
          "Experience",
          "Status",
          "Services",
          "Available Days",
          "Patient Count",
        ];
        const columnWidths = [30, 40, 30, 30, 40, 25, 20, 40, 40, 25];
        let xPosition = margin;

        doc.setFontSize(12);
        headers.forEach((header, index) => {
          doc.text(header, xPosition, yPosition);
          xPosition += columnWidths[index];
        });

        yPosition += 10;

        // Table rows
        this.filteredDoctors.forEach((doctor) => {
          if (yPosition > pageHeight - margin) {
            doc.addPage();
            yPosition = margin;
          }

          xPosition = margin;
          const rowData = [
            `${doctor.firstName} ${doctor.lastName}`,
            doctor.email,
            doctor.phone,
            doctor.speciality,
            doctor.clinicAddress,
            `${doctor.yearsOfExperience} yrs`,
            doctor.status || "pending",
            doctor.services ? doctor.services.join(", ") : "N/A",
            doctor.availableDays ? doctor.availableDays.join(", ") : "N/A",
            doctor.patientCount || "0",
          ];

          rowData.forEach((data, index) => {
            const maxWidth = columnWidths[index] - 2;
            const lines = doc.splitTextToSize(data, maxWidth);
            lines.forEach((line) => {
              doc.text(line, xPosition, yPosition);
              yPosition += 5;
            });
            xPosition += columnWidths[index];
          });

          yPosition += 5; // Space between rows
        });

        // Save the PDF
        doc.save("doctors-list.pdf");
      });
    },
    openBookingsModal(doctor) {
      this.selectedDoctorForBookings = doctor;
      this.showBookingsModal = true;
      this.fetchBookingsForDoctor(doctor.id);
    },
    closeBookingsModal() {
      this.showBookingsModal = false;
      this.selectedDoctorForBookings = null;
      this.bookings = [];
    },
    async fetchBookingsForDoctor(doctorId) {
      try {
        const bookingsRef = collection(db, "bookings");
        const q = query(bookingsRef, where("doctorId", "==", doctorId));
        const querySnapshot = await getDocs(q);
        this.bookings = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    getStatusClass(status) {
      switch (status) {
        case "confirmed":
          return "status-confirmed";
        case "pending":
          return "status-pending";
        case "cancelled":
          return "status-cancelled";
        default:
          return "";
      }
    },
    async sendDeletionEmail(doctor, reason) {
      try {
        await emailjs.send(
          "service_g5dy675",
          "template_z52cr9c",
          {
            user_name: `${doctor.firstName} ${doctor.lastName}`,
            user_email: doctor.email,
            delete_reason: reason,
          },
          "5QhAD69rcdQqCGhSK"
        );
        console.log("✅ Email sent successfully!");
      } catch (error) {
        console.error("❌ Error sending email:", error);
        throw error;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.bgDoc {
  background: linear-gradient(135deg, #e4e4e5 0%, #c4ceda 100%);
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
}

.doctor-card {
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  img {
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
}

.doctor-details-modal {
  // background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 2px solid #0ea5e9;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  animation: modalSlideIn 0.4s ease-out;

  .dark & {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    border-color: #3b82f6;
  }

  .doctor-details-content {
    text-align: center;
    padding: 20px 0;
  }

  .doctor-avatar {
    margin-bottom: 24px;
    display: flex;
    justify-content: center;

    img,
    div {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
  }

  .doctor-info {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 500px;
    margin: 0 auto;

    .info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
      border-radius: 12px;
      padding: 16px 20px;
      border: 2px solid #e2e8f0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
      animation: infoItemFadeIn 0.5s ease-out both;
      animation-delay: calc(var(--item-index, 0) * 0.1s + 0.4s);

      .dark & {
        background: linear-gradient(135deg, #374151 0%, #4b5563 100%);
        border-color: #6b7280;
      }

      &:hover {
        transform: translateY(-2px) scale(1.02);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        border-color: #0ea5e9;
        background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);

        .dark & {
          border-color: #3b82f6;
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        }
      }

      .info-label {
        font-weight: 600;
        color: #374151;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 8px;

        .dark & {
          color: #d1d5db;
        }
      }

      .info-value {
        font-weight: 500;
        color: #1f2937;
        font-size: 14px;
        text-align: right;
        max-width: 250px;
        word-break: break-word;

        .dark & {
          color: #f9fafb;
        }
      }
    }

    .info-item:nth-child(1) {
      --item-index: 1;
    }
    .info-item:nth-child(2) {
      --item-index: 2;
    }
    .info-item:nth-child(3) {
      --item-index: 3;
    }
    .info-item:nth-child(4) {
      --item-index: 4;
    }
    .info-item:nth-child(5) {
      --item-index: 5;
    }
    .info-item:nth-child(6) {
      --item-index: 6;
    }
  }

  .modal-actions {
    margin-top: 24px;
    display: flex;
    justify-content: center;
  }

  .modal-delete-btn {
    padding: 12px 24px;
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(239, 68, 68, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }

    &:hover {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 12px rgba(239, 68, 68, 0.4);

      &::before {
        left: 100%;
      }
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 4px 6px rgba(239, 68, 68, 0.3);
    }
  }
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes infoItemFadeIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.delete-modal {
  
  border: 2px solid #fecaca;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

  .dark & {
    background: linear-gradient(135deg, #451a1a 0%, #7f1d1d 100%);
    border-color: #dc2626;
  }

  .delete-modal-content {
    text-align: center;
    padding: 20px 0 20px;
  }

  .delete-icon {
    margin-bottom: 24px;
    display: flex;
    justify-content: center;

    svg {
      filter: drop-shadow(0 4px 6px rgba(239, 68, 68, 0.3));
    }
  }

  .delete-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 20px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

    .dark & {
      color: #f9fafb;
    }
  }

  .delete-doctor-info {
    background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    border: 2px solid #e5e7eb;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);

    .dark & {
      background: linear-gradient(135deg, #374151 0%, #4b5563 100%);
      border-color: #6b7280;
    }

    p {
      margin: 6px 0;
      color: #374151;
      font-size: 15px;
      font-weight: 500;

      .dark & {
        color: #f9fafb;
      }

      strong {
        color: #1f2937;
        font-weight: 700;

        .dark & {
          color: #d1d5db;
        }
      }
    }
  }

  .reason-input {
    margin: 16px 0;
  }

  .reason-label {
    display: block;
    font-weight: 600;
    color: #374151;
    margin-bottom: 8px;

    .dark & {
      color: #d1d5db;
    }
  }

  .reason-textarea {
    width: 100%;
    padding: 12px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 14px;
    resize: vertical;
    min-height: 80px;
    transition: border-color 0.3s ease;
    background: white;
    color: #1f2937;

    .dark & {
      background: #374151;
      color: #f9fafb;
      border-color: #6b7280;
    }

    &:focus {
      outline: none;
      border-color: #0ea5e9;
      box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);

      .dark & {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
    }

    &::placeholder {
      color: #9ca3af;

      .dark & {
        color: #6b7280;
      }
    }
  }

  .delete-warning {
    color: #dc2626;
    font-size: 14px;
    font-weight: 600;
    font-style: italic;
    margin-bottom: 0;
    background: rgba(252, 165, 165, 0.2);
    padding: 12px;
    border-radius: 8px;
    border-left: 4px solid #dc2626;

    .dark & {
      color: #fca5a5;
      background: rgba(220, 38, 38, 0.2);
      border-left-color: #fca5a5;
    }
  }

  .delete-modal-footer {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 16px;
    padding-top: 24px;
    border-top: 2px solid #fecaca;
    background: linear-gradient(135deg, #fef7f7 0%, #fdf2f2 100%);
    margin: 0 -24px -24px;
    padding: 24px;
    border-radius: 0 0 12px 12px;

    @media (min-width: 640px) {
      flex-direction: row;
    }

    .dark & {
      border-top-color: #dc2626;
      background: linear-gradient(135deg, #451a1a 0%, #7f1d1d 100%);
    }
  }

  .cancel-btn {
    padding: 12px 24px;
    background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
    color: #374151;
    border: 2px solid #d1d5db;
    border-radius: 10px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-transform: uppercase;
    letter-spacing: 0.5px;

    .dark & {
      background: linear-gradient(135deg, #374151 0%, #4b5563 100%);
      color: #f9fafb;
      border-color: #6b7280;
    }

    &:hover {
      background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
      border-color: #9ca3af;

      .dark & {
        background: linear-gradient(135deg, #4b5563 0%, #6b7280 100%);
        border-color: #9ca3af;
      }
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }

  .delete-btn {
    padding: 12px 24px;
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(239, 68, 68, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    position: relative;
    overflow: hidden;

    &:disabled {
      background: #9ca3af;
      cursor: not-allowed;
      transform: none;
      box-shadow: 0 2px 4px rgba(156, 163, 175, 0.3);

      .dark & {
        background: #6b7280;
      }
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 12px rgba(239, 68, 68, 0.4);

      &::before {
        left: 100%;
      }
    }

    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 4px 6px rgba(239, 68, 68, 0.3);
    }
  }
}

.bookings-modal {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 2px solid #0ea5e9;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  animation: modalSlideIn 0.4s ease-out;

  .dark & {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    border-color: #3b82f6;
  }

  .bookings-content {
    text-align: center;
    padding: 20px 0;
  }

  .doctor-info-section {
    margin-bottom: 20px;
  }

  .doctor-name {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1f2937;

    .dark & {
      color: #f9fafb;
    }
  }

  .doctor-speciality {
    color: #6b7280;

    .dark & {
      color: #d1d5db;
    }
  }

  .no-bookings {
    padding: 20px;
    color: #6b7280;

    .dark & {
      color: #d1d5db;
    }
  }

  .bookings-list {
    max-height: 400px;
    overflow-y: auto;
  }

  .booking-item {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 12px;

    .dark & {
      background: #374151;
      border-color: #6b7280;
    }
  }

  .booking-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .booking-date,
  .booking-time {
    font-weight: 500;
    color: #1f2937;

    .dark & {
      color: #f9fafb;
    }
  }

  .booking-details p {
    margin: 4px 0;
    color: #374151;

    .dark & {
      color: #f9fafb;
    }

    strong {
      color: #1f2937;

      .dark & {
        color: #d1d5db;
      }
    }
  }
}

.status-confirmed {
  color: green;
}

.status-pending {
  color: orange;
}

.status-cancelled {
  color: red;
}
</style>
