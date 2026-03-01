<template>
  <div class="page-stack">
    <section v-if="!isEditing">
      <BaseCard>
        <h2>Тренировки</h2>
        <p class="subtitle">Создавайте и редактируйте тренировки.</p>
        <BaseButton @click="startNew">Новая тренировка</BaseButton>
      </BaseCard>

      <section class="list-section">
        <h3>Последние</h3>
        <div v-if="store.workouts.length === 0">Пока нет тренировок — создайте первую.</div>
        <div v-else>
          <WorkoutCard v-for="w in store.workouts.slice(0, 8)" :key="w.id" :workout="w" @open="open" />
        </div>
      </section>
    </section>

    <BaseCard v-else>
      <div class="header">
        <BaseInput v-model="editableWorkout.name" placeholder="Название тренировки (например: Ноги)" />
        <div class="meta">
          <small>{{ editableWorkout.date }}</small>
          <BaseButton @click="saveDraft">Сохранить</BaseButton>
          <BaseButton @click="completeWorkout">Завершить</BaseButton>
        </div>
      </div>

      <small v-if="workoutNameError" class="error">{{ workoutNameError }}</small>

      <div class="exercises">
        <ExerciseItem v-for="ex in editableWorkout.exercises" :key="ex.id" :exercise="ex" />

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
import { useWorkoutStore } from '../store/workoutStore'
import BaseCard from '../components/ui/BaseCard.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import BaseInput from '../components/ui/BaseInput.vue'
import WorkoutCard from '../components/workout/WorkoutCard.vue'
import ExerciseItem from '../components/workout/ExerciseItem.vue'
import { useSettings } from '../composables/useSettings'
import type { Workout } from '../types/workout'

function uid() {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

const route = useRoute()
const router = useRouter()
const store = useWorkoutStore()
const { defaultRestSec } = useSettings()

const workoutNameError = ref('')
const exerciseNameError = ref('')
const newExName = ref('')

const workoutId = computed(() => route.params.id as string | undefined)
const isEditing = computed(() => Boolean(workoutId.value))

const editableWorkout = reactive<Workout>(store.createEmptyWorkout())

onMounted(() => {
  hydrateWorkout()
})

function hydrateWorkout() {
  const currentId = workoutId.value
  const existingWorkout = currentId ? store.workouts.find((w) => w.id === currentId) : undefined

  if (currentId && !existingWorkout) {
    router.push('/workouts')
    return
  }

  const sourceWorkout = existingWorkout ?? store.createEmptyWorkout()
  Object.assign(editableWorkout, structuredClone(sourceWorkout))
}

function persistWorkout(status: Workout['status']) {
  const workoutName = (editableWorkout.name ?? '').trim()
  if (!workoutName) {
    workoutNameError.value = 'Введите название тренировки перед сохранением'
    return false
  }

  workoutNameError.value = ''
  editableWorkout.name = workoutName
  editableWorkout.status = status
  editableWorkout.completedAt = status === 'completed' ? new Date().toISOString() : undefined

  const exists = store.workouts.some((w) => w.id === editableWorkout.id)
  if (exists) {
    store.updateWorkout(structuredClone(editableWorkout))
  } else {
    store.addWorkout(structuredClone(editableWorkout))
  }

  router.push('/workouts')
  return true
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

  editableWorkout.exercises.push({
    id: uid(),
    name: exerciseName,
    sets: [],
    defaultRestSec: defaultRestSec.value
  })

  newExName.value = ''
}

function startNew() {
  const empty = store.createEmptyWorkout()
  store.addWorkout(empty)
  router.push({ name: 'Workout', params: { id: empty.id } })
}

function open(id: string) {
  router.push({ name: 'Workout', params: { id } })
}
</script>

<style scoped>
.page-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.subtitle {
  opacity: 0.75;
}

.list-section {
  margin-top: 12px;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.exercises {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.exercise-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.error {
  margin-top: 6px;
  color: #dc2626;
}
</style>
