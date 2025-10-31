<template>
  <div class="flex h-auto overflow-hidden w-full">
    <div class="w-full px-0 col-span-1 flex flex-col items-start justify-start rounded-sm gap-6">
      <div class="flex flex-col gap-2 w-full">
        <h1 class="h1 dark:text-white">Payment</h1>
        <div class="w-full flex justify-between items-center">
          <h3 class="lastPaymentWord dark:text-white text-lg">Last Payment</h3>
          <span class="view dark:text-blue-500">View all</span>
        </div>
      </div>

      <div v-if="loading" class="text-sm text-gray-500">Loading payment...</div>
      <div v-else-if="!lastPayment" class="text-sm text-gray-500">No payments</div>
      <div v-else class="cardPayment cardPayment1 w-full flex flex-col gap-4 rounded-xl">
        <div class="flex justify-between w-full">
          <h2 class="Internal">{{ lastPayment.speciality || "Payment" }}</h2>
          <button class="done hover:cursor-pointer">Done</button>
        </div>
        <div class="flex justify-start items-center w-full">
          <div class="imgDoc mx-2">
            <img :src="lastPayment.doctorImage || '/images/imgProfile.jpg'" alt="" />
          </div>
          <div class="w-full">
            <div class="flex justify-between w-full">
              <h2 class="nameDoc">{{ lastPayment.doctorName }}</h2>
              <div>
                <i class="fa-brands fa-cc-visa">visa</i>
                <span class="price">${{ lastPayment.price }}</span>
              </div>
            </div>
            <span class="time">{{ lastPayment.time }} , {{ lastPayment.date }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from "/src/authHandler.js";
import { collection, query, where, orderBy, limit, getDocs, doc, getDoc } from "firebase/firestore";

export default {
  data() {
    return {
      isSidebarOpen: false,
      largeScreen: window.innerWidth >= 1024,
      loading: true,
      lastPayment: null,
    };
  },
  methods: {
    async fetchLastPayment() {
      try {
        const user = auth.currentUser;
        if (!user) {
          this.loading = false;
          return;
        }
        // Fetch bookings for the user, then filter/sort on client to avoid index requirements
        const bookingsRef = collection(db, "bookings");
        const q = query(bookingsRef, where("patientId", "==", user.uid));
        const snap = await getDocs(q);
        if (snap.empty) {
          this.lastPayment = null;
          this.loading = false;
          return;
        }
        const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        const confirmed = all.filter((b) => (b.status || "").toLowerCase() === "confirmed");
        if (confirmed.length === 0) {
          this.lastPayment = null;
          this.loading = false;
          return;
        }
        // Sort by createdAt desc if available; fallback to date/time desc
        confirmed.sort((a, b) => {
          const aTs =
            a.createdAt instanceof Date ? a.createdAt.getTime() : Date.parse(`${a.date} ${a.time}`);
          const bTs =
            b.createdAt instanceof Date ? b.createdAt.getTime() : Date.parse(`${b.date} ${b.time}`);
          return bTs - aTs;
        });
        const b = confirmed[0];
        let doctorName = b.doctorName || "Unknown Doctor";
        let doctorImage = b.doctorImage || "/images/imgProfile.jpg";
        try {
          if (b.doctorId) {
            const dref = doc(db, "doctors", b.doctorId);
            const ds = await getDoc(dref);
            if (ds.exists()) {
              const d = ds.data();
              doctorName = `${d.firstName || ""} ${d.lastName || ""}`.trim() || doctorName;
              if (d.profileImageUrl) doctorImage = d.profileImageUrl;
            }
          }
        } catch {}
        this.lastPayment = {
          id: b.id,
          doctorName,
          doctorImage,
          price: b.price,
          date: b.date,
          time: b.time,
          speciality: b.speciality,
        };
      } catch (e) {
        console.error("Error fetching last payment:", e);
        this.lastPayment = null;
      } finally {
        this.loading = false;
      }
    },
  },
  async mounted() {
    await this.fetchLastPayment();
  },
};
</script>

<style scoped>
/* Typography */
.h1 {
  font-size: 25px;
  line-height: 35px;
  font-weight: 600;
}
.lastPaymentWord {
  font-weight: 600;
  color: #5271ff;
}
.view {
  font-weight: 400;
  font-size: 16px;
  color: #027a48;
}
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
  .h1 {
    font-size: 20px;
    line-height: 26px;
  }
  .cardPayment {
    padding: 10px;
  }
}
</style>
