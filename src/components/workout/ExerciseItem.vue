<template>
  <div class="exercise">
    <div class="title">
      <strong>{{ exercise.name }}</strong>
      <small v-if="exercise.notes">{{ exercise.notes }}</small>
    </div>
    <div class="sets">
      <SetRow v-for="s in exercise.sets" :key="s.id" :set="s" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Exercise } from '../../types/exercise'
import SetRow from './SetRow.vue'
const props = defineProps<{ exercise: Exercise }>()
</script>

<style scoped>
.exercise { margin-bottom:10px; }
.title {
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  gap:4px;
}
.sets {
  margin-top:6px;
  display:flex;
  flex-direction:column;
  gap:8px;
}
</style>
