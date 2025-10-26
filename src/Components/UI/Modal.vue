<template>
  <teleport to="body">
    <transition name="modal-fade">
      <div v-if="modelValue" class="fixed inset-0 z-[99999] flex items-center justify-center">
        <div class="fixed inset-0 bg-black/50 z-[99998]" @click="close"></div>
        <div class="relative bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 p-4 z-[99999]">
          <header class="mb-2">
            <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
          </header>
          <section class="mb-4">
            <slot />
          </section>
          <footer class="flex justify-end gap-2">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: "UiModal",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue", "close"],
  methods: {
    close() {
      this.$emit("update:modelValue", false);
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>