<template>
  <div class="exercise">
    <div class="title">
      <strong>{{ exercise.name }}</strong>
      <small v-if="exercise.notes">{{ exercise.notes }}</small>
    </div>
    <div class="sets">
      <SetRow v-for="(s, idx) in exercise.sets" :key="s.id" :set="s" :index="idx + 1" />
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
.title { display:flex; justify-content:space-between; align-items:center; gap:8px; }
.sets { margin-top:6px; display:flex; gap:8px; flex-wrap:wrap; }
</style>
