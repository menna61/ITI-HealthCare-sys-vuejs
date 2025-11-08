<template>
  <div class="w-full dark:bg-gray-900 min-h-screen transition-all duration-300">
    <main-nav />
    <div class="pl-4 md:pl-8 pr-4 md:pr-20 mt-8 flex flex-col gap-6">
      <!-- Page titles -->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold dark:text-white">{{ $t("documentApproval") }}</h1>
        <p class="text-gray-500 dark:text-gray-200">{{ $t("manageDocumentApprovals") }}</p>
      </div>

      <!-- Pending Approvals -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-lg">
        <h3 class="text-lg font-semibold mb-4 dark:text-white">{{ $t("pendingApprovals") }}</h3>
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
  where,
  updateDoc,
  doc,
  addDoc,
  getDoc,
} from "firebase/firestore";
import emailjs from "@emailjs/browser";

export default {
  name: "DocumentApproval",
  components: { MainNav, UiModal },
  data() {
    return {
      pendingApprovalsList: [],
      showRejectionModal: false,
      rejectionReason: "",
      currentRejectionItem: null,
    };
  },
  mounted() {
    this.fetchPendingApprovals();
  },
  methods: {
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

        this.fetchPendingApprovals(); // تحديث البيانات
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
        // Confirm rejection action
        const confirmed = window.confirm(this.$t("confirmRejectionMessage"));
        if (!confirmed) return;

        // Close the modal immediately after confirmation
        this.showRejectionModal = false;

        const { id, type } = this.currentRejectionItem;

        if (type === "doctor") {
          const doctorRef = doc(db, "doctors", id);
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
          // Send rejection email
          await fetch("http://localhost:4242/send-rejection-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: id,
              userType: type,
              rejectionReason: this.rejectionReason,
            }),
          });
        } else if (type === "patient") {
          const userRef = doc(db, "users", id);
          await updateDoc(userRef, {
            unionCardApproved: false,
            rejectionReason: this.rejectionReason,
          });
          // Send rejection email
          await fetch("http://localhost:4242/send-rejection-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: id,
              userType: type,
              rejectionReason: this.rejectionReason,
            }),
          });
        }

        this.closeRejectionModal();
        this.fetchPendingApprovals(); // تحديث البيانات
      } catch (error) {
        console.error("Error rejecting item:", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/* Page Title Animation */
.title {
  animation: fadeInDown 0.8s ease-out;
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
</style>
