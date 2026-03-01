<template>
  <div>
    <BaseCard>
      <div class="today">
        <h2>Сегодня</h2>
        <p>{{ today }}</p>
        <BaseButton @click="startToday">Начать тренировку</BaseButton>
      </div>
    </BaseCard>

    <section style="margin-top:12px">
      <h3>Последние тренировки</h3>
      <div v-if="store.workouts.length === 0">Пока нет тренировок — начните сегодня.</div>
      <div v-else>
        <WorkoutCard v-for="w in store.workouts.slice(0,5)" :key="w.id" :workout="w" @open="open" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import BaseCard from '../components/ui/BaseCard.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import WorkoutCard from '../components/workout/WorkoutCard.vue'
import { useWorkoutStore } from '../store/workoutStore'
import { formatHuman, todayIso } from '../utils/date'
import { useRouter } from 'vue-router'

const store = useWorkoutStore()
const router = useRouter()
const today = formatHuman(todayIso())

function startToday() {
  const empty = store.createEmptyWorkout()
  store.addWorkout(empty)
  router.push({ name: 'Workout', params: { id: empty.id } })
}

function open(id: string) {
  router.push({ name: 'Workout', params: { id } })
}
</script>