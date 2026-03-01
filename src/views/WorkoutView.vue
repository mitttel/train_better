<template>
  <div class="workout-view">
    <section v-if="!isEditMode">
      <BaseCard>
        <h2>Тренировки</h2>
        <p class="subtitle">Создавайте и редактируйте тренировки.</p>
        <BaseButton @click="startNew">Новая тренировка</BaseButton>
      </BaseCard>

      <section class="list-section">
        <h3>Последние</h3>
        <div v-if="store.workouts.length === 0">Пока нет тренировок — создайте первую.</div>
        <div v-else>
          <WorkoutCard v-for="w in recentWorkouts" :key="w.id" :workout="w" @open="open" />
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
        <div v-for="ex in workout.exercises" :key="ex.id">
          <ExerciseItem :exercise="ex" />
        </div>

        <div class="exercise-form">
          <BaseInput v-model="newExName" placeholder="Добавить упражнение" />
          <BaseButton @click="addExercise">Добавить упражнение</BaseButton>
        </div>
        <small v-if="exerciseNameError" class="error">{{ exerciseNameError }}</small>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Workout, WorkoutStatus } from '../types/workout'
import { useWorkoutStore } from '../store/workoutStore'
import BaseCard from '../components/ui/BaseCard.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import BaseInput from '../components/ui/BaseInput.vue'
import WorkoutCard from '../components/workout/WorkoutCard.vue'
import ExerciseItem from '../components/workout/ExerciseItem.vue'
import { useSettings } from '../composables/useSettings'

function uid() {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

function cloneWorkout(workout: Workout): Workout {
  return {
    ...workout,
    exercises: workout.exercises.map(ex => ({
      ...ex,
      sets: ex.sets.map(set => ({ ...set }))
    }))
  }
}

const route = useRoute()
const router = useRouter()
const store = useWorkoutStore()
const { defaultRestSec } = useSettings()

const workoutId = computed(() => (typeof route.params.id === 'string' ? route.params.id : undefined))
const isEditMode = computed(() => Boolean(workoutId.value))
const existingWorkout = computed(() =>
  workoutId.value ? store.workouts.find(w => w.id === workoutId.value) : undefined
)

const workout = reactive<Workout>(
  existingWorkout.value ? cloneWorkout(existingWorkout.value) : store.createEmptyWorkout()
)

const newExName = ref('')
const workoutNameError = ref('')
const exerciseNameError = ref('')
const recentWorkouts = computed(() => store.workouts.slice(0, 8))

onMounted(() => {
  if (workoutId.value && !existingWorkout.value) {
    router.push({ name: 'Workouts' })
  }
})

function persistWorkout(status: WorkoutStatus) {
  const workoutName = workout.name?.trim() ?? ''
  if (!workoutName) {
    workoutNameError.value = 'Введите название тренировки перед сохранением'
    return
  }

  workoutNameError.value = ''
  workout.name = workoutName
  workout.status = status
  workout.completedAt = status === 'completed' ? new Date().toISOString() : undefined

  const payload = cloneWorkout(workout)

  if (existingWorkout.value) {
    store.updateWorkout(payload)
  } else {
    store.addWorkout(payload)
  }

  router.push({ name: 'Workouts' })
}

function saveDraft() {
  persistWorkout('draft')
}

function completeWorkout() {
  persistWorkout('completed')
}

function addExercise() {
  const exerciseName = newExName.value.trim()
  if (!exerciseName) {
    exerciseNameError.value = 'Название упражнения не может быть пустым'
    return
  }

  exerciseNameError.value = ''
  workout.exercises.push({
    id: uid(),
    name: exerciseName,
    sets: [],
    defaultRestSec: defaultRestSec.value
  })
  newExName.value = ''
}

function startNew() {
  const fresh = store.createEmptyWorkout()
  router.push({ name: 'Workout', params: { id: fresh.id } })
}

function open(id: string) {
  router.push({ name: 'Workout', params: { id } })
}
</script>

<style scoped>
.workout-view {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.subtitle {
  margin-bottom: 12px;
  opacity: 0.75;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.exercises {
  margin-top: 12px;
}

.exercise-form {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.error {
  margin-top: 6px;
  color: #b91c1c;
}

@media (max-width: 380px) {
  .actions {
    width: 100%;
  }

  .actions :deep(.btn) {
    flex: 1;
  }
}
</style>
