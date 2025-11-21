<template>
  <div :class="[$i18n.locale === 'ar' ? 'lg:mr-[302px]' : 'lg:ml-[302px]', 'w-dwh']">
    <main-nav />
    <div :class="[$i18n.locale === 'ar' ? 'pr-8 pl-20' : 'pl-8 pr-20', 'mt-8 flex flex-col gap-6']">
      <!--Page titles-->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold dark:text-white">{{ $t("payments") }}</h1>
        <p class="text-gray-500 dark:text-gray-400">{{ $t("manage_payments") }}</p>
      </div>

      <!--Page content-->
      <div class="patient-dashboard">
        <div v-if="loading" class="text-center py-8">
          <div class="text-sm text-gray-500 dark:text-gray-400">Loading payments...</div>
        </div>
        <div v-else-if="payments.length === 0" class="text-center py-8">
          <div class="text-sm text-gray-500 dark:text-gray-400">No payments found.</div>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="payment in payments"
            :key="payment.id"
            class="cardPayment cardPayment1 w-full flex flex-col gap-4 rounded-xl dark:bg-gray-800 dark:border dark:border-gray-700"
          >
            <div class="flex justify-between w-full">
              <h2 class="Internal dark:text-white">{{ payment.speciality }}</h2>
              <button class="done hover:cursor-pointer">Done</button>
            </div>
            <div class="flex justify-start items-center w-full">
              <div class="imgDoc mx-2">
                <img :src="payment.doctorImage" alt="" />
              </div>
              <div class="w-full">
                <div class="flex justify-between w-full">
                  <h2 class="nameDoc dark:text-white">{{ payment.doctorName }}</h2>
                  <div>
                    <i class="fa-brands fa-cc-visa dark:bg-blue-600">visa</i>
                    <span class="price dark:text-gray-300">${{ payment.amount }}</span>
                  </div>
                </div>
                <span class="time dark:text-gray-400">{{ payment.time }} , {{ payment.date }}</span>
              </div>
            </div>
          </div>
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
        // Fetch all payments for the patient
        const q = query(collection(db, "payments"), where("patientId", "==", user.uid));
        const snap = await getDocs(q);
        const paymentsData = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Enrich with doctor names and images, only include if doctor exists
        const enrichedPayments = await Promise.all(
          paymentsData.map(async (payment) => {
            let doctorName = payment.doctorName || "Unknown Doctor";
            let doctorImage = "/images/imgProfile.jpg";
            let doctorExists = false;
            try {
              if (payment.doctorId) {
                const dref = doc(db, "doctors", payment.doctorId);
                const ds = await getDoc(dref);
                if (ds.exists()) {
                  const d = ds.data();
                  doctorName = `${d.firstName || ""} ${d.lastName || ""}`.trim() || doctorName;
                  doctorImage = d.profileImageUrl || doctorImage;
                  doctorExists = true;
                }
              }
            } catch (e) {
              console.warn("Error fetching doctor details:", e);
            }
            if (doctorExists) {
              return {
                id: payment.id,
                doctorName,
                doctorImage,
                speciality: payment.speciality || payment.service || "Payment",
                service: payment.service || "N/A",
                amount: payment.amount || 0,
                status: "Paid", // Since it's a payment record
                date: payment.date,
                time: payment.time,
                createdAt: payment.createdAt || null,
              };
            } else {
              return null; // Will be filtered out
            }
          })
        );
        this.payments = enrichedPayments.filter((p) => p !== null);

        // Sort by createdAt descending, fallback to date/time
        this.payments.sort((a, b) => {
          const aTs = a.createdAt
            ? a.createdAt.toDate().getTime()
            : new Date(`${a.date} ${a.time}`).getTime();
          const bTs = b.createdAt
            ? b.createdAt.toDate().getTime()
            : new Date(`${b.date} ${b.time}`).getTime();
          return bTs - aTs;
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
/* Card styles */
.cardPayment {
  background: #fff;
  width: 100%;
  padding: 15px;
}
.cardPayment1 {
  background-image: url("/images/bgcardPayment.png");
  background-position: center;
  background-size: cover;
}
.Internal {
  font-weight: 600;
  font-size: 18px;
  color: #212d66;
}
.done {
  padding: 1px 10px;
  color: #05603a;
  background: #d1fadf;
  border-radius: 18px;
  font-size: 12px;
}
.imgDoc {
  width: 45px;
  height: 40px;
  border-radius: 50%;
}
.imgDoc img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.price {
  font-weight: 500;
  font-size: 15px;
  color: #667085;
}
.time {
  font-weight: 600;
  font-size: 12px;
  color: #667085;
}
.nameDoc {
  font-weight: 500;
  font-size: 16px;
  color: #101828;
}
.fa-brands {
  font-size: 10px;
  margin-right: 8px;
  background-color: #1d499c;
  color: #fff;
  padding: 0px 3px 1px;
  border-radius: 3px;
}

/* Responsive */
@media (max-width: 1024px) {
  .cardPayment {
    padding: 10px;
  }
}
</style>
