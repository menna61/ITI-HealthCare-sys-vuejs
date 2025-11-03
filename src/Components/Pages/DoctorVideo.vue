<template>
  <div class="w-dwh lg:ml-[302px] ml-0">
    <main-nav />
    <div class="px-4 lg:pl-8 lg:pr-20 mt-8 flex flex-col gap-6">
      <!--Titles-->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Telemedicine</h1>
        <p class="text-gray-500 dark:text-gray-400">Track your telemedicine sessions</p>
      </div>

      <div class="content flex flex-col items-center w-full gap-6">
        <!-- 🟡 Waiting Room Section -->
        <div class="w-full rounded-xl bg-white dark:bg-gray-800 p-4 flex flex-col">
          <h1 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Waiting Room for Telemedicine Sessions
          </h1>

          <div
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-amber-100/75 rounded min-h-[80px] w-full px-3 py-3"
          >
            <!-- Left: User Info -->
            <div class="flex items-center gap-3">
              <div
                class="w-[32px] h-[32px] bg-amber-50 rounded-full flex items-center justify-center overflow-hidden"
              >
                <svg
                  class="w-6 h-6 fill-amber-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                >
                  <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                  <path
                    d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"
                  />
                </svg>
              </div>

              <div class="flex flex-col">
                <span class="text-gray-900 dark:text-white font-medium text-base">John Doe</span>
                <div class="flex items-center gap-2 mt-1 text-gray-600 dark:text-gray-400">
                  <svg
                    class="w-4 h-4 fill-amber-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                  >
                    <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                    <path
                      d="M320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z"
                    />
                  </svg>
                  <span class="text-sm">10:25 AM</span>
                </div>
              </div>
            </div>

            <!-- Right: Start Session Button -->
            <button
              class="flex items-center gap-2 text-white bg-[var(--main-color-500)] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-200 hover:scale-105 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                class="w-6 h-6 fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path
                  d="M128 128C92.7 128 64 156.7 64 192L64 448C64 483.3 92.7 512 128 512L384 512C419.3 512 448 483.3 448 448L448 192C448 156.7 419.3 128 384 128L128 128zM496 400L569.5 458.8C573.7 462.2 578.9 464 584.3 464C597.4 464 608 453.4 608 440.3L608 199.7C608 186.6 597.4 176 584.3 176C578.9 176 573.7 177.8 569.5 181.2L496 240L496 400z"
                />
              </svg>
              Start Session
            </button>
          </div>
        </div>

        <!-- 🟢 Upcoming Sessions Section -->
        <div class="w-full rounded-xl bg-white dark:bg-gray-800 p-4 flex flex-col">
          <h1 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Upcoming Telemedicine Sessions
          </h1>

          <div class="flex flex-col gap-3">
            <!-- Session 1 -->
            <div
              class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded min-h-[80px] w-full px-3 py-3 border border-gray-200 dark:border-gray-600"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-[32px] h-[32px] bg-[var(--main-color-25)] rounded-full flex items-center justify-center overflow-hidden"
                >
                  <svg
                    class="w-6 h-6 fill-[var(--main-color-500)]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                  >
                    <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                    <path
                      d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"
                    />
                  </svg>
                </div>
                <div class="flex flex-col">
                  <span class="text-gray-900 dark:text-white font-medium text-base"
                    >Michael Brown</span
                  >
                  <div class="flex items-center gap-2 mt-1 text-gray-600 dark:text-gray-400">
                    <svg
                      class="w-4 h-4 fill-gray-300 dark:fill-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                    >
                      <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                      <path
                        d="M320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z"
                      />
                    </svg>
                    <span class="text-sm">11:15 AM</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <button
                  class="flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-200 hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  Approve
                </button>

                <button
                  class="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-200 hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
              </div>
            </div>

            <!-- Session 2 -->
            <div
              class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded min-h-[80px] w-full px-3 py-3 border border-gray-200/50 dark:border-gray-600/50"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-[32px] h-[32px] bg-[var(--main-color-25)] rounded-full flex items-center justify-center overflow-hidden"
                >
                  <svg
                    class="w-6 h-6 fill-[var(--main-color-500)]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                  >
                    <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                    <path
                      d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"
                    />
                  </svg>
                </div>
                <div class="flex flex-col">
                  <span class="text-gray-900 dark:text-white font-medium text-base"
                    >Lisa Turner</span
                  >
                  <div class="flex items-center gap-2 mt-1 text-gray-600 dark:text-gray-400">
                    <svg
                      class="w-4 h-4 fill-gray-300 dark:fill-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                    >
                      <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                      <path
                        d="M320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z"
                      />
                    </svg>
                    <span class="text-sm">12:00 PM</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <button
                  class="flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-200 hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  Approve
                </button>

                <button
                  class="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-200 hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 🔵 Recent Sessions Section -->
        <div class="w-full rounded-xl bg-white dark:bg-gray-800 p-4 flex flex-col">
          <h1 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Recent Telemedicine Sessions
          </h1>

          <div class="flex flex-col gap-3">
            <!-- Recent Session Card 1 -->
            <div
              class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-gray-200/50 dark:border-gray-600/50 rounded min-h-[80px] w-full px-3 py-3"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-[32px] h-[32px] bg-[var(--main-color-25)] rounded-full flex items-center justify-center overflow-hidden"
                >
                  <svg
                    class="w-6 h-6 fill-[var(--main-color-500)]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                  >
                    <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                    <path
                      d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"
                    />
                  </svg>
                </div>
                <div class="flex flex-col">
                  <span class="text-gray-900 dark:text-white font-medium text-base"
                    >Emily Davis</span
                  >
                  <div class="flex items-center gap-2 mt-1 text-gray-600 dark:text-gray-400">
                    <svg
                      class="w-4 h-4 fill-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                    >
                      <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                      <path
                        d="M320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z"
                      />
                    </svg>
                    <span class="text-sm">Yesterday, 4:00 PM</span>
                  </div>
                </div>
              </div>

              <!-- View Details Button -->
              <button
                class="flex items-center gap-2 text-white bg-[var(--main-color-500)] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-200 hover:scale-105"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                View Details
              </button>
            </div>

            <!-- Recent Session Card 2 -->
            <div
              class="flex items-center justify-between border border-gray-200/50 dark:border-gray-600/50 rounded h-[80px] w-full px-3"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-[32px] h-[32px] bg-[var(--main-color-25)] rounded-full flex items-center justify-center overflow-hidden"
                >
                  <svg
                    class="w-6 h-6 fill-[var(--main-color-500)]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                  >
                    <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                    <path
                      d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"
                    />
                  </svg>
                </div>
                <div class="flex flex-col">
                  <span class="text-gray-900 dark:text-white font-medium text-base"
                    >Mark Wilson</span
                  >
                  <div class="flex items-center gap-2 mt-1 text-gray-600 dark:text-gray-400">
                    <svg
                      class="w-4 h-4 fill-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                    >
                      <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                      <path
                        d="M320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z"
                      />
                    </svg>
                    <span class="text-sm">Yesterday, 2:30 PM</span>
                  </div>
                </div>
              </div>

              <button
                class="flex items-center gap-2 text-white bg-[var(--main-color-500)] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-200 hover:scale-105"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from "../Layouts/MainNav.vue";

export default {
  name: "DoctorVideo",
  components: { MainNav },
};
</script>

<style scoped></style>
