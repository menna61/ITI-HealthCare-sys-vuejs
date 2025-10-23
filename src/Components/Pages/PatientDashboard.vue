<template>
  <div class="patient-dashboard p-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Patient Dashboard</h1>
      <button
        @click="logout"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
    <p>Welcome to your patient dashboard. This is a placeholder for patient-specific content.</p>
    <!-- Add patient dashboard content here -->
  </div>
</template>

<script>
import { signOutUser } from "/src/authHandler.js";
import { useRouter } from "vue-router";

export default {
  name: "PatientDashboard",
  setup() {
    const router = useRouter();

    const logout = async () => {
      try {
        await signOutUser();
        router.push("/login");
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    return {
      logout,
    };
  },
};
</script>

<style scoped>
.patient-dashboard {
  min-height: 100vh;
}
</style>
