<template>
  <div>
    <h2>Статистика</h2>
    <div class="stats-grid">
      <div class="stat-card">
        <h3>{{ total }}</h3>
        <p>Всего тренировок</p>
      </div>
      <div class="stat-card">
        <h3>{{ avg }}</h3>
        <p>В неделю (в среднем)</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWorkoutStore } from '../store/workoutStore'
import { countWorkouts, avgWorkoutsPerWeek } from '../services/statsService'

const store = useWorkoutStore()
const total = computed(() => countWorkouts(store.workouts))
const avg = computed(() => avgWorkoutsPerWeek(store.workouts))
</script>

<style scoped>
.stats-grid { display:flex; gap:12px; margin-top:12px }
.stat-card { padding:12px; background:var(--card); border-radius:12px; flex:1; text-align:center }
</style>