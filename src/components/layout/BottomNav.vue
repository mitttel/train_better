<template>
  <nav class="bottom-nav">
    <router-link to="/" class="nav-btn">Home</router-link>
    <router-link to="/history" class="nav-btn">History</router-link>
    <router-link to="/stats" class="nav-btn">Stats</router-link>
    <router-link to="/settings" class="nav-btn">More</router-link>
  </nav>
</template>

<script setup lang="ts"></script>

<style scoped>
.bottom-nav{
  position: fixed;
  bottom: 10px;
  left: 10px;
  right: 10px;
  display:flex;
  justify-content:space-around;
  background: var(--card);
  padding:8px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}
.nav-btn {
  font-weight:700;
  padding:6px 8px;
  border-radius:10px;
  text-decoration:none;
  color:var(--text);
}
.nav-btn.router-link-active {
  background: rgba(37,99,235,0.12);
}
.nav-btn:active { transform:translateY(1px); }
</style>