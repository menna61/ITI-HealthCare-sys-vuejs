<template>
  <div :class="[$i18n.locale === 'ar' ? 'lg:mr-[302px]' : 'lg:ml-[302px]', 'w-dwh']">
    <main-nav />
    <div :class="[$i18n.locale === 'ar' ? 'pr-8 pl-20' : 'pl-8 pr-20', 'mt-8 flex flex-col gap-6']">
      <!--Page titles-->

      <!--Page content-->
      <div
        class="relative flex items-center rounded-4xl h-80 bg-cover bg-center overflow-hidden"
        :class="[$i18n.locale === 'ar' ? 'justify-start' : 'justify-start']"
        style="background-image: url('/images/bgHome.png')"
      >
        <div
          :class="[$i18n.locale === 'ar' ? 'left-4 md:left-20' : 'right-4 md:right-20', 'absolute']"
        >
          <img src="/images/bgHomePhone.png" class="max-w-full h-56 md:h-80" loading="lazy" />
        </div>
        <div
          :class="[
            $i18n.locale === 'ar' ? 'pr-6 items-end text-right' : 'pl-6 items-start text-left',
            'flex flex-col justify-around py-4 z-10',
          ]"
        >
          <p v-if="currentPatient != null" class="text-gray-100 text-xl">
            {{ $t("patient_home_greeting") }} {{ currentPatient.firstName }}
          </p>
          <h1 class="h1 text-white md:w-3/4 text-3xl">
            {{ $t("patient_home_title") }}
          </h1>
          <router-link to="/patient/doctors" class="btnBooking my-2 rounded-xl mt-4 inline-block">{{
            $t("patient_home_booking")
          }}</router-link>
        </div>
      </div>

      <!-- Payments and Appointments Sections -->
      <div class="flex flex-col lg:flex-row gap-6 w-full">
        <payments-component />
        <appointments-component />
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from "@/Components/Layouts/MainNav.vue";
import { signOutUser, db, auth } from "/src/authHandler.js";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import PaymentsComponent from "./PaymentsComponent.vue";
import AppointmentsComponent from "./AppointmentsComponent.vue";

export default {
  name: "PatientHome",
  components: { MainNav, PaymentsComponent, AppointmentsComponent },
  data() {
    return {
      doctors: [],
      loading: true,
      currentPatient: null,
    };
  },
  async mounted() {
    await this.getCurrentPatient();
    this.fetchDoctors();
  },
  methods: {
    async logout() {
      try {
        await signOutUser();
        this.$router.push("/login");
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
    async getCurrentPatient() {
      try {
        const user = auth.currentUser;
        if (user) {
          const patientDoc = await getDoc(doc(db, "patients", user.uid));
          if (patientDoc.exists()) {
            this.currentPatient = { id: user.uid, ...patientDoc.data() };
          }
        }
      } catch (error) {
        console.error("Error getting current patient:", error);
      }
    },
    async fetchDoctors() {
      try {
        const doctorsCollection = collection(db, "doctors");
        const doctorsSnapshot = await getDocs(doctorsCollection);
        const doctorsData = await Promise.all(
          doctorsSnapshot.docs.map(async (doctorDoc) => {
            const doctorData = { id: doctorDoc.id, ...doctorDoc.data() };
            // Fetch availability from doctorAvailability collection
            try {
              const availRef = doc(db, "doctorAvailability", doctorData.id);
              const availSnap = await getDoc(availRef);
              if (availSnap.exists()) {
                doctorData.availability = availSnap.data().availability;
              }
            } catch (error) {
              console.error("Error fetching availability for doctor", doctorData.id, error);
            }
            return doctorData;
          })
        );
        this.doctors = doctorsData;
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.btnBooking {
  padding: 8px 16px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  border: 1px solid #fff;
  color: #fff;
  transition: all 0.3s;
}
.btnBooking:hover {
  background: #fff;
  border-color: #101733;
  color: #101733;
}
</style>
