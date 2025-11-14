<template>
  <div :class="$i18n.locale === 'ar' ? 'lg:ml-0 , lg:mr-[302px]' : 'lg:ml-[302px]'" class="w-dwh">
    <main-nav />

    <div class="px-4 lg:pl-8 lg:pr-20 mt-8 flex flex-col gap-6">
      <!-- Page top -->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold dark:text-white">Availability</h1>
        <p class="text-gray-500 dark:text-gray-400">Set your available days and time slots</p>
        <div
          v-if="!isApproved"
          class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded"
        >
          <p>You must be approved by the admin before you can set your availability.</p>
        </div>
        <div
          v-if="isApproved && !hasAnyAvailability"
          class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded"
        >
          <p class="font-medium">Welcome! Please set your availability.</p>
          <p class="text-sm mt-1">
            Toggle the days you're available and set your working hours. Patients will be able to
            book appointments based on your schedule.
          </p>
        </div>
      </div>

      <!-- Page content -->
      <div class="content flex flex-col gap-4">
        <div
          v-for="(day, index) in days"
          :key="index"
          class="bg-white dark:bg-gray-800 p-6 rounded-xl flex flex-col gap-4"
        >
          <div
            class="top flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
          >
            <p class="text-xl font-medium text-gray-900 dark:text-white">
              {{ day.name }} {{ day.date.getDate() }}/{{ day.date.getMonth() + 1 }}
            </p>

            <label class="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                class="sr-only peer"
                v-model="day.available"
                @change="handleAvailabilityChange(day)"
                :disabled="!isApproved"
              />
              <div
                class="relative w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer dark:bg-gray-700 peer-checked:bg-blue-600"
              >
                <div
                  class="absolute top-[2px] left-[2px] bg-white border-gray-300 border rounded-full h-5 w-5 transition-all"
                  :class="{ 'translate-x-full': day.available }"
                ></div>
              </div>
              <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {{ day.available ? "Available" : "Not Available" }}
              </span>
            </label>
          </div>

          <div
            v-if="day.available"
            class="bottom p-4 rounded-lg bg-gray-100 dark:bg-gray-700 flex flex-col gap-2"
          >
            <p class="text-lg font-medium text-gray-900 dark:text-white">Time slots</p>
            <form class="mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div class="w-full">
                <label
                  for="start-time"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Start time:</label
                >
                <input
                  type="time"
                  v-model="day.start"
                  class="bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  :min="day.isToday ? currentTime : '09:00'"
                  max="18:00"
                  required
                  :disabled="!isApproved"
                />
              </div>
              <div class="w-full">
                <label
                  for="end-time"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >End time:</label
                >
                <input
                  type="time"
                  v-model="day.end"
                  class="bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  min="09:00"
                  max="18:00"
                  required
                  :disabled="!isApproved"
                />
              </div>
            </form>
          </div>
        </div>

        <!-- Save button -->
        <div class="flex flex-col items-center lg:items-end gap-3">
          <button
            @click="saveAvailability"
            :disabled="!isApproved"
            class="flex gap-2 items-center justify-center h-12 rounded-lg bg-[#5271FF] text-white w-fit px-10 cursor-pointer disabled:opacity-60"
          >
            Save
          </button>

          <!-- Success Message -->
          <transition name="fade">
            <div
              v-if="showSuccessPopup"
              class="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span class="text-sm font-medium">Availability saved successfully!</span>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from "../Layouts/MainNav.vue";
import { db, auth } from "@/firebase";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

export default {
  name: "DoctorAvail",
  components: { MainNav },

  data() {
    return {
      days: [],
      isApproved: false,
      showSuccessPopup: false,
    };
  },
  computed: {
    hasAnyAvailability() {
      return this.days.some((day) => day.available === true);
    },
    currentTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    },
  },

  async mounted() {
    await this.checkApprovalStatus();
    this.generateNext7Days();

    // Load availability from Firebase first, then localStorage as fallback
    const user = auth.currentUser;
    if (user) {
      try {
        const ref = doc(db, "doctorAvailability", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data().availability || [];
          // Merge Firebase data with generated days
          this.days = this.days.map((day) => {
            const dayString = day.date.toISOString().split("T")[0];
            const savedDay = data.find((sd) => {
              // Handle both string dates and Date objects
              const savedDateString =
                sd.date instanceof Date ? sd.date.toISOString().split("T")[0] : sd.date;
              return savedDateString === dayString;
            });
            return savedDay ? { ...day, ...savedDay, date: day.date } : day;
          });
        } else {
          // Fallback to localStorage if no Firebase data
          const saved = localStorage.getItem("doctorAvailability");
          if (saved) {
            const savedDays = JSON.parse(saved);
            this.days = this.days.map((day) => {
              const dayString = day.date.toISOString().split("T")[0];
              const savedDay = savedDays.find((sd) => {
                const savedDateString =
                  sd.date instanceof Date
                    ? sd.date.toISOString().split("T")[0]
                    : typeof sd.date === "string"
                    ? sd.date.split("T")[0]
                    : sd.date;
                return savedDateString === dayString;
              });
              return savedDay ? { ...day, ...savedDay, date: day.date } : day;
            });
          }
        }
      } catch (error) {
        console.error("Error loading availability from Firebase:", error);
        // Fallback to localStorage on error
        const saved = localStorage.getItem("doctorAvailability");
        if (saved) {
          const savedDays = JSON.parse(saved);
          this.days = this.days.map((day) => {
            const dayString = day.date.toISOString().split("T")[0];
            const savedDay = savedDays.find((sd) => {
              const savedDateString =
                sd.date instanceof Date
                  ? sd.date.toISOString().split("T")[0]
                  : typeof sd.date === "string"
                  ? sd.date.split("T")[0]
                  : sd.date;
              return savedDateString === dayString;
            });
            return savedDay ? { ...day, ...savedDay, date: day.date } : day;
          });
        }
      }
    } else {
      // No authenticated user yet, still try to load from localStorage
      const saved = localStorage.getItem("doctorAvailability");
      if (saved) {
        const savedDays = JSON.parse(saved);
        this.days = this.days.map((day) => {
          const dayString = day.date.toISOString().split("T")[0];
          const savedDay = savedDays.find((sd) => {
            const savedDateString =
              sd.date instanceof Date
                ? sd.date.toISOString().split("T")[0]
                : typeof sd.date === "string"
                ? sd.date.split("T")[0]
                : sd.date;
            return savedDateString === dayString;
          });
          return savedDay ? { ...day, ...savedDay, date: day.date } : day;
        });
      }
    }
  },

  methods: {
    async checkApprovalStatus() {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const docRef = doc(db, "doctors", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          this.isApproved = data.approved === true;
        } else {
          this.isApproved = false;
        }
      } catch (error) {
        console.error("Error checking approval status:", error);
        this.isApproved = false;
      }
    },
    async handleAvailabilityChange(day) {
      // لو اليوم اتقفل (بقى Not Available)
      if (!day.available) {
        day.start = "";
        day.end = "";

        //update local storage after deletion
        const updated = this.days.map((d) => {
          if (d.date.toISOString().split("T")[0] === day.date.toISOString().split("T")[0])
            return day;
          return d;
        });
        const updatedForLocal = updated.map((d) => ({
          ...d,
          date:
            d.date instanceof Date
              ? d.date.toISOString().split("T")[0]
              : typeof d.date === "string"
              ? d.date.split("T")[0]
              : d.date,
        }));
        localStorage.setItem("doctorAvailability", JSON.stringify(updatedForLocal));

        //delete from firebase
        const user = auth.currentUser;
        if (!user) return;

        try {
          const ref = doc(db, "doctorAvailability", user.uid);
          const snap = await getDoc(ref);

          if (snap.exists()) {
            const data = snap.data().availability || [];
            const newData = data.map((d) =>
              d.date === day.date.toISOString().split("T")[0]
                ? { ...d, available: false, start: "", end: "" }
                : d
            );

            await updateDoc(ref, { availability: newData });
          }
        } catch (error) {
          console.error("Error updating availability:", error);
        }
      }
    },

    generateNext7Days() {
      const days = [];
      const today = new Date();
      const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        days.push({
          date: date,
          name: dayNames[date.getDay()],
          isToday: i === 0,
          available: false,
          start: "",
          end: "",
        });
      }
      this.days = days;
    },
    async saveAvailability() {
      if (!this.isApproved) {
        return;
      }

      // Convert dates to strings for Firebase storage
      const availabilityForFirebase = this.days.map((day) => ({
        ...day,
        date: day.date.toISOString().split("T")[0], // Store date as string
      }));

      // Save to local storage (normalized date strings)
      localStorage.setItem("doctorAvailability", JSON.stringify(availabilityForFirebase));

      // Firebase saving
      const user = auth.currentUser;
      if (!user) return;

      try {
        await setDoc(doc(db, "doctorAvailability", user.uid), {
          availability: availabilityForFirebase,
        });

        // Show success popup
        this.showSuccessPopup = true;
        setTimeout(() => {
          this.showSuccessPopup = false;
        }, 3000);
      } catch (error) {
        console.error("Error saving availability:", error);
      }
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
