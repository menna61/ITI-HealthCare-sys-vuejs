<template>
  <div class="w-full dark:bg-gray-900 min-h-screen transition-all duration-300">
    <main-nav />
    <div class="pl-4 md:pl-8 pr-4 md:pr-20 mt-8 flex flex-col gap-6">
      <!-- Page titles -->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold dark:text-white">{{ $t("dashboard") }}</h1>
        <p class="text-gray-500 dark:text-gray-200">{{ $t("monitor") }}</p>
      </div>

      <!-- Rejection Modal -->
      <UiModal v-model="showRejectionModal" :title="$t('rejectionReason')">
        <form @submit.prevent="submitRejection">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t("enterRejectionReason") }}
            </label>
            <textarea
              v-model="rejectionReason"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
              rows="4"
              :placeholder="$t('rejectionReasonPlaceholder')"
              required
            ></textarea>
          </div>
          <div class="flex justify-end gap-2">
            <button
              type="button"
              @click="closeRejectionModal"
              class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500"
            >
              {{ $t("cancel") }}
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              {{ $t("submitRejection") }}
            </button>
          </div>
        </form>
      </UiModal>
      <!-- Top Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <!-- Total Users -->
        <router-link to="/admin/users">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 dark:text-gray-200 text-sm">{{ $t("totalUsers") }}</p>
                <p class="text-2xl font-bold dark:text-white">{{ totalUsers }}</p>
              </div>
              <div class="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <svg
                  class="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
                </svg>
              </div>
            </div>
          </div>
        </router-link>

        <!-- Active Doctors -->
        <router-link to="/admin/doctors">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 dark:text-gray-200 text-sm">{{ $t("activeDoctors") }}</p>
                <p class="text-2xl font-bold dark:text-white">{{ activeDoctors }}</p>
              </div>
              <div class="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                <svg
                  class="w-6 h-6 text-green-600 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </router-link>

        <!-- Pending Approvals -->
        <router-link to="/admin/documents">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 dark:text-gray-200 text-sm">{{ $t("pendingApprovals") }}</p>
                <p class="text-2xl font-bold dark:text-white">{{ pendingApprovals }}</p>
              </div>
              <div class="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full">
                <svg
                  class="w-6 h-6 text-yellow-600 dark:text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </router-link>

        <!-- Total Appointments -->
        <router-link to="/admin/totalAppointments">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 dark:text-gray-200 text-sm">
                  {{ $t("totalAppointments") }}
                </p>
                <p class="text-2xl font-bold dark:text-white">{{ totalAppointments }}</p>
              </div>
              <div class="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                <svg
                  class="w-6 h-6 text-purple-600 dark:text-purple-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </router-link>

        <!-- Doctor Availability -->
        <router-link to="/admin/doctorAvailability">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 dark:text-gray-200 text-sm">
                  {{ $t("doctorAvailability") }}
                </p>
                <p class="text-2xl font-bold dark:text-white">{{ doctorAvailability }}</p>
              </div>
              <div class="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
                <svg
                  class="w-6 h-6 text-orange-600 dark:text-orange-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <!-- Appointments Chart -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-lg">
          <h3 class="text-lg font-semibold mb-4 dark:text-white">
            {{ $t("appointmentsOverview") }}
          </h3>

          <div class="h-64">
            <canvas ref="appointmentsChart"></canvas>
          </div>
        </div>

        <!-- Users Distribution Chart -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-lg">
          <h3 class="text-lg font-semibold mb-4 dark:text-white">{{ $t("usersDistribution") }}</h3>

          <div class="h-64">
            <canvas ref="usersChart"></canvas>
          </div>
        </div>
      </div>
      <!-- Bottom Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Activities -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-lg">
          <h3 class="text-lg font-semibold mb-4 dark:text-white">{{ $t("recentActivities") }}</h3>
          <div v-if="recentActivities.length === 0" class="text-gray-500 dark:text-gray-200">
            {{ $t("noRecentActivities") }}
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="activity in recentActivities"
              :key="activity.id"
              class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
            >
              <div>
                <p class="text-sm font-medium dark:text-white">
                  {{ activity.patientName }} booked with {{ activity.doctorName }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-200">
                  {{ activity.service }} - {{ activity.date }} at {{ activity.time }}
                </p>
              </div>
              <span
                class="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full"
                >{{ activity.status }}</span
              >
            </div>
          </div>
        </div>

        <!-- Pending Approvals -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-lg">
          <h3 class="text-lg font-semibold mb-4 dark:text-white">{{ $t("approvalsTitle") }}</h3>
          <div v-if="pendingApprovalsList.length === 0" class="text-gray-500 dark:text-gray-200">
            {{ $t("noPendingApprovals") }}
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="item in pendingApprovalsList"
              :key="item.id"
              class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
            >
              <div>
                <p class="text-sm font-medium dark:text-white">
                  {{ item.firstName }} {{ item.lastName }}
                  <span
                    class="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-1 py-0.5 rounded ml-2"
                  >
                    {{ item.type }}
                  </span>
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-200">
                  {{ item.type === "doctor" ? item.speciality : $t("unionCardPending") }}
                </p>
                <div v-if="item.type === 'doctor' && item.unionMembershipCardUrl" class="mt-2">
                  <a :href="item.unionMembershipCardUrl" target="_blank" class="cursor-pointer">
                    <img
                      :src="item.unionMembershipCardUrl"
                      alt="Union Membership Card"
                      class="w-20 h-20 object-cover rounded border hover:opacity-80 transition-opacity"
                    />
                  </a>
                </div>
                <p
                  v-if="item.type === 'patient' && item.unionCardUrl"
                  class="text-xs text-blue-500 dark:text-blue-400"
                >
                  <a :href="item.unionCardUrl" target="_blank" class="underline">
                    {{ $t("viewUnionCard") }}</a
                  >
                </p>
              </div>
              <div class="flex gap-2">
                <button
                  @click="approveItem(item.id, item.type)"
                  class="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full hover:bg-green-200 dark:hover:bg-green-800"
                >
                  {{ $t("approve") }}
                </button>
                <button
                  @click="rejectItem(item.id, item.type)"
                  class="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded-full hover:bg-red-200 dark:hover:bg-red-800"
                >
                  {{ $t("reject") }}
                </button>
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
import UiModal from "@/Components/UI/Modal.vue";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  updateDoc,
  doc,
  addDoc,
  getDoc,
} from "firebase/firestore";
import emailjs from "@emailjs/browser";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController,
  Chart,
} from "chart.js";

// import { Bar, Pie } from "vue-chartjs";
// import { Bar, Pie } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController
);

// ✅ register chart.js modules
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default {
  name: "AdminHome",
  components: { MainNav, UiModal },
  data() {
    return {
      doctorsCount: 0,
      patientsCount: 0,
      bookingsCount: 0,
      av: 0,
      totalUsers: 0,
      activeDoctors: 0,
      pendingApprovals: 0,
      totalAppointments: 0,
      doctorAvailability: 0,
      recentActivities: [],
      pendingApprovalsList: [],
      appointmentsChart: null,
      usersChart: null,
      chartData: {
        appointments: [],
        users: {
          patients: 0,
          doctors: 0,
        },
      },
      showRejectionModal: false,
      rejectionReason: "",
      currentRejectionItem: null,
    };
  },
  mounted() {
    const labelText = this.$t("appointments");
    const titleText = this.$t("monthlyAppointments");
    const usersTitle = this.$t("usersDistribution");
    const totalUsersText = this.$t("totalUsers");
    const doctorsLabel = this.$t("doctors");
    const patientsLabel = this.$t("patients");
    const bookingsLabel = this.$t("bookings");
    const availabilityLabel = this.$t("doctorAvailability");
    console.log(availabilityLabel);
    console.log(this.av);

    this.fetchData().then(() => {
      this.$nextTick(() => {
        this.initializeCharts({
          labelText,
          titleText,
          usersTitle,
          totalUsersText,
          doctorsLabel,
          patientsLabel,
          bookingsLabel,
          availabilityLabel,
        });
      });
    });
  },

  watch: {
    "$i18n.locale"() {
      // خدي النصوص الجديدة بعد التغيير
      const labelText = this.$t("appointments");
      const titleText = this.$t("monthlyAppointments");
      const usersTitle = this.$t("usersDistribution");
      const totalUsersText = this.$t("totalUsers");
      const doctorsLabel = this.$t("doctors");
      const patientsLabel = this.$t("patients");
      const bookingsLabel = this.$t("bookings");
      const availabilityLabel = this.$t("doctorAvailability");

      // امسحي الجداول القديمة
      if (this.appointmentsChart) this.appointmentsChart.destroy();
      if (this.usersChart) this.usersChart.destroy();

      // ارسمهم من جديد بالنصوص المحدثة
      this.initializeCharts({
        labelText,
        titleText,
        usersTitle,
        totalUsersText,
        doctorsLabel,
        patientsLabel,
        bookingsLabel,
        availabilityLabel,
      });
    },
  },

  methods: {
    async getCounts() {
      const doctorsSnap = await getDocs(collection(db, "doctors"));
      const patientsSnap = await getDocs(collection(db, "patients"));
      const bookingsSnap = await getDocs(collection(db, "bookings"));
      const availabilitySnap = await getDocs(collection(db, "doctorAvailability"));
      console.log(availabilitySnap);

      this.doctorsCount = doctorsSnap.size;
      this.patientsCount = patientsSnap.size;
      this.bookingsCount = bookingsSnap.size;
      this.av = availabilitySnap.size;
      console.log(this.av);
    },

    async fetchData() {
      await Promise.all([
        this.fetchUsers(),
        this.fetchDoctors(),
        this.fetchAppointments(),
        this.fetchDoctorAvailability(),
        this.fetchRecentActivities(),
        this.fetchPendingApprovals(),
        this.fetchChartData(),
      ]);
    },
    async fetchChartData() {
      try {
        // Fetch chart data
        this.chartData.users.patients = (await getDocs(collection(db, "patients"))).size;
        this.chartData.users.doctors = (await getDocs(collection(db, "doctors"))).size;

        // Fetch appointments by month (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        const appointmentsByMonthQuery = query(
          collection(db, "bookings"),
          where("createdAt", ">=", sixMonthsAgo)
        );
        const appointmentsByMonthSnapshot = await getDocs(appointmentsByMonthQuery);
        const appointmentsByMonth = {};
        appointmentsByMonthSnapshot.docs.forEach((doc) => {
          const date = doc.data().createdAt?.toDate();
          if (date) {
            const month = date.toLocaleString("default", { month: "short" });
            appointmentsByMonth[month] = (appointmentsByMonth[month] || 0) + 1;
          }
        });
        this.chartData.appointments = Object.entries(appointmentsByMonth).map(([month, count]) => ({
          month,
          count,
        }));
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    },
    async fetchUsers() {
      try {
        // Fetch patients from patients collection
        const patientsCollection = collection(db, "patients");
        const patientsSnapshot = await getDocs(patientsCollection);
        const patientsCount = patientsSnapshot.size;

        // Fetch doctors from doctors collection
        const doctorsCollection = collection(db, "doctors");
        const doctorsSnapshot = await getDocs(doctorsCollection);
        const doctorsCount = doctorsSnapshot.size;

        // Total users = patients + doctors
        this.totalUsers = patientsCount + doctorsCount;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async fetchDoctors() {
      try {
        const doctorsCollection = collection(db, "doctors");
        const doctorsSnapshot = await getDocs(doctorsCollection);
        const doctors = doctorsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        this.activeDoctors = doctors.filter((doctor) => doctor.approved === true).length;
        // Calculate total pending approvals (doctors + patients)
        console.log(this.activeDoctors);

        const pendingDoctorsCount = doctors.filter(
          (doctor) =>
            (doctor.approved === false || !doctor.approved) && doctor.status !== "rejected"
        ).length;
        const pendingPatientsCount = await this.getPendingPatientsCount();
        this.pendingApprovals = pendingDoctorsCount + pendingPatientsCount;
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    },
    async getPendingPatientsCount() {
      try {
        const usersCollection = collection(db, "users");
        const usersQuery = query(
          usersCollection,
          where("unionCardUploaded", "==", true),
          where("unionCardApproved", "==", false)
        );
        const usersSnapshot = await getDocs(usersQuery);
        return usersSnapshot.size;
      } catch (error) {
        console.error("Error fetching pending patients count:", error);
        return 0;
      }
    },
    async fetchAppointments() {
      try {
        const bookingsCollection = collection(db, "bookings");
        const bookingsSnapshot = await getDocs(bookingsCollection);
        this.totalAppointments = bookingsSnapshot.size;
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    },
    async fetchDoctorAvailability() {
      try {
        const bookingsCollection = collection(db, "bookings");
        const bookingsSnapshot = await getDocs(bookingsCollection);
        const doctorIds = [...new Set(bookingsSnapshot.docs.map((doc) => doc.data().doctorId))];
        this.doctorAvailability = doctorIds.length;
        console.log(doctorIds);
      } catch (error) {
        console.error("Error fetching doctor availability:", error);
      }
    },
    async fetchRecentActivities() {
      try {
        const bookingsCollection = collection(db, "bookings");
        const q = query(bookingsCollection, orderBy("createdAt", "desc"), limit(5));
        const querySnapshot = await getDocs(q);
        this.recentActivities = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error fetching recent activities:", error);
      }
    },
    async fetchPendingApprovals() {
      try {
        const pendingItems = [];

        // Fetch pending doctors
        const doctorsCollection = collection(db, "doctors");
        const doctorsSnapshot = await getDocs(doctorsCollection);
        const pendingDoctors = doctorsSnapshot.docs
          .map((doc) => ({
            id: doc.id,
            type: "doctor",
            ...doc.data(),
          }))
          .filter(
            (doctor) =>
              (doctor.approved === false || !doctor.approved) && doctor.status !== "rejected"
          );
        pendingItems.push(...pendingDoctors);

        // Fetch pending patients (users with union card uploaded but not approved)
        const usersCollection = collection(db, "users");
        const usersQuery = query(
          usersCollection,
          where("unionCardUploaded", "==", true),
          where("unionCardApproved", "==", false)
        );
        const usersSnapshot = await getDocs(usersQuery);
        const pendingPatients = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          type: "patient",
          ...doc.data(),
        }));
        pendingItems.push(...pendingPatients);

        this.pendingApprovalsList = pendingItems;
      } catch (error) {
        console.error("Error fetching pending approvals:", error);
      }
    },

    async approveItem(itemId, type) {
      try {
        if (type === "doctor") {
          // Fetch doctor data first to get email
          const doctorRef = doc(db, "doctors", itemId);
          const doctorSnap = await getDoc(doctorRef);
          const doctorData = doctorSnap.data();

          await updateDoc(doctorRef, { approved: true, status: "approved" });
          // إضافة إشعار للطبيب
          await addDoc(collection(db, "notifications"), {
            userId: itemId,
            message: this.$t("doctorApprovalMessage"),
            type: "approval",
            read: false,
            createdAt: new Date(),
          });
          // Send approval email using EmailJS
          try {
            await emailjs.send(
              "service_8290zsm", // Service ID
              "template_dkr71y8", // Template ID
              {
                to_email: doctorData.email,
                doctor_name: `Dr. ${doctorData.firstName} ${doctorData.lastName}`,
                name: "MedLink Team",
                email: doctorData.email,
                message:
                  "Your documents have been successfully reviewed and approved by the admin team.",
              },
              "OJO_25HZ7jRJ0ePiC" // Public Key
            );
            console.log("Approval email sent successfully via EmailJS");
          } catch (emailError) {
            console.error("Error sending approval email:", emailError);
            // Continue even if email fails - the approval is still saved
          }
        } else if (type === "patient") {
          const userRef = doc(db, "users", itemId);
          await updateDoc(userRef, { unionCardApproved: true });
        }

        this.fetchData(); // تحديث البيانات
      } catch (error) {
        console.error("Error approving item:", error);
      }
    },

    rejectItem(itemId, type) {
      this.currentRejectionItem = { id: itemId, type };
      this.showRejectionModal = true;
    },

    closeRejectionModal() {
      this.showRejectionModal = false;
      this.rejectionReason = "";
      this.currentRejectionItem = null;
    },

    async submitRejection() {
      if (!this.rejectionReason.trim()) return;

      try {
        // Close the modal immediately
        this.showRejectionModal = false;

        const { id, type } = this.currentRejectionItem;

        if (type === "doctor") {
          // Fetch doctor data first to get email
          const doctorRef = doc(db, "doctors", id);
          const doctorSnap = await getDoc(doctorRef);
          const doctorData = doctorSnap.data();

          // Update doctor status in Firestore
          await updateDoc(doctorRef, {
            approved: false,
            status: "rejected",
            needsResubmit: true,
            rejectionReason: this.rejectionReason,
            rejectedAt: new Date(),
          });

          // إضافة إشعار للطبيب
          await addDoc(collection(db, "notifications"), {
            userId: id,
            message: `${this.$t("documentRejected")}: ${this.rejectionReason}`,
            type: "rejection",
            read: false,
            createdAt: new Date(),
          });

          // Send rejection email using EmailJS
          try {
            await emailjs.send(
              "service_ocr8arp", // Service ID
              "template_uoqp1sl", // Template ID
              {
                to_email: doctorData.email,
                doctor_name: `Dr. ${doctorData.firstName} ${doctorData.lastName}`,
                user_name: `Dr. ${doctorData.firstName} ${doctorData.lastName}`,
                rejection_reason: this.rejectionReason,
                document_type: "documents",
                name: "MedLink Team",
                email: doctorData.email,
                message: `Your submitted documents have been rejected. Reason: ${this.rejectionReason}. Please review the feedback and re-upload your documents with the necessary corrections.`,
              },
              "jPio5EtzFqeJ_k9wB" // Public Key
            );
            console.log("Rejection email sent successfully via EmailJS");
          } catch (emailError) {
            console.error("Error sending rejection email:", emailError);
            // Continue even if email fails - the rejection is still saved
          }
        } else if (type === "patient") {
          // Fetch patient data first to get email
          const userRef = doc(db, "users", id);
          const userSnap = await getDoc(userRef);
          const userData = userSnap.data();

          // Update patient status in Firestore
          await updateDoc(userRef, {
            unionCardApproved: false,
            rejectionReason: this.rejectionReason,
          });

          // Send rejection email using EmailJS
          try {
            await emailjs.send(
              "service_ocr8arp", // Service ID
              "template_uoqp1sl", // Template ID
              {
                to_email: userData.email,
                user_name: `${userData.firstName} ${userData.lastName}`,
                rejection_reason: this.rejectionReason,
                document_type: "union card",
                name: "MedLink Team",
                email: userData.email,
                message: `Your submitted union card has been rejected. Reason: ${this.rejectionReason}. Please review the feedback and re-upload your union card with the necessary corrections.`,
              },
              "jPio5EtzFqeJ_k9wB" // Public Key
            );
            console.log("Rejection email sent successfully via EmailJS");
          } catch (emailError) {
            console.error("Error sending rejection email:", emailError);
            // Continue even if email fails - the rejection is still saved
          }
        }

        this.closeRejectionModal();
        this.fetchData(); // تحديث البيانات
      } catch (error) {
        console.error("Error rejecting item:", error);
      }
    },

    initializeCharts(texts) {
      const colors = [
        "rgba(59, 130, 246, 0.6)",
        "rgba(34, 197, 94, 0.6)",
        "rgba(234, 179, 8, 0.6)",
        "rgba(239, 68, 68, 0.6)",
        "rgba(168, 85, 247, 0.6)",
        "rgba(14, 165, 233, 0.6)",
      ];

      // ===== Appointments Chart =====
      if (this.$refs.appointmentsChart) {
        const ctx = this.$refs.appointmentsChart.getContext("2d");
        this.appointmentsChart = new ChartJS(ctx, {
          type: "bar",
          data: {
            labels: this.chartData.appointments.map((item) => item.month),
            datasets: [
              {
                label: texts.labelText,
                data: this.chartData.appointments.map((item) => item.count),
                backgroundColor: colors,
                borderColor: colors.map((c) => c.replace("0.6", "1")),
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: texts.titleText,
              },
            },
          },
        });
      }

      // ===== Users Chart (Doughnut) =====
      if (this.$refs.usersChart) {
        const ctx = this.$refs.usersChart.getContext("2d");
        const totalUsers = this.chartData.users.patients + this.chartData.users.doctors;

        // Plugin to draw center text
        const centerTextPlugin = {
          id: "centerText",
          beforeDraw(chart) {
            const { width, height, ctx } = chart;
            ctx.restore();
            const fontSize = (height / 114).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#333";

            const text = totalUsers.toString();
            const textX = Math.round((width - ctx.measureText(text).width) / 2);
            const textY = height / 2;
            ctx.fillText(text, textX, textY);

            // Subtitle
            ctx.font = fontSize * 0.5 + "em sans-serif";
            const subText = texts.totalUsersText;
            const subTextX = Math.round((width - ctx.measureText(subText).width) / 2);
            const subTextY = textY + 25;
            ctx.fillText(subText, subTextX, subTextY);
            ctx.save();
          },
        };

        this.usersChart = new ChartJS(ctx, {
          type: "doughnut",
          data: {
            labels: [
              this.$t("doctors"),
              this.$t("patients"),
              this.$t("bookings"),
              this.$t("doctorAvailability"),
            ],
            datasets: [
              {
                data: [
                  this.chartData.users.doctors,
                  this.chartData.users.patients,
                  this.totalAppointments,
                  this.doctorAvailability,
                ],
                backgroundColor: [
                  "rgba(34, 197, 94, 0.8)", // Doctors
                  "rgba(59, 130, 246, 0.8)", // Patients
                  "rgba(234, 179, 8, 0.8)", // Bookings
                  "rgba(168, 85, 247, 0.8)", // Availability
                ],
                borderColor: [
                  "rgba(34, 197, 94, 1)",
                  "rgba(59, 130, 246, 1)",
                  "rgba(234, 179, 8, 1)",
                  "rgba(168, 85, 247, 1)",
                ],
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "70%",
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  padding: 20,
                  usePointStyle: true,
                  font: { size: 14 },
                },
              },
              title: {
                display: true,
                text: texts.usersTitle,
              },
            },
          },
          plugins: [centerTextPlugin],
        });
      }
    },
  },
};
</script>

<style scoped>
/* Page Title Animation */
.title {
  animation: fadeInDown 0.8s ease-out;
}

/* Top Cards Grid */
.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4 {
  animation: fadeInUp 1s ease-out;
}

/* Individual Cards */
.bg-white.p-6.rounded-lg.shadow-md {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  border: 2px solid transparent;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: cardSlideIn 0.8s ease-out both;
  animation-delay: calc(var(--card-index, 0) * 0.15s);
  cursor: pointer;
}

.dark .bg-white.p-6.rounded-lg.shadow-md {
  background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.bg-white.p-6.rounded-lg.shadow-md::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
  border-radius: 14px;
}

.dark .bg-white.p-6.rounded-lg.shadow-md::before {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(14, 165, 233, 0.1) 100%);
}

.bg-white.p-6.rounded-lg.shadow-md:hover::before {
  opacity: 1;
}

.bg-white.p-6.rounded-lg.shadow-md:hover {
  transform: translateY(-12px) scale(1.03) rotateX(5deg);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(14, 165, 233, 0.2);
  border-color: rgba(14, 165, 233, 0.3);
}

.dark .bg-white.p-6.rounded-lg.shadow-md:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(59, 130, 246, 0.3);
  border-color: rgba(59, 130, 246, 0.4);
}

.bg-white.p-6.rounded-lg.shadow-md:nth-child(1) {
  --card-index: 1;
  background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
}

.dark .bg-white.p-6.rounded-lg.shadow-md:nth-child(1) {
  background: linear-gradient(135deg, #374151 0%, #2c354e 0%);
}

.bg-white.p-6.rounded-lg.shadow-md:nth-child(1):hover {
  background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
}

.dark .bg-white.p-6.rounded-lg.shadow-md:nth-child(1):hover {
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
}

.bg-white.p-6.rounded-lg.shadow-md:nth-child(2) {
  --card-index: 2;
  background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
}

.dark .bg-white.p-6.rounded-lg.shadow-md:nth-child(2) {
  background: linear-gradient(135deg, #374151 0%, #166534 100%);
}

.bg-white.p-6.rounded-lg.shadow-md:nth-child(2):hover {
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
}

.dark .bg-white.p-6.rounded-lg.shadow-md:nth-child(2):hover {
  background: linear-gradient(135deg, #166534 0%, #14532d 100%);
}

.bg-white.p-6.rounded-lg.shadow-md:nth-child(3) {
  --card-index: 3;
  background: linear-gradient(135deg, #ffffff 0%, #fffbeb 100%);
}

.dark .bg-white.p-6.rounded-lg.shadow-md:nth-child(3) {
  background: linear-gradient(135deg, #374151 0%, #92400e 100%);
}

.bg-white.p-6.rounded-lg.shadow-md:nth-child(3):hover {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
}

.dark .bg-white.p-6.rounded-lg.shadow-md:nth-child(3):hover {
  background: linear-gradient(135deg, #92400e 0%, #78350f 100%);
}

.bg-white.p-6.rounded-lg.shadow-md:nth-child(4) {
  --card-index: 4;
  background: linear-gradient(135deg, #ffffff 0%, #faf5ff 100%);
}

.dark .bg-white.p-6.rounded-lg.shadow-md:nth-child(4) {
  background: linear-gradient(135deg, #374151 0%, #6b21a8 100%);
}

.bg-white.p-6.rounded-lg.shadow-md:nth-child(4):hover {
  background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
}

.dark .bg-white.p-6.rounded-lg.shadow-md:nth-child(4):hover {
  background: linear-gradient(135deg, #6b21a8 0%, #581c87 100%);
}

/* Icon Containers */
.bg-blue-100.p-3.rounded-full,
.bg-green-100.p-3.rounded-full,
.bg-yellow-100.p-3.rounded-full,
.bg-purple-100.p-3.rounded-full {
  transition: all 0.3s ease;
}

.bg-white.p-6.rounded-lg.shadow-md:hover .bg-blue-100.p-3.rounded-full,
.bg-white.p-6.rounded-lg.shadow-md:hover .bg-green-100.p-3.rounded-full,
.bg-white.p-6.rounded-lg.shadow-md:hover .bg-yellow-100.p-3.rounded-full,
.bg-white.p-6.rounded-lg.shadow-md:hover .bg-purple-100.p-3.rounded-full {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.dark .bg-white.p-6.rounded-lg.shadow-md:hover .bg-blue-100.p-3.rounded-full,
.dark .bg-white.p-6.rounded-lg.shadow-md:hover .bg-green-100.p-3.rounded-full,
.dark .bg-white.p-6.rounded-lg.shadow-md:hover .bg-yellow-100.p-3.rounded-full,
.dark .bg-white.p-6.rounded-lg.shadow-md:hover .bg-purple-100.p-3.rounded-full {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

/* Numbers Animation */
.text-2xl.font-bold {
  animation: countUp 1s ease-out both;
  animation-delay: calc(var(--card-index, 0) * 0.1s + 0.3s);
}

/* Bottom Cards */
.grid.grid-cols-1.lg\\:grid-cols-2 {
  animation: fadeInUp 1.2s ease-out;
}

.grid.grid-cols-1.lg\\:grid-cols-2 > div {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
  animation: cardSlideIn 0.8s ease-out both;
  animation-delay: 0.5s;
}

.dark .grid.grid-cols-1.lg\\:grid-cols-2 > div {
  background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
  border: 1px solid #4b5563;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.grid.grid-cols-1.lg\\:grid-cols-2 > div:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 20px -5px rgba(0, 0, 0, 0.1);
  border-color: #0ea5e9;
}

.dark .grid.grid-cols-1.lg\\:grid-cols-2 > div:hover {
  box-shadow: 0 15px 20px -5px rgba(0, 0, 0, 0.4);
  border-color: #3b82f6;
}

/* Activity Items */
.space-y-3 > div {
  transition: all 0.3s ease;
  animation: listItemFadeIn 0.5s ease-out both;
  animation-delay: calc(var(--item-index, 0) * 0.1s + 0.8s);
}

.space-y-3 > div:hover {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  transform: translateX(5px);
}

.dark .space-y-3 > div:hover {
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
}

.space-y-3 > div:nth-child(1) {
  --item-index: 1;
}
.space-y-3 > div:nth-child(2) {
  --item-index: 2;
}
.space-y-3 > div:nth-child(3) {
  --item-index: 3;
}
.space-y-3 > div:nth-child(4) {
  --item-index: 4;
}
.space-y-3 > div:nth-child(5) {
  --item-index: 5;
}

/* Buttons */
.text-xs.bg-green-100,
.text-xs.bg-red-100 {
  transition: all 0.3s ease;
}

.text-xs.bg-green-100:hover {
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  transform: scale(1.05);
}

.dark .text-xs.bg-green-100:hover {
  background: linear-gradient(135deg, #166534 0%, #14532d 100%);
}

.text-xs.bg-red-100:hover {
  background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
  transform: scale(1.05);
}

.dark .text-xs.bg-red-100:hover {
  background: linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%);
}

/* Images */
.w-20.h-20.object-cover {
  transition: all 0.3s ease;
}

.w-20.h-20.object-cover:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.dark .w-20.h-20.object-cover:hover {
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.5);
}

/* Keyframes */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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

@keyframes cardSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes countUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes listItemFadeIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
