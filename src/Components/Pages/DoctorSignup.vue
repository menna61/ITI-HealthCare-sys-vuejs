<template>
  <div class="cont h-full p-8 bg-white dark:bg-gray-800 rounded-2xl flex flex-col gap-10">
    <div class="top flex flex-col gap-10">
      <back-btn />

      <div class="stepper flex flex-col gap-8">
        <div class="top flex flex-col gap-4">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white">Sign up as a doctor</h1>
          <p class="text-gray-600 dark:text-gray-300 text-xl">Create your professional account</p>
        </div>

        <!-- Stepper structure -->
        <div class="">
          <ol
            class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base"
          >
            <li
              class="flex md:w-full items-center text-[#0CB8B6] sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
            >
              <span
                class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500"
              >
                <svg
                  class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#0CB8B6"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
                  />
                </svg>
                Personal <span class="hidden sm:inline-flex sm:ms-2">Information</span>
              </span>
            </li>
            <li
              class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
            >
              <span
                class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500"
              >
                <svg
                  :class="currentStep > 1 ? 'fill-[#0CB8B6]' : 'fill-gray-400'"
                  class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
                  />
                </svg>
                <p :class="currentStep > 1 ? 'text-[#0CB8B6]' : 'text-gray-500'">Credentials</p>
              </span>
            </li>
            <li class="flex items-center">
              <span
                class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500"
              >
                <svg
                  :class="currentStep > 2 ? 'fill-[#0CB8B6]' : 'fill-gray-400'"
                  class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
                  />
                </svg>
                <p :class="currentStep > 2 ? 'text-[#0CB8B6]' : 'text-gray-500'">Bio</p>
              </span>
            </li>
          </ol>
        </div>
      </div>
    </div>
    <div
      class="bottom flex flex-col items-center justify-center xl:flex-row xl:items-start gap-10"
      v-if="currentStep === 1"
    >
      <!--Upload image-->
      <div class="left w-fit">
        <div
          class="cam w-36 h-36 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center relative"
        >
          <img
            v-if="!profileImage"
            src="../../assets/camera.svg"
            alt=""
            class="cursor-pointer"
            @click="triggerFileInput"
          />
          <img
            v-else
            :src="profileImage"
            alt="Profile"
            class="w-full h-full rounded-full object-cover cursor-pointer"
            @click="triggerFileInput"
          />
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleFileUpload"
            class="hidden"
          />
        </div>
      </div>

      <div class="right w-full">
        <div class="form">
          <form class="flex flex-col gap-6" action="">
            <google-card />
            <div class="or flex gap-2 items-center justify-center">
              <div class="w-full h-0.5 bg-gray-100 dark:bg-gray-600"></div>
              <p class="text-gray-600 dark:text-gray-300">or</p>
              <div class="w-full h-0.5 bg-gray-100 dark:bg-gray-600"></div>
            </div>

            <div class="flex flex-col gap-8 items-end">
              <div
                v-if="errorMsg"
                class="text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900 border border-red-100 dark:border-red-800 p-3 rounded w-full"
              >
                {{ errorMsg }}
              </div>
              <div
                v-if="successMsg"
                class="text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900 border border-green-100 dark:border-green-800 p-3 rounded w-full"
              >
                {{ successMsg }}
              </div>
              <div class="inputs w-full flex flex-col gap-4">
                <div class="name flex flex-col xl:flex-row gap-4 items-center w-full">
                  <div class="fname flex flex-col gap-2 w-full">
                    <label class="text-gray-900 dark:text-white">First name</label>
                    <div
                      class="flex gap-2 h-12 px-4 border border-gray-200 dark:border-gray-600 rounded-lg items-center bg-white dark:bg-gray-700"
                    >
                      <svg
                        class="w-6 h-6 fill-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                      >
                        <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                        <path
                          d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"
                        />
                      </svg>
                      <input
                        v-model="firstName"
                        type="text"
                        placeholder="Enter first name"
                        class="w-full h-12 bg-transparent text-gray-900 dark:text-white dark:placeholder-gray-400"
                      />
                    </div>
                  </div>
                  <div class="sname flex flex-col gap-2 w-full">
                    <label class="text-gray-900 dark:text-white">Last name</label>
                    <div
                      class="flex gap-2 h-12 px-4 border border-gray-200 dark:border-gray-600 rounded-lg items-center bg-white dark:bg-gray-700"
                    >
                      <svg
                        class="w-6 h-6 fill-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                      >
                        <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                        <path
                          d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"
                        />
                      </svg>
                      <input
                        v-model="lastName"
                        type="text"
                        placeholder="Enter last name"
                        class="w-full h-12 bg-transparent text-gray-900 dark:text-white dark:placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>
                <div class="phone,email flex flex-col xl:flex-row gap-4 items-center w-full">
                  <div class="email flex flex-col gap-2 w-full">
                    <label class="text-gray-900 dark:text-white">Email</label>
                    <div
                      class="flex gap-2 h-12 px-4 border border-gray-200 dark:border-gray-600 rounded-lg items-center bg-white dark:bg-gray-700"
                    >
                      <svg
                        class="w-6 h-6 fill-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                      >
                        <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                        <path
                          d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z"
                        />
                      </svg>
                      <input
                        v-model="email"
                        type="text"
                        placeholder="Enter email"
                        class="w-full h-12 bg-transparent text-gray-900 dark:text-white dark:placeholder-gray-400"
                      />
                    </div>
                  </div>
                  <div class="sname flex flex-col gap-2 w-full">
                    <label class="text-gray-900 dark:text-white">Phone number</label>
                    <div
                      class="flex gap-2 h-12 px-4 border rounded-lg items-center bg-white dark:bg-gray-700"
                      :class="
                        phoneNumberError
                          ? 'border-red-500 dark:border-red-400'
                          : 'border-gray-200 dark:border-gray-600'
                      "
                    >
                      <svg
                        class="w-6 h-6 fill-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                      >
                        <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                        <path
                          d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z"
                        />
                      </svg>
                      <input
                        v-model="phoneNumber"
                        type="text"
                        placeholder="+20 1234 223 43"
                        class="w-full h-12 bg-transparent text-gray-900 dark:text-white dark:placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>
                <div class="pass flex flex-col xl:flex-row gap-4 items-center w-full">
                  <div class="pass flex flex-col gap-2 w-full">
                    <label class="text-gray-900 dark:text-white">Password</label>
                    <div
                      class="flex gap-2 h-12 px-4 border border-gray-200 dark:border-gray-600 rounded-lg items-center bg-white dark:bg-gray-700"
                    >
                      <svg
                        class="w-6 h-6 fill-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                      >
                        <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                        <path
                          d="M256 160L256 224L384 224L384 160C384 124.7 355.3 96 320 96C284.7 96 256 124.7 256 160zM192 224L192 160C192 89.3 249.3 32 320 32C390.7 32 448 89.3 448 160L448 224C483.3 224 512 252.7 512 288L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 288C128 252.7 156.7 224 192 224z"
                        />
                      </svg>
                      <input
                        v-model="password"
                        :type="showPassword ? 'text' : 'password'"
                        placeholder="Enter your password"
                        class="w-full h-12 bg-transparent text-gray-900 dark:text-white dark:placeholder-gray-400"
                      />
                      <!-- Eye icon when password is hidden -->
                      <svg
                        v-if="!showPassword"
                        @click="togglePasswordVisibility"
                        class="w-6 h-6 fill-gray-400 cursor-pointer hover:fill-gray-600 dark:hover:fill-gray-300 transition-colors"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                      >
                        <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                        <path
                          d="M320 96C178.6 96 64 208 64 320s114.6 224 256 224 256-112 256-224S461.4 96 320 96zm0 384c-88.4 0-160-71.6-160-160s71.6-160 160-160 160 71.6 160 160-71.6 160-160 160zm0-256c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96z"
                        />
                      </svg>
                      <!-- Eye-slash icon when password is visible -->
                      <svg
                        v-else
                        @click="togglePasswordVisibility"
                        class="w-6 h-6 fill-gray-400 cursor-pointer hover:fill-gray-600 dark:hover:fill-gray-300 transition-colors"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                      >
                        <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                        <path
                          d="M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L504.5 470.8C507.2 468.4 509.9 466 512.5 463.6C559.3 420.1 590.6 368.2 605.5 332.5C608.8 324.6 608.8 315.8 605.5 307.9C590.6 272.2 559.3 220.2 512.5 176.8C465.4 133.1 400.7 96.2 319.9 96.2C263.1 96.2 214.3 114.4 173.9 140.4L73 39.1zM236.5 202.7C260 185.9 288.9 176 320 176C399.5 176 464 240.5 464 320C464 351.1 454.1 379.9 437.3 403.5L402.6 368.8C415.3 347.4 419.6 321.1 412.7 295.1C399 243.9 346.3 213.5 295.1 227.2C286.5 229.5 278.4 232.9 271.1 237.2L236.4 202.5zM357.3 459.1C345.4 462.3 332.9 464 320 464C240.5 464 176 399.5 176 320C176 307.1 177.7 294.6 180.9 282.7L101.4 203.2C68.8 240 46.4 279 34.5 307.7C31.2 315.6 31.2 324.4 34.5 332.3C49.4 368 80.7 420 127.5 463.4C174.6 507.1 239.3 544 320.1 544C357.4 544 391.3 536.1 421.6 523.4L357.4 459.2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="bottom flex gap-10" v-if="currentStep === 2">
      <div class="form w-full">
        <form class="flex flex-col gap-6" action="">
          <div class="flex flex-col gap-8 items-end">
            <div class="inputs w-full flex flex-col gap-4">
              <div class="name flex flex-col xl:flex-row gap-4 items-center w-full">
                <div class="fname flex flex-col gap-2 w-full">
                  <label class="text-gray-900 dark:text-white">Years of experience</label>
                  <div
                    class="flex gap-2 h-12 px-4 border border-gray-200 dark:border-gray-600 rounded-lg items-center bg-white dark:bg-gray-700"
                  >
                    <input
                      v-model="yearsOfExperience"
                      type="text"
                      placeholder="Enter years of experience"
                      class="w-full h-12 bg-transparent text-gray-900 dark:text-white dark:placeholder-gray-400"
                    />
                  </div>
                </div>
                <div class="sname flex flex-col gap-2 w-full">
                  <label class="text-gray-900 dark:text-white">Medical license number</label>
                  <div
                    class="flex gap-2 h-12 px-4 border border-gray-200 dark:border-gray-600 rounded-lg items-center bg-white dark:bg-gray-700"
                  >
                    <input
                      v-model="medicalLicenseNumber"
                      type="text"
                      placeholder="Enter license number"
                      class="w-full h-12 bg-transparent text-gray-900 dark:text-white dark:placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>
              <div class="phone,email flex flex-col xl:flex-row gap-4 items-center w-full">
                <div class="email flex flex-col gap-2 w-full">
                  <label class="text-gray-900 dark:text-white">Clinic name</label>
                  <div
                    class="flex gap-2 h-12 px-4 border border-gray-200 dark:border-gray-600 rounded-lg items-center bg-white dark:bg-gray-700"
                  >
                    <input
                      v-model="clinicName"
                      type="text"
                      placeholder="Enter clinic name"
                      class="w-full h-12 bg-transparent text-gray-900 dark:text-white dark:placeholder-gray-400"
                    />
                  </div>
                </div>
                <div class="sname flex flex-col gap-2 w-full">
                  <label class="text-gray-900 dark:text-white">Clinic address</label>
                  <div
                    class="flex gap-2 h-12 px-4 border border-gray-200 dark:border-gray-600 rounded-lg items-center bg-white dark:bg-gray-700"
                  >
                    <input
                      v-model="clinicAddress"
                      type="text"
                      placeholder="Enter clinic address"
                      class="w-full h-12 bg-transparent text-gray-900 dark:text-white dark:placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>
              <div class="pass flex flex-col xl:flex-row gap-4 items-center w-full">
                <div class="pass flex flex-col gap-2 w-full relative">
                  <label class="text-gray-900 dark:text-white">Degree</label>
                  <div
                    class="flex gap-2 h-12 px-4 border border-gray-200 dark:border-gray-600 rounded-lg items-center bg-white dark:bg-gray-700 cursor-pointer"
                    @click="showDegrees"
                  >
                    <input
                      v-model="selectedDegree"
                      type="text"
                      placeholder="Select your scientific degree"
                      class="w-full h-12 bg-transparent text-gray-900 dark:text-white dark:placeholder-gray-400 cursor-pointer"
                      readonly
                    />
                    <svg
                      class="w-6 h-6 fill-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                    >
                      <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                      <path
                        d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z"
                      />
                    </svg>
                  </div>
                  <div
                    class="degrees w-full p-4 shadow-xl rounded-lg absolute top-20 flex flex-col gap-4 bg-white dark:bg-gray-700 z-10"
                    v-show="isShow === true"
                  >
                    <p
                      @click="selectDegree(degree)"
                      v-for="degree in degrees"
                      :key="degree"
                      class="py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer rounded-lg text-gray-900 dark:text-white"
                    >
                      {{ degree }}
                    </p>
                  </div>
                </div>

                <div class="pass flex flex-col gap-2 w-full relative">
                  <label class="text-gray-900 dark:text-white">Speciality</label>
                  <div
                    class="flex gap-2 h-12 px-4 border border-gray-200 dark:border-gray-600 rounded-lg items-center bg-white dark:bg-gray-700 cursor-pointer"
                    @click="showSpeciality"
                  >
                    <svg
                      class="w-6 h-6 fill-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                    >
                      <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                      <path
                        d="M64 112C64 85.5 85.5 64 112 64L160 64C177.7 64 192 78.3 192 96C192 113.7 177.7 128 160 128L128 128L128 256C128 309 171 352 224 352C277 352 320 309 320 256L320 128L288 128C270.3 128 256 113.7 256 96C256 78.3 270.3 64 288 64L336 64C362.5 64 384 85.5 384 112L384 256C384 333.4 329 398 256 412.8L256 432C256 493.9 306.1 544 368 544C429.9 544 480 493.9 480 432L480 346.5C442.7 333.3 416 297.8 416 256C416 203 459 160 512 160C565 160 608 203 608 256C608 297.8 581.3 333.4 544 346.5L544 432C544 529.2 465.2 608 368 608C270.8 608 192 529.2 192 432L192 412.8C119 398 64 333.4 64 256L64 112zM512 288C529.7 288 544 273.7 544 256C544 238.3 529.7 224 512 224C494.3 224 480 238.3 480 256C480 273.7 494.3 288 512 288z"
                      />
                    </svg>
                    <input
                      v-model="selectedSpeciality"
                      type="text"
                      placeholder="Select your speciality"
                      class="w-full h-12 bg-transparent text-gray-900 dark:text-white dark:placeholder-gray-400 cursor-pointer"
                      readonly
                    />
                    <svg
                      class="w-6 h-6 fill-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                    >
                      <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                      <path
                        d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z"
                      />
                    </svg>
                  </div>
                  <div
                    class="degrees w-full p-4 shadow-xl rounded-lg absolute top-20 flex flex-col gap-4 bg-white dark:bg-gray-700 z-10"
                    v-show="showSpec === true"
                  >
                    <p
                      @click="selectSpec(speciality)"
                      v-for="speciality in specialities"
                      :key="speciality"
                      class="py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer rounded-lg text-gray-900 dark:text-white"
                    >
                      {{ speciality }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="bottom flex gap-10" v-if="currentStep === 3">
      <div class="form w-full">
        <form class="flex flex-col gap-6" action="">
          <div class="inputs w-full flex flex-col gap-4">
            <label class="text-gray-900 dark:text-white">Bio</label>
            <div
              class="flex gap-2 h-44 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            >
              <textarea
                v-model="bio"
                placeholder="Enter your bio"
                class="w-full h-full p-4 resize-none outline-none bg-transparent text-gray-900 dark:text-white dark:placeholder-gray-400"
              ></textarea>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="btn w-full flex flex-col gap-4">
      <div
        v-if="errorMsg && currentStep === 3"
        class="text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900 border border-red-100 dark:border-red-800 p-3 rounded w-full"
      >
        {{ errorMsg }}
      </div>
      <div
        v-if="successMsg && currentStep === 3"
        class="text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900 border border-green-100 dark:border-green-800 p-3 rounded w-full"
      >
        {{ successMsg }}
      </div>
      <div class="flex justify-end gap-4">
        <button
          v-show="currentStep > 1"
          @click="prevStep"
          class="flex gap-2 items-center justify-center h-12 rounded-lg border border-[#5271FF] dark:border-blue-400 text-[#5271FF] dark:text-blue-400 w-fit px-10 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
        >
          <svg
            class="w-6 h-6 fill-[#5271FF]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
          >
            <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
            <path
              d="M169.4 297.4C156.9 309.9 156.9 330.2 169.4 342.7L361.4 534.7C373.9 547.2 394.2 547.2 406.7 534.7C419.2 522.2 419.2 501.9 406.7 489.4L237.3 320L406.6 150.6C419.1 138.1 419.1 117.8 406.6 105.3C394.1 92.8 373.8 92.8 361.3 105.3L169.3 297.3z"
            />
          </svg>
          <p>{{ currentStep > 1 ? "Previous" : "Next" }}</p>
        </button>

        <button
          @click="nextStep"
          :disabled="loading || uploading"
          class="flex gap-2 items-center justify-center h-12 rounded-lg bg-[#5271FF] dark:bg-blue-600 text-white w-fit px-10 cursor-pointer disabled:opacity-60 hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors"
        >
          <svg
            v-if="loading || uploading"
            class="animate-spin h-5 w-5 text-white mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <p>
            {{
              loading
                ? "Creating account..."
                : uploading
                ? "Uploading image..."
                : currentStep === 3
                ? "Finish"
                : "Next"
            }}
          </p>
          <svg
            v-if="!loading && !uploading"
            class="w-6 h-6 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
          >
            <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
            <path
              d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BackBtn from "../BackBtn.vue";
import GoogleCard from "../GoogleCard.vue";
import { sendOTP } from "../../services/emailVerification.js";

export default {
  components: { GoogleCard, BackBtn },
  name: "DoctorSignup",
  data() {
    return {
      currentStep: 1,
      isShow: false,
      degrees: ["PhD", "Bachelor's", "Master's", "Diploma"],
      selectedDegree: "",
      specialities: [
        "Cardiology",
        "Dermatology",
        "Neurology",
        "Pediatrics",
        "Orthopedics",
        "Dentistry",
        "Psychiatry",
        "Ophthalmology",
        "General Surgery",
      ],
      selectedSpeciality: "",
      showSpec: false,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      showPassword: false,
      yearsOfExperience: "",
      medicalLicenseNumber: "",
      clinicName: "",
      clinicAddress: "",
      bio: "",
      profileImage: null,
      profileImageUrl: "",
      uploading: false,
      loading: false,
      errorMsg: "",
      successMsg: "",
    };
  },
  methods: {
    async nextStep() {
      if (this.currentStep < 3) {
        this.currentStep++;
      } else {
        // Validate all fields before registering
        console.log("Validating fields...");
        console.log("firstName:", this.firstName);
        console.log("lastName:", this.lastName);
        console.log("email:", this.email);
        console.log("phoneNumber:", this.phoneNumber);
        console.log("password:", this.password);
        console.log("yearsOfExperience:", this.yearsOfExperience);
        console.log("medicalLicenseNumber:", this.medicalLicenseNumber);
        console.log("clinicName:", this.clinicName);
        console.log("clinicAddress:", this.clinicAddress);
        console.log("selectedDegree:", this.selectedDegree);
        console.log("selectedSpeciality:", this.selectedSpeciality);
        console.log("bio:", this.bio);
        console.log("profileImageUrl:", this.profileImageUrl);

        if (
          !this.firstName ||
          !this.lastName ||
          !this.email ||
          !this.phoneNumber ||
          !this.password ||
          !this.yearsOfExperience ||
          !this.medicalLicenseNumber ||
          !this.clinicName ||
          !this.clinicAddress ||
          !this.selectedDegree ||
          !this.selectedSpeciality ||
          !this.bio
        ) {
          this.errorMsg = "Please fill all fields in all steps.";
          return;
        }

        if (!this.profileImageUrl) {
          this.errorMsg = "Please upload a profile image before finishing.";
          return;
        }
        await this.registerDoctor();
      }
    },
    prevStep() {
      if (this.currentStep > 1) this.currentStep--;
    },
    showDegrees() {
      this.isShow = !this.isShow;
    },
    selectDegree(degree) {
      this.selectedDegree = degree;
      this.isShow = false;
    },
    showSpeciality() {
      this.showSpec = !this.showSpec;
    },
    selectSpec(speciality) {
      this.selectedSpeciality = speciality;
      this.showSpec = false;
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.profileImage = URL.createObjectURL(file);
        this.uploading = true;
        // Upload to Cloudinary
        await this.uploadToCloudinary(file);
        this.uploading = false;
      }
    },
    async uploadToCloudinary(file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary upload preset
      formData.append("cloud_name", "dtaqbcmmg"); // Replace with your Cloudinary cloud name

      try {
        console.log("Starting upload to Cloudinary...");
        const response = await fetch("https://api.cloudinary.com/v1_1/dtaqbcmmg/image/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        console.log("Cloudinary response:", data);
        console.log("Response status:", response.status);
        if (response.ok && data.secure_url) {
          this.profileImageUrl = data.secure_url;
          console.log("Image uploaded successfully:", this.profileImageUrl);
          this.successMsg = "Image uploaded successfully!";
          this.errorMsg = ""; // Clear any previous error
        } else {
          console.error("Upload failed:", data.error?.message || data);
          this.errorMsg = `Failed to upload image: ${data.error?.message || "Unknown error"}`;
          this.profileImageUrl = ""; // Reset on failure
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        this.errorMsg = `Failed to upload image: ${error.message}`;
        this.profileImageUrl = ""; // Reset on failure
      }
    },
    async registerDoctor() {
      try {
        this.errorMsg = "";
        this.successMsg = "";
        this.loading = true;

        // Send OTP to email
        const name = `${this.firstName} ${this.lastName}`;
        const result = await sendOTP(this.email, name, "doctor");

        if (!result.success) {
          this.errorMsg = result.error || "Failed to send verification code. Please try again.";
          this.loading = false;
          return;
        }

        // Store doctor data in sessionStorage
        sessionStorage.setItem(
          "verificationData",
          JSON.stringify({
            email: this.email,
            userData: {
              firstName: this.firstName,
              lastName: this.lastName,
              password: this.password,
              phoneNumber: this.phoneNumber,
              yearsOfExperience: this.yearsOfExperience,
              medicalLicenseNumber: this.medicalLicenseNumber,
              clinicName: this.clinicName,
              clinicAddress: this.clinicAddress,
              selectedDegree: this.selectedDegree,
              selectedSpeciality: this.selectedSpeciality,
              bio: this.bio,
              profileImageUrl: this.profileImageUrl,
            },
            userType: "doctor",
          })
        );

        // Navigate to verification page
        this.$router.push("/verify-email");
      } catch (error) {
        console.error("Error during signup:", error);
        this.errorMsg = error?.message || "Something went wrong. Please try again.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped></style>
