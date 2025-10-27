<template>
  <div class="flex h-auto overflow-hidden">

    <!-- Overlay (sm screen only ) -->
    <div
      v-if="isSidebarOpen && !largeScreen && $route.name === 'Payments'"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
      @click="toggleSidebar"
    ></div>

    <!-- Main -->
    <div
      class="flex-1 flex flex-col transition-all duration-300"
      :style="{
        marginLeft: largeScreen && $route.name === 'Payments' ? 'calc(16rem + 0px)' : '0px',
      }"
      @click="closeSidebarOnClickOutside"
    >
      <!-- Navbar -->
      <div
        v-if="$route.name === 'Payments'"
        class="w-full sticky top-0 z-40 flex items-center justify-between dark:bg-gray-800 shadow-sm"
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
      <main class="flex-1 overflow-y-auto dark:bg-gray-800 py-6">
        <!-- Payments Section -->
        <div
          v-if="$route.name === 'Payments'"
          class="px-7 dark:bg-gray-800 transition-all duration-300"
        >
          <div class="py-4">
            <div class="grid grid-cols-1 gap-4 mb-4">
              <div>
                <h1 class="h1 dark:text-white">Payment</h1>
                <div class="w-full flex justify-between items-center">
                  <h3 class="lastPaymentWord dark:text-white">Last Payment</h3>
                  <span class="view dark:text-blue-500">View all</span>
                </div>

                <!-- Payment Cards -->
                <div  class="cardPayment cardPayment1 pt-4 px-4">
                  <div class="flex justify-between">
                    <h2 class="Internal">Internal Medicine</h2>
                    <button class="done hover:cursor-pointer">Done</button>
                  </div>
                  <div class="flex justify-start items-center w-full">
                    <div class="imgDoc mx-2">
                      
                    </div>
                    <div class="w-full">
                      <div class="flex justify-between w-full">
                        <h2 class="nameDoc">Dr. Mohammed Ahmed</h2>
                        <div>
                          <i class="fa-brands fa-cc-visa">visa</i>
                          <span class="price">500$</span>
                        </div>
                      </div>
                      <span class="time">08:00PM , Wednesday 15 Oct, 2025</span>
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
          class="w-full px-0 col-span-1 flex flex-col items-start justify-start rounded-sm dark:bg-gray-800"
        >
          <h1 class="h1 dark:text-white">Payment</h1>
          <div class="w-full flex justify-between">
            <h3 class="lastPaymentWord dark:text-white">Last Payment</h3>
            <span class="view dark:text-blue-500">View all</span>
          </div>

          <div class="cardPayment cardPayment1 pt-4 px-4 w-full">
            <div class="flex justify-between w-full">
              <h2 class="Internal">Internal Medicine</h2>
              <button class="done hover:cursor-pointer">Done</button>
            </div>
            <div class="flex justify-start items-center w-full">
              <div class="imgDoc mx-2">
         
              </div>
              <div class="w-full">
                <div class="flex justify-between w-full">
                  <h2 class="nameDoc">Dr.Mohammed ahmed</h2>
                  <div>
                    <i class="fa-brands fa-cc-visa">visa</i>
                    <span class="price">500$</span>
                  </div>
                </div>
                <span class="time">08:00PM , Wednesday 15 Oct,2025</span>
              </div>
            </div>
          </div>

          <div class="cardPayment cardPayment1 pt-4 px-4 w-full">
            <div class="flex justify-between">
              <h2 class="Internal">Internal Medicine</h2>
              <button class="done hover:cursor-pointer">Done</button>
            </div>
            <div class="flex justify-start items-center w-full">
              <div class="imgDoc mx-2">
       
              </div>
              <div class="w-full">
                <div class="flex justify-between w-full">
                  <h2 class="nameDoc">Dr.Mohammed ahmed</h2>
                  <div>
                    <i class="fa-brands fa-cc-visa">visa</i>
                    <span class="price">500$</span>
                  </div>
                </div>
                <span class="time">08:00PM , Wednesday 15 Oct,2025</span>
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
  color: #027a48;
}
.cardPayment {
  background: #fff;
  width: 100%;
  margin: 15px 0;
  border-radius: 13px;
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
