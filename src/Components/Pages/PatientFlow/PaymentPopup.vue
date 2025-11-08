<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm backdrop-grayscale-50"
  >
    <div
      class="bgPay bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-1/2 p-6 transform transition-all duration-300"
    >
      <h2 class="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">Payment</h2>

      <p class="text-center text-gray-600 dark:text-gray-300 mb-6">
        Please confirm your payment of
        <span class="font-semibold text-blue-600">{{ paymentAmount }}$</span>
      </p>
      <div class="flex w-full justify-between">
        <div class="w-1/2 h-auto object-fill">
          <!-- <img src="/images/bgVisa.png" alt="" class="w-full mx-auto h-auto" /> -->
        </div>
        <div class="space-y-3 mb-6 w-full bg-white dark:bg-gray-700 shadow-2xl p-4 rounded-lg">
          <input
            type="text"
            placeholder="Cardholder Name"
            class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Card Number"
            maxlength="16"
            class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          />
          <div class="flex space-x-2">
            <input
              type="text"
              placeholder="MM/YY"
              class="w-1/2 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="CVV"
              maxlength="3"
              class="w-1/2 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-between mt-6">
        <button
          class="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition dark:text-gray-300"
          @click="$emit('close')"
        >
          Cancel
        </button>
        <button
          class="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition"
          @click="$emit('confirm')"
        >
          Pay Now
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    paymentAmount: Number,
  },
};
</script>

<style scoped>
/* Fade + Slide animation */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
/* .bgPay{
    background-image: url('/images/bgPays.jpeg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
} */
</style>
