<template>
  <div class="workout-view">
    <section v-if="!id">
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
        <input v-model="workout.name" placeholder="Название тренировки (например: Ноги)" />
        <div class="meta">
          <small>{{ workout.date }}</small>
          <BaseButton @click="saveDraft">Сохранить</BaseButton>
          <BaseButton @click="completeWorkout">Завершить</BaseButton>
        </div>
      </div>

      <small v-if="workoutNameError" class="error">{{ workoutNameError }}</small>

      <div class="exercises">
        <div v-for="ex in workout.exercises" :key="ex.id">
          <ExerciseItem :exercise="ex" />
        </div>

        <div class="add-exercise">
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
import { useWorkoutStore } from '../store/workoutStore'
import BaseCard from '../components/ui/BaseCard.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import BaseInput from '../components/ui/BaseInput.vue'
import ExerciseItem from '../components/workout/ExerciseItem.vue'
import WorkoutCard from '../components/workout/WorkoutCard.vue'
import { useSettings } from '../composables/useSettings'

function uid() {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

const route = useRoute()
const router = useRouter()
const store = useWorkoutStore()
const { defaultRestSec } = useSettings()

const id = computed(() => route.params.id as string | undefined)
const workout = ref(store.createEmptyWorkout())
const newExName = ref('')
const workoutNameError = ref('')
const exerciseNameError = ref('')

function loadWorkoutByRoute() {
  const currentId = id.value
  if (!currentId) {
    workout.value = store.createEmptyWorkout()
    return
  }

  const found = store.workouts.find(w => w.id === currentId)
  if (!found) {
    router.replace('/workouts')
    return
  }

  workout.value = found
}

onMounted(loadWorkoutByRoute)
watch(id, loadWorkoutByRoute)

function startNew() {
  const draft = store.createEmptyWorkout()
  workout.value = draft
  router.push({ name: 'Workout', params: { id: draft.id } })
}

function open(workoutId: string) {
  router.push({ name: 'Workout', params: { id: workoutId } })
}

function save(status: 'draft' | 'completed' = 'draft') {
  const workoutName = workout.value.name?.trim() ?? ''
  if (!workoutName) {
    workoutNameError.value = 'Введите название тренировки перед сохранением'
    return
  }

  workoutNameError.value = ''
  workout.value.name = workoutName
  workout.value.status = status
  workout.value.completedAt = status === 'completed' ? new Date().toISOString() : undefined

  const hasExisting = store.workouts.some(w => w.id === workout.value.id)
  if (hasExisting) {
    store.updateWorkout(workout.value)
  } else {
    store.addWorkout(workout.value)
  }

  router.push('/workouts')
}

function saveDraft() {
  save('draft')
}

function completeWorkout() {
  save('completed')
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
    defaultRestSec: defaultRestSec.value
  })

  newExName.value = ''
}
</script>

<style scoped>
.subtitle {
  margin-bottom: 12px;
  opacity: 0.75;
}

.list-section {
  margin-top: 12px;
}

.header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
}

.header input {
  flex: 1 1 220px;
  width: 100%;
  min-width: 0;
  font-size: 16px;
  padding: 8px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.exercises {
  margin-top: 12px;
}

.add-exercise {
  margin-top: 12px;
  display: grid;
  gap: 8px;
}

.error {
  color: #dc2626;
  margin-top: 8px;
  display: inline-block;
}
</style>
