<template>
  <div class="card"><slot /></div>
</template>
<script setup lang="ts"></script>

<style scoped>
.card {
  background: var(--card);
  padding: 12px;
  border-radius: 14px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}
</style>