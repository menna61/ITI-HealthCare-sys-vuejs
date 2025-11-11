<template>
  <div class="w-dwh lg:ml-[302px] ml-0">
    <main-nav />
    <div class="px-4 lg:pl-8 lg:pr-20 mt-8 flex flex-col gap-6">
      <!--Page title-->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold dark:text-white">Financial</h1>
        <p class="text-gray-500 dark:text-gray-400">Track your earnings and payments</p>
      </div>

      <!--Page content-->
      <div class="content flex flex-col gap-6">
        <!--Cards - fast statistics-->
        <div class="cards flex flex-col md:flex-row gap-6">
          <div
            class="flex justify-between p-4 bg-white dark:bg-gray-800 rounded-xl w-full border-t-4 border-green-500"
          >
            <div class="flex flex-col gap-2">
              <p class="text-gray-500 dark:text-gray-400">Total earnings</p>
              <p class="font-medium text-xl text-gray-900 dark:text-white" v-if="!loading">
                ${{ totalEarnings.toLocaleString() }}
              </p>
              <p class="font-medium text-xl text-gray-900 dark:text-white" v-else>Loading...</p>
            </div>
            <div
              class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
            >
              <svg
                class="fill-green-500 w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path
                  d="M296 88C296 74.7 306.7 64 320 64C333.3 64 344 74.7 344 88L344 128L400 128C417.7 128 432 142.3 432 160C432 177.7 417.7 192 400 192L285.1 192C260.2 192 240 212.2 240 237.1C240 259.6 256.5 278.6 278.7 281.8L370.3 294.9C424.1 302.6 464 348.6 464 402.9C464 463.2 415.1 512 354.9 512L344 512L344 552C344 565.3 333.3 576 320 576C306.7 576 296 565.3 296 552L296 512L224 512C206.3 512 192 497.7 192 480C192 462.3 206.3 448 224 448L354.9 448C379.8 448 400 427.8 400 402.9C400 380.4 383.5 361.4 361.3 358.2L269.7 345.1C215.9 337.5 176 291.4 176 237.1C176 176.9 224.9 128 285.1 128L296 128L296 88z"
                />
              </svg>
            </div>
          </div>

          <div
            class="flex justify-between p-4 bg-white dark:bg-gray-800 rounded-xl w-full border-t-4 border-[var(--main-color-500)]"
          >
            <div class="flex flex-col gap-2">
              <p class="text-gray-500 dark:text-gray-400">Total appointments</p>
              <p class="font-medium text-xl text-gray-900 dark:text-white" v-if="!loading">
                +{{ totalAppointments.toLocaleString() }}
              </p>
              <p class="font-medium text-xl text-gray-900 dark:text-white" v-else>Loading...</p>
            </div>
            <div
              class="w-16 h-16 bg-[var(--main-color-25)] dark:bg-gray-700 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-10 h-10 fill-[var(--main-color-500)]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path
                  d="M224 64C241.7 64 256 78.3 256 96L256 128L384 128L384 96C384 78.3 398.3 64 416 64C433.7 64 448 78.3 448 96L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 96C192 78.3 206.3 64 224 64zM160 304L160 336C160 344.8 167.2 352 176 352L208 352C216.8 352 224 344.8 224 336L224 304C224 295.2 216.8 288 208 288L176 288C167.2 288 160 295.2 160 304zM288 304L288 336C288 344.8 295.2 352 304 352L336 352C344.8 352 352 344.8 352 336L352 304C352 295.2 344.8 288 336 288L304 288C295.2 288 288 295.2 288 304zM432 288C423.2 288 416 295.2 416 304L416 336C416 344.8 423.2 352 432 352L464 352C472.8 352 480 344.8 480 336L480 304C480 295.2 472.8 288 464 288L432 288zM160 432L160 464C160 472.8 167.2 480 176 480L208 480C216.8 480 224 472.8 224 464L224 432C224 423.2 216.8 416 208 416L176 416C167.2 416 160 423.2 160 432zM304 416C295.2 416 288 423.2 288 432L288 464C288 472.8 295.2 480 304 480L336 480C344.8 480 352 472.8 352 464L352 432C352 423.2 344.8 416 336 416L304 416zM416 432L416 464C416 472.8 423.2 480 432 480L464 480C472.8 480 480 472.8 480 464L480 432C480 423.2 472.8 416 464 416L432 416C423.2 416 416 423.2 416 432z"
                />
              </svg>
            </div>
          </div>

          <div
            class="flex justify-between p-4 bg-white dark:bg-gray-800 rounded-xl w-full border-t-4 border-[var(--sec-color-500)]"
          >
            <div class="flex flex-col gap-2">
              <p class="text-gray-500 dark:text-gray-400">Total patients</p>
              <p class="font-medium text-xl text-gray-900 dark:text-white" v-if="!loading">
                +{{ totalPatients.toLocaleString() }}
              </p>
              <p class="font-medium text-xl text-gray-900 dark:text-white" v-else>Loading...</p>
            </div>
            <div
              class="w-16 h-16 bg-[var(--sec-color-25)] dark:bg-gray-700 rounded-full flex items-center justify-center"
            >
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
          </div>
        </div>

        <!--Charts section-->
        <div class="charts flex flex-col lg:flex-row gap-6">
          <div class="booking p-4 bg-white dark:bg-gray-800 rounded-xl w-full flex flex-col gap-4">
            <div class="text flex justify-between">
              <h1 class="text-xl font-bold text-gray-900 dark:text-white">Booking status</h1>
              <div class="filter flex gap-4">
                <select
                  name=""
                  id=""
                  class="p-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
                >
                  <option value="">Monthly</option>
                </select>
                <select
                  name=""
                  id=""
                  class="p-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
                >
                  <option value="">2024</option>
                </select>
              </div>
            </div>
            <div class="chart">
              <donghut-chart
                :completed="completedAppointments"
                :pending="pendingAppointments"
                :cancelled="cancelledAppointments"
              />
            </div>
          </div>

          <div class="revenu p-4 bg-white dark:bg-gray-800 rounded-xl w-full">
            <div class="text flex justify-between">
              <h1 class="text-xl font-bold text-gray-900 dark:text-white">Revenue</h1>
              <div class="filter flex gap-4">
                <select
                  name=""
                  id=""
                  class="p-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
                >
                  <option value="">Monthly</option>
                </select>
                <select
                  name=""
                  id=""
                  class="p-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
                >
                  <option value="">2024</option>
                </select>
              </div>
            </div>
            <div class="chart">
              <line-chart :revenue-data="monthlyRevenue" />
            </div>
          </div>
        </div>

        <!--Earnings breakdown-->
        <div class="charts flex flex-col gap-6">
          <div class="booking p-4 bg-white dark:bg-gray-800 rounded-xl w-full flex flex-col gap-4">
            <div class="text flex justify-between">
              <h1 class="text-xl font-bold text-gray-900 dark:text-white">Earnings breakdown</h1>
            </div>
            <div class="breakdown flex flex-col gap-4">
              <div
                class="telemedicine bg-[var(--main-color-25)] dark:bg-gray-700 rounded-xl p-4 flex justify-between items-center"
              >
                <div class="left flex gap-4 items-center">
                  <div
                    class="icon w-16 h-16 bg-[var(--main-color-25)] dark:bg-gray-600 rounded-full flex items-center justify-center"
                  >
                    <svg
                      class="w-12 h-12 fill-[var(--main-color-500)]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                    >
                      <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                      <path
                        d="M128 128C92.7 128 64 156.7 64 192L64 448C64 483.3 92.7 512 128 512L384 512C419.3 512 448 483.3 448 448L448 192C448 156.7 419.3 128 384 128L128 128zM496 400L569.5 458.8C573.7 462.2 578.9 464 584.3 464C597.4 464 608 453.4 608 440.3L608 199.7C608 186.6 597.4 176 584.3 176C578.9 176 573.7 177.8 569.5 181.2L496 240L496 400z"
                      />
                    </svg>
                  </div>
                  <div class="texts">
                    <p class="text-lg font-medium text-gray-900 dark:text-white">Telemedicine</p>
                    <p class="text-gray-600 dark:text-gray-300">
                      {{ telemedicineConsultations }} consultations
                    </p>
                  </div>
                </div>
                <div class="right">
                  <p class="text-[var(--main-color-500)] text-xl font-bold">
                    ${{ telemedicineEarnings.toLocaleString() }}
                  </p>
                </div>
              </div>
              <div
                class="telemedicine bg-[var(--sec-color-25)] dark:bg-gray-700 rounded-xl p-4 flex justify-between items-center"
              >
                <div class="left flex gap-4 items-center">
                  <div
                    class="icon w-16 h-16 bg-[var(--sec-color-25)] dark:bg-gray-600 rounded-full flex items-center justify-center"
                  >
                    <svg
                      class="w-12 h-12 fill-[var(--sec-color-500)]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                    >
                      <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                      <path
                        d="M64 112C64 85.5 85.5 64 112 64L160 64C177.7 64 192 78.3 192 96C192 113.7 177.7 128 160 128L128 128L128 256C128 309 171 352 224 352C277 352 320 309 320 256L320 128L288 128C270.3 128 256 113.7 256 96C256 78.3 270.3 64 288 64L336 64C362.5 64 384 85.5 384 112L384 256C384 333.4 329 398 256 412.8L256 432C256 493.9 306.1 544 368 544C429.9 544 480 493.9 480 432L480 346.5C442.7 333.3 416 297.8 416 256C416 203 459 160 512 160C565 160 608 203 608 256C608 297.8 581.3 333.4 544 346.5L544 432C544 529.2 465.2 608 368 608C270.8 608 192 529.2 192 432L192 412.8C119 398 64 333.4 64 256L64 112zM512 288C529.7 288 544 273.7 544 256C544 238.3 529.7 224 512 224C494.3 224 480 238.3 480 256C480 273.7 494.3 288 512 288z"
                      />
                    </svg>
                  </div>
                  <div class="texts">
                    <p class="text-lg font-medium text-gray-900 dark:text-white">
                      Regular consultation
                    </p>
                    <p class="text-gray-600 dark:text-gray-300">
                      {{ regularConsultations }} consultations
                    </p>
                  </div>
                </div>
                <div class="right">
                  <p class="text-[var(--sec-color-500)] text-xl font-bold">
                    ${{ regularConsultationEarnings.toLocaleString() }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DonghutChart from "../DonghutChart.vue";
import MainNav from "../Layouts/MainNav.vue";
import LineChart from "../LineChart.vue";
import { db, auth } from "@/firebase";
import { collection, getDocs, query, where, onSnapshot } from "firebase/firestore";

export default {
  name: "FinancialPage",
  components: { MainNav, DonghutChart, LineChart },
  data() {
    return {
      totalEarnings: 0,
      totalAppointments: 0,
      totalPatients: 0,
      telemedicineEarnings: 0,
      regularConsultationEarnings: 0,
      telemedicineConsultations: 0,
      regularConsultations: 0,
      loading: true,
      completedAppointments: 0,
      pendingAppointments: 0,
      cancelledAppointments: 0,
      monthlyRevenue: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      unsubscribe: null,
    };
  },
  async mounted() {
    await this.fetchFinancialData();
    this.setupRealtimeUpdates();
  },
  beforeUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },
  methods: {
    async fetchFinancialData() {
      this.loading = true;
      const user = auth.currentUser;
      if (!user) {
        this.loading = false;
        return;
      }

      try {
        // Calculate from bookings collection
        await this.calculateFromBookings(user.uid);
      } catch (error) {
        console.error("Error fetching financial data:", error);
      } finally {
        this.loading = false;
      }
    },
    async calculateFromBookings(doctorId) {
      try {
        const bookingsRef = collection(db, "bookings");
        const q = query(bookingsRef, where("doctorId", "==", doctorId));
        const querySnapshot = await getDocs(q);

        console.log(`Found ${querySnapshot.size} bookings for doctor ${doctorId}`);

        let totalEarnings = 0;
        let totalAppointments = 0;
        let telemedicineEarnings = 0;
        let regularEarnings = 0;
        let telemedicineCount = 0;
        let regularCount = 0;
        let completedAppointments = 0;
        let pendingAppointments = 0;
        let cancelledAppointments = 0;
        const monthlyRevenue = Array(12).fill(0);
        const uniquePatients = new Set();

        querySnapshot.forEach((doc) => {
          const booking = doc.data();
          console.log("Booking data:", booking);

          const price = parseFloat(booking.price) || 0;

          // Count only completed bookings for earnings and breakdown (as per task: update on mark as complete)
          if (booking.status === "completed") {
            totalEarnings += price;
            totalAppointments += 1;
            uniquePatients.add(booking.patientId);

            if (
              booking.service &&
              typeof booking.service === "string" &&
              booking.service.toLowerCase() === "telemedicine"
            ) {
              telemedicineEarnings += price;
              telemedicineCount += 1;
            } else if (
              (booking.service &&
                typeof booking.service === "string" &&
                booking.service.toLowerCase().includes("general")) ||
              booking.service.toLowerCase().includes("regular") ||
              booking.service.toLowerCase().includes("consultation")
            ) {
              regularEarnings += price;
              regularCount += 1;
            } else {
              // Default to regular for other services
              regularEarnings += price;
              regularCount += 1;
            }

            if (booking.date) {
              const date = new Date(booking.date);
              if (!isNaN(date.getTime())) {
                const month = date.getMonth();
                monthlyRevenue[month] += price;
              }
            }
          }

          // Count by status for charts (keep as is)
          if (booking.status === "completed") {
            completedAppointments += 1;
          } else if (booking.status === "pending") {
            pendingAppointments += 1;
          } else if (booking.status === "cancelled") {
            cancelledAppointments += 1;
          }
        });

        console.log(
          `Calculated: totalAppointments=${totalAppointments}, totalEarnings=${totalEarnings}, totalPatients=${uniquePatients.size}`
        );

        // Update data from calculated values
        this.totalEarnings = totalEarnings;
        this.totalAppointments = totalAppointments;
        this.totalPatients = uniquePatients.size;
        this.telemedicineEarnings = telemedicineEarnings;
        this.regularConsultationEarnings = regularEarnings;
        this.telemedicineConsultations = telemedicineCount;
        this.regularConsultations = regularCount;
        this.completedAppointments = completedAppointments;
        this.pendingAppointments = pendingAppointments;
        this.cancelledAppointments = cancelledAppointments;
        this.monthlyRevenue = monthlyRevenue;
      } catch (error) {
        console.error("Error calculating from bookings:", error);
      }
    },
    setupRealtimeUpdates() {
      const user = auth.currentUser;
      if (!user) return;

      const bookingsRef = collection(db, "bookings");
      const q = query(bookingsRef, where("doctorId", "==", user.uid));

      this.unsubscribe = onSnapshot(q, () => {
        console.log("Realtime update triggered for financial data");
        this.calculateFromBookings(user.uid);
      });
    },
  },
};
</script>

<style scoped></style>
