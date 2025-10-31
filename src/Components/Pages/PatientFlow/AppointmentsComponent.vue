<template>
  <div class="flex h-auto overflow-hidden w-full">
    <!-- main-->
    <div
      class="flex-1 flex flex-col transition-all duration-300"
      :style="{
        marginLeft: largeScreen && $route.name === 'Appointments' ? 'calc(16rem + 60px)' : '0px',
      }"
      @click="closeSidebarOnClickOutside"
    >
      <!-- Navbar -->
      <div
        v-if="$route.name === 'Appointments'"
        class="w-full sticky top-0 z-40 flex items-center justify-between"
      >
        <!-- btn => Sidebar on sm screen-->
        <button
          v-if="!largeScreen"
          class="p-2 rounded-md text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          @click.stop="toggleSidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <!-- Main -->
      <main class="flex-1 overflow-y-auto">
        <!-- Appointments Section -->

        <div class="transition-all duration-300">
          <div class="">
            <div class="grid grid-cols-1 gap-6 mb-4">
              <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-2">
                  <h1 class="h1 dark:text-white">Appointments</h1>
                  <div class="w-full flex justify-between">
                    <h3 class="lastPaymentWord dark:text-white text-lg">Upcoming Appointments</h3>
                    <span class="view dark:text-blue-500">View all</span>
                  </div>
                </div>

                <div v-if="loading" class="text-sm text-gray-500">Loading appointment...</div>
                <div v-else-if="nextAppointment == null" class="text-sm text-gray-500">
                  No appointments
                </div>
                <div
                  v-else
                  class="cardPayment cardPayment1 bg-blue-50 flex flex-col gap-4 rounded-xl h-[121px]"
                >
                  <div class="flex justify-between">
                    <h2 class="Internal">{{ nextAppointment.speciality || "Appointment" }}</h2>
                    <div class="flex w-fit justify-end gap-2">
                      <button class="Confirmed hover:cursor-pointer">Confirmed</button>
                    </div>
                  </div>
                  <div class="flex justify-start items-center w-full">
                    <div class="imgDoc mx-2">
                      <img :src="nextAppointment.doctorImage || '/images/imgProfile.jpg'" alt="" />
                    </div>
                    <div class="w-full">
                      <div class="flex justify-between w-full">
                        <h2 class="nameDoc">{{ nextAppointment.doctorName }}</h2>
                        <span class="linkVido">{{ nextAppointment.service }}</span>
                      </div>
                      <div class="flex flex-row justify-between">
                        <span class="time"
                          >{{ nextAppointment.time }} , {{ nextAppointment.date }}</span
                        >
                        <span class="linkVido"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { db, auth } from "/src/authHandler.js";
import { collection, query, where, onSnapshot, doc, getDoc } from "firebase/firestore";

export default {
  data() {
    return {
      isSidebarOpen: false,
      largeScreen: window.innerWidth >= 1024,
      loading: true,
      nextAppointment: null,
      unsubscribe: null,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    handleResize() {
      this.largeScreen = window.innerWidth >= 1024;
      if (this.largeScreen) this.isSidebarOpen = false;
    },
    closeSidebarOnClickOutside() {
      if (!this.largeScreen && this.isSidebarOpen) {
        this.isSidebarOpen = false;
      }
    },
    listenToNextAppointment() {
      const user = auth.currentUser;
      if (!user) {
        this.loading = false;
        return;
      }
      const bookingsRef = collection(db, "bookings");
      const q = query(bookingsRef, where("patientId", "==", user.uid));
      this.unsubscribe = onSnapshot(q, async (querySnapshot) => {
        // Map bookings, filter to confirmed only and future or latest
        const items = await Promise.all(
          querySnapshot.docs.map(async (snap) => {
            const b = { id: snap.id, ...snap.data() };
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
            return {
              id: b.id,
              doctorName,
              doctorImage,
              service: b.service,
              speciality: b.speciality,
              date: b.date,
              time: b.time,
              status: (b.status || "").toLowerCase(),
            };
          })
        );
        const confirmed = items.filter((x) => x.status === "confirmed");
        // Sort by date then time ascending
        confirmed.sort((a, b) => {
          const ad = new Date(`${a.date} ${a.time}`);
          const bd = new Date(`${b.date} ${b.time}`);
          return ad - bd;
        });
        this.nextAppointment = confirmed[0] || null;
        this.loading = false;
      });
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.listenToNextAppointment();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
    if (this.unsubscribe) this.unsubscribe();
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
  color: #f4f8f6;
}
.cardPayment {
  width: 100%;
  padding: 15px;
}

.view {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #027a48;
}

.Internal {
  font-weight: 600;
  font-size: 18px;
  line-height: 19px;
  color: #212d66;
}
.done,
.Confirmed,
.Pending,
.Canceled {
  padding: 3px 10px;
  color: #05603a;
  background: #d1fadf;
  border-radius: 18px;
}
.Pending {
  color: #0cb8b6;
  background: #e7f8f8;
  font-size: 12px;
}
.Canceled {
  color: #f01818;
  background: #ffefef;
  font-size: 12px;
  margin: 0px 5px;
}
.Confirmed {
  color: #667085;
  background: #f0f1f3;
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
  line-height: 14px;
}
.nameDoc {
  font-weight: 500;
  font-size: 16px;
  color: #101828;
}
.linkVido {
  font-size: 12px;
  font-weight: 500;
}
.cancelword {
  color: #f01818;
  font-size: 14px;
  padding: 2px 12px;
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
