<template>
  <div class="w-dwh ml-[302px]">
    <main-nav />
    <div class="pl-8 pr-20 mt-8 flex flex-col gap-6">
      <!--Page titles-->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold">My Wallet</h1>
        <p class="text-gray-500">Manage your balance and transactions</p>
      </div>

      <!--Wallet balance-->
      <div class="wallet-card p-6 rounded-xl bg-white shadow-md">
        <h2 class="text-xl font-semibold mb-4">Current Balance</h2>
        <p class="text-3xl font-bold text-green-600">${{ walletBalance.toFixed(2) }}</p>
      </div>

      <!--Transaction history-->
      <div class="transactions">
        <h2 class="text-xl font-semibold mb-4">Transaction History</h2>
        <div class="transactions-list flex flex-col gap-4">
          <div
            v-for="transaction in transactions"
            :key="transaction.id"
            class="transaction p-4 rounded-xl bg-white shadow-md flex justify-between items-center"
          >
            <div>
              <p class="font-medium">{{ transaction.description }}</p>
              <p class="text-sm text-gray-500">{{ formatDate(transaction.date) }}</p>
            </div>
            <p :class="transaction.amount > 0 ? 'text-green-600' : 'text-red-600'">
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
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

export default {
  name: "PatientWallet",
  components: { MainNav },
  data() {
    return {
      walletBalance: 0,
      transactions: [],
    };
  },
  async mounted() {
    await this.fetchWalletData();
  },
  methods: {
    async fetchWalletData() {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const patientRef = doc(db, "patients", user.uid);
        const patientSnap = await getDoc(patientRef);
        if (patientSnap.exists()) {
          this.walletBalance = patientSnap.data().wallet || 0;
        }

        // Fetch transactions (assuming a transactions subcollection)
        const transactionsRef = collection(db, "patients", user.uid, "transactions");
        const querySnapshot = await getDocs(transactionsRef);
        this.transactions = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    },
    formatDate(date) {
      return new Date(date.seconds * 1000).toLocaleDateString();
    },
  },
};
</script>

<style scoped></style>
