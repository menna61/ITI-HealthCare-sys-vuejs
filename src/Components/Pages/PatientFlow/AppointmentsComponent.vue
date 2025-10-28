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
        class="w-full sticky top-0 z-40 flex items-center justify-between "
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
      <main
        class="flex-1 overflow-y-auto"
      >
        <!-- Appointments Section -->

        <div
          class=" transition-all duration-300"
        >
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

                <div v-for="i in 2" :key="i" class="cardPayment cardPayment1 bg-blue-50 flex flex-col gap-4 rounded-xl h-[121px]">
                  <div class="flex justify-between">
                    <h2 class="Internal">Internal Medicine</h2>
                    <div class="flex w-fit justify-end gap-2">
                      <button class="Pending hover:cursor-pointer">Pending</button>
                      <button class="Canceled hover:cursor-pointer">Canceled</button>
                      <button class="Confirmed hover:cursor-pointer">Confirmed</button>
                    </div>
                  </div>
                  <div class="flex justify-start items-center w-full">
                    <div class="imgDoc mx-2">
                      <img src="/images/imgProfile.jpg" alt="" />
                    </div>
                    <div class="w-full">
                      <div class="flex justify-between w-full">
                        <h2 class="nameDoc">Dr.Mohammed ahmed</h2>
                        <span class="cancelword">cancel</span>
                      </div>
                      <div class="flex flex-row justify-between">
                        <span class="time">08:00PM , Wednesday 15 Oct,2025</span>
                        <span class="linkVido">www.link.com</span>
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


export default {

  data() {
    return {
      isSidebarOpen: false,
      largeScreen: window.innerWidth >= 1024,
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
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
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
