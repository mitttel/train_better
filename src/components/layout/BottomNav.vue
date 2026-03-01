<template>
  <nav class="bottom-nav" aria-label="Нижняя навигация">
    <router-link to="/diary" class="nav-btn" active-class="router-link-exact-active">
      <span class="icon" aria-hidden="true">📔</span>
      <span>Дневник</span>
    </router-link>
    <router-link to="/workouts" class="nav-btn" active-class="router-link-exact-active">
      <span class="icon" aria-hidden="true">🏋️</span>
      <span>Тренировки</span>
    </router-link>
    <router-link to="/stats" class="nav-btn" active-class="router-link-exact-active">
      <span class="icon" aria-hidden="true">📈</span>
      <span>Статистика</span>
    </router-link>
    <router-link to="/profile" class="nav-btn" active-class="router-link-exact-active">
      <span class="icon" aria-hidden="true">👤</span>
      <span>Профиль</span>
    </router-link>
  </nav>
</template>

<script setup lang="ts"></script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: max(10px, env(safe-area-inset-bottom));
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-around;
  gap: 6px;
  background: var(--card);
  padding: 8px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.nav-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  font-weight: 700;
  font-size: 12px;
  padding: 6px 8px;
  border-radius: 10px;
  text-decoration: none;
  color: var(--text);
  min-width: 64px;
}

.icon {
  font-size: 16px;
  line-height: 1;
}

.nav-btn.router-link-exact-active {
  background: rgba(37, 99, 235, 0.12);
  color: var(--accent);
}

.nav-btn:active {
  transform: translateY(1px);
}
</style>
