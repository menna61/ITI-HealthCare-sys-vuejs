<template>
  <div :class="[$i18n.locale === 'ar' ? 'lg:mr-[302px]' : 'lg:ml-[302px]', 'w-dwh']">
    <main-nav />
    <div :class="[$i18n.locale === 'ar' ? 'pr-8 pl-20' : 'pl-8 pr-20', 'mt-8 flex flex-col gap-6']">
      <!--Page titles-->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold dark:text-white">{{ $t("adminwallettitle") }}</h1>
        <p class="text-gray-500 dark:text-gray-400">{{ $t("manage_wallet") }}</p>
      </div>

      <!--Wallet balance-->
      <div
        class="wallet-card p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md dark:border dark:border-gray-700"
      >
        <h2 class="text-xl font-semibold mb-4 dark:text-white">{{ $t("current_balance") }}</h2>
        <p class="text-3xl font-bold text-green-600 dark:text-green-400">
          ${{ walletBalance.toFixed(2) }}
        </p>
      </div>

      <!--Transaction history-->
      <div class="transactions">
        <h2 class="text-xl font-semibold mb-4 dark:text-white">{{ $t("transaction_history") }}</h2>
        <div class="transactions-list flex flex-col gap-4">
          <div
            v-for="transaction in transactions"
            :key="transaction.id"
            class="transaction p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md dark:border dark:border-gray-700 flex justify-between items-center"
          >
            <div>
              <p class="font-medium dark:text-white">{{ transaction.description }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(transaction.date) }}
              </p>
            </div>
            <p
              :class="
                transaction.amount > 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              "
            >
              {{ transaction.amount > 0 ? "+" : "" }}${{ transaction.amount.toFixed(2) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from "../../Layouts/MainNav.vue";
import { db, auth } from "/src/authHandler.js";
import { doc, collection, onSnapshot } from "firebase/firestore";

export default {
  name: "PatientWallet",
  components: { MainNav },
  data() {
    return {
      walletBalance: 0,
      transactions: [],
      unsubscribeWallet: null, // للاستماع للرصيد
      unsubscribeTransactions: null, // للاستماع للمعاملات
    };
  },
  async mounted() {
    await this.setupListeners();
  },
  beforeUnmount() {
    // إلغاء الاستماع عشان نتجنب التسريبات
    if (this.unsubscribeWallet) this.unsubscribeWallet();
    if (this.unsubscribeTransactions) this.unsubscribeTransactions();
  },
  methods: {
    async setupListeners() {
      const user = auth.currentUser;
      if (!user) return;

      // Listener للرصيد (real-time update)
      const patientRef = doc(db, "patients", user.uid);
      this.unsubscribeWallet = onSnapshot(
        patientRef,
        (docSnap) => {
          if (docSnap.exists()) {
            this.walletBalance = docSnap.data().wallet || 0;
          }
        },
        (error) => {
          console.error("Error listening to wallet:", error);
        }
      );

      // Listener للمعاملات (real-time update)
      const transactionsRef = collection(db, "patients", user.uid, "transactions");
      this.unsubscribeTransactions = onSnapshot(
        transactionsRef,
        (querySnapshot) => {
          this.transactions = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        },
        (error) => {
          console.error("Error listening to transactions:", error);
        }
      );
    },
    formatDate(date) {
      // تأكد إن date بتنسيق timestamp (seconds)
      if (date && date.seconds) {
        return new Date(date.seconds * 1000).toLocaleDateString();
      }
      return new Date(date).toLocaleDateString(); // لو string
    },
  },
};
</script>

<style scoped></style>
