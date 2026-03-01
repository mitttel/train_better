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
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWorkoutStore } from '../store/workoutStore'
import BaseCard from '../components/ui/BaseCard.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import BaseInput from '../components/ui/BaseInput.vue'
import ExerciseItem from '../components/workout/ExerciseItem.vue'

function uid() { return `${Date.now()}-${Math.floor(Math.random()*10000)}` }

const route = useRoute()
const router = useRouter()
const store = useWorkoutStore()
const id = route.params.id as string | undefined
const workout = ref(store.workouts.find(w => w.id === id) ?? store.createEmptyWorkout())
const newExName = ref('')

onMounted(() => {
  if (!workout.value) {
    router.push('/')
  }
})

function save() {
  if (store.workouts.find(w => w.id === workout.value.id)) {
    store.updateWorkout(workout.value)
  } else {
    store.addWorkout(workout.value)
  }
  router.push('/')
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
.header { display:flex; justify-content:space-between; gap:10px; align-items:center }
.header input { font-size:16px; padding:8px; border-radius:10px; border:1px solid rgba(0,0,0,0.08) }
.meta { display:flex; gap:8px; align-items:center }
</style>
