<template>
  <div id="app" class="app-shell">
    <AppHeader />
    <main class="page-content">
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
.app-shell {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  color: var(--text);
}

.page-content {
  flex: 1;
  width: min(100%, 480px);
  margin: 0 auto;
  padding: 16px;
  padding-bottom: calc(88px + env(safe-area-inset-bottom));
  overflow-x: hidden;
}
</style>
