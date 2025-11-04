<template>
  <div class="login-container">
    <div v-if="user">
    <p>{{ $t("Signed_in_as") }}: {{ user.displayName || user.email }}</p>
<button @click="signOut" class="btn">{{ $t("Sign_out") }}</button>

    </div>
    <div v-else>
    <button @click="signIn" class="btn">
  {{ $t("Sign_in_with_Google") }}
</button>

    </div>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'AuthButton',
  data() {
    return {
      user: null,
      error: null,
      unsubscribe: null,
    }
  },
  mounted() {
    if (this.$auth && this.$auth.onAuthChange) {
      this.unsubscribe = this.$auth.onAuthChange((u) => {
        this.user = u
      })
    }
  },
  beforeUnmount() {
    if (this.unsubscribe) this.unsubscribe()
  },
  methods: {
    async signIn() {
      this.error = null
      try {
        await this.$auth.signInWithGoogle()
      } catch (err) {
        this.error = err.message || String(err)
      }
    },
    async signOut() {
      this.error = null
      try {
        await this.$auth.signOutUser()
      } catch (err) {
        this.error = err.message || String(err)
      }
    }
  }
}
</script>

<style scoped>
.login-container { padding: 1rem }
.btn { padding: 0.5rem 1rem; background:#1976d2; color:white; border:none; border-radius:4px }
.error { color: #c53030 }
</style>