<template>
  <div class="w-dwh ml-[302px]">
    <main-nav />
    <div class="pl-8 pr-20 mt-8 flex flex-col gap-6">
      <!--Page titles-->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold">Payments</h1>
        <p class="text-gray-500">Manage your payments</p>
      </div>

      <!--Page content-->
      <div class="patient-dashboard">
        <div v-if="loading" class="text-center py-8">
          <div class="text-sm text-gray-500">Loading payments...</div>
        </div>
        <div v-else-if="payments.length === 0" class="text-center py-8">
          <div class="text-sm text-gray-500">No payments found.</div>
        </div>
        <div v-else class="overflow-x-auto bg-white shadow-md rounded-lg">
          <table class="min-w-full table-auto">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Doctor Name
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Service
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="payment in payments" :key="payment.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(payment.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ payment.doctorName || "Unknown Doctor" }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ payment.service || "N/A" }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${{ payment.amount }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="getStatusClass(payment.status)"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  >
                    {{ payment.status }}
                  </span>
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
import { db, auth } from "/src/authHandler.js";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

export default {
  name: "PaymentsPage",
  components: { MainNav },
  data() {
    return {
      loading: true,
      payments: [],
    };
  },
  async mounted() {
    await this.fetchPayments();
  },
  methods: {
    async fetchPayments() {
      try {
        const user = auth.currentUser;
        if (!user) {
          this.loading = false;
          return;
        }
        // Fetch all confirmed bookings (representing payments done)
        const q = query(
          collection(db, "bookings"),
          where("patientId", "==", user.uid),
          where("status", "==", "confirmed")
        );
        const snap = await getDocs(q);
        const bookings = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Enrich with doctor names
        this.payments = await Promise.all(
          bookings.map(async (booking) => {
            let doctorName = booking.doctorName || "Unknown Doctor";
            try {
              if (booking.doctorId) {
                const dref = doc(db, "doctors", booking.doctorId);
                const ds = await getDoc(dref);
                if (ds.exists()) {
                  const d = ds.data();
                  doctorName = `${d.firstName || ""} ${d.lastName || ""}`.trim() || doctorName;
                }
              }
            } catch (e) {
              console.warn("Error fetching doctor name:", e);
            }
            return {
              id: booking.id,
              doctorName,
              service: booking.service || "N/A",
              amount: booking.price || 0,
              status: "Paid", // Since confirmed
              date: booking.date,
              time: booking.time,
              createdAt: booking.createdAt || null,
            };
          })
        );

        // Sort by date descending
        this.payments.sort((a, b) => {
          const aDate = new Date(`${a.date} ${a.time}`);
          const bDate = new Date(`${b.date} ${b.time}`);
          return bDate - aDate;
        });
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateStr) {
      if (!dateStr) return "N/A";
      return dateStr;
    },
    getStatusClass(status) {
      const lowerStatus = (status || "").toLowerCase();
      if (lowerStatus === "paid") {
        return "bg-green-100 text-green-800";
      } else {
        return "bg-gray-100 text-gray-800";
      }
    },
  },
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
