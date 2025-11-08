<template>
  <div class="w-dwh lg:ml-[302px] ml-0">
    <main-nav />
    <div class="px-4 lg:pl-8 lg:pr-20 mt-8 flex flex-col gap-6">
      <!-- Page title -->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold dark:text-white">Medical History</h1>
        <p class="text-gray-500">View your complete medical history from all visits</p>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>

      <!-- Medical history content -->
      <div v-else-if="medicalHistory.length > 0" class="space-y-6">
        <div
          v-for="record in medicalHistory"
          :key="record.id"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <!-- Visit header -->
          <div
            class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors"
            @click="toggleVisit(record.id)"
          >
            <div class="flex justify-between items-start">
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center overflow-hidden"
                >
                  <img
                    v-if="record.profilePic"
                    :src="record.profilePic"
                    :alt="record.doctorName"
                    class="w-full h-full object-cover"
                  />
                  <svg
                    v-else
                    class="w-6 h-6 text-blue-600 dark:text-blue-400"
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
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Dr. {{ record.doctorName }}
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ record.speciality }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-500">
                    {{ formatDate(record.date) }} at {{ record.time }}
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                >
                  {{ record.service }}
                </span>
                <button
                  class="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  :class="expandedVisits.has(record.id) ? 'rotate-180' : ''"
                >
                  <svg
                    class="w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform"
                    :class="expandedVisits.has(record.id) ? 'rotate-180' : ''"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Medical details -->
          <div v-show="expandedVisits.has(record.id)" class="p-6 space-y-6">
            <!-- Complaint -->
            <div
              v-if="record.details.patientComplaint"
              class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
            >
              <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Patient Complaint
              </h4>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                {{ record.details.patientComplaint }}
              </p>
            </div>

            <!-- Diagnosis -->
            <div
              v-if="record.details.diagnosis"
              class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4"
            >
              <h4 class="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">Diagnosis</h4>
              <p class="text-sm text-blue-800 dark:text-blue-200">{{ record.details.diagnosis }}</p>
            </div>

            <!-- Instructions -->
            <div
              v-if="record.details.instructions"
              class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4"
            >
              <h4 class="text-sm font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                Instructions
              </h4>
              <p class="text-sm text-yellow-800 dark:text-yellow-200">
                {{ record.details.instructions }}
              </p>
            </div>

            <!-- Allergies -->
            <div
              v-if="record.details.allergies"
              class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4"
            >
              <h4 class="text-sm font-semibold text-red-900 dark:text-red-100 mb-2">Allergies</h4>
              <p class="text-sm text-red-800 dark:text-red-200">{{ record.details.allergies }}</p>
            </div>

            <!-- Prescriptions -->
            <div
              v-if="record.details.prescriptions && record.details.prescriptions.length > 0"
              class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4"
            >
              <h4 class="text-sm font-semibold text-green-900 dark:text-green-100 mb-3">
                Prescriptions
              </h4>
              <div class="space-y-3">
                <div
                  v-for="(medication, index) in record.details.prescriptions"
                  :key="index"
                  class="bg-white dark:bg-gray-800 rounded-lg p-3 border border-green-200 dark:border-green-700"
                >
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <span
                        class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide"
                        >Medication</span
                      >
                      <p class="text-sm font-medium text-gray-900 dark:text-white">
                        {{ medication.name }}
                      </p>
                    </div>
                    <div>
                      <span
                        class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide"
                        >Dosage</span
                      >
                      <p class="text-sm text-gray-700 dark:text-gray-300">
                        {{ medication.dosage }}
                      </p>
                    </div>
                    <div>
                      <span
                        class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide"
                        >Frequency</span
                      >
                      <p class="text-sm text-gray-700 dark:text-gray-300">
                        {{ medication.frequency }}
                      </p>
                    </div>
                    <div>
                      <span
                        class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide"
                        >Duration</span
                      >
                      <p class="text-sm text-gray-700 dark:text-gray-300">
                        {{ medication.duration }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-12">
        <div
          class="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center"
        >
          <svg
            class="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No Medical History</h3>
        <p class="text-gray-500 dark:text-gray-400">
          You don't have any completed appointments with medical details yet.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from "@/Components/Layouts/MainNav.vue";
import { db, auth } from "@/authHandler.js";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { getStorage, ref as storageRef, getDownloadURL } from "firebase/storage";
import { firebaseApp } from "/src/firebase.js";

// eslint-disable-next-line no-unused-vars
const unused = doc; // Prevent ESLint error for unused import

export default {
  name: "MedicalHistory",
  components: {
    MainNav,
  },
  data() {
    return {
      medicalHistory: [],
      loading: true,
      expandedVisits: new Set(), // Track which visits are expanded
    };
  },
  async mounted() {
    await this.fetchMedicalHistory();
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    toggleVisit(visitId) {
      if (this.expandedVisits.has(visitId)) {
        this.expandedVisits.delete(visitId);
      } else {
        this.expandedVisits.add(visitId);
      }
    },
    async fetchMedicalHistory() {
      try {
        const user = auth.currentUser;
        if (!user) {
          this.$router.push("/login");
          return;
        }

        // Fetch all bookings for this patient
        const bookingsRef = collection(db, "bookings");
        const q = query(
          bookingsRef,
          where("patientId", "==", user.uid),
          where("status", "==", "completed")
        );
        const bookingsSnapshot = await getDocs(q);

        const history = [];

        // Process each completed booking
        for (const bookingDoc of bookingsSnapshot.docs) {
          const bookingId = bookingDoc.id;
          const bookingData = bookingDoc.data();

          // Check if this booking has medical details
          const detailsRef = collection(db, "bookings", bookingId, "medicalDetails");
          const detailsSnapshot = await getDocs(detailsRef);

          if (!detailsSnapshot.empty) {
            const doc = detailsSnapshot.docs[0];
            const data = doc.data();

            // Fetch doctor information
            let doctorName = bookingData.doctorName || "Unknown Doctor";
            let speciality = bookingData.speciality || "General";
            let profilePic = null;

            try {
              if (bookingData.doctorId) {
                const storage = getStorage(firebaseApp);
                const doctorRef = doc(db, "doctors", bookingData.doctorId);
                const doctorSnap = await getDoc(doctorRef);
                if (doctorSnap.exists()) {
                  const doctorData = doctorSnap.data();
                  doctorName =
                    `Dr. ${doctorData.firstName || ""} ${doctorData.lastName || ""}`.trim() ||
                    doctorName;
                  speciality = doctorData.speciality || speciality;

                  // Handle profile picture fetching like in PatientAppointments.vue
                  if (
                    doctorData.profileImageUrl &&
                    typeof doctorData.profileImageUrl === "string"
                  ) {
                    profilePic = doctorData.profileImageUrl;
                  } else if (doctorData.image && typeof doctorData.image === "string") {
                    // If it's a storage path, resolve to download URL
                    if (!doctorData.image.startsWith("http")) {
                      try {
                        const url = await getDownloadURL(storageRef(storage, doctorData.image));
                        profilePic = url;
                      } catch (e) {
                        console.warn("Failed to load doctor image from storage", e);
                      }
                    } else {
                      profilePic = doctorData.image;
                    }
                  }
                }
              }
            } catch (error) {
              console.error("Error fetching doctor info:", error);
            }

            history.push({
              id: bookingId,
              date: bookingData.date,
              time: bookingData.time,
              doctorName,
              speciality,
              profilePic,
              service: bookingData.service || "Consultation",
              details: {
                patientComplaint: data.patientComplaint || "",
                diagnosis: data.diagnosis || "",
                instructions: data.instructions || "",
                allergies: data.allergies || "",
                prescriptions: data.prescriptions || [],
              },
            });
          }
        }

        // Sort by date descending (most recent first)
        this.medicalHistory = history.sort(
          (a, b) => new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time)
        );
      } catch (error) {
        console.error("Error fetching medical history:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
