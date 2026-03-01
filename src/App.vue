<template>
  <div id="app" class="app-shell">
    <AppHeader />
    <main class="page-shell">
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

.page-shell {
  flex: 1;
  min-height: 0;
  width: min(100%, 480px);
  margin: 0 auto;
  padding: 16px 16px calc(96px + env(safe-area-inset-bottom, 0px));
}
</style>
