<template>
  <div
    class="flex h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950"
  >
    <!-- Sidebar for Chat History -->
    <div
      class="hidden md:flex md:w-1/4 bg-white/80 dark:bg-gray-800/80 backdrop-blur border-r border-gray-200 dark:border-gray-700 flex-col"
    >
      <div
        class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between"
      >
        <h2 class="text-base font-semibold text-gray-900 dark:text-white">Conversations</h2>
        <button
          @click="startNewChat"
          class="inline-flex items-center gap-2 bg-[var(--main-color-500)] text-white py-2 px-3 rounded-lg hover:bg-[var(--main-color-600)] transition-colors"
        >
          <span class="text-sm">New</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-4 h-4"
          >
            <path
              d="M12 5v14m-7-7h14"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>
      <div class="flex-1 overflow-y-auto p-4 space-y-2">
        <div v-if="chatHistory.length === 0" class="text-gray-500 dark:text-gray-400 text-sm">
          No previous chats
        </div>
        <div v-else>
          <div v-for="(chat, index) in chatHistory" :key="index" class="relative group">
            <button
              @click="loadChat(chat)"
              class="w-full text-left p-3 bg-gray-50/80 dark:bg-gray-700/60 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl transition-colors"
            >
              <p class="text-sm text-gray-900 dark:text-white truncate">
                {{ chat.messages && chat.messages[0] ? chat.messages[0].text : "New Chat" }}
              </p>
              <p class="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                {{ formatDate(chat.createdAt) }}
              </p>
            </button>
            <button
              @click.stop="deleteChat(index)"
              class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
              title="Delete chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-4 h-4"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  stroke="currentColor"
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
        class="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 backdrop-blur"
      >
        <div class="px-4 md:px-6 py-3 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <img :src="aiIcon" alt="AI" class="w-8 h-8 rounded" />
            <div>
              <h1 class="text-sm md:text-base font-semibold text-gray-900 dark:text-white">
                Your AI assistant
              </h1>
              <div class="flex items-center gap-2">
                <span
                  class="inline-flex h-2 w-2 rounded-full"
                  :class="isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-emerald-500'"
                ></span>
                <span class="text-[11px] text-gray-500 dark:text-gray-400">{{
                  isLoading ? "Thinking..." : "Online"
                }}</span>
              </div>
            </div>
          </div>
          <button
            class="md:hidden inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            @click="startNewChat"
          >
            New Chat
          </button>
        </div>
      </div>

      <!-- Chat Messages -->
      <div class="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-4">
        <!-- Empty state -->
        <div
          v-if="currentChat.messages.length === 0 && !isLoading"
          class="h-full w-full flex items-center justify-center"
        >
          <div class="text-center">
            <img
              :src="startImg"
              alt="Start chatting"
              class="mx-auto w-40 h-40 object-contain opacity-90"
            />
            <h3 class="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
              Start a conversation
            </h3>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Ask anything about health, appointments, or general queries.
            </p>
          </div>
        </div>

        <!-- Messages list -->
        <div
          v-for="(message, index) in currentChat.messages"
          :key="index"
          class="flex items-end gap-3"
          :class="message.sender === 'user' ? 'justify-end' : 'justify-start'"
        >
          <!-- Avatar -->
          <img
            v-if="message.sender !== 'user'"
            :src="aiIcon"
            alt="AI"
            class="w-8 h-8 rounded-md shadow-sm border border-gray-200 dark:border-gray-700"
          />
          <div
            :class="[
              'max-w-[80%] md:max-w-[70%] rounded-2xl shadow-sm px-4 py-3',
              message.sender === 'user'
                ? 'bg-[var(--main-color-500)] text-white rounded-br-md'
                : 'bg-white/90 dark:bg-gray-800/80 text-gray-900 dark:text-gray-50 border border-gray-200/70 dark:border-gray-700/60 rounded-bl-md',
            ]"
          >
            <p class="whitespace-pre-wrap leading-relaxed">{{ message.text }}</p>
            <span class="block text-[11px] mt-1 opacity-70">{{
              formatDate(message.createdAt || new Date())
            }}</span>
          </div>
        </div>

        <!-- Typing indicator -->
        <div v-if="isLoading" class="flex items-end gap-3 justify-start">
          <img
            :src="aiIcon"
            alt="AI"
            class="w-8 h-8 rounded-md shadow-sm border border-gray-200 dark:border-gray-700"
          />
          <div
            class="bg-white/90 dark:bg-gray-800/80 text-gray-900 dark:text-gray-50 border border-gray-200/70 dark:border-gray-700/60 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm"
          >
            <div class="flex items-center gap-1">
              <span
                class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style="animation-delay: 0ms"
              ></span>
              <span
                class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style="animation-delay: 150ms"
              ></span>
              <span
                class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style="animation-delay: 300ms"
              ></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div
        class="border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 backdrop-blur"
      >
        <div class="px-4 md:px-6 py-4">
          <div class="flex items-end gap-2">
            <textarea
              v-model="newMessage"
              @keyup.enter.exact.prevent="sendMessage"
              rows="1"
              placeholder="Type your message..."
              class="flex-1 resize-none max-h-40 min-h-[48px] p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--main-color-500)] focus:border-transparent"
            />
            <button
              @click="sendMessage"
              :disabled="isLoading || !newMessage.trim()"
              class="inline-flex items-center justify-center gap-2 bg-[var(--main-color-500)] text-white px-5 py-3 rounded-xl hover:bg-[var(--main-color-600)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
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
          <div class="mt-2 text-[11px] text-gray-500 dark:text-gray-400">Press Enter to send</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import aiIcon from "../../assets/aiicon.svg";
import startImg from "../../assets/startnow.png";

export default {
  name: "GeminiChat",
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
  mounted() {
    this.loadChatHistory();
    this.startNewChat();
  },
  methods: {
    startNewChat() {
      this.currentChat = {
        id: Date.now().toString(),
        messages: [],
        createdAt: new Date(),
      };
      this.newMessage = "";
    },
    async sendMessage() {
      if (!this.newMessage.trim()) return;

      this.currentChat.messages.push({
        sender: "user",
        text: this.newMessage.trim(),
        createdAt: new Date(),
      });

      this.newMessage = "";
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
      }
    },
    loadChat(chat) {
      this.currentChat = { ...chat };
    },
    saveCurrentChat() {
      const existingIndex = this.chatHistory.findIndex((chat) => chat.id === this.currentChat.id);
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
        this.chatHistory = JSON.parse(history).map((chat) => ({
          ...chat,
          createdAt: new Date(chat.createdAt),
          messages: (chat.messages || []).map((m) => ({
            ...m,
            createdAt: m.createdAt ? new Date(m.createdAt) : new Date(),
          })),
        }));
      }
    },
    async getGeminiResponse() {
      const apiUrl =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyAwD5bS77vogG-DqDltTYv5tnpq_fFqWRE";

      const contents = this.currentChat.messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

      const requestBody = { contents };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0]
      ) {
        const aiText = data.candidates[0].content.parts[0].text;
        this.currentChat.messages.push({
          sender: "ai",
          text: aiText,
          createdAt: new Date(),
        });
      } else {
        throw new Error("Invalid response structure from Gemini API");
      }
    },
    formatDate(date) {
      return (
        date.toLocaleDateString() +
        " " +
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    },
    deleteChat(index) {
      const chatToDelete = this.chatHistory[index];
      this.chatHistory.splice(index, 1);
      localStorage.setItem("geminiChatHistory", JSON.stringify(this.chatHistory));
      if (this.currentChat.id === chatToDelete.id) {
        this.startNewChat();
      }
    },
  },
};
</script>

<style scoped>
/* Additional styles if needed */
/* Hide scrollbar but keep scroll functionality on WebKit */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
