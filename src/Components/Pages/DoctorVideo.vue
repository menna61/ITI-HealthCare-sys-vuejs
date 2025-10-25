<template>
     <div class="w-dwh ml-[302px]">
        <main-nav/>
        <div class="pl-8 pr-20 mt-8 flex flex-col gap-6">
                    <!--Titles-->
                    <div class="title flex flex-col gap-4">
                        <h1 class="text-2xl font-bold">Telemedicine</h1>
                        <p class="text-gray-500">Track your telemedicine sessions</p>
                    </div>

                <!--Page content-->
                <!-- <div class="content">

       <div class="bg-white h-[150px]">
        <h1>
          Waiting Room for Telemedicine Sessions
        </h1>
        <div class="w-[90%] h-[80px] bg-black ">
          <div class="w-[32px] h-[32px] bg-amber-700 raduis-[50%]"><img src="../../assets/avatar-waiting.png" alt="Video Call Placeholder" class=""></div>
          <div>
            <img src="../../assets/waiting-time.png" alt="Video Call Placeholder" class="">
          <p>waiting</p>
          </div>

        </div>

       </div>


                </div> -->


<div class="content flex flex-col items-center w-full gap-6">

  <!-- 🟡 Waiting Room Section -->
  <div class="w-full rounded-lg shadow-md p-4 flex flex-col">
    <h1 class="text-lg font-semibold text-gray-900 mb-2">
      Waiting Room for Telemedicine Sessions
    </h1>

    <div class="flex items-center justify-between bg-yellow-500/25 rounded h-[80px] w-full px-3">
      <!-- Left: User Info -->
      <div class="flex items-center gap-3">
        <div class="w-[32px] h-[32px] bg-amber-50 rounded-full flex items-center justify-center overflow-hidden">
          <svg class="w-6 h-6 fill-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"/></svg>
        </div>

        <div class="flex flex-col">
          <span class="text-gray-900 font-medium text-base">John Doe</span>
          <div class="flex items-center gap-2 mt-1 text-gray-600">
            <img src="../../assets/waiting-time.png" alt="Time Icon" class="">
            <span class="text-sm">10:25 AM</span>
          </div>
        </div>
      </div>

      <!-- Right: Start Session Button -->
      <button
        class="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
        focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2
        transition duration-200 hover:scale-105 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <img src="../../assets/icon-video.png" alt="Video Icon" class="">
        Start Session
      </button>
    </div>
  </div>

  <!-- 🟢 Upcoming Sessions Section -->
  <div class="w-full rounded-lg shadow-md p-4 flex flex-col">
    <h1 class="text-lg font-semibold text-gray-900 mb-3">
      Upcoming Telemedicine Sessions
    </h1>

    <div class="flex flex-col gap-3">



      <!-- Session 1 -->
      <div class="flex items-center justify-between rounded h-[80px] w-full px-3 border border-gray-200">
        <div class="flex items-center gap-3">
          <div class="w-[32px] h-[32px] bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
            <img src="../../assets/avatar-upcoming.png" alt="User Avatar" class="object-cover">
          </div>
          <div class="flex flex-col">
            <span class="text-gray-900 font-medium text-base">Michael Brown</span>
            <div class="flex items-center gap-2 mt-1 text-gray-600">
              <img src="../../assets/icon-gray.png" alt="Time Icon" class="">
              <span class="text-sm">11:15 AM</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button
            class="flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 focus:ring-4
            focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2
            transition duration-200 hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Approve
          </button>

          <button
            class="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 focus:ring-4
            focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2
            transition duration-200 hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </button>
        </div>
      </div>

      <!-- Session 2 -->
      <div class="flex items-center justify-between rounded h-[80px] w-full px-3 border border-gray-200/50">
        <div class="flex items-center gap-3">
          <div class="w-[32px] h-[32px] bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
            <img src="../../assets/avatar-upcoming.png" alt="User Avatar" class="object-cover">
          </div>
          <div class="flex flex-col">
            <span class="text-gray-900 font-medium text-base">Lisa Turner</span>
            <div class="flex items-center gap-2 mt-1 text-gray-600">
              <img src="../../assets/icon-gray.png" alt="Time Icon" class="">
              <span class="text-sm">12:00 PM</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button
            class="flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 focus:ring-4
            focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2
            transition duration-200 hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Approve
          </button>

          <button
            class="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 focus:ring-4
            focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2
            transition duration-200 hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- 🔵 Recent Sessions Section -->
  <div class="w-full rounded-lg shadow-md p-4 flex flex-col">
    <h1 class="text-lg font-semibold text-gray-900 mb-3">
      Recent Telemedicine Sessions
    </h1>

    <div class="flex flex-col gap-3">
      <!-- Recent Session Card 1 -->
      <div class="flex items-center justify-between bg-gray-200/50 rounded h-[80px] w-full px-3">
        <div class="flex items-center gap-3">
          <div class="w-[32px] h-[32px] bg-gray-400/25 rounded-full flex items-center justify-center overflow-hidden">
            <img src="../../assets/avatar-upcoming.png" alt="User Avatar" class="object-cover">
          </div>
          <div class="flex flex-col">
            <span class="text-gray-900 font-medium text-base">Emily Davis</span>
            <div class="flex items-center gap-2 mt-1 text-gray-600">
              <img src="../../assets/icon-gray.png" alt="Time Icon" class="">
              <span class="text-sm">Yesterday, 4:00 PM</span>
            </div>
          </div>
        </div>

        <!-- View Details Button -->
        <button
          class="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
          focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2
          transition duration-200 hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
            stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          View Details
        </button>
      </div>

      <!-- Recent Session Card 2 -->
      <div class="flex items-center justify-between bg-gray-200/50 rounded h-[80px] w-full px-3">
        <div class="flex items-center gap-3">
          <div class="w-[32px] h-[32px] bg-gray-400/25 rounded-full flex items-center justify-center overflow-hidden">
            <img src="../../assets/avatar-upcoming.png" alt="User Avatar" class="object-cover">
          </div>
          <div class="flex flex-col">
            <span class="text-gray-900 font-medium text-base">Mark Wilson</span>
            <div class="flex items-center gap-2 mt-1 text-gray-600">
              <img src="../../assets/icon-gray.png" alt="Time Icon" class="">
              <span class="text-sm">Yesterday, 2:30 PM</span>
            </div>
          </div>
        </div>

        <button
          class="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
          focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2
          transition duration-200 hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
            stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
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
import MainNav from '../Layouts/MainNav.vue';

    export default {
        name:"DoctorVideo",
        components:{MainNav}
    }
</script>

<style scoped>

</style>
