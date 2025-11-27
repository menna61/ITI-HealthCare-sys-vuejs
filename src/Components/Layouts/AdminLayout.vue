<template>
  <div :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'" class="flex w-full min-h-screen">
    <side-menu-admin :menuOpen="isMobileMenuOpen" @toggle="isMobileMenuOpen = !isMobileMenuOpen" />
    <div
      class="w-full transition-all duration-300"
      :class="$i18n.locale === 'ar' ? 'lg:mr-[302px]' : 'lg:ml-[302px]'"
    >
      <!-- Mobile top bar with icons -->
      <div class="lg:hidden p-4 flex items-center justify-end">
        <!-- Icons on mobile -->
        <div class="flex items-center gap-3">
          <!-- Notifications -->
          <div
            data-notification-button
            class="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-600 relative cursor-pointer"
            @click="toggleNotifications"
          >
            <svg
              class="w-5 h-5 fill-gray-500 dark:fill-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path
                d="M320 64C302.3 64 288 78.3 288 96L288 99.2C215 114 160 178.6 160 256L160 277.7C160 325.8 143.6 372.5 113.6 410.1L103.8 422.3C98.7 428.6 96 436.4 96 444.5C96 464.1 111.9 480 131.5 480L508.4 480C528 480 543.9 464.1 543.9 436.4 541.2 428.6 536.1 422.3L526.3 410.1C496.4 372.5 480 325.8 480 277.7L480 256C480 178.6 425 114 352 99.2L352 96C352 78.3 337.7 64 320 64zM258 528C265.1 555.6 290.2 576 320 576C349.8 576 374.9 555.6 382 528L258 528z"
              />
            </svg>
            <div
              v-if="unreadCount > 0"
              class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold"
            >
              {{ unreadCount }}
            </div>
          </div>

          <!-- Dark Mode Toggle -->
          <dark-mode-toggle />

          <!-- Language Dropdown -->
          <lang-drop />

          <!-- Profile -->
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-600 cursor-pointer"
          >
            <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>

        <!-- Notifications Popup -->
        <div
          v-if="showNotifications"
          data-notification-popup
          class="fixed top-20 right-4 w-64 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-[100000]"
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
          <ul v-else class="max-h-80 overflow-auto divide-y divide-gray-100 dark:divide-gray-600">
            <li
              v-for="notif in notifications"
              :key="notif.id"
              class="p-4 text-sm flex items-center gap-2"
              :class="notif.read ? '' : 'bg-blue-50 dark:bg-blue-900'"
            >
              <span class="block leading-tight text-gray-900 dark:text-white">{{
                notif.message
              }}</span>
              <span v-if="notif.type === 'approval'" class="ml-auto text-green-500 font-semibold"
                >Approved</span
              >
              <span v-if="!notif.read" class="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
            </li>
          </ul>
        </div>
      </div>

      <RouterView></RouterView>
    </div>
  </div>
</template>

<script>
import SideMenuAdmin from "../Pages/AdminFlow/SideMenuAdmin.vue";
import DarkModeToggle from "../DarkModeToggle.vue";
import LangDrop from "../LangDrop.vue";
import { db, auth } from "/src/authHandler.js";
import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default {
  name: "AdminLayout",
  components: { SideMenuAdmin, DarkModeToggle, LangDrop },
  data() {
    return {
      isMobileMenuOpen: false,
      showNotifications: false,
      notifications: [],
      unreadCount: 0,
      currentUser: null,
    };
  },
  mounted() {
    this.getCurrentUser();
    this.fetchNotifications();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.currentUser = { id: user.uid };
        this.fetchNotifications();
      } else {
        this.notifications = [];
        this.unreadCount = 0;
      }
    });
    // Close notifications when clicking outside
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    handleClickOutside(event) {
      // Check if click is outside notifications popup
      const notifButton = event.target.closest("[data-notification-button]");
      const notifPopup = event.target.closest("[data-notification-popup]");

      if (!notifButton && !notifPopup && this.showNotifications) {
        this.showNotifications = false;
      }
    },
    async toggleNotifications(event) {
      event.stopPropagation();
      this.showNotifications = !this.showNotifications;
      if (this.showNotifications) {
        await this.markNotificationsRead();
        this.fetchNotifications();
      }
    },
    async getCurrentUser() {
      try {
        const user = auth.currentUser;
        if (!user) return;
        const adminDoc = await getDoc(doc(db, "admin", user.uid));
        if (adminDoc.exists()) {
          this.currentUser = { id: user.uid, ...adminDoc.data() };
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
      let notifs = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((n) => n.recipientRole === "admin")
        .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

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
      const toMark = querySnapshot.docs.filter(
        (n) => n.data().recipientRole === "admin" && !n.data().read
      );
      if (toMark.length === 0) return;
      await Promise.all(
        toMark.map((docSnap) => updateDoc(doc(db, "notifications", docSnap.id), { read: true }))
      );
    },
  },
};
</script>

<style scoped></style>
