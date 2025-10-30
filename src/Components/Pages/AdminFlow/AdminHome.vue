<template>
  <div class="w-dwh ml-[302px]">
    <main-nav />
    <div class="pl-8 pr-20 mt-8 flex flex-col gap-6">
      <!--Page titles-->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold">Dashboard</h1>
        <p class="text-gray-500">Monitor and manage your healthcare platform</p>
      </div>

      <!-- Top Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Total Users -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Total Users</p>
              <p class="text-2xl font-bold">{{ totalUsers }}</p>
            </div>
            <div class="bg-blue-100 p-3 rounded-full">
              <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Active Doctors -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Active Doctors</p>
              <p class="text-2xl font-bold">{{ activeDoctors }}</p>
            </div>
            <div class="bg-green-100 p-3 rounded-full">
              <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Pending Approvals -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Pending Approvals</p>
              <p class="text-2xl font-bold">{{ pendingApprovals }}</p>
            </div>
            <div class="bg-yellow-100 p-3 rounded-full">
              <svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Total Appointments -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Total Appointments</p>
              <p class="text-2xl font-bold">{{ totalAppointments }}</p>
            </div>
            <div class="bg-purple-100 p-3 rounded-full">
              <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Activities -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-4">Recent Activities</h3>
          <div v-if="recentActivities.length === 0" class="text-gray-500">No recent activities</div>
          <div v-else class="space-y-3">
            <div
              v-for="activity in recentActivities"
              :key="activity.id"
              class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
            >
              <div>
                <p class="text-sm font-medium">
                  {{ activity.patientName }} booked with {{ activity.doctorName }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ activity.service }} - {{ activity.date }} at {{ activity.time }}
                </p>
              </div>
              <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{{
                activity.status
              }}</span>
            </div>
          </div>
        </div>

        <!-- Pending Approvals -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-4">Pending Approvals</h3>
          <div v-if="pendingApprovalsList.length === 0" class="text-gray-500">
            No pending approvals
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="item in pendingApprovalsList"
              :key="item.id"
              class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
            >
              <div>
                <p class="text-sm font-medium">
                  {{ item.firstName }} {{ item.lastName }}
                  <span class="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded ml-2">{{
                    item.type
                  }}</span>
                </p>
                <p class="text-xs text-gray-500">
                  {{ item.type === "doctor" ? item.speciality : "Union Card Pending" }}
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
                  class="text-xs text-blue-500"
                >
                  <a :href="item.unionCardUrl" target="_blank" class="underline">View Union Card</a>
                </p>
              </div>
              <div class="flex gap-2">
                <button
                  @click="approveItem(item.id, item.type)"
                  class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full hover:bg-green-200"
                >
                  Approve
                </button>
                <button
                  @click="rejectItem(item.id, item.type)"
                  class="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full hover:bg-red-200"
                >
                  Reject
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
} from "firebase/firestore";

export default {
  name: "AdminHome",
  components: { MainNav },
  data() {
    return {
      totalUsers: 0,
      activeDoctors: 0,
      pendingApprovals: 0,
      totalAppointments: 0,
      recentActivities: [],
      pendingApprovalsList: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      await Promise.all([
        this.fetchUsers(),
        this.fetchDoctors(),
        this.fetchAppointments(),
        this.fetchRecentActivities(),
        this.fetchPendingApprovals(),
      ]);
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
        const pendingDoctorsCount = doctors.filter(
          (doctor) => doctor.approved === false || !doctor.approved
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
          .filter((doctor) => doctor.approved === false || !doctor.approved);
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
          const doctorRef = doc(db, "doctors", itemId);
          await updateDoc(doctorRef, { approved: true });
          // Add notification to doctor's notifications
          await addDoc(collection(db, "notifications"), {
            userId: itemId,
            message:
              "Your union membership card has been approved! You can now create services and start accepting appointments.",
            type: "approval",
            read: false,
            createdAt: new Date(),
          });
        } else if (type === "patient") {
          const userRef = doc(db, "users", itemId);
          await updateDoc(userRef, { unionCardApproved: true });
        }
        this.fetchData(); // Refresh data
      } catch (error) {
        console.error("Error approving item:", error);
        alert("Failed to approve.");
      }
    },
    async rejectItem(itemId, type) {
      try {
        if (type === "doctor") {
          const doctorRef = doc(db, "doctors", itemId);
          await updateDoc(doctorRef, { approved: false });
          alert("Doctor rejected.");
        } else if (type === "patient") {
          const userRef = doc(db, "users", itemId);
          await updateDoc(userRef, { unionCardApproved: false });
          alert("Patient union card rejected.");
        }
        this.fetchData(); // Refresh data
      } catch (error) {
        console.error("Error rejecting item:", error);
        alert("Failed to reject.");
      }
    },
  },
};
</script>

<style scoped></style>
