<template>
  <div class="w-dwh lg:ml-[302px] ml-0">
    <main-nav />
    <div class="px-4 lg:pl-8 lg:pr-20 mt-8 flex flex-col gap-6">
      <!--Page title-->
      <div class="title flex flex-col gap-4">
        <h1 class="text-2xl font-bold">Patients</h1>
        <p class="text-gray-500">Manage your patients data</p>
      </div>

      <!--page content-->

      <div class="tablediv p-6 bg-white dark:bg-gray-800 rounded-xl">
        <div class="tableandsearch flex flex-col gap-4">
          <!--Search component-->
          <div class="search w-full lg:w-auto">
            <form class="w-full lg:w-96">
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >Search</label
              >
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search patient..."
                  required
                />
              </div>
            </form>
          </div>

          <!--Table component-->
          <div class="table w-full">
            <div class="relative overflow-x-auto border border-gray-200 sm:rounded-lg w-full">
              <table
                class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                <thead
                  class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                >
                  <tr>
                    <th scope="col" class="px-6 py-3">Name</th>
                    <th scope="col" class="px-6 py-3">Age</th>
                    <th scope="col" class="px-6 py-3">Gender</th>
                    <th scope="col" class="px-6 py-3">Email</th>
                    <th scope="col" class="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="patient in patients"
                    :key="patient.id"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {{ patient.name }}
                    </td>
                    <td class="px-6 py-4">
                      {{ patient.age }}
                    </td>
                    <td class="px-6 py-4">
                      {{ patient.gender }}
                    </td>
                    <td class="px-6 py-4">
                      {{ patient.email }}
                    </td>
                    <td class="px-6 py-4">
                      <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >View details</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!--Pagination-->
          <div class="pagination w-full flex justify-center items-center">
            <nav aria-label="Page navigation example">
              <ul class="inline-flex -space-x-px text-base h-10">
                <li>
                  <a
                    href="#"
                    class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >Previous</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >1</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >2</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    class="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    >3</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >4</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >5</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >Next</a
                  >
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from "../Layouts/MainNav.vue";
import { collection, getDocs, query, where, getDoc, doc } from "firebase/firestore";
import { db, auth } from "@/firebase";

export default {
  name: "PatientsPage",
  components: { MainNav },
  data() {
    return {
      patients: [],
    };
  },
  async mounted() {
    await this.fetchDoctorPatients();
  },
  methods: {
    async fetchDoctorPatients() {
      try {
        const user = auth.currentUser;
        if (!user) return;

        // Fetch bookings for the current doctor
        const bookingsCollection = collection(db, "bookings");
        const q = query(bookingsCollection, where("doctorId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        // Collect unique patient IDs
        const patientIds = new Set();
        querySnapshot.forEach((doc) => {
          const booking = doc.data();
          if (booking.patientId) {
            patientIds.add(booking.patientId);
          }
        });

        // Fetch patient details for each unique patient ID
        const patients = [];
        for (const patientId of patientIds) {
          const patientRef = doc(db, "patients", patientId);
          const patientSnap = await getDoc(patientRef);
          if (patientSnap.exists()) {
            const patientData = patientSnap.data();
            patients.push({
              id: patientId,
              name: `${patientData.firstName || ""} ${patientData.lastName || ""}`.trim(),
              age: patientData.age || "",
              gender: patientData.gender || "",
              email: patientData.email || "",
            });
          }
        }

        this.patients = patients;
      } catch (error) {
        console.error("Error fetching doctor patients:", error);
      }
    },
  },
};
</script>
