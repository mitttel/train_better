<template>
  <div>
    <h2>Настройки</h2>
    <div style="margin-top:12px">
      <label><input type="checkbox" v-model="useKg" /> Использовать кг (иначе — lb)</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const useKg = ref(true)
</script>