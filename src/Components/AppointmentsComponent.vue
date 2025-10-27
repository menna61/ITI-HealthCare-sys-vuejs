<template>

    <div>
      <!-- Main -->
      <main
        v-if="$route.name === 'Appointments'"
        class="flex-1 overflow-y-auto dark:bg-gray-800 py-6"
      >
        <!-- Appointments Section -->

        <div
          v-if="$route.name === 'Appointments'"
          class="px-7 dark:bg-gray-800 transition-all duration-300"
        >
          <div class="py-4">
            <div class="grid grid-cols-1 gap-4 mb-4">
              <div>
                <h1 class="h1 dark:text-white">Appointments</h1>
                <div class="w-full flex justify-between">
                  <h3 class="lastPaymentWord dark:text-white">Upcoming Appointments</h3>
                  <span class="view dark:text-blue-500">View all</span>
                </div>

                <div v-for="i in 2" :key="i" class="cardPayment cardPayment1 bg-blue-50 pt-4 px-4">
                  <div class="flex justify-between">
                    <h2 class="Internal">Internal Medicine</h2>
                    <div class="w-1/2 md:w-1/4 flex flex-row justify-between">
                      <button class="Pending hover:cursor-pointer">Pending</button>
                      <button class="Canceled hover:cursor-pointer">Canceled</button>
                      <button class="Confirmed hover:cursor-pointer">Confirmed</button>
                    </div>
                  </div>
                  <div class="flex justify-start items-center w-full">
                    <div class="imgDoc mx-2">
               
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
      <main>
        <div
          v-if="$route.name === 'Home'"
          class="w-full px-5 col-span-2 flex flex-col items-start justify-start rounded-sm dark:bg-gray-800"
        >
          <h1 class="h1 dark:text-white">Appointments</h1>
          <div class="w-full flex justify-between">
            <h3 class="lastPaymentWord dark:text-white">Upcoming Appointments</h3>
            <span class="view dark:text-blue-500">View all</span>
          </div>

          <div class="cardPayment cardPayment1 px-4 bg-blue-50 pt-4 w-full">
            <div class="flex justify-between w-full py-0.5">
              <h2 class="Internal">Internal Medicine</h2>
              <div class="sm:w-[40%] md:w-1/2 lg:w-[40%] flex flex-row justify-around">
                <button class="Pending hover:cursor-pointer">Pending</button>
                <button class="Canceled hover:cursor-pointer">Canceled</button>
                <button class="Confirmed hover:cursor-pointer">Confirmed</button>
              </div>
            </div>
            <div class="flex justify-start items-center w-full">
              <div class="imgDoc mx-2">
         
              </div>
              <div class="w-full">
                <div class="flex justify-between w-full py-0.8">
                  <h2 class="nameDoc">Dr.Mohammed ahmed</h2>
                  <span class="cancelword">cancel</span>
                </div>
                <div class="flex flex-row justify-between py-0.5">
                  <span class="time">08:00PM , Wednesday 15 Oct,2025</span>
                  <span class="linkVido">www.link.com</span>
                </div>
              </div>
            </div>
          </div>
          <div class="cardPayment cardPayment1 px-4 bg-blue-50 pt-4 w-full">
            <div class="flex justify-between w-full py-0.5">
              <h2 class="Internal">Internal Medicine</h2>
              <div class="sm:w-[40%] md:w-1/2 lg:w-[40%] flex flex-row justify-around">
                <button class="Pending hover:cursor-pointer">Pending</button>
                <button class="Canceled hover:cursor-pointer">Canceled</button>
                <button class="Confirmed hover:cursor-pointer">Confirmed</button>
              </div>
            </div>
            <div class="flex justify-start items-center w-full">
              <div class="imgDoc mx-2">
           
              </div>
              <div class="w-full">
                <div class="flex justify-between w-full py-0.8">
                  <h2 class="nameDoc">Dr.Mohammed ahmed</h2>
                  <span class="cancelword">cancel</span>
                </div>
                <div class="flex flex-row justify-between py-0.5">
                  <span class="time">08:00PM , Wednesday 15 Oct,2025</span>
                  <span class="linkVido">www.link.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
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
  padding-bottom: 15px;
}
.lastPaymentWord {
  font-weight: 600;
  font-size: 19px;
  color: #5271ff;
}
.view {
  font-weight: 400;
  font-size: 16px;
  color: #f4f8f6;
}
.cardPayment {
  width: 100%;
  margin: 15px 0px;
  border-radius: 13px;
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
