<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ $t("terms_and_conditions_title") }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          {{ $t("last_updated") }}: {{ $t("november_2024") }}
        </p>
      </div>

      <div class="prose dark:prose-invert max-w-none">
        <!-- Introduction -->
        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {{ $t("terms_introduction_title") }}
          </h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            {{ $t("terms_introduction_text") }}
          </p>
        </section>

        <!-- Appointment Booking -->
        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {{ $t("terms_booking_title") }}
          </h2>
          <ul class="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
            <li>{{ $t("terms_booking_1") }}</li>
            <li>{{ $t("terms_booking_2") }}</li>
            <li>{{ $t("terms_booking_3") }}</li>
            <li>{{ $t("terms_booking_4") }}</li>
          </ul>
        </section>

        <!-- Cancellation Policy -->
        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {{ $t("terms_cancellation_title") }}
          </h2>
          <ul class="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
            <li>{{ $t("terms_cancel_12h") }}</li>
            <li>{{ $t("terms_cancel_6h") }}</li>
            <li>{{ $t("terms_doctor_cancel") }}</li>
            <li>{{ $t("terms_no_show") }}</li>
          </ul>
        </section>

        <!-- Payment Terms -->
        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {{ $t("terms_payment_title") }}
          </h2>
          <ul class="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
            <li>{{ $t("terms_payment_1") }}</li>
            <li>{{ $t("terms_payment_2") }}</li>
            <li>{{ $t("terms_payment_3") }}</li>
            <li>{{ $t("terms_payment_4") }}</li>
          </ul>
        </section>

        <!-- Medical Information -->
        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {{ $t("terms_medical_info_title") }}
          </h2>
          <ul class="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
            <li>{{ $t("terms_medical_info_1") }}</li>
            <li>{{ $t("terms_medical_info_2") }}</li>
            <li>{{ $t("terms_medical_info_3") }}</li>
            <li>{{ $t("terms_medical_info_4") }}</li>
          </ul>
        </section>

        <!-- Privacy & Data Protection -->
        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {{ $t("terms_privacy_title") }}
          </h2>
          <ul class="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
            <li>{{ $t("terms_privacy_1") }}</li>
            <li>{{ $t("terms_privacy_2") }}</li>
            <li>{{ $t("terms_privacy_3") }}</li>
            <li>{{ $t("terms_privacy_4") }}</li>
          </ul>
        </section>

        <!-- User Responsibilities -->
        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {{ $t("terms_user_responsibilities_title") }}
          </h2>
          <ul class="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
            <li>{{ $t("terms_user_responsibilities_1") }}</li>
            <li>{{ $t("terms_user_responsibilities_2") }}</li>
            <li>{{ $t("terms_user_responsibilities_3") }}</li>
            <li>{{ $t("terms_user_responsibilities_4") }}</li>
          </ul>
        </section>

        <!-- Limitation of Liability -->
        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {{ $t("terms_liability_title") }}
          </h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            {{ $t("terms_liability_text") }}
          </p>
        </section>

        <!-- Changes to Terms -->
        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {{ $t("terms_changes_title") }}
          </h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            {{ $t("terms_changes_text") }}
          </p>
        </section>

        <!-- Contact Information -->
        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {{ $t("terms_contact_title") }}
          </h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            {{ $t("terms_contact_text") }}
          </p>
          <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p class="text-gray-700 dark:text-gray-300">
              <strong>{{ $t("email") }}:</strong> support@medilink.com
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              <strong>{{ $t("phone") }}:</strong> +20 123 456 7890
            </p>
          </div>
        </section>
      </div>

      <!-- Back Button -->
      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <router-link
          to="/patientSignup"
          class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {{ $t("back_to_signup") }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TermsAndConditions",
};
</script>

<style scoped>
.prose {
  max-width: none;
}
</style>
