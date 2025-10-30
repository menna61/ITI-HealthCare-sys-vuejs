<template>
  <div class="w-dwh ml-[302px]">
    <main-nav />

    <div class="pl-8 pr-20 mt-8 flex flex-col gap-6">
      <!--Titles-->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold">Profile</h1>
        <p class="text-gray-500">Manage your data</p>
      </div>

      <!-- Profile Form -->
      <div class="profile-form bg-white p-8 rounded-xl">
        <form @submit.prevent="saveProfile" class="flex flex-col gap-6">
          <!-- Profile Image -->
          <div class="flex flex-col gap-4">
            <div
              class="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer relative group"
              @click="triggerFileInput"
            >
              <img
                v-if="profileImageUrl"
                :src="profileImageUrl"
                alt="Profile"
                class="w-full h-full object-cover"
              />
              <svg v-else class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
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
              class="text-sm text-gray-500 cursor-pointer hover:text-gray-700"
              @click="triggerFileInput"
            >
              Click to change profile image
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
              <label class="text-sm font-medium">First Name</label>
              <input
                v-model="firstName"
                type="text"
                class="h-12 px-4 border border-gray-200 rounded-lg"
                placeholder="Enter first name"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium">Last Name</label>
              <input
                v-model="lastName"
                type="text"
                class="h-12 px-4 border border-gray-200 rounded-lg"
                placeholder="Enter last name"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium">Email</label>
              <input
                v-model="email"
                type="email"
                class="h-12 px-4 border border-gray-200 rounded-lg"
                placeholder="Enter email"
                readonly
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium">Phone Number</label>
              <input
                v-model="phoneNumber"
                type="text"
                class="h-12 px-4 border border-gray-200 rounded-lg"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <!-- Professional Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium">Years of Experience</label>
              <input
                v-model="yearsOfExperience"
                type="number"
                class="h-12 px-4 border border-gray-200 rounded-lg"
                placeholder="Enter years of experience"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium">Medical License Number</label>
              <input
                v-model="medicalLicenseNumber"
                type="text"
                class="h-12 px-4 border border-gray-200 rounded-lg bg-gray-50"
                placeholder="Enter license number"
                readonly
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium">Degree</label>
              <input
                v-model="degree"
                type="text"
                class="h-12 px-4 border border-gray-200 rounded-lg"
                placeholder="Enter degree"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium">Speciality</label>
              <input
                v-model="speciality"
                type="text"
                class="h-12 px-4 border border-gray-200 rounded-lg"
                placeholder="Enter speciality"
              />
            </div>
          </div>

          <!-- Clinic Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium">Clinic Name</label>
              <input
                v-model="clinicName"
                type="text"
                class="h-12 px-4 border border-gray-200 rounded-lg"
                placeholder="Enter clinic name"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium">Clinic Address</label>
              <input
                v-model="clinicAddress"
                type="text"
                class="h-12 px-4 border border-gray-200 rounded-lg"
                placeholder="Enter clinic address"
              />
            </div>
          </div>

          <!-- Bio -->
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium">Bio</label>
            <textarea
              v-model="bio"
              class="h-32 px-4 py-3 border border-gray-200 rounded-lg resize-none"
              placeholder="Enter your bio"
            ></textarea>
          </div>

          <!-- Messages -->
          <div v-if="errorMsg" class="text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
            {{ errorMsg }}
          </div>
          <div
            v-if="successMsg"
            class="text-green-600 bg-green-50 border border-green-200 p-3 rounded-lg"
          >
            {{ successMsg }}
          </div>

          <!-- Save Button -->
          <div class="flex justify-end">
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
                Saving...
              </span>
              <span v-else>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from "../Layouts/MainNav.vue";
import { db, auth } from "../../firebase.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default {
  name: "DoctorProfile",
  components: { MainNav },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      yearsOfExperience: "",
      medicalLicenseNumber: "",
      clinicName: "",
      clinicAddress: "",
      degree: "",
      speciality: "",
      bio: "",
      profileImageUrl: "",

      loading: false,
      errorMsg: "",
      successMsg: "",
    };
  },
  async mounted() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await this.fetchDoctorData(user.uid);
      } else {
        this.$router.push("/login");
      }
    });
  },
  methods: {
    async fetchDoctorData(uid) {
      try {
        const docRef = doc(db, "doctors", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          this.firstName = data.firstName || "";
          this.lastName = data.lastName || "";
          this.email = data.email || "";
          this.phoneNumber = data.phone || "";
          this.yearsOfExperience = data.yearsOfExperience || "";
          this.medicalLicenseNumber = data.medicalLicenseNumber || "";
          this.clinicName = data.clinicName || "";
          this.clinicAddress = data.clinicAddress || "";
          this.degree = data.degree || "";
          this.speciality = data.speciality || "";
          this.bio = data.bio || "";
          this.profileImageUrl = data.profileImageUrl || "";
        } else {
          this.errorMsg = "Doctor data not found.";
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        this.errorMsg = "Failed to load profile data.";
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
          this.successMsg = "Profile image updated successfully!";
          this.errorMsg = ""; // Clear any previous error
        } else {
          console.error("Upload failed:", data.error?.message || data);
          this.errorMsg = `Failed to upload image: ${data.error?.message || "Unknown error"}`;
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        this.errorMsg = `Failed to upload image: ${error.message}`;
      }
    },

    async saveProfile() {
      this.loading = true;
      this.errorMsg = "";
      this.successMsg = "";

      try {
        const user = auth.currentUser;
        if (!user) {
          this.errorMsg = "User not authenticated.";
          return;
        }

        const docRef = doc(db, "doctors", user.uid);
        await updateDoc(docRef, {
          firstName: this.firstName,
          lastName: this.lastName,
          phone: this.phoneNumber,
          yearsOfExperience: this.yearsOfExperience,
          medicalLicenseNumber: this.medicalLicenseNumber,
          clinicName: this.clinicName,
          clinicAddress: this.clinicAddress,
          degree: this.degree,
          speciality: this.speciality,
          bio: this.bio,
          profileImageUrl: this.profileImageUrl,
        });

        this.successMsg = "Profile updated successfully!";
      } catch (error) {
        console.error("Error updating profile:", error);
        this.errorMsg = "Failed to update profile. Please try again.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped></style>
