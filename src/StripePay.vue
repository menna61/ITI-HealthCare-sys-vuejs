<template>
  <div class="flex flex-col items-center gap-4 mt-20">
    <h2 class="text-2xl font-bold">💳 Stripe Test Payment</h2>
    <input
      v-model.number="price"
      type="number"
      placeholder="Enter amount in USD"
      class="border p-2 rounded w-60 text-center"
    />
    <button @click="checkout" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Pay Now
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const price = ref(10);

async function checkout() {
  const amount = price.value * 100; // convert USD to cents
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4242";
  const res = await fetch(`${apiUrl}/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
  const data = await res.json();
  window.location.href = data.url;
}
</script>

<style>
body {
  font-family: sans-serif;
  background: #f7f9fb;
}
</style>
