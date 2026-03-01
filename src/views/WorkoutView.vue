<template>
  <div class="workout-page">
    <section v-if="!workoutId">
      <BaseCard>
        <h2>Тренировки</h2>
        <p class="subtitle">Создавайте, редактируйте и завершайте тренировки.</p>
        <BaseButton @click="startNew">Новая тренировка</BaseButton>
      </BaseCard>

      <section class="list-section">
        <h3>Последние</h3>
        <div v-if="store.workouts.length === 0" class="empty">Пока нет тренировок — создайте первую.</div>
        <div v-else class="workout-list">
          <WorkoutCard v-for="workoutCard in store.workouts.slice(0, 8)" :key="workoutCard.id" :workout="workoutCard" @open="open" />
        </div>
      </section>
    </section>

    <BaseCard v-else>
      <div class="header">
        <BaseInput v-model="workout.name" placeholder="Название тренировки (например: Ноги)" />
        <div class="meta">
          <small>{{ workout.date }}</small>
          <div class="actions">
            <BaseButton @click="saveDraft">Сохранить</BaseButton>
            <BaseButton @click="completeWorkout">Завершить</BaseButton>
          </div>
        </div>
      </div>

      <small v-if="workoutNameError" class="error">{{ workoutNameError }}</small>

      <div class="exercises">
        <ExerciseItem v-for="exercise in workout.exercises" :key="exercise.id" :exercise="exercise" />

        <div class="new-exercise-form">
          <BaseInput v-model="newExName" placeholder="Добавить упражнение" />
          <BaseButton @click="addExercise">Добавить упражнение</BaseButton>
        </div>
        <small v-if="exerciseNameError" class="error">{{ exerciseNameError }}</small>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseCard from '../components/ui/BaseCard.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import BaseInput from '../components/ui/BaseInput.vue'
import ExerciseItem from '../components/workout/ExerciseItem.vue'
import WorkoutCard from '../components/workout/WorkoutCard.vue'
import { useSettings } from '../composables/useSettings'
import { useWorkoutStore } from '../store/workoutStore'

function uid() {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

const route = useRoute()
const router = useRouter()
const store = useWorkoutStore()
const { defaultRestSec } = useSettings()

const workoutId = computed(() => route.params.id as string | undefined)
const workout = ref(store.createEmptyWorkout())
const newExName = ref('')
const workoutNameError = ref('')
const exerciseNameError = ref('')

function syncWorkout() {
  if (!workoutId.value) {
    workout.value = store.createEmptyWorkout()
    return
  }

  const existingWorkout = store.getWorkoutById(workoutId.value)
  if (!existingWorkout) {
    router.replace('/workouts')
    return
  }

  workout.value = structuredClone(existingWorkout)
}

onMounted(syncWorkout)
watch(workoutId, syncWorkout)

function startNew() {
  const emptyWorkout = store.createEmptyWorkout()
  store.addWorkout(emptyWorkout)
  router.push({ name: 'Workout', params: { id: emptyWorkout.id } })
}

function open(id: string) {
  router.push({ name: 'Workout', params: { id } })
}

function validateWorkoutName() {
  const workoutName = workout.value.name?.trim() ?? ''
  if (!workoutName) {
    workoutNameError.value = 'Введите название тренировки перед сохранением'
    return false
  }

  workout.value.name = workoutName
  workoutNameError.value = ''
  return true
}

function saveDraft() {
  if (!validateWorkoutName()) {
    return
  }

  workout.value.status = 'draft'
  workout.value.completedAt = undefined
  store.upsertWorkout(workout.value)
  router.push('/workouts')
}

function completeWorkout() {
  if (!validateWorkoutName()) {
    return
  }

  workout.value.status = 'completed'
  workout.value.completedAt = new Date().toISOString()
  store.upsertWorkout(workout.value)
  router.push('/diary')
}

function addExercise() {
  const exerciseName = newExName.value.trim()
  if (!exerciseName) {
    exerciseNameError.value = 'Название упражнения не может быть пустым'
    return
  }

  exerciseNameError.value = ''

  workout.value.exercises.push({
    id: uid(),
    name: exerciseName,
    sets: [],
    defaultRestSec: defaultRestSec.value,
  })

  newExName.value = ''
}
</script>

<style scoped>
.workout-page {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.subtitle {
  opacity: 0.75;
}

.list-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.workout-list {
  display: flex;
  flex-direction: column;
}

.empty {
  opacity: 0.75;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.exercises {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.new-exercise-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.error {
  color: #b91c1c;
}
</style>
