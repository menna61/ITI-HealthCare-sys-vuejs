<template>
  <div id="app">
    <h1>Auth demo</h1>
    <AuthButton />
  </div>
</template>


<script>
import AuthButton from './Components/AuthButton.vue'

export default {
  name: 'App',
  components: { AuthButton }
}
</script>


<style scoped>
#app { padding: 1.5rem; font-family: system-ui, -apple-system, 'Segoe UI', Roboto }
</style>
