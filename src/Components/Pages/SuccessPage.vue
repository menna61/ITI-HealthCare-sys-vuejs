<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md text-center">
      <h1 class="text-2xl font-bold text-green-600 mb-4">Payment Successful</h1>
      <p class="text-gray-600 mb-6">Your appointment has been confirmed!</p>
      <router-link
        to="/patient/appointments"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        View Appointments
      </router-link>
    </div>
  </div>
</template>

<script>
import { db } from "../../authHandler.js";
import { doc, updateDoc } from "firebase/firestore";

export default {
  name: "SuccessPage",
  async mounted() {
    const bookingId = localStorage.getItem("pendingBookingId");
    if (bookingId) {
      try {
        await updateDoc(doc(db, "bookings", bookingId), {
          status: "confirmed",
        });
        localStorage.removeItem("pendingBookingId");
      } catch (error) {
        console.error("Error confirming booking:", error);
      }
    }
  },
};
</script>

<style scoped></style>