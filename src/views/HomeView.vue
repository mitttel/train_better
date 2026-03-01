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
        <BaseInput v-model="quickQuery" placeholder="Быстрый поиск" />

        <div v-if="quickFilteredWorkouts.length" style="margin-top:8px">
          <WorkoutCard v-for="w in quickFilteredWorkouts" :key="w.id" :workout="w" @open="open" />
        </div>
        <div v-else style="margin-top:8px">Ничего не найдено</div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import WorkoutCard from '../components/workout/WorkoutCard.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import BaseCard from '../components/ui/BaseCard.vue'
import BaseInput from '../components/ui/BaseInput.vue'
import { useWorkoutStore } from '../store/workoutStore'
import { formatHuman, todayIso } from '../utils/date'
import { containsByZ } from '../utils/zSearch'

const store = useWorkoutStore()
const router = useRouter()
const today = formatHuman(todayIso())
const quickQuery = ref('')

const quickFilteredWorkouts = computed(() => {
  const recent = store.workouts.slice(0, 5)

  if (!quickQuery.value.trim()) {
    return recent
  }

  return recent.filter((workout) => {
    if (containsByZ(workout.name ?? '', quickQuery.value)) {
      return true
    }

    if (containsByZ(workout.notes ?? '', quickQuery.value)) {
      return true
    }

    return workout.exercises.some((exercise) => containsByZ(exercise.name, quickQuery.value))
  })
})

function startToday() {
  const empty = store.createEmptyWorkout()
  store.addWorkout(empty)
  router.push({ name: 'Workout', params: { id: empty.id } })
}

function open(id: string) {
  router.push({ name: 'Workout', params: { id } })
}
</script>
