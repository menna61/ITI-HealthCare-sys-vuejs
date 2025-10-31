<template>
  <div class="w-dwh ml-[302px]">
    <main-nav />
    <div class="pl-8 pr-20 mt-8 flex flex-col gap-6">
      <!-- Page top -->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold">Availability</h1>
        <p class="text-gray-500">Set your available days and time slots</p>
      </div>

      <!-- Page content -->
      <div class="content flex flex-col gap-4">
        <div
          v-for="(day, index) in days"
          :key="index"
          class="bg-white p-6 rounded-xl flex flex-col gap-4"
        >
          <div class="top flex justify-between items-center">
            <p class="text-xl font-medium">{{ day.name }}</p>

            <label class="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                class="sr-only peer"
                v-model="day.available"
                @change="handleAvailabilityChange(day)"
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

          <div v-if="day.available" class="bottom p-4 rounded-lg bg-gray-100 flex flex-col gap-2">
            <p class="text-lg font-medium">Time slots</p>
            <form class="mx-auto grid grid-cols-2 gap-4 w-full">
              <div class="w-full">
                <label for="start-time" class="block mb-2 text-sm font-medium text-gray-900"
                  >Start time:</label
                >
                <input
                  type="time"
                  v-model="day.start"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  min="09:00"
                  max="18:00"
                  required
                />
              </div>
              <div class="w-full">
                <label for="end-time" class="block mb-2 text-sm font-medium text-gray-900"
                  >End time:</label
                >
                <input
                  type="time"
                  v-model="day.end"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  min="09:00"
                  max="18:00"
                  required
                />
              </div>
            </form>
          </div>
        </div>

        <!-- Save button -->
        <div class="flex justify-end">
          <button
            @click="saveAvailability"
            class="flex gap-2 items-center justify-center h-12 rounded-lg bg-[#5271FF] text-white w-fit px-10 cursor-pointer disabled:opacity-60"
          >
            Save
          </button>
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
      days: [
        { name: "Saturday", available: false, start: "", end: "" },
        { name: "Sunday", available: false, start: "", end: "" },
        { name: "Monday", available: false, start: "", end: "" },
        { name: "Tuesday", available: false, start: "", end: "" },
        { name: "Wednesday", available: false, start: "", end: "" },
        { name: "Thursday", available: false, start: "", end: "" },
        { name: "Friday", available: false, start: "", end: "" },
      ],
    };
  },

  mounted() {
    const saved = localStorage.getItem("doctorAvailability");
    if (saved) {
      this.days = JSON.parse(saved);
    }
  },

  methods: {
    async handleAvailabilityChange(day) {
      // لو اليوم اتقفل (بقى Not Available)
      if (!day.available) {
        day.start = "";
        day.end = "";

        //update local storage after deletion
        const updated = this.days.map((d) => {
          if (d.name === day.name) return day;
          return d;
        });
        localStorage.setItem("doctorAvailability", JSON.stringify(updated));

        //delete from firebase
        const user = auth.currentUser;
        if (!user) return;

        try {
          const ref = doc(db, "doctorAvailability", user.uid);
          const snap = await getDoc(ref);

          if (snap.exists()) {
            const data = snap.data().availability || [];
            const newData = data.map((d) =>
              d.name === day.name ? { ...d, available: false, start: "", end: "" } : d
            );

            await updateDoc(ref, { availability: newData });
          }
        } catch (error) {
          console.error("Error updating availability:", error);
        }
      }
    },

    async saveAvailability() {
      // Save to local storage
      localStorage.setItem("doctorAvailability", JSON.stringify(this.days));
      alert("Saved locally!");

      // Firebase saving
      const user = auth.currentUser;
      if (!user) return;

      try {
        await setDoc(doc(db, "doctorAvailability", user.uid), {
          availability: this.days,
        });
        alert("Availability saved to Firebase!");
      } catch (error) {
        console.error("Error saving availability:", error);
      }
    },
  },
};
</script>
