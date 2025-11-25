<template>
  <div :class="[$i18n.locale === 'ar' ? 'lg:mr-[302px]' : 'lg:ml-[302px]', 'w-dwh']">
    <main-nav />

    <div
      :class="[
        $i18n.locale === 'ar' ? 'px-4 lg:pr-8 lg:pl-20' : 'px-4 lg:pl-8 lg:pr-20',
        'mt-8 flex flex-col gap-6',
      ]"
    >
      <!--Titles-->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ $t("profile") }}</h1>
        <p class="text-gray-500 dark:text-gray-400">{{ $t("manage_profile_data") }}</p>
      </div>

      <!-- Profile Form -->
      <div class="profile-form bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-xl">
        <form @submit.prevent="saveProfile" class="flex flex-col gap-6">
          <!-- Profile Image -->
          <div class="flex flex-col gap-4">
            <div
              class="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center overflow-hidden cursor-pointer relative group"
              @click="triggerFileInput"
            >
              <img
                v-if="profileImageUrl"
                :src="profileImageUrl"
                alt="Profile"
                class="w-full h-full object-cover"
              />
              <svg
                v-else
                class="w-12 h-12 text-gray-400 dark:text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
              <!-- Edit overlay -->
              <div
                class="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg
                  class="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
            </div>
            <p
              class="text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
              @click="triggerFileInput"
            >
              {{ $t("click_change_profile_image") }}
            </p>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleFileUpload"
              class="hidden"
            />
          </div>

          <!-- Personal Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">{{
                $t("First_name")
              }}</label>
              <input
                v-model="firstName"
                type="text"
                class="h-12 px-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                :placeholder="$t('Enter_first_name')"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">{{
                $t("Last_name")
              }}</label>
              <input
                v-model="lastName"
                type="text"
                class="h-12 px-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                :placeholder="$t('Enter_last_name')"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">{{
                $t("Email")
              }}</label>
              <input
                v-model="email"
                type="email"
                class="h-12 px-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                :placeholder="$t('Enter_email')"
                readonly
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">{{
                $t("Phone_number")
              }}</label>
              <input
                v-model="phoneNumber"
                type="text"
                class="h-12 px-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                :placeholder="$t('Enter_phone_number')"
              />
            </div>
          </div>

          <!-- Additional Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">{{
                $t("date_of_birth")
              }}</label>
              <input
                v-model="dateOfBirth"
                type="date"
                class="h-12 px-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">{{
                $t("Gender")
              }}</label>
              <select
                v-model="gender"
                class="h-12 px-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">{{ $t("Select_gender") }}</option>
                <option value="Male">{{ $t("Male") }}</option>
                <option value="Female">{{ $t("Female") }}</option>
              </select>
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">{{
                $t("address")
              }}</label>
              <input
                v-model="address"
                type="text"
                class="h-12 px-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                :placeholder="$t('enter_address')"
              />
            </div>
          </div>

          <!-- Messages -->
          <div
            v-if="errorMsg"
            class="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 p-3 rounded-lg"
          >
            {{ errorMsg }}
          </div>
          <div
            v-if="successMsg"
            class="text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 p-3 rounded-lg"
          >
            {{ successMsg }}
          </div>

          <!-- Save Button -->
          <div class="flex justify-center lg:justify-end">
            <button
              type="submit"
              :disabled="loading"
              class="bg-[#5271FF] text-white px-8 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading" class="flex items-center gap-2">
                <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                    fill="none"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                {{ $t("saving") }}
              </span>
              <span v-else>{{ $t("save_changes") }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from "@/Components/Layouts/MainNav.vue";
import { db, auth } from "/src/authHandler.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default {
  name: "PatientProfile",
  components: { MainNav },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: "",
      address: "",

      profileImageUrl: "",

      loading: false,
      errorMsg: "",
      successMsg: "",
    };
  },
  async mounted() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await this.fetchPatientData(user.uid);
      } else {
        this.$router.push("/login");
      }
    });
  },
  methods: {
    async fetchPatientData(uid) {
      try {
        const docRef = doc(db, "patients", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          this.firstName = data.firstName || "";
          this.lastName = data.lastName || "";
          this.email = data.email || "";
          this.phoneNumber = data.phoneNumber || data.phone || "";
          this.dateOfBirth = data.birthdate || data.dateOfBirth || "";
          this.gender = data.gender || "";
          this.address = data.address || "";
          this.profileImageUrl = data.profileImageUrl || "";
        } else {
          this.errorMsg = this.$t("patient_data_not_found");
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
        this.errorMsg = this.$t("failed_load_profile");
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.uploading = true;
        this.errorMsg = "";
        this.successMsg = "";
        await this.uploadToCloudinary(file);
        this.uploading = false;
      }
    },
    async uploadToCloudinary(file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary upload preset
      formData.append("cloud_name", "dtaqbcmmg"); // Replace with your Cloudinary cloud name

      try {
        console.log("Starting upload to Cloudinary...");
        const response = await fetch("https://api.cloudinary.com/v1_1/dtaqbcmmg/image/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        console.log("Cloudinary response:", data);
        console.log("Response status:", response.status);
        if (response.ok && data.secure_url) {
          this.profileImageUrl = data.secure_url;
          console.log("Image uploaded successfully:", this.profileImageUrl);
          this.successMsg = this.$t("profile_image_updated");
          this.errorMsg = ""; // Clear any previous error
        } else {
          console.error("Upload failed:", data.error?.message || data);
          this.errorMsg = `${this.$t("failed_upload_image")}: ${
            data.error?.message || this.$t("unknown_error")
          }`;
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        this.errorMsg = `${this.$t("failed_upload_image")}: ${error.message}`;
      }
    },

    async saveProfile() {
      this.loading = true;
      this.errorMsg = "";
      this.successMsg = "";

      try {
        const user = auth.currentUser;
        if (!user) {
          this.errorMsg = this.$t("user_not_authenticated");
          return;
        }

        const docRef = doc(db, "patients", user.uid);
        await updateDoc(docRef, {
          firstName: this.firstName,
          lastName: this.lastName,
          phoneNumber: this.phoneNumber,
          phone: this.phoneNumber, // Keep both for compatibility
          birthdate: this.dateOfBirth,
          dateOfBirth: this.dateOfBirth, // Keep both for compatibility
          gender: this.gender,
          address: this.address,
          profileImageUrl: this.profileImageUrl,
        });

        this.successMsg = this.$t("profile_updated_successfully");
      } catch (error) {
        console.error("Error updating profile:", error);
        this.errorMsg = this.$t("failed_update_profile");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
