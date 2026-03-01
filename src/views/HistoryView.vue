<template>
  <div>
    <h2>История</h2>
    <div v-if="!store.workouts.length">История пуста</div>
    <div v-else>
      <WorkoutCard v-for="w in store.workouts" :key="w.id" :workout="w" @open="open" />
    </div>
  </div>
</template>

<script setup lang="ts">
import WorkoutCard from '../components/workout/WorkoutCard.vue'
import { useWorkoutStore } from '../store/workoutStore'
import { useRouter } from 'vue-router'

const store = useWorkoutStore()
const router = useRouter()

function open(id: string) {
  router.push({ name: 'Workout', params: { id } })
}
</script>