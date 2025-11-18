<template>
  <div :class="$i18n.locale === 'ar' ? 'lg:ml-0 , lg:mr-[302px]' : 'lg:ml-[302px]'" class="w-dwh">
    <main-nav />
    <div class="px-4 lg:pl-8 lg:pr-20 mt-8 flex flex-col gap-6">
      <!--Page titles-->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold dark:text-white">{{ $t("doctor_appointments_title") }}</h1>
        <p class="text-gray-500">{{ $t("doctor_appointments_desc") }}</p>
      </div>

      <!-- Appointments Tab -->

      <!-- Appointments Tab -->
      <div class="appointments">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-fade-in">
          <div class="relative overflow-x-auto">
            <table class="min-w-full">
              <thead class="bg-[var(--main-color-500)] text-white">
                <tr>
                  <th class="py-4 px-6 text-left font-semibold">{{ $t("patient_name") }}</th>
                  <th class="py-4 px-6 text-left font-semibold">{{ $t("patient_email") }}</th>
                  <th class="py-4 px-6 text-left font-semibold">{{ $t("patient_phone") }}</th>
                  <th class="py-4 px-6 text-left font-semibold">{{ $t("service") }}</th>
                  <th class="py-4 px-6 text-left font-semibold">{{ $t("date") }}</th>
                  <th class="py-4 px-6 text-left font-semibold">{{ $t("time") }}</th>
                  <th class="py-4 px-6 text-left font-semibold">{{ $t("status") }}</th>
                  <th class="py-4 px-6 text-left font-semibold">{{ $t("mark_as_completed") }}</th>
                  <th class="py-4 px-6 text-left font-semibold">{{ $t("actions") }}</th>
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
                        class="px-3 py-1 bg-[var(--main-color-500)] text-white rounded transition-colors text-sm"
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
            <div class="text-gray-500 dark:text-gray-400 text-lg">
              {{ $t("no_appointments_found") }}
            </div>
            <div class="text-gray-400 dark:text-gray-500 text-sm mt-2">
              {{ $t("scheduled_appointments_appear") }}
            </div>
          </div>
        </div>
      </div>

      <!-- Add Details Modal -->
      <UiModal v-model="showAddDetailsModal" :title="$t('add_medical_details')">
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
              {{ $t("complaint_tab") }}
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
              {{ $t("prescription_tab") }}
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
              {{ $t("patient_complaint_label") }}
            </label>
            <textarea
              v-model="medicalDetails.patientComplaint"
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              rows="3"
              :placeholder="$t('patient_complaint_placeholder')"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ $t("diagnosis_label") }}
            </label>
            <textarea
              v-model="medicalDetails.diagnosis"
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              rows="3"
              :placeholder="$t('diagnosis_placeholder')"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ $t("instructions_label") }}
            </label>
            <textarea
              v-model="medicalDetails.instructions"
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              rows="3"
              :placeholder="$t('instructions_placeholder')"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ $t("allergies_label") }}
            </label>
            <textarea
              v-model="medicalDetails.allergies"
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              rows="2"
              :placeholder="$t('allergies_placeholder')"
            ></textarea>
          </div>
        </div>

        <!-- Prescription Tab -->
        <div v-if="activeTab === 'prescription'" class="space-y-4">
          <!-- Title -->
          <div class="mb-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              {{ $t("medications_list") || "Medications" }}
            </h3>
          </div>

          <!-- Medications List -->
          <div
            v-if="medicalDetails.prescriptions.length === 0"
            class="text-center py-12 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12 mx-auto text-gray-400 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
            <p class="text-gray-500 dark:text-gray-400 text-sm">
              {{ $t("no_medications_added") || "No medications added yet" }}
            </p>
            <p class="text-gray-400 dark:text-gray-500 text-xs mt-1">
              {{ $t("click_add_medication_below") || "Click the button below to add a medication" }}
            </p>
          </div>

          <div
            v-for="(medication, index) in medicalDetails.prescriptions"
            :key="index"
            class="relative border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <!-- Remove Button - Top Right Corner -->
            <button
              @click="removeMedication(index)"
              class="absolute top-3 right-3 p-1.5 text-red-500 hover:text-white hover:bg-red-500 rounded-full transition-all duration-200"
              :title="$t('remove') || 'Remove'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <!-- Medication Number Badge -->
            <div class="mb-3">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                {{ $t("medication") || "Medication" }} #{{ index + 1 }}
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {{ $t("medication_name_label") }}
                </label>
                <input
                  v-model="medication.name"
                  type="text"
                  class="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  :placeholder="$t('medication_name_placeholder')"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {{ $t("dosage_label") }}
                </label>
                <input
                  v-model="medication.dosage"
                  type="text"
                  class="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  :placeholder="$t('dosage_placeholder')"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {{ $t("frequency_label") }}
                </label>
                <input
                  v-model="medication.frequency"
                  type="text"
                  class="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  :placeholder="$t('frequency_placeholder')"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {{ $t("duration_label") }}
                </label>
                <input
                  v-model="medication.duration"
                  type="text"
                  class="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  :placeholder="$t('duration_placeholder')"
                />
              </div>
            </div>
          </div>

          <!-- Add Medication Button at Bottom -->
          <div class="flex justify-end pt-2">
            <button
              @click="addMedication"
              class="inline-flex items-center gap-2 px-4 py-2 bg-[var(--main-color-500)] text-white rounded-lg hover:bg-[var(--main-color-600)] transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ $t("add_medication") }}
            </button>
          </div>
        </div>

        <!-- Medical Requirements Tab -->
        <div v-if="activeTab === 'requirements'" class="space-y-4">
          <!-- Title -->
          <div class="mb-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              {{ $t("requirements_list") || "Medical Requirements" }}
            </h3>
          </div>

          <!-- Requirements List -->
          <div
            v-if="medicalDetails.medicalRequirements.length === 0"
            class="text-center py-12 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12 mx-auto text-gray-400 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            <p class="text-gray-500 dark:text-gray-400 text-sm">
              {{ $t("noRequirementsAdded") || "No requirements added yet" }}
            </p>
            <p class="text-gray-400 dark:text-gray-500 text-xs mt-1">
              {{
                $t("click_add_requirement_below") || "Click the button below to add a requirement"
              }}
            </p>
          </div>

          <div
            v-for="(requirement, index) in medicalDetails.medicalRequirements"
            :key="index"
            class="relative border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <!-- Remove Button - Top Right Corner -->
            <button
              @click="removeRequirement(index)"
              class="absolute top-3 right-3 p-1.5 text-red-500 hover:text-white hover:bg-red-500 rounded-full transition-all duration-200"
              :title="$t('removeRequirement') || 'Remove'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <!-- Requirement Number Badge -->
            <div class="mb-3">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
              >
                {{ $t("requirement") || "Requirement" }} #{{ index + 1 }}
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {{ $t("requirementType") }}
                </label>
                <select
                  v-model="requirement.type"
                  class="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">{{ $t("selectRequirementType") }}</option>
                  <option value="lab">{{ $t("labTest") }}</option>
                  <option value="radiology">{{ $t("radiology") }}</option>
                  <option value="other">{{ $t("otherRequirement") }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {{ $t("priority") }}
                </label>
                <select
                  v-model="requirement.priority"
                  class="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">{{ $t("selectPriority") }}</option>
                  <option value="urgent">{{ $t("urgent") }}</option>
                  <option value="normal">{{ $t("normal") }}</option>
                  <option value="optional">{{ $t("optional") }}</option>
                </select>
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {{ $t("requirementName") }}
                </label>
                <input
                  v-model="requirement.name"
                  type="text"
                  class="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  :placeholder="$t('enterRequirementName')"
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {{ $t("requirementNotes") }}
                </label>
                <textarea
                  v-model="requirement.notes"
                  class="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  rows="2"
                  :placeholder="$t('enterRequirementNotes')"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Add Requirement Button at Bottom -->
          <div class="flex justify-end pt-2">
            <button
              @click="addRequirement"
              class="inline-flex items-center gap-2 px-4 py-2 bg-[var(--main-color-500)] text-white rounded-lg hover:bg-[var(--main-color-600)] transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ $t("addRequirement") }}
            </button>
          </div>
        </div>

        <template #footer>
          <button
            @click="showAddDetailsModal = false"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            {{ $t("cancel") }}
          </button>
          <button
            @click="saveDetails"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {{ $t("save_details") }}
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
              appointment.patientPhone = patientData.phoneNumber || "";
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
            const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4242";
            await fetch(`${apiUrl}/send-cancellation-email`, {
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
        // Get appointment details first
        const appointmentRef = doc(db, "bookings", appointmentId);
        const appointmentSnap = await getDoc(appointmentRef);

        if (appointmentSnap.exists()) {
          const appointmentData = appointmentSnap.data();
          const totalPrice = parseFloat(appointmentData.price) || 0;

          // Calculate commission: 5% for admin, 95% for doctor
          const adminCommission = totalPrice * 0.05;
          const doctorEarnings = totalPrice * 0.95;

          console.log("Marking appointment as completed:");
          console.log("Total price:", totalPrice);
          console.log("Admin commission (5%):", adminCommission);
          console.log("Doctor earnings (95%):", doctorEarnings);

          // Update booking with earnings breakdown
          await updateDoc(appointmentRef, {
            status: "completed",
            adminCommission: adminCommission,
            doctorEarnings: doctorEarnings,
            completedAt: new Date(),
          });

          console.log("Booking updated with commission breakdown");

          // Add commission to admin wallet
          const adminWalletRef = doc(db, "admin", "wallet");
          const adminWalletSnap = await getDoc(adminWalletRef);

          if (adminWalletSnap.exists()) {
            const currentBalance = parseFloat(adminWalletSnap.data().balance) || 0;
            console.log("Current admin wallet balance:", currentBalance);
            await updateDoc(adminWalletRef, {
              balance: currentBalance + adminCommission,
            });
            console.log("Updated admin wallet balance:", currentBalance + adminCommission);
          } else {
            console.log("Creating new admin wallet with balance:", adminCommission);
            await setDoc(adminWalletRef, {
              balance: adminCommission,
              createdAt: new Date(),
            });
          }

          // Add transaction record for admin
          const adminTransactionsRef = collection(db, "admin", "wallet", "transactions");
          const transactionData = {
            amount: adminCommission,
            type: "commission",
            bookingId: appointmentId,
            doctorId: appointmentData.doctorId,
            doctorName: appointmentData.doctorName,
            patientName: appointmentData.patientName,
            service: appointmentData.service,
            date: new Date(),
            description: `5% commission from booking with ${appointmentData.patientName}`,
          };

          await addDoc(adminTransactionsRef, transactionData);
          console.log("Admin transaction added:", transactionData);
        }

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
