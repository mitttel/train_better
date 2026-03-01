<template>
  <div id="app" class="app-shell">
    <AppHeader />
    <main class="app-content">
      <section class="page-container">
        <router-view />
      </section>
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
  height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--bg);
  color: var(--text);
}

.app-content {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 16px;
  padding-bottom: calc(92px + env(safe-area-inset-bottom));
}

.page-container {
  width: min(100%, 480px);
  margin: 0 auto;
}
</style>
