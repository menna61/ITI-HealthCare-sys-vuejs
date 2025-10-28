<template>
  <div class="flex h-auto overflow-hidden w-full">
   
     

        <div
  
          class="w-full px-0 col-span-1 flex flex-col items-start justify-start rounded-sm  gap-6" 
        >
          <div class="flex flex-col gap-2 w-full">
            <h1 class="h1 dark:text-white">Payment</h1>
            <div class="w-full flex justify-between items-center">
              <h3 class="lastPaymentWord dark:text-white text-lg">Last Payment</h3>
              <span class="view dark:text-blue-500">View all</span>
            </div>
          </div>

          <div class="cardPayment cardPayment1 w-full flex flex-col gap-4 rounded-xl">
            <div class="flex justify-between w-full">
              <h2 class="Internal">Internal Medicine</h2>
              <button class="done hover:cursor-pointer">Done</button>
            </div>
            <div class="flex justify-start items-center w-full">
              <div class="imgDoc mx-2">
                <img src="/images/imgProfile.jpg" alt="" />
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

          <div class="cardPayment cardPayment1 w-full flex flex-col gap-4 rounded-xl">
            <div class="flex justify-between">
              <h2 class="Internal">Internal Medicine</h2>
              <button class="done hover:cursor-pointer">Done</button>
            </div>
            <div class="flex justify-start items-center w-full">
              <div class="imgDoc mx-2">
                <img src="/images/imgProfile.jpg" alt="" />
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
