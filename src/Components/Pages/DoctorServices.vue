<template>
  <div :class="$i18n.locale === 'ar' ? 'lg:ml-0 , lg:mr-[302px]' : 'lg:ml-[302px]'" class="w-dwh">
    <main-nav />
    <div class="px-4 lg:pl-8 lg:pr-20 mt-8 flex flex-col gap-6 ">
      <!--Page top-->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <!--Titles-->
        <div class="title flex flex-col gap-4 ">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ $t("services") }}</h1>
          <p class="text-gray-500 dark:text-gray-400">{{ $t("track_services") }}</p>
        </div>

        <!--Button at top right-->
        <button
          type="button"
          @click="openServiceModal"
          :disabled="!isApproved || status === 'rejected'"
          :class="[
            'focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2',
            isApproved && status !== 'rejected'
              ? 'text-white bg-blue-600 hover:bg-blue-700 cursor-pointer'
              : 'text-white bg-gray-400 cursor-not-allowed',
          ]"
        >
          <!-- Plus Icon -->
          <svg
            class="w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>

          <!-- Text -->
          {{ $t("add_new_services") }}
        </button>
      </div>

      <div class="content flex gap-6 w-full flex-wrap ">
        <div
          v-for="service in services"
          :key="service.id"
          class="relative bg-white dark:bg-gray-800 rounded-xl p-4 flex flex-col gap-4 justify-between w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] overflow-hidden"
        >
          <!-- Top Row: Text left + Icons right -->
          <div class="flex justify-between items-start gap-6 ">
            <!-- Text -->
            <div class="flex flex-col gap-2">
              <h5 class="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                {{ service.name }}
              </h5>
              <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">
                {{ service.description }}
              </p>
              <!-- Sign up on Doxy.me for telemedicine services -->
              <div
                v-if="service.name.toLowerCase().includes('telemedicine')"
                class="mt-2 flex flex-col gap-2"
              >
                <a
                  href="https://doxy.me/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex w-fit items-center px-3 py-1 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition"
                >
                  {{ $t("sign_up_doxy") }}
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    ></path>
                  </svg>
                </a>
                <!-- Room link input + save -->
                <div class="flex items-center gap-2">
                  <input
                    v-model="service._roomLinkDraft"
                    type="url"
                    inputmode="url"
                    :placeholder="$t('add_room_link')"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    type="button"
                    @click="saveRoomLink(service)"
                    class="px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                  >
                    {{ $t("save") }}
                  </button>
                </div>
                <div
                  v-if="service.roomLink"
                  class="text-sm text-gray-600 dark:text-gray-300 break-all"
                >
                  Current room:
                  <a
                    :href="service.roomLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-blue-600 hover:underline"
                    >{{ service.roomLink }}</a
                  >
                </div>
              </div>
            </div>

            <!-- Icons -->
            <div class="flex flex-col gap-1">
              <button
                @click="editService(service)"
                class="w-6 h-6 bg-green-600 hover:bg-green-700 text-white rounded flex items-center justify-center transition"
                title="Edit service"
              >
                <svg
                  class="w-3.5 h-3.5 fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                >
                  <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                  <path
                    d="M535.6 85.7C513.7 63.8 478.3 63.8 456.4 85.7L432 110.1L529.9 208L554.3 183.6C576.2 161.7 576.2 126.3 554.3 104.4L535.6 85.7zM236.4 305.7C230.3 311.8 225.6 319.3 222.9 327.6L193.3 416.4C190.4 425 192.7 434.5 199.1 441C205.5 447.5 215 449.7 223.7 446.8L312.5 417.2C320.7 414.5 328.2 409.8 334.4 403.7L496 241.9L398.1 144L236.4 305.7zM160 128C107 128 64 171 64 224L64 480C64 533 107 576 160 576L416 576C469 576 512 533 512 480L512 384C512 366.3 497.7 352 480 352C462.3 352 448 366.3 448 384L448 480C448 497.7 433.7 512 416 512L160 512C142.3 512 128 497.7 128 480L128 224C128 206.3 142.3 192 160 192L256 192C273.7 192 288 177.7 288 160C288 142.3 273.7 128 256 128L160 128z"
                  />
                </svg>
              </button>
              <button
                @click="deleteService(service)"
                class="w-6 h-6 my-1 bg-red-600 hover:bg-red-700 text-white rounded flex items-center justify-center transition"
                title="Delete service"
              >
                <svg
                  class="w-3.5 h-3.5 fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                >
                  <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                  <path
                    d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Bottom Row: Price left + Toggle right -->
          <div class="flex items-center justify-between">
            <!-- Price -->
            <span class="text-lg font-semibold text-blue-600 dark:text-blue-400"
              >${{ service.price
              }}<span class="text-gray-500 dark:text-gray-400">/session</span></span
            >

            <!-- Toggle -->
            <label class="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                v-model="service.isActive"
                @change="toggleServiceStatus(service)"
                class="sr-only peer"
                :checked="service.isActive"
              />
              <div
                class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"
              ></div>
              <div class="ml-[10px] text-gray-900 dark:text-white">
                {{ service.isActive ? $t("active") : $t("inactive") }}
              </div>
            </label>
          </div>
        </div>

        <!-- Add Service Cards -->
        <div
          v-for="n in 6"
          :key="'add-' + n"
          @click="openServiceModal"
          :class="[
            'relative bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 flex flex-col gap-4 justify-center items-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]',
            isApproved && status !== 'rejected' ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
          ]"
        >
          <svg
            class="w-8 h-8 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">{{ $t("add_new_service") }}</p>
        </div>

        <!-- Service Modal -->
        <div
          v-if="showModal"
          class="fixed inset-0 bg-black/75 flex items-center justify-center z-50"
        >
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 z-100">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ isEditing ? $t("edit_service") : $t("create_new_service") }}
              </h3>
              <button
                @click="closeModal"
                class="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <form @submit.prevent="saveService" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{
                  $t("service_name")
                }}</label>
                <input
                  v-model="serviceForm.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  :placeholder="$t('service_name_placeholder')"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{
                  $t("description")
                }}</label>
                <textarea
                  v-model="serviceForm.description"
                  required
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  :placeholder="$t('description_placeholder')"
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{
                  $t("price_per_session")
                }}</label>
                <input
                  v-model.number="serviceForm.price"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  :placeholder="$t('price_placeholder')"
                />
              </div>

              <div class="flex items-center">
                <input
                  v-model="serviceForm.isActive"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                />
                <label class="ml-2 block text-sm text-gray-900 dark:text-white">{{
                  $t("active")
                }}</label>
              </div>

              <div class="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  @click="closeModal"
                  class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  {{ $t("cancel") }}
                </button>
                <button
                  type="submit"
                  :disabled="loading"
                  class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {{ loading ? $t("saving") : $t("save_service") }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from "../Layouts/MainNav.vue";
import { db, auth } from "../../authHandler.js";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";

export default {
  name: "DoctorServices",
  components: { MainNav },
  data() {
    return {
      services: [],
      showModal: false,
      isEditing: false,
      loading: false,
      currentServiceId: null,
      hasUnionCard: false,
      isApproved: false,
      status: "",
      toast: { type: "", message: "" },
      serviceForm: {
        name: "",
        description: "",
        price: 0,
        isActive: true,
      },
    };
  },
  async mounted() {
    await this.loadServices();
    await this.checkUnionCard();
    await this.checkApprovalStatus();
  },
  methods: {
    async loadServices() {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const servicesRef = collection(db, "doctors", user.uid, "services");
        const querySnapshot = await getDocs(servicesRef);

        this.services = querySnapshot.docs.map((doc) => {
          const data = { id: doc.id, ...doc.data() };
          // local draft field for room link input (not persisted)
          data._roomLinkDraft = data.roomLink || "";
          // local field for actions menu
          data.showActionsMenu = false;
          return data;
        });
      } catch (error) {
        console.error("Error loading services:", error);
      }
    },
    toggleActionsMenu(service) {
      // Close all other menus first
      this.services.forEach(s => {
        if (s.id !== service.id) {
          s.showActionsMenu = false;
        }
      });
      // Toggle the clicked menu
      service.showActionsMenu = !service.showActionsMenu;
    },
    async checkUnionCard() {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const docRef = doc(db, "doctors", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          this.hasUnionCard = !!data.unionMembershipCardUrl;
        } else {
          this.hasUnionCard = false;
        }
      } catch (error) {
        console.error("Error checking union card:", error);
        this.hasUnionCard = false;
      }
    },
    async checkApprovalStatus() {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const docRef = doc(db, "doctors", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          this.isApproved = data.approved === true;
          this.status = data.status || "";
        } else {
          this.isApproved = false;
          this.status = "";
        }
      } catch (error) {
        console.error("Error checking approval status:", error);
        this.isApproved = false;
        this.status = "";
      }
    },
    openServiceModal() {
      this.showModal = true;
      this.isEditing = false;
      this.serviceForm = {
        name: "",
        description: "",
        price: 0,
        isActive: true,
      };
    },
    closeModal() {
      this.showModal = false;
      this.isEditing = false;
      this.currentServiceId = null;
      this.serviceForm = {
        name: "",
        description: "",
        price: 0,
        isActive: true,
      };
    },
    editService(service) {
      this.showModal = true;
      this.isEditing = true;
      this.currentServiceId = service.id;
      this.serviceForm = {
        name: service.name,
        description: service.description,
        price: service.price,
        isActive: service.isActive,
      };
    },
    async saveRoomLink(service) {
      try {
        const user = auth.currentUser;
        if (!user) return;
        const link = (service._roomLinkDraft || "").trim();
        if (!link) {
          return;
        }
        // Basic validation: must be a URL and include doxy.me
        const urlPattern = /^(https?:\/\/)[^\s]+$/i;
        if (!urlPattern.test(link) || !link.includes("doxy.me")) {
          return;
        }
        const serviceDoc = doc(db, "doctors", user.uid, "services", service.id);
        await updateDoc(serviceDoc, { roomLink: link });
        service.roomLink = link;
        this.toast = { type: "success", message: this.$t("room_link_saved") };
      } catch (error) {
        console.error("Error saving room link:", error);
      }
    },
    async saveService() {
      try {
        this.loading = true;
        const user = auth.currentUser;
        if (!user) return;

        const serviceData = {
          name: this.serviceForm.name,
          description: this.serviceForm.description,
          price: this.serviceForm.price,
          isActive: this.serviceForm.isActive,
          createdAt: new Date(),
        };

        const servicesRef = collection(db, "doctors", user.uid, "services");

        if (this.isEditing && this.currentServiceId) {
          const serviceDoc = doc(servicesRef, this.currentServiceId);
          await updateDoc(serviceDoc, serviceData);
        } else {
          await addDoc(servicesRef, serviceData);
        }

        this.closeModal();
        await this.loadServices();
      } catch (error) {
        console.error("Error saving service:", error);
      } finally {
        this.loading = false;
      }
    },
    async toggleServiceStatus(service) {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const serviceDoc = doc(db, "doctors", user.uid, "services", service.id);
        await updateDoc(serviceDoc, { isActive: service.isActive });
      } catch (error) {
        console.error("Error toggling service status:", error);
        // Revert the change on error
        service.isActive = !service.isActive;
      }
    },
    async deleteService(service) {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const serviceDoc = doc(db, "doctors", user.uid, "services", service.id);
        await deleteDoc(serviceDoc);
        await this.loadServices();
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    },
  },
};
</script>

<style scoped></style>