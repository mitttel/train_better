<template>
  <div id="app" class="app-shell">
    <AppHeader class="app-shell__header" />

    <main class="app-shell__content">
      <router-view />
    </main>

    <BottomNav class="app-shell__nav" />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue'
import BottomNav from './components/layout/BottomNav.vue'
</script>

<style scoped>
.app-shell {
  min-height: 100dvh;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  background: var(--bg);
  color: var(--text);
}

.app-shell__content {
  min-height: 0;
  overflow-y: auto;
  padding: 16px;
  padding-bottom: calc(var(--bottom-nav-height) + env(safe-area-inset-bottom, 0px) + 20px);
}
</style>
