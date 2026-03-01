<template>
  <div class="workout-card">
    <div class="head">
      <div>
        <h3>{{ workout.name || formatHuman(workout.date) }}</h3>
        <small>{{ workout.exercises.length }} упражнений</small>
      </div>
      <div>
        <button class="open-btn" @click="$emit('open', workout.id)">Открыть</button>
      </div>
    </div>

    <div v-if="workout.exercises.length" class="ex-list">
      <div v-for="ex in workout.exercises" :key="ex.id" class="ex-row">
        <strong>{{ ex.name }}</strong>
        <small>{{ ex.sets.length }} подходов</small>
      </div>
    </div>

    <div v-else class="empty">
      <small>Нет упражнений в этой тренировке</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Workout } from '../../types/workout'
import { formatHuman } from '../../utils/date'

const props = defineProps<{ workout: Workout }>()
const emit = defineEmits(['open'])
const workout = props.workout
// больше никаких повторных объявлений formatHuman
</script>

<style scoped>
.workout-card { padding:10px 0; border-bottom:1px dashed rgba(0,0,0,0.06) }
.head { display:flex; justify-content:space-between; align-items:center; gap:10px }
.ex-list { margin-top:8px; display:flex; flex-direction:column; gap:8px; }
.ex-row { display:flex; justify-content:space-between; color:var(--muted) }
.open-btn {
  padding:6px 10px;
  border-radius:10px;
  background:var(--accent);
  color:#fff;
  border:none;
  cursor:pointer;
}
.open-btn:active { transform:translateY(1px); }
.empty { margin-top:8px; color:var(--muted) }
</style>