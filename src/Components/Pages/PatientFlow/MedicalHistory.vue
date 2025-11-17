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
          class="bg-white dark:bg-gray-800 rounded-xl  border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <!-- Visit header -->
          <div
            class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors"
            @click="toggleVisit(record.id)"
          >
            <div class="flex justify-between items-start">
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center overflow-hidden border-2 border-blue-200 dark:border-blue-700"
                >
                  <template v-if="record.profilePic">
                    <img
                      :src="record.profilePic"
                      :alt="record.doctorName"
                      class="w-full h-full object-cover"
                    />
                  </template>
                  <template v-else>
                    <svg
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
                  </template>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Dr. {{ record.doctorName }}
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ record.speciality }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-500">
                    {{ formatDate(record.date) }} at {{ record.time }}
                  </p>
                  <!-- Debug: {{ record.profilePic ? 'Has pic' : 'No pic' }} -->
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
              <div class="flex justify-between items-center mb-3">
                <h4 class="text-sm font-semibold text-green-900 dark:text-green-100">
                  Prescriptions
                </h4>
                <!-- <button
                  @click="downloadAsPDF(record)"
                  class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                >
                  <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  Download PDF
                </button> -->

                <button
                  @click="generateMedicalHistoryPDF()"
                  class="px-3 sm:px-4 py-2 bg-red-500 text-white rounded-lg hover:cursor-pointer hover:bg-red-600 dark:hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
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

            <!-- Medical Requirements -->
            <div
              v-if="
                record.details.medicalRequirements && record.details.medicalRequirements.length > 0
              "
              class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4"
            >
              <h4 class="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-3">
                {{ $t("medicalRequirements") }}
              </h4>
              <div class="space-y-3">
                <div
                  v-for="(requirement, index) in record.details.medicalRequirements"
                  :key="index"
                  class="bg-white dark:bg-gray-800 rounded-lg p-3 border border-purple-200 dark:border-purple-700"
                >
                  <div class="flex items-start gap-3">
                    <!-- Icon based on type -->
                    <div class="flex-shrink-0 mt-1">
                      <div
                        class="w-8 h-8 rounded-full flex items-center justify-center"
                        :class="{
                          'bg-blue-100 dark:bg-blue-900': requirement.type === 'lab',
                          'bg-green-100 dark:bg-green-900': requirement.type === 'radiology',
                          'bg-gray-100 dark:bg-gray-700': requirement.type === 'other',
                        }"
                      >
                        <svg
                          v-if="requirement.type === 'lab'"
                          class="w-4 h-4 text-blue-600 dark:text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                          ></path>
                        </svg>
                        <svg
                          v-else-if="requirement.type === 'radiology'"
                          class="w-4 h-4 text-green-600 dark:text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                          ></path>
                        </svg>
                        <svg
                          v-else
                          class="w-4 h-4 text-gray-600 dark:text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          ></path>
                        </svg>
                      </div>
                    </div>

                    <!-- Content -->
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-2">
                        <span
                          class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                          :class="{
                            'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200':
                              requirement.type === 'lab',
                            'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200':
                              requirement.type === 'radiology',
                            'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200':
                              requirement.type === 'other',
                          }"
                        >
                          {{
                            requirement.type === "lab"
                              ? $t("labTest")
                              : requirement.type === "radiology"
                              ? $t("radiology")
                              : $t("otherRequirement")
                          }}
                        </span>
                        <span
                          v-if="requirement.priority"
                          class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                          :class="{
                            'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200':
                              requirement.priority === 'urgent',
                            'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200':
                              requirement.priority === 'normal',
                            'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200':
                              requirement.priority === 'optional',
                          }"
                        >
                          {{
                            requirement.priority === "urgent"
                              ? $t("urgent")
                              : requirement.priority === "normal"
                              ? $t("normal")
                              : $t("optional")
                          }}
                        </span>
                        <span
                          v-if="requirement.imageUrl"
                          class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                        >
                          ✓ {{ $t("resultsUploaded") }}
                          <span v-if="requirement.fileType" class="ml-1"
                            >({{ requirement.fileType.toUpperCase() }})</span
                          >
                        </span>
                      </div>
                      <p class="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        {{ requirement.name }}
                      </p>
                      <p
                        v-if="requirement.notes"
                        class="text-sm text-gray-600 dark:text-gray-400 mb-2"
                      >
                        {{ requirement.notes }}
                      </p>

                      <!-- Upload Section -->
                      <div class="mt-3">
                        <!-- Uploaded file card -->
                        <div
                          v-if="requirement.imageUrl"
                          class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 border border-gray-200 dark:border-gray-600"
                        >
                          <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                              <!-- File icon -->
                              <div class="flex-shrink-0">
                                <svg
                                  v-if="requirement.fileType === 'pdf'"
                                  class="w-8 h-8 text-red-500"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M4 18h12V6h-4V2H4v16zm-2 1V0h12l4 4v16H2v-1z" />
                                  <text x="6" y="14" font-size="6" fill="white" font-weight="bold">
                                    PDF
                                  </text>
                                </svg>
                                <svg
                                  v-else
                                  class="w-8 h-8 text-blue-500"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </div>

                              <!-- File info -->
                              <div class="flex-1 min-w-0">
                                <p
                                  class="text-sm font-medium text-gray-900 dark:text-white truncate"
                                >
                                  {{ requirement.name || "Medical Document" }}
                                </p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">
                                  {{
                                    requirement.fileType === "pdf" ? "PDF Document" : "Image File"
                                  }}
                                </p>
                              </div>
                            </div>

                            <!-- Action buttons -->
                            <div class="flex items-center gap-2">
                              <a
                                :href="requirement.imageUrl"
                                :download="
                                  requirement.fileType === 'pdf'
                                    ? `${requirement.name || 'document'}.pdf`
                                    : true
                                "
                                target="_blank"
                                class="inline-flex items-center justify-center w-8 h-8 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                                :title="
                                  requirement.fileType === 'pdf' ? 'Download PDF' : 'View Image'
                                "
                              >
                                <svg
                                  class="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                  ></path>
                                </svg>
                              </a>
                              <button
                                @click="deleteFile(record.id, index)"
                                class="inline-flex items-center justify-center w-8 h-8 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                                title="Delete file"
                              >
                                <svg
                                  class="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>

                        <!-- Upload button (when no file) -->
                        <div v-else class="relative">
                          <input
                            type="file"
                            :id="`file-${record.id}-${index}`"
                            accept="image/*,application/pdf"
                            @change="handleFileUpload($event, record.id, index)"
                            class="hidden"
                          />
                          <label
                            :for="`file-${record.id}-${index}`"
                            class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all"
                            :class="
                              uploadingStates[`${record.id}-${index}`]
                                ? 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 cursor-not-allowed'
                                : 'border-purple-300 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:border-purple-400 dark:hover:border-purple-500'
                            "
                          >
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg
                                v-if="!uploadingStates[`${record.id}-${index}`]"
                                class="w-10 h-10 mb-3 text-purple-500 dark:text-purple-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                ></path>
                              </svg>
                              <svg
                                v-else
                                class="animate-spin w-10 h-10 mb-3 text-purple-500 dark:text-purple-400"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  class="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  stroke-width="4"
                                ></circle>
                                <path
                                  class="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              <p
                                class="mb-1 text-sm font-medium text-purple-600 dark:text-purple-400"
                              >
                                {{
                                  uploadingStates[`${record.id}-${index}`]
                                    ? $t("uploading")
                                    : $t("clickToUpload")
                                }}
                              </p>
                              <p class="text-xs text-gray-500 dark:text-gray-400">
                                {{ $t("supportedFormats") }}: JPG, PNG, PDF (Max 10MB)
                              </p>
                            </div>
                          </label>
                        </div>
                      </div>
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

    <!-- Confirmation Modal -->
    <UiModal v-model="showConfirmModal" :title="confirmModalTitle">
      <p class="text-gray-700 dark:text-gray-300">{{ confirmModalMessage }}</p>
      <template #footer>
        <button
          @click="showConfirmModal = false"
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          {{ $t("cancelAction") }}
        </button>
        <button
          @click="confirmAction"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          {{ $t("confirmAction") }}
        </button>
      </template>
    </UiModal>

    <!-- Success/Error Modal -->
    <UiModal v-model="showMessageModal" :title="messageModalTitle">
      <p class="text-gray-700 dark:text-gray-300">{{ messageModalContent }}</p>
      <template #footer>
        <button
          @click="showMessageModal = false"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {{ $t("close") }}
        </button>
      </template>
    </UiModal>

    <!-- PDF Viewer Modal -->
    <UiModal v-model="showPdfModal" title="PDF Viewer" size="large">
      <div class="pdf-viewer-container">
        <div v-if="loadingPdf" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
        <div v-else class="space-y-4">
          <div class="flex justify-between items-center mb-4">
            <span class="text-sm text-gray-600 dark:text-gray-400">
              Page {{ currentPdfPage }} of {{ totalPdfPages }}
            </span>
            <div class="flex gap-2">
              <button
                @click="previousPage"
                :disabled="currentPdfPage <= 1"
                class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                @click="nextPage"
                :disabled="currentPdfPage >= totalPdfPages"
                class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
          <canvas
            ref="pdfCanvas"
            class="w-full border border-gray-300 dark:border-gray-600"
          ></canvas>
        </div>
      </div>
      <template #footer>
        <button
          @click="showPdfModal = false"
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          {{ $t("close") }}
        </button>
      </template>
    </UiModal>
  </div>
</template>

<script>
import MainNav from "@/Components/Layouts/MainNav.vue";
import UiModal from "@/Components/UI/Modal.vue";
import { db, auth } from "@/authHandler.js";
import {
  collection,
  query,
  where,
  getDocs,
  doc as firestoreDoc,
  getDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as pdfjsLib from "pdfjs-dist";

// Configure PDF.js worker with proper URL
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default {
  name: "MedicalHistory",
  components: {
    MainNav,
    UiModal,
  },
  data() {
    return {
      medicalHistory: [],
      loading: true,
      expandedVisits: new Set(), // Track which visits are expanded
      uploadingStates: {}, // Track uploading state for each requirement
      showConfirmModal: false,
      confirmModalTitle: "",
      confirmModalMessage: "",
      confirmCallback: null,
      showMessageModal: false,
      messageModalTitle: "",
      messageModalContent: "",
      showPdfModal: false,
      loadingPdf: false,
      currentPdfPage: 1,
      totalPdfPages: 0,
      pdfDoc: null,
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
                const doctorRef = firestoreDoc(db, "doctors", bookingData.doctorId);
                const doctorSnap = await getDoc(doctorRef);
                if (doctorSnap.exists()) {
                  const doctorData = doctorSnap.data();

                  doctorName =
                    `${doctorData.firstName || ""} ${doctorData.lastName || ""}`.trim() ||
                    doctorName;
                  speciality = doctorData.speciality || speciality;

                  // Get profile image URL directly like in DoctorsPage
                  profilePic = doctorData.profileImageUrl || null;
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
                medicalRequirements: data.medicalRequirements || [],
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
    async handleFileUpload(event, bookingId, requirementIndex) {
      const file = event.target.files[0];
      if (!file) return;

      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
      if (!validTypes.includes(file.type)) {
        this.showMessage(this.$t("error"), "Please upload only JPG, PNG, or PDF files");
        return;
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        this.showMessage(this.$t("error"), "File size must be less than 10MB");
        return;
      }

      const key = `${bookingId}-${requirementIndex}`;
      this.uploadingStates[key] = true;

      try {
        // Determine file type
        const fileType = file.type === "application/pdf" ? "pdf" : "image";
        let downloadURL;

        if (fileType === "pdf") {
          // For PDFs: Convert to Base64 and store directly
          const reader = new FileReader();
          downloadURL = await new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        } else {
          // For images: Upload to Cloudinary
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "ml_default");

          const response = await fetch("https://api.cloudinary.com/v1_1/dtaqbcmmg/image/upload", {
            method: "POST",
            body: formData,
          });

          const data = await response.json();

          if (!data.secure_url) {
            throw new Error(data.error?.message || "Upload failed");
          }

          downloadURL = data.secure_url;
        }

        // Update Firebase with the file URL and type
        await this.updateRequirementFile(bookingId, requirementIndex, downloadURL, fileType);

        // Update local state
        const record = this.medicalHistory.find((r) => r.id === bookingId);
        if (record && record.details.medicalRequirements[requirementIndex]) {
          record.details.medicalRequirements[requirementIndex].imageUrl = downloadURL;
          record.details.medicalRequirements[requirementIndex].fileType = fileType;
        }

        // Send notification to doctor
        await this.sendNotificationToDoctor(bookingId, requirementIndex);

        this.showMessage(
          this.$t("success"),
          fileType === "pdf" ? "PDF uploaded successfully" : this.$t("imageUploaded")
        );
      } catch (error) {
        console.error("Error uploading file:", error);
        this.showMessage(this.$t("error"), error.message || this.$t("uploadFailed"));
      } finally {
        this.uploadingStates[key] = false;
      }
    },
    async handleImageUpload(event, bookingId, requirementIndex) {
      // Keep for backward compatibility
      await this.handleFileUpload(event, bookingId, requirementIndex);
    },
    async updateRequirementFile(bookingId, requirementIndex, fileUrl, fileType) {
      try {
        const detailsRef = collection(db, "bookings", bookingId, "medicalDetails");
        const detailsSnapshot = await getDocs(detailsRef);

        if (!detailsSnapshot.empty) {
          const docRef = detailsSnapshot.docs[0].ref;
          const docData = detailsSnapshot.docs[0].data();

          // Update the specific requirement with the file URL and type
          const updatedRequirements = [...(docData.medicalRequirements || [])];
          if (updatedRequirements[requirementIndex]) {
            updatedRequirements[requirementIndex].imageUrl = fileUrl;
            updatedRequirements[requirementIndex].fileType = fileType;

            await updateDoc(docRef, {
              medicalRequirements: updatedRequirements,
              updatedAt: new Date(),
            });
          }
        }
      } catch (error) {
        console.error("Error updating requirement file:", error);
        throw error;
      }
    },
    async updateRequirementImage(bookingId, requirementIndex, imageUrl) {
      // Keep for backward compatibility
      await this.updateRequirementFile(
        bookingId,
        requirementIndex,
        imageUrl,
        imageUrl ? "image" : null
      );
    },
    deleteFile(bookingId, requirementIndex) {
      this.confirmModalTitle = "Delete File";
      this.confirmModalMessage = "Are you sure you want to delete this file?";
      this.confirmCallback = async () => {
        try {
          // Update Firebase to remove the file URL
          await this.updateRequirementFile(bookingId, requirementIndex, null, null);

          // Update local state
          const record = this.medicalHistory.find((r) => r.id === bookingId);
          if (record && record.details.medicalRequirements[requirementIndex]) {
            record.details.medicalRequirements[requirementIndex].imageUrl = null;
            record.details.medicalRequirements[requirementIndex].fileType = null;
          }

          this.showConfirmModal = false;
          this.showMessage(this.$t("success"), "File deleted successfully");
        } catch (error) {
          console.error("Error deleting file:", error);
          this.showConfirmModal = false;
          this.showMessage(this.$t("error"), "Failed to delete file");
        }
      };
      this.showConfirmModal = true;
    },
    deleteImage(bookingId, requirementIndex) {
      // Keep for backward compatibility
      this.deleteFile(bookingId, requirementIndex);
    },
    confirmAction() {
      if (this.confirmCallback) {
        this.confirmCallback();
      }
    },
    showMessage(title, message) {
      this.messageModalTitle = title;
      this.messageModalContent = message;
      this.showMessageModal = true;
    },
    async sendNotificationToDoctor(bookingId, requirementIndex) {
      try {
        // Get booking details to find doctor ID
        const bookingRef = firestoreDoc(db, "bookings", bookingId);
        const bookingSnap = await getDoc(bookingRef);

        if (bookingSnap.exists()) {
          const bookingData = bookingSnap.data();
          const record = this.medicalHistory.find((r) => r.id === bookingId);
          const requirement = record?.details.medicalRequirements[requirementIndex];

          if (bookingData.doctorId && requirement) {
            // Create notification for doctor
            await addDoc(collection(db, "notifications"), {
              userId: bookingData.doctorId,
              message: `Patient has uploaded results for ${requirement.name} (${bookingData.date} at ${bookingData.time})`,
              read: false,
              createdAt: new Date(),
              type: "medical_results_uploaded",
              bookingId: bookingId,
              patientName: `${auth.currentUser.displayName || "Patient"}`,
            });
          }
        }
      } catch (error) {
        console.error("Error sending notification to doctor:", error);
      }
    },
    viewFile(fileUrl, fileType) {
      if (fileType === "pdf") {
        this.showPdfModal = true;
        this.loadPdf(fileUrl);
      } else {
        window.open(fileUrl, "_blank");
      }
    },
    downloadPDF(pdfUrl, fileName = "medical-document") {
      // Simple download - just open the URL in a new tab
      // The browser will handle the download
      window.open(pdfUrl, "_blank");
    },
    viewImage(imageUrl) {
      // Keep for backward compatibility
      window.open(imageUrl, "_blank");
    },
    async loadPdf(url) {
      this.loadingPdf = true;
      try {
        // Configure PDF loading with CORS support
        const loadingTask = pdfjsLib.getDocument({
          url: url,
          cMapUrl: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/cmaps/`,
          cMapPacked: true,
          withCredentials: false,
        });

        this.pdfDoc = await loadingTask.promise;
        this.totalPdfPages = this.pdfDoc.numPages;
        this.currentPdfPage = 1;
        await this.renderPage(1);
      } catch (error) {
        console.error("Error loading PDF:", error);
        console.error("PDF URL:", url);
        console.error("Error details:", error.message);
        this.showMessage(
          this.$t("error"),
          "Failed to load PDF. Please try downloading it instead."
        );
        this.showPdfModal = false;
      } finally {
        this.loadingPdf = false;
      }
    },
    async renderPage(pageNum) {
      if (!this.pdfDoc) return;

      try {
        const page = await this.pdfDoc.getPage(pageNum);
        const canvas = this.$refs.pdfCanvas;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        const viewport = page.getViewport({ scale: 1.5 });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
      } catch (error) {
        console.error("Error rendering page:", error);
      }
    },
    async nextPage() {
      if (this.currentPdfPage < this.totalPdfPages) {
        this.currentPdfPage++;
        await this.renderPage(this.currentPdfPage);
      }
    },
    async previousPage() {
      if (this.currentPdfPage > 1) {
        this.currentPdfPage--;
        await this.renderPage(this.currentPdfPage);
      }
    },
    // downloadAsPDF(record) {
    //   const doc = new jsPDF();

    //   // Set up document
    //   doc.setFontSize(20);
    //   doc.text("Prescriptions & Medical Requirements", 20, 30);

    //   // Patient and Doctor info
    //   doc.setFontSize(12);
    //   doc.text(`Doctor: Dr. ${record.doctorName}`, 20, 50);
    //   doc.text(`Speciality: ${record.speciality}`, 20, 60);
    //   doc.text(`Date: ${this.formatDate(record.date)}`, 20, 70);
    //   doc.text(`Time: ${record.time}`, 20, 80);

    //   let yPosition = 100;

    //   // Prescriptions
    //   if (record.details.prescriptions && record.details.prescriptions.length > 0) {
    //     doc.setFontSize(16);
    //     doc.text("Prescriptions", 20, yPosition);
    //     yPosition += 15;

    //     const prescriptionData = record.details.prescriptions.map((med) => [
    //       med.name || "",
    //       med.dosage || "",
    //       med.frequency || "",
    //       med.duration || "",
    //     ]);

    //     doc.autoTable({
    //       startY: yPosition,
    //       head: [["Medication", "Dosage", "Frequency", "Duration"]],
    //       body: prescriptionData,
    //       theme: "grid",
    //       styles: { fontSize: 9 },
    //       headStyles: { fillColor: [41, 128, 185] },
    //       margin: { left: 20 },
    //     });

    //     yPosition = doc.lastAutoTable.finalY + 20;
    //   }

    //   // Medical Requirements
    //   if (record.details.medicalRequirements && record.details.medicalRequirements.length > 0) {
    //     doc.setFontSize(16);
    //     doc.text("Medical Requirements", 20, yPosition);
    //     yPosition += 15;

    //     const requirementData = record.details.medicalRequirements.map((req) => [
    //       req.name || "",
    //       req.type || "",
    //       req.priority || "",
    //       req.notes || "",
    //     ]);

    //     doc.autoTable({
    //       startY: yPosition,
    //       head: [["Requirement", "Type", "Priority", "Notes"]],
    //       body: requirementData,
    //       theme: "grid",
    //       styles: { fontSize: 9 },
    //       headStyles: { fillColor: [142, 68, 173] },
    //       margin: { left: 20 },
    //     });
    //   }

    //   // Save the PDF
    //   const fileName = `Prescriptions_Requirements_${record.doctorName.replace(
    //     /\s+/g,
    //     "_"
    //   )}_${this.formatDate(record.date).replace(/\s+/g, "_")}.pdf`;
    //   doc.save(fileName);
    // },

    generateMedicalHistoryPDF() {
      const doc = new jsPDF("landscape"); // PDF أفقي

      // عنوان PDF
      doc.setFontSize(16);
      doc.text("Medical History & Prescriptions Report", 14, 15);

      let yPosition = 25;

      // Prescriptions Section
      if (
        this.medicalHistory.some(
          (record) => record.details.prescriptions && record.details.prescriptions.length > 0
        )
      ) {
        doc.setFontSize(14);
        doc.text("Prescriptions", 14, yPosition);
        yPosition += 10;

        const prescriptionColumns = [
          "Medication",
          "Dosage",
          "Frequency",
          "Duration",
          "Doctor",
          "Date",
        ];

        const prescriptionRows = [];

        this.medicalHistory.forEach((record) => {
          if (record.details.prescriptions && record.details.prescriptions.length > 0) {
            record.details.prescriptions.forEach((medication) => {
              prescriptionRows.push([
                medication.name || "",
                medication.dosage || "",
                medication.frequency || "",
                medication.duration || "",
                `Dr. ${record.doctorName}`,
                this.formatDate(record.date),
              ]);
            });
          }
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const marginLeft = 15;
        const marginRight = 15;
        const availableWidth = pageWidth - marginLeft - marginRight;

        autoTable(doc, {
          startY: yPosition,
          head: [prescriptionColumns],
          body: prescriptionRows,
          theme: "grid",
          headStyles: {
            fillColor: [40, 40, 40],
            textColor: [255, 255, 255],
            halign: "center",
            fontStyle: "bold",
          },
          bodyStyles: {
            fillColor: [55, 55, 55],
            textColor: [230, 230, 230],
            halign: "left",
            fontSize: 9,
            cellPadding: 3,
          },
          alternateRowStyles: {
            fillColor: [45, 45, 45],
          },
          tableWidth: availableWidth,
          styles: {
            overflow: "linebreak",
            cellWidth: "wrap",
          },
          margin: { top: 20, left: marginLeft, right: marginRight },
        });

        yPosition = doc.lastAutoTable.finalY + 20;
      }

      // Medical Requirements Section
      if (
        this.medicalHistory.some(
          (record) =>
            record.details.medicalRequirements && record.details.medicalRequirements.length > 0
        )
      ) {
        doc.setFontSize(14);
        doc.text("Medical Requirements", 14, yPosition);
        yPosition += 10;

        const requirementColumns = ["Requirement", "Type", "Priority", "Notes", "Doctor", "Date"];

        const requirementRows = [];

        this.medicalHistory.forEach((record) => {
          if (record.details.medicalRequirements && record.details.medicalRequirements.length > 0) {
            record.details.medicalRequirements.forEach((requirement) => {
              requirementRows.push([
                requirement.name || "",
                requirement.type || "",
                requirement.priority || "",
                requirement.notes || "",
                `Dr. ${record.doctorName}`,
                this.formatDate(record.date),
              ]);
            });
          }
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const marginLeft = 15;
        const marginRight = 15;
        const availableWidth = pageWidth - marginLeft - marginRight;

        autoTable(doc, {
          startY: yPosition,
          head: [requirementColumns],
          body: requirementRows,
          theme: "grid",
          headStyles: {
            fillColor: [40, 40, 40],
            textColor: [255, 255, 255],
            halign: "center",
            fontStyle: "bold",
          },
          bodyStyles: {
            fillColor: [55, 55, 55],
            textColor: [230, 230, 230],
            halign: "left",
            fontSize: 9,
            cellPadding: 3,
          },
          alternateRowStyles: {
            fillColor: [45, 45, 45],
          },
          tableWidth: availableWidth,
          styles: {
            overflow: "linebreak",
            cellWidth: "wrap",
          },
          margin: { top: 20, left: marginLeft, right: marginRight },
        });
      }

      // footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.setTextColor(180);
        doc.text(
          `Page ${i} of ${pageCount}`,
          doc.internal.pageSize.getWidth() - 20,
          doc.internal.pageSize.getHeight() - 10,
          { align: "right" }
        );
      }

      doc.save("medical_history.pdf");
    },
  },
};
</script>

<style scoped>
.pdf-viewer-container {
  max-height: 70vh;
  overflow-y: auto;
}

.pdf-viewer-container canvas {
  max-width: 100%;
  height: auto;
}
</style>
