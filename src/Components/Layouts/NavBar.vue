<template>
  <div class="w-full bg-white dark:bg-gray-800">
    <nav class="w-full overflow-x-hidden">
      <div
        :class="isAuthPages ? 'cont' : 'mr-20 ml-8'"
        class="py-4 px-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0"
      >
        <div v-if="isAuthPages">
          <router-link to="/">
            <div class="left">
              <img src="../../assets/Group 1.svg" alt="" />
            </div>
          </router-link>
        </div>

        <!-- 🔍 Search Section -->
        <div v-if="!isAuthPages" class="search w-full lg:w-auto relative" ref="searchWrapper">
          <form class="w-full lg:w-96">
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
                ref="searchInput"
                @focus="updateDropdownRect"
                @input="updateDropdownRect"
                type="search"
                id="default-search"
                v-model="searchQuery"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                required
              />
            </div>
          </form>

          <!-- 🔽 Overlay Dropdown -->
          <teleport to="body">
            <div
              v-if="searchQuery && recommendations.length > 0"
              ref="dropdown"
              :style="dropdownStyle"
              class="absolute bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-[99999] mt-1"
            >
              <ul class="divide-y divide-gray-100 dark:divide-gray-600">
                <li
                  v-for="rec in recommendations"
                  :key="rec.path"
                  class="p-3 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                  @click="navigateTo(rec.fullPath)"
                >
                  <span class="text-sm text-gray-900 dark:text-white">{{ rec.name }}</span>
                  <span class="block text-xs text-gray-500 dark:text-gray-400">
                    {{ rec.fullPath }}
                  </span>
                </li>
              </ul>
            </div>
          </teleport>
        </div>

        <!-- 🔔 Notifications & User Section -->
        <div class="right flex flex-row flex-wrap gap-3 sm:gap-4 items-center">
          <div
            v-if="
              !isAuthPages &&
              (this.$route.path.startsWith('/dashboard') ||
                this.$route.path.startsWith('/patient') ||
                this.$route.path.startsWith('/admin'))
            "
            class="w-12 h-12 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-600 relative cursor-pointer"
            @click="toggleNotifications"
          >
            <svg
              class="w-6 h-6 fill-gray-500 dark:fill-gray-400 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path
                d="M320 64C302.3 64 288 78.3 288 96L288 99.2C215 114 160 178.6 160 256L160 277.7C160 325.8 143.6 372.5 113.6 410.1L103.8 422.3C98.7 428.6 96 436.4 96 444.5C96 464.1 111.9 480 131.5 480L508.4 480C528 480 543.9 464.1 543.9 436.4 541.2 428.6 536.1 422.3L526.3 410.1C496.4 372.5 480 325.8 480 277.7L480 256C480 178.6 425 114 352 99.2L352 96C352 78.3 337.7 64 320 64zM258 528C265.1 555.6 290.2 576 320 576C349.8 576 374.9 555.6 382 528L258 528z"
              />
            </svg>

            <!-- 🔴 Red dot for unread notifications -->
            <div
              v-if="unreadCount > 0"
              class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold z-50"
            >
              {{ unreadCount }}
            </div>

            <!-- 📜 Notifications popup -->
            <div
              v-if="showNotifications"
              class="fixed top-20 right-[284px] w-64 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-[100000] dark:text-white"
            >
              <div
                v-if="notifications.length === 0"
                class="flex flex-col items-center justify-center p-6 text-gray-500 dark:text-gray-400"
              >
                <svg
                  class="w-12 h-12 mb-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                >
                  <path
                    d="M320 64C302.3 64 288 78.3 288 96L288 99.2C215 114 160 178.6 160 256L160 277.7C160 325.8 143.6 372.5 113.6 410.1L103.8 422.3C98.7 428.6 96 436.4 96 444.5C96 464.1 111.9 480 131.5 480L508.4 480C528 480 543.9 464.1 543.9 436.4 541.2 428.6 536.1 422.3L526.3 410.1C496.4 372.5 480 325.8 480 277.7L480 256C480 178.6 425 114 352 99.2L352 96C352 78.3 337.7 64 320 64zM258 528C265.1 555.6 290.2 576 320 576C349.8 576 374.9 555.6 382 528L258 528z"
                  />
                </svg>
                <p class="text-center text-sm font-medium">No notifications yet</p>
              </div>
              <ul
                v-else
                class="max-h-80 overflow-auto divide-y divide-gray-100 dark:divide-gray-600"
              >
                <li
                  v-for="notif in notifications"
                  :key="notif.id"
                  class="p-4 text-sm flex items-center gap-2"
                  :class="notif.read ? '' : 'bg-blue-50 dark:bg-blue-900'"
                >
                  <span class="block leading-tight">{{ notif.message }}</span>
                  <span
                    v-if="notif.type === 'approval'"
                    class="ml-auto text-green-500 font-semibold"
                    >Approved</span
                  >
                  <span v-if="!notif.read" class="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                </li>
              </ul>
            </div>
          </div>

          <dark-mode-toggle />
          <lang-drop />

          <div
            v-if="!isAuthPages && this.$route.path.startsWith('/dashboard')"
            class="w-12 h-12 rounded-full flex items-center justify-center border border-gray-200 relative cursor-pointer"
          >
            <img
              @click="goToDocProfile"
              v-if="currentUser && currentUser.profileImageUrl"
              :src="currentUser.profileImageUrl"
              alt="Profile"
              class="w-full h-full rounded-full object-cover"
            />
            <svg v-else class="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>

          <div
            v-if="this.$route.path.startsWith('/patient')"
            class="w-12 h-12 rounded-full flex items-center justify-center border border-gray-200 relative cursor-pointer"
            @click="goToPatientProfile"
          >
            <svg class="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>

          <div v-if="isAuthPages">
            <router-link to="/signupcards" v-if="isLoginPage">
              <button
                class="h-12 rounded-lg border border-[#5271FF] px-10 text-[#5271FF] font-semibold cursor-pointer"
              >
                {{ $t("signup") }}
              </button>
            </router-link>
            <router-link to="/login" v-else>
              <button
                class="h-12 rounded-lg border border-[#5271FF] px-10 text-[#5271FF] font-semibold cursor-pointer"
              >
                {{ $t("login") }}
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import LangDrop from "../LangDrop.vue";
import DarkModeToggle from "../DarkModeToggle.vue";
import { db, auth } from "/src/authHandler.js";
import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default {
  name: "NavBar",
  components: { LangDrop, DarkModeToggle },
  data() {
    return {
      doctors: [],
      currentUser: null,
      currentUserRole: null,
      showNotifications: false,
      notifications: [],
      unreadCount: 0,
      searchQuery: "",
      dropdownRect: { left: 0, top: 0, width: 0 },
    };
  },
  mounted() {
    this.fetchDoctors();
    this.getCurrentUser().then(() => {
      this.fetchNotifications();
    });
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.currentUser = { id: user.uid };
        this.fetchNotifications();
      } else {
        this.notifications = [];
        this.unreadCount = 0;
      }
    });
    window.addEventListener("resize", this.updateDropdownRect);
    window.addEventListener("scroll", this.updateDropdownRect, true);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateDropdownRect);
    window.removeEventListener("scroll", this.updateDropdownRect, true);
  },
  methods: {
    async toggleNotifications() {
      this.showNotifications = !this.showNotifications;
      if (this.showNotifications) {
        await this.markNotificationsRead();
        this.fetchNotifications();
      }
    },
    goToDocProfile() {
      this.$router.push("/dashboard/profile");
    },
    goToPatientProfile() {
      this.$router.push("/patient/profile");
    },
    async fetchDoctors() {
      try {
        const doctorsCollection = collection(db, "doctors");
        const doctorsSnapshot = await getDocs(doctorsCollection);
        this.doctors = doctorsSnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    },
    async getCurrentUser() {
      try {
        const user = auth.currentUser;
        if (!user) return;
        const doctorDoc = await getDoc(doc(db, "doctors", user.uid));
        if (doctorDoc.exists()) {
          this.currentUser = { id: user.uid, ...doctorDoc.data() };
          this.currentUserRole = "doctor";
          return;
        }
        const patientDoc = await getDoc(doc(db, "patients", user.uid));
        if (patientDoc.exists()) {
          this.currentUser = { id: user.uid, ...patientDoc.data() };
          this.currentUserRole = "patient";
          return;
        }
        const adminDoc = await getDoc(doc(db, "admin", user.uid));
        if (adminDoc.exists()) {
          this.currentUser = { id: user.uid, ...adminDoc.data() };
          this.currentUserRole = "admin";
        }
      } catch (error) {
        console.error("Error getting current user:", error);
      }
    },
    async fetchNotifications() {
      const user = auth.currentUser;
      if (!user) {
        this.notifications = [];
        this.unreadCount = 0;
        return;
      }
      const querySnapshot = await getDocs(collection(db, "notifications"));
      let notifs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      if (this.currentUserRole === "doctor" || this.currentUserRole === "patient") {
        notifs = notifs
          .filter((n) => n.userId === user.uid)
          .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      } else if (this.currentUserRole === "admin") {
        notifs = notifs
          .filter((n) => n.recipientRole === "admin")
          .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      } else {
        this.notifications = [];
        this.unreadCount = 0;
        return;
      }
      // For doctors: hide any approval/test notifications until actually approved
      if (this.currentUserRole === "doctor") {
        const isApproved = this.currentUser?.approved === true;
        notifs = notifs.filter((n) => {
          // Ignore any notification without a defined type (e.g., old test entries)
          if (!n.type) return false;
          // Only show approval notifications after approval is true
          if (n.type === "approval" && !isApproved) return false;
          return true;
        });
      }
      const uniqueNotifs = notifs.filter(
        (notif, index, self) => index === self.findIndex((n) => n.message === notif.message)
      );
      this.notifications = uniqueNotifs;
      this.unreadCount = uniqueNotifs.filter((n) => !n.read).length;
    },
    async markNotificationsRead() {
      const user = auth.currentUser;
      if (!user) return;
      const querySnapshot = await getDocs(collection(db, "notifications"));
      let toMark = [];
      if (this.currentUserRole === "doctor" || this.currentUserRole === "patient") {
        toMark = querySnapshot.docs.filter((n) => n.data().userId === user.uid && !n.data().read);
      } else if (this.currentUserRole === "admin") {
        toMark = querySnapshot.docs.filter(
          (n) => n.data().recipientRole === "admin" && !n.data().read
        );
      }
      if (toMark.length === 0) return;
      await Promise.all(
        toMark.map((docSnap) => updateDoc(doc(db, "notifications", docSnap.id), { read: true }))
      );
    },
    updateDropdownRect() {
      this.$nextTick(() => {
        const input = this.$refs.searchInput;
        if (!input) return;
        const rect = input.getBoundingClientRect();
        const top = rect.bottom + window.scrollY + 8;
        this.dropdownRect = {
          left: rect.left + window.scrollX,
          top,
          width: rect.width,
        };
      });
    },
    navigateTo(path) {
      this.$router.push(path);
      this.searchQuery = "";
    },
  },
  computed: {
    dropdownStyle() {
      return {
        position: "absolute",
        left: `${this.dropdownRect.left}px`,
        top: `${this.dropdownRect.top}px`,
        width: `${this.dropdownRect.width}px`,
      };
    },
    isLoginPage() {
      return this.$route.path === "/login";
    },
    isAuthPages() {
      return [
        "/login",
        "/signupcards",
        "/patientSignup",
        "/doctorSignup",
        "/success",
        "/forgot-password",
      ].includes(this.$route.path);
    },
    recommendations() {
      if (!this.searchQuery) return [];
      const currentRoute = this.$route.matched.find(
        (route) => route.children && route.children.length > 0
      );
      if (!currentRoute || !currentRoute.children) return [];
      const basePath = currentRoute.path;
      return currentRoute.children
        .filter((child) => child.path.toLowerCase().includes(this.searchQuery.toLowerCase()))
        .map((child) => ({
          path: child.path,
          name: child.name || child.path.replace("/", "").replace("-", " ").toUpperCase(),
          fullPath: basePath + (child.path.startsWith("/") ? child.path : "/" + child.path),
        }));
    },
  },
};
</script>

<style scoped></style>
