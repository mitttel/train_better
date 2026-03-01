<template>
  <div id="app" class="app">
    <AppHeader />
    <main class="page">
      <router-view />
    </main>
    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue'
import BottomNav from './components/layout/BottomNav.vue'
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  color: var(--text);
}
.page {
  flex: 1;
  /* space for bottom nav */
  padding: 16px 16px 96px;
}
</style>