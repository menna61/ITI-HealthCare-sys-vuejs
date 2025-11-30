<template>
  <div
    :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
    class="flex h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-950"
  >
    <!-- Sidebar for Chat History -->
    <div
      class="hidden md:flex md:w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl flex-col fixed top-[66px] h-full shadow-xl"
      :class="[
        isRTL ? 'right-0 border-l' : 'left-0 border-r',
        'border-gray-200/50 dark:border-gray-700/50',
      ]"
    >
      <div
        class="p-5 border-b border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between bg-gradient-to-r from-[var(--main-color-50)] to-transparent dark:from-gray-800"
      >
        <h2 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <svg
            class="w-5 h-5 text-[var(--main-color-500)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          {{ $t("conversations") }}
        </h2>
        <button
          @click="startNewChat"
          class="inline-flex items-center gap-2 bg-[var(--main-color-500)] text-white py-2.5 px-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path d="M12 5v14m-7-7h14" stroke-width="2" stroke-linecap="round" />
          </svg>
          <span class="text-sm">{{ $t("new_chat") }}</span>
        </button>
      </div>
      <div class="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        <div v-if="chatHistory.length === 0" class="text-center py-12">
          <svg
            class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">
            {{ $t("no_conversations_yet") }}
          </p>
          <p class="text-gray-400 dark:text-gray-500 text-xs mt-1">
            {{ $t("start_new_chat_to_begin") }}
          </p>
        </div>
        <div v-else>
          <div
            v-for="(chat, index) in chatHistory"
            :key="chat.id || index"
            class="relative group chat-item"
          >
            <button
              @click="loadChat(chat)"
              :class="[
                'w-full text-left p-4 rounded-2xl transition-all duration-200 border',
                currentChat.id === chat.id
                  ? 'bg-gradient-to-r from-[var(--main-color-100)] to-[var(--main-color-50)] dark:from-[var(--main-color-900)] dark:to-gray-700 border-[var(--main-color-300)] dark:border-[var(--main-color-700)] shadow-md'
                  : 'bg-gray-50/80 dark:bg-gray-700/60 hover:bg-white dark:hover:bg-gray-600 border-transparent hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-md',
              ]"
            >
              <p
                class="text-sm font-medium text-gray-900 dark:text-white truncate"
                :class="isRTL ? 'pl-8' : 'pr-8'"
              >
                {{
                  chat.messages && chat.messages[0] ? chat.messages[0].text : $t("new_chat_title")
                }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1.5 flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {{ formatDate(chat.createdAt) }}
              </p>
            </button>
            <button
              @click.stop="deleteChat(index)"
              class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-red-500 hover:bg-red-600 text-white rounded-lg p-1.5 hover:scale-110 shadow-lg"
              title="Delete chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                class="w-3.5 h-3.5"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Chat Area -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <div
        class="fixed w-full top-0 z-10 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-sm"
      >
        <div class="px-6 md:px-8 py-4 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <!-- Back Button -->
            <button
              @click="goBack"
              class="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 text-gray-700 dark:text-gray-300"
              :title="$t('Back')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                :class="isRTL ? 'rotate-180' : ''"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span class="hidden sm:inline font-medium">{{ $t("Back") }}</span>
            </button>
            <div class="relative">
              <img
                :src="aiIcon"
                alt="AI"
                class="w-10 h-10 rounded-xl shadow-md ring-2 ring-[var(--main-color-200)] dark:ring-[var(--main-color-800)]"
              />
              <span
                class="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-900"
                :class="isLoading ? 'bg-yellow-400 animate-pulse' : 'bg-emerald-500'"
              ></span>
            </div>
            <div>
              <h1
                class="text-base md:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2"
              >
                {{ $t("your_ai_assistant") }}
                <span
                  class="text-xs font-normal px-2 py-0.5 bg-[var(--main-color-100)] dark:bg-[var(--main-color-900)] text-[var(--main-color-700)] dark:text-[var(--main-color-300)] rounded-full"
                  >{{ $t("pro") }}</span
                >
              </h1>
              <div class="flex items-center gap-2 mt-0.5">
                <span class="text-xs text-gray-600 dark:text-gray-400 font-medium">{{
                  isLoading ? $t("thinking") : $t("ready_to_help")
                }}</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <!-- Language Switcher -->
            <lang-drop />
          </div>
        </div>
      </div>

      <div class="flex-1 flex">
        <!-- Chat Messages -->
        <div
          ref="messagesPane"
          class="flex-1 overflow-y-auto px-6 md:px-8 py-8 space-y-6 mt-[80px] custom-scrollbar"
          :class="isRTL ? 'mr-[320px] ml-[340px]' : 'ml-[320px] mr-[340px]'"
        >
          <!-- Empty state -->
          <div
            v-if="currentChat.messages.length === 0 && !isLoading"
            class="h-full w-full flex items-center justify-center"
          >
            <div class="text-center max-w-md animate-fade-in">
              <div class="relative inline-block">
                <img
                  :src="startImg"
                  alt="Start chatting"
                  class="mx-auto w-48 h-48 object-contain opacity-90 drop-shadow-2xl"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-[var(--main-color-100)] to-transparent opacity-30 rounded-full blur-3xl"
                ></div>
              </div>
              <h3 class="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                {{ $t("start_a_conversation") }}
              </h3>
              <p class="mt-3 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {{ $t("ask_anything_about_health") }}
              </p>
              <div class="mt-6 flex flex-wrap gap-2 justify-center">
                <span
                  class="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-700"
                  >💊 Prescriptions</span
                >
                <span
                  class="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-700"
                  >🩺 Diagnoses</span
                >
                <span
                  class="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-700"
                  >💬 Patient Care</span
                >
              </div>
            </div>
          </div>

          <!-- Messages list -->
          <div
            v-for="(message, index) in currentChat.messages"
            :key="index"
            class="flex items-end gap-4 message-item"
            :class="message.sender === 'user' ? 'justify-end' : 'justify-start'"
          >
            <img
              v-if="message.sender !== 'user'"
              :src="aiIcon"
              alt="AI"
              class="w-9 h-9 rounded-xl shadow-md border-2 border-white dark:border-gray-800 ring-2 ring-[var(--main-color-200)] dark:ring-[var(--main-color-800)]"
            />
            <div
              :class="[
                'max-w-[75%] md:max-w-[65%] rounded-2xl shadow-lg px-5 py-4 transition-all duration-200 hover:shadow-xl',
                message.sender === 'user'
                  ? 'bg-[var(--main-color-500)] text-white rounded-br-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 border border-gray-200/70 dark:border-gray-700/60 rounded-bl-sm',
              ]"
            >
              <p class="whitespace-pre-wrap leading-relaxed text-[15px]">{{ message.text }}</p>
              <span
                class="flex items-center gap-1 text-[11px] mt-2"
                :class="
                  message.sender === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                "
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {{ formatDate(message.createdAt || new Date()) }}
              </span>
            </div>
          </div>

          <!-- Typing indicator -->
          <div v-if="isLoading" class="flex items-end gap-4 justify-start message-item">
            <img
              :src="aiIcon"
              alt="AI"
              class="w-9 h-9 rounded-xl shadow-md border-2 border-white dark:border-gray-800 ring-2 ring-[var(--main-color-200)] dark:ring-[var(--main-color-800)]"
            />
            <div
              class="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 border border-gray-200/70 dark:border-gray-700/60 rounded-2xl rounded-bl-sm px-5 py-4 shadow-lg"
            >
              <div class="flex items-center gap-1.5">
                <span
                  class="w-2.5 h-2.5 bg-[var(--main-color-500)] dark:bg-[var(--main-color-400)] rounded-full animate-bounce"
                  style="animation-delay: 0ms"
                ></span>
                <span
                  class="w-2.5 h-2.5 bg-[var(--main-color-500)] dark:bg-[var(--main-color-400)] rounded-full animate-bounce"
                  style="animation-delay: 150ms"
                ></span>
                <span
                  class="w-2.5 h-2.5 bg-[var(--main-color-500)] dark:bg-[var(--main-color-400)] rounded-full animate-bounce"
                  style="animation-delay: 300ms"
                ></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Tools Panel -->
        <aside
          class="hidden xl:flex xl:w-80 flex-col bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-6 gap-4 fixed shadow-xl"
          :class="[
            isRTL ? 'left-0 border-r' : 'right-0 border-l',
            'border-gray-200/50 dark:border-gray-700/50',
          ]"
        >
          <div class="space-y-2">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <svg
                class="w-5 h-5 text-[var(--main-color-500)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
              AI Medical Tools
            </h3>
            <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              {{ $t("select_text_or_type") }}
            </p>
          </div>

          <div class="space-y-3">
            <button
              class="w-full text-left p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group"
              @click="runFeature('diagnose')"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <span class="text-xl">🩺</span>
                    {{ $t("diagnoses_and_tests") }}
                  </div>
                  <div class="text-xs text-gray-600 dark:text-gray-400 mt-1.5 leading-relaxed">
                    {{ $t("analyze_symptoms") }}
                  </div>
                </div>
                <div
                  class="text-xs font-mono text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded"
                >
                  Ctrl+2
                </div>
              </div>
            </button>

            <button
              class="w-full text-left p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group"
              @click="runFeature('interactions')"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <span class="text-xl">💊</span>
                    {{ $t("drug_interactions") }}
                  </div>
                  <div class="text-xs text-gray-600 dark:text-gray-400 mt-1.5 leading-relaxed">
                    {{ $t("check_dangerous_combinations") }}
                  </div>
                </div>
                <div
                  class="text-xs font-mono text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/40 px-2 py-1 rounded"
                >
                  Ctrl+3
                </div>
              </div>
            </button>

            <button
              @click="runPatientExplanation"
              class="w-full p-4 bg-[var(--main-color-500)] text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex items-center justify-between"
            >
              <span class="flex items-center gap-2">
                <span class="text-xl">🗣</span>
                {{ $t("explain_to_patient") }}
              </span>
              <span class="text-xs font-mono bg-white/20 px-2 py-1 rounded">Ctrl+E</span>
            </button>
          </div>

          <div class="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
            <div class="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <p class="flex items-center gap-2">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ $t("use_keyboard_shortcuts") }}
              </p>
            </div>
          </div>
        </aside>
      </div>

      <!-- Input Area -->
      <div
        class="border-t border-gray-200/50 dark:border-gray-800/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl"
        :class="isRTL ? 'mr-[320px]' : 'ml-[320px]'"
      >
        <div class="px-6 md:px-8 py-5">
          <div class="flex items-end gap-3">
            <textarea
              v-model="newMessage"
              @keyup.enter.exact.prevent="sendMessage"
              rows="1"
              placeholder="Type your message here..."
              class="flex-1 resize-none max-h-40 min-h-[56px] p-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-[var(--main-color-400)] focus:border-[var(--main-color-400)] transition-all duration-200 shadow-sm"
            />
            <button
              @click="sendMessage"
              :disabled="isLoading || !newMessage.trim()"
              class="inline-flex items-center justify-center gap-2 bg-[var(--main-color-500)] text-white px-6 py-4 rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-md font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path d="M3.4 20.4 22 12 3.4 3.6 3 10l12 2-12 2z" />
              </svg>
              <span class="hidden sm:inline">Send</span>
            </button>
          </div>
          <div class="mt-3 flex items-center justify-between text-xs">
            <span class="text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Press Enter to send
            </span>
            <span class="text-gray-400 dark:text-gray-500">Powered by Gemini AI</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
  GeminiChat.vue
  - In-browser Gemini calls (set API key in localStorage or window.__GEMINI_API_KEY__)
  - Features:
    * Prescription Formatter
    * Diagnosis Helper
    * Drug Interaction Checker
    * SOAP Generator
    * Explain to Patient
  - Auto-detect input: selection -> last patient message -> typed input
  - Shortcuts: Ctrl+1..4 for tools, Ctrl+E for Explain
  - IMPORTANT: For production, proxy requests through a backend to hide API key.
*/
import aiIcon from "../../assets/aiicon.svg";
import startImg from "../../assets/startnow.png";
import LangDrop from "../LangDrop.vue";

export default {
  name: "GeminiChat",
  components: {
    LangDrop,
  },
  data() {
    return {
      chatHistory: [],
      currentChat: {
        id: null,
        messages: [],
        createdAt: null,
      },
      newMessage: "",
      isLoading: false,
      aiIcon,
      startImg,
    };
  },
  computed: {
    isRTL() {
      return this.$i18n.locale === "ar";
    },
  },
  mounted() {
    this.loadChatHistory();
    this.startNewChat();
    window.addEventListener("keydown", this.handleShortcuts);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleShortcuts);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    startNewChat() {
      this.currentChat = {
        id: Date.now().toString(),
        messages: [],
        createdAt: new Date(),
      };
      this.newMessage = "";
    },

    /* ---------------- Standard chat flow ---------------- */
    async sendMessage() {
      if (!this.newMessage.trim()) return;

      this.currentChat.messages.push({
        sender: "user",
        text: this.newMessage.trim(),
        createdAt: new Date(),
      });

      this.newMessage = "";
      this.scrollToBottom();
      this.saveCurrentChat();

      this.isLoading = true;
      try {
        await this.getGeminiResponse();
      } catch (error) {
        console.error("Error getting Gemini response:", error);
        this.currentChat.messages.push({
          sender: "ai",
          text: "Sorry, I encountered an error. Please try again.",
          createdAt: new Date(),
        });
      } finally {
        this.isLoading = false;
        this.saveCurrentChat();
        this.scrollToBottom();
      }
    },

    async getGeminiResponse() {
      // Uses entire conversation as context
      const lastUserMessage = [...this.currentChat.messages]
        .reverse()
        .find((msg) => msg.sender === "user");

      if (!lastUserMessage) throw new Error("No user message found");

      const response = await fetch("/.netlify/functions/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: lastUserMessage.text }),
      });

      if (!response.ok) {
        const txt = await response.text();
        throw new Error(`API request failed with status ${response.status}: ${txt}`);
      }

      const data = await response.json();

      if (!data.response) throw new Error("Invalid response structure from Gemini API");

      this.currentChat.messages.push({ sender: "ai", text: data.response, createdAt: new Date() });
    },

    formatDate(date) {
      try {
        const d = new Date(date);
        return (
          d.toLocaleDateString() +
          " " +
          d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        );
      } catch {
        return "";
      }
    },

    loadChat(chat) {
      this.currentChat = { ...chat };
      this.scrollToBottom();
    },

    deleteChat(index) {
      const chatToDelete = this.chatHistory[index];
      this.chatHistory.splice(index, 1);
      localStorage.setItem("geminiChatHistory", JSON.stringify(this.chatHistory));
      if (this.currentChat.id === chatToDelete.id) {
        this.startNewChat();
      }
    },

    saveCurrentChat() {
      const existingIndex = this.chatHistory.findIndex((c) => c.id === this.currentChat.id);
      if (existingIndex >= 0) {
        this.chatHistory[existingIndex] = { ...this.currentChat };
      } else {
        this.chatHistory.push({ ...this.currentChat });
      }
      localStorage.setItem("geminiChatHistory", JSON.stringify(this.chatHistory));
    },

    loadChatHistory() {
      const history = localStorage.getItem("geminiChatHistory");
      if (history) {
        try {
          this.chatHistory = JSON.parse(history).map((chat) => ({
            ...chat,
            createdAt: new Date(chat.createdAt),
            messages: (chat.messages || []).map((m) => ({
              ...m,
              createdAt: m.createdAt ? new Date(m.createdAt) : new Date(),
            })),
          }));
        } catch (e) {
          console.warn("Failed to parse chat history", e);
          this.chatHistory = [];
        }
      }
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const pane = this.$refs.messagesPane;
        if (pane) pane.scrollTop = pane.scrollHeight + 300;
      });
    },

    /* ---------------- Input selection resolution ---------------- */
    getRelevantText() {
      // 1. Explicit selection
      const selection = window.getSelection ? window.getSelection().toString().trim() : "";
      if (selection) return selection;

      // 2. Last patient message (non-AI, non-system). We treat 'user' as patient here.
      const lastPatient = [...this.currentChat.messages].reverse().find((m) => m.sender === "user");
      if (lastPatient && lastPatient.text) return lastPatient.text;

      // 3. Typed input (not yet sent)
      if (this.newMessage && this.newMessage.trim()) return this.newMessage.trim();

      return "";
    },

    /* ------------------- Medical Tools Integration ------------------- */
    async runFeature(feature) {
      const text = this.getRelevantText();
      if (!text) {
        alert("Please select text in the chat, or type a message to use with the tool.");
        return;
      }

      // push a small assistant message to show tool running
      const runningLabel = `${this.humanFeatureName(feature)}: Running...`;
      this.currentChat.messages.push({ sender: "ai", text: runningLabel, createdAt: new Date() });
      this.isLoading = true;
      this.saveCurrentChat();
      this.scrollToBottom();

      try {
        const prompt = this.buildPrompt(feature, text);
        const aiText = await this.callGeminiWithPrompt(prompt);

        // remove running label
        const lastIndex = this.currentChat.messages.map((m) => m.text).lastIndexOf(runningLabel);
        if (lastIndex >= 0) this.currentChat.messages.splice(lastIndex, 1);

        // push actual result
        this.currentChat.messages.push({ sender: "ai", text: aiText, createdAt: new Date() });
      } catch (err) {
        console.error(err);
        // replace running label with error
        const lastIndex = this.currentChat.messages
          .map((m) => m.text)
          .lastIndexOf(`${this.humanFeatureName(feature)}: Running...`);
        if (lastIndex >= 0) this.currentChat.messages.splice(lastIndex, 1);
        this.currentChat.messages.push({
          sender: "ai",
          text: `Error running ${this.humanFeatureName(feature)}: ${err.message}`,
          createdAt: new Date(),
        });
      } finally {
        this.isLoading = false;
        this.saveCurrentChat();
        this.scrollToBottom();
      }
    },

    humanFeatureName(feature) {
      switch (feature) {
        case "prescription":
          return "Prescription Formatter";
        case "diagnose":
          return "Diagnosis Helper";
        case "interactions":
          return "Drug Interaction Checker";
        case "soap":
          return "SOAP Generator";
        default:
          return "Tool";
      }
    },

    buildPrompt(feature, text) {
      switch (feature) {
        case "prescription":
          return `You are a clinical assistant. Convert the following doctor's rough notes into a clear professional prescription. Use bullet points under "Prescription:" and short safety "Notes:". Do NOT give diagnostic or legal statements.

Notes:
${text}

Return a neat, human-readable prescription suitable for printing.`;
        case "diagnose":
          return `You are a clinical decision support assistant. Based on the symptoms below, list up to 5 possible conditions with a likelihood (High/Medium/Low) and 1-2 short reasons each. Then list recommended immediate tests and next steps. Return plain text.

Symptoms:
${text}

Include red flags that require urgent care.`;
        case "interactions":
          return `You are a drug interaction checker. Given the following list of medicines (with doses if provided), identify clinically relevant interactions, their significance (Minor/Moderate/Severe), and monitoring or action recommendations. Return plain text.

Medicines:
${text}

If no interactions found, say "No clinically significant interactions identified."`;
        case "soap":
          return `You are a clinical scribe. Convert the following raw notes into a concise SOAP note with sections: S:, O:, A:, P:. If information is missing, keep sections short.

Raw notes:
${text}

Return plain text with clear S/O/A/P headings.`;
        default:
          return null;
      }
    },

    /* ------------------- Explain to Patient Feature ------------------- */
    async runPatientExplanation() {
      const text = this.getRelevantText();
      if (!text) {
        alert("Select text (diagnosis/prescription/notes) or ensure there is a patient message.");
        return;
      }

      const runningLabel = `Explain to Patient: Running...`;
      this.currentChat.messages.push({ sender: "ai", text: runningLabel, createdAt: new Date() });
      this.isLoading = true;
      this.saveCurrentChat();
      this.scrollToBottom();

      try {
        const prompt = `
Explain the following medical information in clear, simple language for a patient. Use short sentences, avoid jargon, be kind and reassuring. If treatment is mentioned, explain why and how to take it.

Text:
${text}
`;
        const aiText = await this.callGeminiWithPrompt(prompt);

        // remove running label
        const lastIndex = this.currentChat.messages.map((m) => m.text).lastIndexOf(runningLabel);
        if (lastIndex >= 0) this.currentChat.messages.splice(lastIndex, 1);

        // push explanation as AI message
        this.currentChat.messages.push({ sender: "ai", text: aiText, createdAt: new Date() });
      } catch (err) {
        console.error(err);
        const lastIndex = this.currentChat.messages.map((m) => m.text).lastIndexOf(runningLabel);
        if (lastIndex >= 0) this.currentChat.messages.splice(lastIndex, 1);
        this.currentChat.messages.push({
          sender: "ai",
          text: `Error explaining to patient: ${err.message}`,
          createdAt: new Date(),
        });
      } finally {
        this.isLoading = false;
        this.saveCurrentChat();
        this.scrollToBottom();
      }
    },

    /* ------------------- Gemini call helper ------------------- */
    async callGeminiWithPrompt(promptText) {
      const resp = await fetch("/.netlify/functions/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: promptText }),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Gemini API error ${resp.status}: ${errText}`);
      }

      const data = await resp.json();

      if (!data.response) throw new Error("Invalid response from Gemini API");
      return data.response;
    },

    /* ------------------- Keyboard shortcuts ------------------- */
    handleShortcuts(e) {
      // Ctrl+1..4 -> tools, Ctrl+E -> explain
      if (e.ctrlKey && e.key === "1") {
        e.preventDefault();
        this.runFeature("prescription");
      }
      if (e.ctrlKey && e.key === "2") {
        e.preventDefault();
        this.runFeature("diagnose");
      }
      if (e.ctrlKey && e.key === "3") {
        e.preventDefault();
        this.runFeature("interactions");
      }
      if (e.ctrlKey && e.key === "4") {
        e.preventDefault();
        this.runFeature("soap");
      }
      if (e.ctrlKey && (e.key === "e" || e.key === "E")) {
        e.preventDefault();
        this.runPatientExplanation();
      }
    },
  },
};
</script>

<style scoped>
/* Custom scrollbar styling */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.3);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.5);
}

/* Dark mode scrollbar */
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(75, 85, 99, 0.5);
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(75, 85, 99, 0.7);
}

/* Animations */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

.message-item {
  animation: fade-in 0.3s ease-out;
}

.chat-item {
  animation: fade-in 0.2s ease-out;
}

/* Smooth transitions */
* {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
