<template>
  <div>
    <BaseCard>
      <div class="header">
        <input v-model="workout.name" placeholder="Название тренировки (например: Ноги)" />
        <div class="meta">
          <small>{{ workout.date }}</small>
          <BaseButton @click="save">Сохранить</BaseButton>
        </div>
      </div>

      <small v-if="workoutNameError" class="error">{{ workoutNameError }}</small>

      <div class="exercises" style="margin-top:12px">
        <div v-for="ex in workout.exercises" :key="ex.id">
          <ExerciseItem :exercise="ex" />
        </div>

        <div style="margin-top:12px">
          <BaseInput v-model="newExName" placeholder="Добавить упражнение" />
          <BaseButton @click="addExercise">Добавить упражнение</BaseButton>
        </div>
        <small v-if="exerciseNameError" class="error">{{ exerciseNameError }}</small>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWorkoutStore } from '../store/workoutStore'
import BaseCard from '../components/ui/BaseCard.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import BaseInput from '../components/ui/BaseInput.vue'
import ExerciseItem from '../components/workout/ExerciseItem.vue'

function uid() {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

const route = useRoute()
const router = useRouter()
const store = useWorkoutStore()
const workoutId = route.params.id as string | undefined
const existingWorkout = workoutId ? store.workouts.find(w => w.id === workoutId) : undefined
const isExistingWorkout = Boolean(existingWorkout)
const workout = ref(existingWorkout ?? store.createEmptyWorkout())
const newExName = ref('')
const workoutNameError = ref('')
const exerciseNameError = ref('')

onMounted(() => {
  if (workoutId && !existingWorkout) {
    router.push('/')
  }
})

function save() {
  const workoutName = workout.value.name?.trim() ?? ''
  if (!workoutName) {
    workoutNameError.value = 'Введите название тренировки перед сохранением'
    return
  }

  workoutNameError.value = ''
  workout.value.name = workoutName

  if (isExistingWorkout) {
    store.updateWorkout(workout.value)
  } else {
    store.addWorkout(workout.value)
  }

  router.push('/')
}

function addExercise() {
  const exerciseName = newExName.value.trim()
  if (!exerciseName) {
    exerciseNameError.value = 'Название упражнения не может быть пустым'
    return
  }

  exerciseNameError.value = ''

  const ex = {
    id: uid(),
    name: exerciseName,
    sets: []
  }

  workout.value.exercises.push(ex)
  newExName.value = ''
}
</script>

<style scoped>
.header { display:flex; justify-content:space-between; gap:10px; align-items:center }
.header input { font-size:16px; padding:8px; border-radius:10px; border:1px solid rgba(0,0,0,0.08) }
.meta { display:flex; gap:8px; align-items:center }
.error { color: #b91c1c; display: block; margin-top: 6px; }
</style>
