<template>
  <div class="w-dwh ml-[302px]">
    <main-nav />
    <div class="pl-8 pr-20 mt-8 flex flex-col gap-6">
      <!--Page titles-->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold dark:text-white">All Users</h1>
        <p class="text-gray-500">Manage and oversee all registered users</p>
      </div>
      <div class="tableUsers">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gradient-to-r from-blue-500 to-purple-600">
              <tr>
                <th class="py-4 px-6 text-left font-semibold text-white uppercase tracking-wider">
                  Name
                </th>
                <th class="py-4 px-6 text-left font-semibold text-white uppercase tracking-wider">
                  Email
                </th>
                <th class="py-4 px-6 text-left font-semibold text-white uppercase tracking-wider">
                  Phone
                </th>

                <th class="py-4 px-6 text-left font-semibold text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200 text-left">
              <tr
                v-for="(patient, index) in paginatedPatients"
                :key="patient.id"
                class="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer transition-all duration-500 animate-fadeInUp hover:scale-[1.02] hover:shadow-lg"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ patient.firstName }}{{ patient.lastName }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ patient.email }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ patient.phone || "01156388768" }}
                </td>

                <td class="px-1 py-4 whitespace-nowrap text-sm font-medium flex justify-around">
                  <button
                    @click.stop="openDeleteModal(patient)"
                    class="text-red-600 hover:text-red-900 transition-colors duration-200 p-1 rounded-full hover:bg-red-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                  <button class="done" @click="openModal(patient)">view</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-6">
        <div class="flex items-center space-x-2">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
          >
            Previous
          </button>
          <span class="px-4 py-2 bg-gray-100 rounded-lg">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      <!-- Modal for user details -->
      <UiModal
        v-model="showModal"
        :title="'👤 Patient Details'"
        @close="closeModal"
        class="patient-details-modal"
      >
        <div v-if="selectedPatient" class="patient-details-content">
          <div class="patient-avatar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-20 w-20 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div class="patient-info">
            <div class="info-item">
              <span class="info-label">👤 Name:</span>
              <span class="info-value"
                >{{ selectedPatient.firstName }} {{ selectedPatient.lastName }}</span
              >
            </div>
            <div class="info-item">
              <span class="info-label">📧 Email:</span>
              <span class="info-value">{{ selectedPatient.email }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">📱 Phone:</span>
              <span class="info-value">{{ selectedPatient.phone }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">👨‍⚕️ Doctor:</span>
              <span class="info-value">{{ selectedPatient.doctor }}</span>
            </div>
          </div>
          <div class="modal-actions">
            <button @click="deleteFromModal" class="modal-delete-btn">🗑️ Delete User</button>
          </div>
        </div>
      </UiModal>

      <!-- Confirmation Modal for delete -->
      <UiModal
        v-model="showDeleteModal"
        :title="'⚠️ Confirm Delete'"
        @close="cancelDelete"
        class="delete-modal"
      >
        <div v-if="patientToDelete" class="delete-modal-content">
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
          <h3 class="delete-title">Are you sure you want to delete this user?</h3>
          <div class="delete-user-info">
            <p>
              <strong>Name:</strong> {{ patientToDelete.firstName }} {{ patientToDelete.lastName }}
            </p>
            <p><strong>Email:</strong> {{ patientToDelete.email }}</p>
          </div>
          <p class="delete-warning">
            This action cannot be undone. The user will be permanently removed from the system.
          </p>
        </div>
        <template #footer>
          <div class="delete-modal-footer">
            <button @click="cancelDelete" class="cancel-btn">Cancel</button>
            <button @click="confirmDelete" class="delete-btn">Yes, Delete</button>
          </div>
        </template>
      </UiModal>
    </div>
  </div>
</template>
<script>
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";
import UiModal from "@/Components/UI/Modal.vue";
import MainNav from "@/Components/Layouts/MainNav.vue";

export default {
  name: "UsersPage",
  components: {
    UiModal,
    MainNav,
  },
  data() {
    return {
      patients: [],
      showModal: false,
      selectedPatient: null,
      showDeleteModal: false,
      patientToDelete: null,
      currentPage: 1,
      itemsPerPage: 7,
    };
  },
  computed: {
    paginatedPatients() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.patients.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.patients.length / this.itemsPerPage);
    },
  },
  async mounted() {
    await this.fetchPatients();
  },
  methods: {
    async fetchPatients() {
      try {
        const querySnapshot = await getDocs(collection(db, "patients"));
        this.patients = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("k0", this.patients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    },
    openModal(patient) {
      this.selectedPatient = patient;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedPatient = null;
    },
    openDeleteModal(patient) {
      this.patientToDelete = patient;
      this.showDeleteModal = true;
    },
    cancelDelete() {
      this.showDeleteModal = false;
      this.patientToDelete = null;
    },
    async confirmDelete() {
      if (!this.patientToDelete) return;
      try {
        await deleteDoc(doc(db, "patients", this.patientToDelete.id));
        this.patients = this.patients.filter((patient) => patient.id !== this.patientToDelete.id);
        this.showDeleteModal = false;
        this.patientToDelete = null;
        this.$toast.success("User deleted successfully");
      } catch (error) {
        console.error("Error deleting patient:", error);
        this.$toast.error("Failed to delete user");
      }
    },
    deleteFromModal() {
      this.patientToDelete = this.selectedPatient;
      this.showModal = false;
      this.showDeleteModal = true;
    },
    prevPage() {
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

<style lang="scss" scoped>
.done {
  padding: 6px 12px;
  color: #05603a;
  background: linear-gradient(135deg, #d1fadf 0%, #a7f3d0 100%);
  border: 2px solid #34d399;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin: 1px;
  width: auto;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(52, 211, 153, 0.2);

  &:hover {
    background: linear-gradient(135deg, #a7f3d0 0%, #6ee7b7 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(52, 211, 153, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(52, 211, 153, 0.2);
  }
}

.patient-details-modal {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 2px solid #0ea5e9;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  animation: modalSlideIn 0.4s ease-out;

  .patient-details-content {
    text-align: center;
    padding: 30px 0;
  }

  .patient-avatar {
    margin-bottom: 24px;
    display: flex;
    justify-content: center;

    svg {
      filter: drop-shadow(0 4px 6px rgba(14, 165, 233, 0.3));
      animation: avatarBounce 0.6s ease-out 0.2s both;
    }
  }

  .patient-info {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 400px;
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

      &:hover {
        transform: translateY(-2px) scale(1.02);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        border-color: #0ea5e9;
        background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      }

      .info-label {
        font-weight: 600;
        color: #374151;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .info-value {
        font-weight: 500;
        color: #1f2937;
        font-size: 14px;
        text-align: right;
        max-width: 200px;
        word-break: break-word;
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

@keyframes avatarBounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
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

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
}

.delete-modal {
  background: linear-gradient(135deg, #fef7f7 0%, #fdf2f2 100%);
  border: 2px solid #fecaca;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

  .delete-modal-content {
    text-align: center;
    padding: 30px 0 20px;
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
  }

  .delete-user-info {
    background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    border: 2px solid #e5e7eb;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);

    p {
      margin: 6px 0;
      color: #374151;
      font-size: 15px;
      font-weight: 500;

      strong {
        color: #1f2937;
        font-weight: 700;
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
  }

  .delete-modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    padding-top: 24px;
    border-top: 2px solid #fecaca;
    background: linear-gradient(135deg, #fef7f7 0%, #fdf2f2 100%);
    margin: 0 -24px -24px;
    padding: 24px;
    border-radius: 0 0 12px 12px;
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

    &:hover {
      background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
      border-color: #9ca3af;
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
</style>
