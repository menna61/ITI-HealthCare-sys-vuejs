<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md text-center">
      <h1 class="text-2xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
      <p class="text-gray-600 mb-6">Your appointment booking has been cancelled.</p>
      <router-link
        to="/patient/doctors"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Back to Doctors
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CancelPage",
  mounted() {
    // Simply clear the pending booking data from localStorage
    // No need to delete from database since booking was never created
    const bookingDataStr = localStorage.getItem("pendingBookingData");
    if (bookingDataStr) {
      localStorage.removeItem("pendingBookingData");
      console.log("Pending booking data cleared after payment cancellation");
    }
  },
};
</script>

<style scoped></style>
