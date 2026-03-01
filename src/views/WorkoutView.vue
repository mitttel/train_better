<template>
  <div>
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
          <BaseButton @click="save">Сохранить</BaseButton>
        </div>
      </div>

      <div class="exercises" style="margin-top:12px">
        <div v-for="ex in workout.exercises" :key="ex.id">
          <ExerciseItem :exercise="ex" />
        </div>

        <div style="margin-top:12px">
          <BaseInput v-model="newExName" placeholder="Добавить упражнение" />
          <BaseButton @click="addExercise">Добавить упражнение</BaseButton>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWorkoutStore } from '../store/workoutStore'
import BaseCard from '../components/ui/BaseCard.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import BaseInput from '../components/ui/BaseInput.vue'
import ExerciseItem from '../components/workout/ExerciseItem.vue'
import WorkoutCard from '../components/workout/WorkoutCard.vue'

function uid() {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

const route = useRoute()
const router = useRouter()
const store = useWorkoutStore()
const id = computed(() => route.params.id as string | undefined)
const workout = ref(
  id.value ? store.workouts.find(w => w.id === id.value) ?? store.createEmptyWorkout() : store.createEmptyWorkout()
)
const newExName = ref('')

function startNew() {
  const empty = store.createEmptyWorkout()
  store.addWorkout(empty)
  router.push({ name: 'Workout', params: { id: empty.id } })
}

function open(workoutId: string) {
  router.push({ name: 'Workout', params: { id: workoutId } })
}

function save() {
  if (store.workouts.find(w => w.id === workout.value.id)) {
    store.updateWorkout(workout.value)
  } else {
    store.addWorkout(workout.value)
  }
  router.push('/workouts')
}

function addExercise() {
  if (!newExName.value.trim()) return
  const ex = {
    id: uid(),
    name: newExName.value.trim(),
    sets: []
  }
  workout.value.exercises.push(ex)
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
  justify-content: space-between;
  gap: 10px;
  align-items: center;
}

.header input {
  font-size: 16px;
  padding: 8px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.meta {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
