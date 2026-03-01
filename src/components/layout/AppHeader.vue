<template>
  <header class="app-header">
    <div class="left">
      <h1>Workout Journal</h1>
    </div>
    <div class="right">
      <button @click="$router.push('/profile')">⚙️</button>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
.app-header { display:flex; justify-content:space-between; align-items:center; padding:12px 16px; border-bottom:1px solid rgba(0,0,0,0.04) }
h1 { font-size:18px; margin:0 }
button { background:transparent; border:none; font-size:18px }
</style>