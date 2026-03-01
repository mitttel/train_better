<template>
  <div>
    <h2>История</h2>

    <div v-if="!store.workouts.length">История пуста</div>
    <div v-else>
      <BaseInput v-model="query" placeholder="Поиск по тренировкам" />

      <div v-if="filteredWorkouts.length" style="margin-top:12px">
        <WorkoutCard v-for="w in filteredWorkouts" :key="w.id" :workout="w" @open="open" />
      </div>
      <div v-else style="margin-top:12px">Ничего не найдено</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '../components/ui/BaseInput.vue'
import WorkoutCard from '../components/workout/WorkoutCard.vue'
import { useWorkoutStore } from '../store/workoutStore'
import { containsByZ } from '../utils/zSearch'

const store = useWorkoutStore()
const router = useRouter()
const query = ref('')

const filteredWorkouts = computed(() => {
  if (!query.value.trim()) {
    return store.workouts
  }

  return store.workouts.filter((workout) => {
    if (containsByZ(workout.name ?? '', query.value)) {
      return true
    }

    if (containsByZ(workout.notes ?? '', query.value)) {
      return true
    }

    return workout.exercises.some((exercise) => containsByZ(exercise.name, query.value))
  })
})

function open(id: string) {
  router.push({ name: 'Workout', params: { id } })
}
</script>
