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
import { db } from "../../authHandler.js";
import { doc, deleteDoc } from "firebase/firestore";

export default {
  name: "CancelPage",
  async mounted() {
    const bookingId = localStorage.getItem("pendingBookingId");
    if (bookingId) {
      try {
        await deleteDoc(doc(db, "bookings", bookingId));
        localStorage.removeItem("pendingBookingId");
      } catch (error) {
        console.error("Error deleting pending booking:", error);
      }
    }
  },
};
</script>

<style scoped></style>
