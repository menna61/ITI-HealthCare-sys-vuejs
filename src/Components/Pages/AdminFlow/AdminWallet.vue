<template>
  <div class="w-full dark:bg-gray-900 min-h-screen transition-all duration-300">
    <main-nav />
    <div class="pl-4 md:pl-8 pr-4 md:pr-20 mt-8 flex flex-col gap-6">
      <!-- Page titles -->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold dark:text-white">{{ $t("adminwallettitle") }}</h1>
        <p class="text-gray-500 dark:text-gray-200">{{ $t("adminwalletdesc") }}</p>
      </div>

      <!-- Wallet Balance Card -->
      <div
        class="balance-card bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white shadow-lg"
      >
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm opacity-90">Total Balance</p>
            <h2 class="text-4xl font-bold mt-2" v-if="!loading">
              ${{
                totalBalance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </h2>
            <p class="text-4xl font-bold mt-2" v-else>Loading...</p>
            <p class="text-sm mt-2 opacity-90">
              From {{ totalTransactions }} commission transactions
            </p>
          </div>
          <div
            class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
          >
            <svg
              class="w-12 h-12"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                d="M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 64zm48 160l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zM96 336c0-8.8 7.2-16 16-16l352 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-352 0c-8.8 0-16-7.2-16-16zM376 160l80 0c13.3 0 24 10.7 24 24l0 48c0 13.3-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24l0-48c0-13.3 10.7-24 24-24z"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="stats-grid grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="stat-card bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-sm">This Month</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2" v-if="!loading">
                ${{
                  monthlyEarnings.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                }}
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2" v-else>...</p>
            </div>
            <div
              class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 fill-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="stat-card bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-sm">Average Commission</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2" v-if="!loading">
                ${{
                  averageCommission.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                }}
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2" v-else>...</p>
            </div>
            <div
              class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 fill-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  d="M160 80c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 352c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-352zM0 272c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 160c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48L0 272zM368 96l32 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="stat-card bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-sm">Commission Rate</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">5%</p>
            </div>
            <div
              class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 fill-purple-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  d="M374.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-320 320c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l320-320zM128 128A64 64 0 1 0 0 128a64 64 0 1 0 128 0zM384 384a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Transactions Table -->
      <div class="transactions bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Recent Transactions</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Doctor
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Patient
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Service
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Commission
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr
                v-for="transaction in transactions"
                :key="transaction.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {{ formatDate(transaction.date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {{ transaction.doctorName }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {{ transaction.patientName }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ transaction.service }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400"
                >
                  +${{
                    transaction.amount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  }}
                </td>
              </tr>
              <tr v-if="transactions.length === 0">
                <td colspan="5" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  No transactions yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from "@/Components/Layouts/MainNav.vue";
import { db } from "@/firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";

export default {
  name: "AdminWallet",
  components: { MainNav },
  data() {
    return {
      totalBalance: 0,
      monthlyEarnings: 0,
      averageCommission: 0,
      totalTransactions: 0,
      transactions: [],
      loading: true,
      unsubscribe: null,
    };
  },
  async mounted() {
    await this.fetchWalletData();
    this.setupRealtimeListener();
  },
  beforeUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },
  methods: {
    setupRealtimeListener() {
      // Listen to wallet changes in real-time
      const walletRef = doc(db, "admin", "wallet");
      const transactionsRef = collection(db, "admin", "wallet", "transactions");

      this.unsubscribe = onSnapshot(transactionsRef, (snapshot) => {
        console.log("Admin wallet updated - fetching new data");
        this.fetchWalletData();
      });
    },
    async fetchWalletData() {
      try {
        this.loading = true;

        console.log("Fetching admin wallet data...");

        // Get wallet balance
        const walletRef = doc(db, "admin", "wallet");
        const walletSnap = await getDoc(walletRef);

        if (walletSnap.exists()) {
          this.totalBalance = parseFloat(walletSnap.data().balance) || 0;
          console.log("Admin wallet balance:", this.totalBalance);
        } else {
          console.log("Admin wallet document does not exist yet");
          this.totalBalance = 0;
        }

        // Get transactions
        const transactionsRef = collection(db, "admin", "wallet", "transactions");
        const q = query(transactionsRef, orderBy("date", "desc"), limit(50));
        const querySnapshot = await getDocs(q);

        console.log("Found", querySnapshot.size, "transactions");

        this.transactions = [];
        let totalCommissions = 0;
        let monthlyTotal = 0;
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        const transactionsPromises = querySnapshot.docs.map(async (docSnap) => {
          const data = docSnap.data();
          console.log("Transaction:", data);

          // Fetch real patient name
          let patientFullName = data.patientName || "Unknown Patient";
          try {
            // Try to get patient ID from booking
            if (data.bookingId) {
              const bookingRef = doc(db, "bookings", data.bookingId);
              const bookingSnap = await getDoc(bookingRef);
              if (bookingSnap.exists()) {
                const bookingData = bookingSnap.data();
                if (bookingData.patientId) {
                  const patientRef = doc(db, "patients", bookingData.patientId);
                  const patientSnap = await getDoc(patientRef);
                  if (patientSnap.exists()) {
                    const patientData = patientSnap.data();
                    patientFullName =
                      `${patientData.firstName || ""} ${patientData.lastName || ""}`.trim() ||
                      data.patientName;
                  }
                }
              }
            }
          } catch (err) {
            console.error("Error fetching patient name for transaction:", err);
          }

          totalCommissions += parseFloat(data.amount) || 0;

          // Calculate monthly earnings
          const transactionDate = data.date.toDate();
          if (
            transactionDate.getMonth() === currentMonth &&
            transactionDate.getFullYear() === currentYear
          ) {
            monthlyTotal += parseFloat(data.amount) || 0;
          }

          return {
            id: docSnap.id,
            ...data,
            patientName: patientFullName,
          };
        });

        this.transactions = await Promise.all(transactionsPromises);

        this.totalTransactions = this.transactions.length;
        this.monthlyEarnings = monthlyTotal;
        this.averageCommission =
          this.totalTransactions > 0 ? totalCommissions / this.totalTransactions : 0;

        console.log("Total balance:", this.totalBalance);
        console.log("Monthly earnings:", this.monthlyEarnings);
        console.log("Total transactions:", this.totalTransactions);

        this.loading = false;
      } catch (error) {
        console.error("Error fetching wallet data:", error);
        this.loading = false;
      }
    },
    formatDate(timestamp) {
      if (!timestamp) return "-";
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>

<style scoped>
.balance-card {
  animation: fadeIn 0.5s ease-in;
}

.stat-card {
  animation: slideUp 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
