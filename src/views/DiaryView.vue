<template>
  <div>
    <BaseCard>
      <h2>Дневник</h2>
      <p class="subtitle">Выберите дату и смотрите завершённые тренировки.</p>
      <input v-model="selectedDate" type="date" class="date-input" />
    </BaseCard>

    <section class="list-section">
      <h3>Тренировки за {{ selectedDate }}</h3>
      <div v-if="workoutsForDate.length === 0" class="empty">За эту дату тренировок нет.</div>
      <div v-else>
        <WorkoutCard v-for="w in workoutsForDate" :key="w.id" :workout="w" @open="openWorkout" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseCard from '../components/ui/BaseCard.vue'
import WorkoutCard from '../components/workout/WorkoutCard.vue'
import { useWorkoutStore } from '../store/workoutStore'
import { todayIso } from '../utils/date'

const store = useWorkoutStore()
const router = useRouter()
const selectedDate = ref(todayIso())

const workoutsForDate = computed(() =>
  store.workouts
    .filter(w => w.date === selectedDate.value)
    .sort((a, b) => (a.id < b.id ? 1 : -1))
)

function openWorkout(id: string) {
  router.push({ name: 'Workout', params: { id } })
}
</script>

<style scoped>
.subtitle {
  margin-bottom: 12px;
  opacity: 0.75;
}

.date-input {
  width: 100%;
  max-width: 260px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  font-size: 14px;
}

.list-section {
  margin-top: 12px;
}

.empty {
  opacity: 0.7;
}
</style>
