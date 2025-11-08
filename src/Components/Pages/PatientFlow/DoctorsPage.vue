<template>
  <div class="w-dwh lg:ml-[302px] ml-0">
    <main-nav />
    <div class="pl-8 pr-20 mt-8 flex flex-col gap-6">
      <!--Page titles-->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold dark:text-white">Doctors</h1>
        <p class="text-gray-500">Manage your appointments and schedule</p>
      </div>

      <!--Page content-->
      <div class="doctors">
        <!-- Speciality Filter -->
        <div class="filter mb-4">
          <h3 class="text-lg font-medium mb-2">Filter by Speciality:</h3>
          <div class="flex overflow-x-auto gap-2 pb-2">
            <button
              @click="selectedSpeciality = ''"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap',
                selectedSpeciality === ''
                  ? 'bg-[var(--main-color-500)] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
              ]"
            >
              All Specialities
            </button>
            <button
              v-for="spec in specialities"
              :key="spec"
              @click="selectedSpeciality = spec"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap',
                selectedSpeciality === spec
                  ? 'bg-[var(--main-color-500)] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
              ]"
            >
              {{ spec }}
            </button>
          </div>
        </div>

        <div v-if="loading" class="text-center w-full flex items-center justify-center">
          <div role="status flex flex-col items-center justify-center">
            <svg
              aria-hidden="true"
              class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
        <div v-else-if="filteredDoctors.length === 0" class="text-center">No doctors found.</div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-fit">
          <div
            @click="openModal(doctor)"
            class="doc p-4 bg-white rounded-xl flex flex-col gap-4 cursor-pointer dark:bg-gray-800"
            v-for="doctor in filteredDoctors"
            :key="doctor.id"
          >
            <div class="top w-full relative">
              <img
                :src="doctor.profileImageUrl"
                alt=""
                v-if="doctor.profileImageUrl"
                class="rounded-lg h-75 w-full"
              />
              <div
                v-else
                class="w-full rounded-lg bg-gray-300 mr-4 flex items-center justify-center h-full"
              >
                <svg class="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div
                class="exp p-2 px-4 bg-[var(--sec-color-25)] rounded-full w-fit absolute top-4 right-4"
              >
                <p class="text-[var(--sec-color-500)] font-medium">
                  {{ doctor.yearsOfExperience }} years experience
                </p>
              </div>
            </div>
            <div class="bottom flex flex-col gap-4">
              <div class="name flex flex-col gap-2">
                <div class="flex justify-between">
                  <h1 class="text-xl font-medium dark:text-white">{{ doctor.firstName }} {{ doctor.lastName }}</h1>
                  <p class="text-lg text-gray-500 dark:text-gray-300">{{ doctor.speciality }}</p>
                </div>
              </div>

              <div class="location flex gap-2">
                <svg
                  class="w-6 h-6 fill-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                >
                  <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                  <path
                    d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"
                  />
                </svg>
                <p class="dark:text-gray-300">{{ doctor.clinicAddress }}</p>
              </div>

              <div class="flex gap-2 items-center">
                <svg
                  class="w-6 h-6 fill-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                >
                  <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                  <path
                    d="M224 64C241.7 64 256 78.3 256 96L256 128L384 128L384 96C384 78.3 398.3 64 416 64C433.7 64 448 78.3 448 96L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 96C192 78.3 206.3 64 224 64zM160 304L160 336C160 344.8 167.2 352 176 352L208 352C216.8 352 224 344.8 224 336L224 304C224 295.2 216.8 288 208 288L176 288C167.2 288 160 295.2 160 304zM288 304L288 336C288 344.8 295.2 352 304 352L336 352C344.8 352 352 344.8 352 336L352 304C352 295.2 344.8 288 336 288L304 288C295.2 288 288 295.2 288 304zM432 288C423.2 288 416 295.2 416 304L416 336C416 344.8 423.2 352 432 352L464 352C472.8 352 480 344.8 480 336L480 304C480 295.2 472.8 288 464 288L432 288zM160 432L160 464C160 472.8 167.2 480 176 480L208 480C216.8 480 224 472.8 224 464L224 432C224 423.2 216.8 416 208 416L176 416C167.2 416 160 423.2 160 432zM304 416C295.2 416 288 423.2 288 432L288 464C288 472.8 295.2 480 304 480L336 480C344.8 480 352 472.8 352 464L352 432C352 423.2 344.8 416 336 416L304 416zM416 432L416 464C416 472.8 423.2 480 432 480L464 480C472.8 480 480 472.8 480 464L480 432C480 423.2 472.8 416 464 416L432 416C423.2 416 416 423.2 416 432z"
                  />
                </svg>
                <div
                  v-if="getFirstAvailableDay(doctor.availability)"
                  class="availability text-sm text-gray-500 dark:text-gray-300"
                >
                  <span class="flex gap-2 items-center">
                    Next available: {{ getFirstAvailableDay(doctor.availability).name }} ({{
                      getFirstAvailableDay(doctor.availability).start
                    }}
                    - {{ getFirstAvailableDay(doctor.availability).end }})</span
                  >
                </div>
                <div v-else class="availability text-sm text-gray-500">
                  <span>Not currently available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Doctor Details Modal -->
    <Modal v-model="showModal" title="Doctor Details" @close="closeModal">
      <div v-if="selectedDoctor" class="max-h-[600px] overflow-y-auto">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-4">
            <img
              :src="selectedDoctor.profileImageUrl"
              alt=""
              v-if="selectedDoctor.profileImageUrl"
              class="w-20 h-20 rounded-full"
            />
            <div v-else class="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
              <svg class="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-semibold dark:text-white">
                {{ selectedDoctor.firstName }} {{ selectedDoctor.lastName }}
              </h2>
              <p class="text-gray-600 dark:text-gray-300">{{ selectedDoctor.speciality }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-300">
                {{ selectedDoctor.yearsOfExperience }} years experience
              </p>
            </div>
          </div>
          <div class="flex gap-2 items-center">
            <svg
              class="w-6 h-6 fill-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path
                d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"
              />
            </svg>
            <p class="dark:text-gray-300">{{ selectedDoctor.clinicAddress }}</p>
          </div>
          <!-- Services Section -->
          <div v-for="service in selectedDoctor.services" :key="service.name">
            <div
              v-if="service.name.toLowerCase() === 'telemedicine'"
              @click="selectService(service)"
              :class="[
                'telemedicine border rounded-lg p-4 flex justify-between cursor-pointer',
                selectedService && selectedService.id === service.id
                  ? 'border-[var(--main-color-500)] bg-blue-50'
                  : 'border-gray-200',
              ]"
            >
              <div class="right flex gap-4">
                <div class="icon">
                  <svg
                    class="w-10 h-10 fill-[var(--main-color-500)]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                  >
                    <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                    <path
                      d="M128 128C92.7 128 64 156.7 64 192L64 448C64 483.3 92.7 512 128 512L384 512C419.3 512 448 483.3 448 448L448 192C448 156.7 419.3 128 384 128L128 128zM496 400L569.5 458.8C573.7 462.2 578.9 464 584.3 464C597.4 464 608 453.4 608 440.3L608 199.7C608 186.6 597.4 176 584.3 176C578.9 176 573.7 177.8 569.5 181.2L496 240L496 400z"
                    />
                  </svg>
                </div>
                <div class="txts flex flex-col gap-2">
                  <h1 class="text-lg font-medium dark:text-white">Telemedicine</h1>
                  <p class="text-gray-500 font-medium">online consultation from anywhere</p>
                </div>
              </div>
              <div class="left text-xl font-bold text-[var(--main-color-500)]">
                ${{ service.price }}
              </div>
            </div>

            <div
              v-if="service.name.toLowerCase() !== 'telemedicine'"
              @click="selectService(service)"
              :class="[
                'telemedicine border rounded-lg p-4 flex justify-between cursor-pointer',
                selectedService && selectedService.id === service.id
                  ? 'border-[var(--sec-color-500)] bg-emerald-50'
                  : 'border-gray-200',
              ]"
            >
              <div class="right flex gap-4">
                <div class="icon">
                  <svg
                    class="w-10 h-10 fill-[var(--sec-color-500)]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                  >
                    <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                    <path
                      d="M64 112C64 85.5 85.5 64 112 64L160 64C177.7 64 192 78.3 192 96C192 113.7 177.7 128 160 128L128 128L128 256C128 309 171 352 224 352C277 352 320 309 320 256L320 128L288 128C270.3 128 256 113.7 256 96C256 78.3 270.3 64 288 64L336 64C362.5 64 384 85.5 384 112L384 256C384 333.4 329 398 256 412.8L256 432C256 493.9 306.1 544 368 544C429.9 544 480 493.9 480 432L480 346.5C442.7 333.3 416 297.8 416 256C416 203 459 160 512 160C565 160 608 203 608 256C608 297.8 581.3 333.4 544 346.5L544 432C544 529.2 465.2 608 368 608C270.8 608 192 529.2 192 432L192 412.8C119 398 64 333.4 64 256L64 112zM512 288C529.7 288 544 273.7 544 256C544 238.3 529.7 224 512 224C494.3 224 480 238.3 480 256C480 273.7 494.3 288 512 288z"
                    />
                  </svg>
                </div>
                <div class="txts flex flex-col gap-2">
                  <h1 class="text-lg font-medium">Regular consultation</h1>
                  <p class="text-gray-500 font-medium">
                    Visit clinic and meet your doctor face to face
                  </p>
                </div>
              </div>
              <div class="left text-xl font-bold text-[var(--sec-color-500)]">
                ${{ service.price }}
              </div>
            </div>
          </div>

          <!-- Booking Section -->
          <div class="booking-section mt-6">
            <h3 class="text-lg font-medium mb-4 dark:text-white">Book an Appointment</h3>

            <!-- Next 7 Days -->
            <div class="days mb-4">
              <h4 class="text-md font-medium mb-2 dark:text-gray-300">Select a Day:</h4>
              <div class="flex overflow-x-auto gap-2 pb-2">
                <button
                  v-for="day in next7Days"
                  :key="day.date"
                  @click="selectDay(day)"
                  :class="[
                    'px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap',
                    selectedDay && selectedDay.date === day.date
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                  ]"
                >
                  {{ day.dayName }} ({{ day.date.toLocaleDateString() }})
                </button>
              </div>
            </div>

            <!-- Time Slots -->
            <div v-if="selectedDay && availableSlots.length > 0" class="time-slots mb-4">
              <h4 class="text-md font-medium mb-2 dark:text-gray-300">Select a Time Slot:</h4>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="slot in availableSlots"
                  :key="slot"
                  @click="selectTime(slot)"
                  :class="[
                    'px-3 py-2 rounded-lg text-sm font-medium',
                    selectedTime === slot
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                  ]"
                >
                  {{ slot }}
                </button>
              </div>
            </div>
            <div v-else-if="selectedDay" class="text-sm text-gray-500 mb-4">
              No available slots for this day.
            </div>

            <!-- Confirm Booking Button -->
            <button
              @click="confirmBooking"
              v-if="selectedDay && selectedTime && selectedService"
              class="w-full rounded-lg py-2 text-white px-10 bg-[var(--main-color-500)] font-semibold cursor-pointer hover:bg-white hover:border hover:border-[var(--main-color-500)] hover:text-[var(--main-color-500)] transition-all ease-in-out"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
      <template #footer>
        <button
          @click="closeModal"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </template>
    </Modal>
  </div>
</template>

<script>
import MainNav from "@/Components/Layouts/MainNav.vue";
import Modal from "@/Components/UI/Modal.vue";
import { signOutUser, db, auth } from "/src/authHandler.js";
import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";

export default {
  name: "DoctorsPage",
  components: { MainNav, Modal },
  data() {
    return {
      doctors: [],
      loading: true,
      showModal: false,
      selectedDoctor: null,
      next7Days: [],
      selectedDay: null,
      selectedTime: null,
      selectedService: null,
      availableSlots: [],
      selectedSpeciality: "",
      specialities: [
        "Cardiology",
        "Dermatology",
        "Neurology",
        "Pediatrics",
        "Orthopedics",
        "Dentistry",
        "Psychiatry",
        "Ophthalmology",
        "General Surgery",
      ],
      price: 10,
    };
  },
  mounted() {
    this.fetchDoctors();
  },
  computed: {
    filteredDoctors() {
      if (!this.selectedSpeciality) {
        return this.doctors;
      }
      return this.doctors.filter((doctor) => doctor.speciality === this.selectedSpeciality);
    },
  },
  methods: {
    async logout() {
      try {
        await signOutUser();
        this.$router.push("/login");
      } catch (error) {
        console.error("Logout error:", error);
      }
    },

    async checkout() {
      // Prepare booking data but don't save yet
      const user = auth.currentUser;
      if (!user) {
        return;
      }

      const bookingData = {
        doctorId: this.selectedDoctor.id,
        patientId: user.uid,
        patientName: user.displayName || "Patient",
        doctorName: `${this.selectedDoctor.firstName} ${this.selectedDoctor.lastName}`,
        speciality: this.selectedDoctor.speciality,
        service: this.selectedService.name,
        roomLink:
          this.selectedService &&
          this.selectedService.name &&
          this.selectedService.name.toLowerCase() === "telemedicine" &&
          this.selectedService.roomLink
            ? this.selectedService.roomLink
            : "",
        price: this.selectedService.price,
        date: this.selectedDay.date.toISOString().split("T")[0], // YYYY-MM-DD
        time: this.selectedTime,
        dayName: this.selectedDay.dayName,
        status: "confirmed", // Set to confirmed after payment
        createdAt: new Date(),
      };

      // Store booking data in localStorage to save after payment
      localStorage.setItem("pendingBooking", JSON.stringify(bookingData));

      // Proceed to payment
      const amount = parseInt(this.selectedService.price) * 100; // convert USD to cents
      const res = await fetch("http://localhost:4242/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      window.location.href = data.url;
    },

    getFirstAvailableDay(availability) {
      if (!availability || !Array.isArray(availability)) return null;

      // Define day order for sorting (Monday first)
      const dayOrder = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];

      // Filter available days and sort by day order
      const availableDays = availability
        .filter((day) => day.available)
        .sort((a, b) => dayOrder.indexOf(a.name) - dayOrder.indexOf(b.name));

      // Return the first available day
      return availableDays.length > 0 ? availableDays[0] : null;
    },
    async fetchDoctors() {
      try {
        const doctorsCollection = collection(db, "doctors");
        const doctorsSnapshot = await getDocs(doctorsCollection);
        const doctorsData = await Promise.all(
          doctorsSnapshot.docs.map(async (doctorDoc) => {
            const doctorData = { id: doctorDoc.id, ...doctorDoc.data() };
            // Only include approved doctors
            if (doctorData.approved !== true) {
              return null;
            }
            // Fetch availability from doctorAvailability collection
            try {
              const availRef = doc(db, "doctorAvailability", doctorData.id);
              const availSnap = await getDoc(availRef);
              if (availSnap.exists()) {
                const raw = availSnap.data().availability || [];
                // Normalize shape and times
                doctorData.availability = raw.map((d) => ({
                  name: d.name,
                  available: !!d.available,
                  start:
                    typeof d.start === "string"
                      ? d.start.slice(0, 5) // HH:MM
                      : "",
                  end: typeof d.end === "string" ? d.end.slice(0, 5) : "",
                  date: typeof d.date === "string" ? d.date.split("T")[0] : d.date,
                }));
              }
            } catch (error) {
              console.error("Error fetching availability for doctor", doctorData.id, error);
            }
            // Fetch services from doctors/{doctorId}/services subcollection
            try {
              const servicesRef = collection(db, "doctors", doctorData.id, "services");
              const servicesSnap = await getDocs(servicesRef);
              doctorData.services = servicesSnap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
            } catch (error) {
              console.error("Error fetching services for doctor", doctorData.id, error);
            }
            return doctorData;
          })
        );
        // Filter out null values (unapproved doctors)
        this.doctors = doctorsData.filter((doctor) => doctor !== null);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        this.loading = false;
      }
    },
    openModal(doctor) {
      this.selectedDoctor = doctor;
      this.next7Days = this.generateNext7Days();
      this.selectedDay = null;
      this.selectedTime = null;
      this.selectedService = null;
      this.availableSlots = [];
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedDoctor = null;
      this.next7Days = [];
      this.selectedDay = null;
      this.selectedTime = null;
      this.selectedService = null;
      this.availableSlots = [];
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
          dayName: dayNames[date.getDay()],
        });
      }
      return days;
    },
    async selectDay(day) {
      this.selectedDay = day;
      this.selectedTime = null;
      this.availableSlots = await this.getAvailableSlotsForDay(day.dayName);
    },
    async getAvailableSlotsForDay(dayName) {
      if (!this.selectedDoctor.availability) return [];
      const dayAvail = this.selectedDoctor.availability.find(
        (day) => day.name === dayName && day.available
      );
      if (!dayAvail) return [];
      if (!dayAvail.start || !dayAvail.end) return [];

      // Generate all possible slots based on availability
      let slots = [];
      let start = new Date(`1970-01-01T${dayAvail.start}:00`);
      const end = new Date(`1970-01-01T${dayAvail.end}:00`);
      if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
        return [];
      }
      const interval = 30 * 60 * 1000; // 30 minutes

      // Adjust start time for today to avoid past slots
      const today = new Date();
      const isToday = this.selectedDay.date.toDateString() === today.toDateString();
      if (isToday) {
        const now = new Date();
        const currentTime = new Date(1970, 0, 1, now.getHours(), now.getMinutes());
        if (currentTime > start) {
          // Round up to next 30-minute slot
          const minutes = currentTime.getMinutes();
          const remainder = minutes % 30;
          const add = remainder === 0 ? 0 : 30 - remainder;
          currentTime.setMinutes(minutes + add);
          start = currentTime;
        }
      }

      for (let time = start.getTime(); time < end.getTime(); time += interval) {
        const slotTime = new Date(time);
        slots.push(slotTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      }

      // Fetch existing bookings for this doctor and selected date
      try {
        const bookingsRef = collection(db, "bookings");
        const q = query(
          bookingsRef,
          where("doctorId", "==", this.selectedDoctor.id),
          where("date", "==", this.selectedDay.date.toISOString().split("T")[0]),
          where("status", "==", "confirmed") // Exclude cancelled bookings
        );
        const querySnapshot = await getDocs(q);
        const bookedTimes = querySnapshot.docs.map((doc) => doc.data().time);

        // Filter out booked slots
        return slots.filter((slot) => !bookedTimes.includes(slot));
      } catch (error) {
        console.error("Error fetching bookings:", error);
        return slots; // Return all slots if error occurs
      }
    },
    selectTime(time) {
      this.selectedTime = time;
    },
    selectService(service) {
      this.selectedService = service;
    },
    async confirmBooking() {
      try {
        const user = auth.currentUser;
        if (!user) {
          alert("Please log in to book an appointment.");
          return;
        }

        // Check if the slot is already booked
        const bookingsRef = collection(db, "bookings");
        const q = query(
          bookingsRef,
          where("doctorId", "==", this.selectedDoctor.id),
          where("date", "==", this.selectedDay.date.toISOString().split("T")[0]),
          where("time", "==", this.selectedTime),
          where("status", "==", "confirmed")
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          return;
        }

        // Proceed to payment; checkout will prepare and save pending booking data in localStorage
        this.checkout();
      } catch (error) {
        console.error("Error booking appointment:", error);
        throw error; // Re-throw to prevent payment if booking fails
      }
    },
  },
};
</script>

<style scoped>
.patient-dashboard {
  min-height: 100vh;
}
</style>