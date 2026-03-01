<template>
  <div>
    <BaseCard>
      <div class="today">
        <h2>Сегодня</h2>
        <p>{{ today }}</p>
        <BaseButton @click="startToday">Начать тренировку</BaseButton>
      </div>
    </BaseCard>

    <div class="kpi-grid">
      <BaseCard>
        <div class="kpi-item">
          <p>Общий счёт тренировок</p>
          <h3>{{ totalWorkouts }}</h3>
        </div>
      </BaseCard>
      <BaseCard>
        <div class="kpi-item">
          <p>Завершённые тренировки</p>
          <h3>{{ completedWorkouts }}</h3>
        </div>
      </BaseCard>
    </div>

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
import { computed } from 'vue'
import BaseCard from '../components/ui/BaseCard.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import WorkoutCard from '../components/workout/WorkoutCard.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import BaseCard from '../components/ui/BaseCard.vue'
import BaseInput from '../components/ui/BaseInput.vue'
import { useWorkoutStore } from '../store/workoutStore'
import { formatHuman, todayIso } from '../utils/date'
import { useRouter } from 'vue-router'
import { completedWorkoutsCount, countWorkouts } from '../services/statsService'

const store = useWorkoutStore()
const router = useRouter()
const today = formatHuman(todayIso())
const totalWorkouts = computed(() => countWorkouts(store.workouts))
const completedWorkouts = computed(() => completedWorkoutsCount(store.workouts))

function startToday() {
  const empty = store.createEmptyWorkout()
  store.addWorkout(empty)
  router.push({ name: 'Workout', params: { id: empty.id } })
}

function open(id: string) {
  router.push({ name: 'Workout', params: { id } })
}
</script>

<style scoped>
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 12px;
}

.kpi-item {
  text-align: center;
}

.kpi-item p {
  margin: 0;
  opacity: 0.75;
}

.kpi-item h3 {
  margin: 8px 0 0;
  font-size: 24px;
}
</style>
