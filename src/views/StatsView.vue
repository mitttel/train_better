<template>
  <div>
    <h2>Статистика</h2>
    <div class="stats-grid">
      <div class="stat-card">
        <h3>{{ total }}</h3>
        <p>Всего тренировок</p>
      </div>
      <div class="stat-card">
        <h3>{{ avg }}</h3>
        <p>В неделю (в среднем)</p>
      </div>
      <div class="stat-card">
        <h3>{{ totalWeight.toLocaleString('ru-RU') }} кг</h3>
        <p>Общий поднятый вес</p>
      </div>
      <div class="stat-card">
        <h3>{{ completedCount }}</h3>
        <p>Завершённых тренировок</p>
      </div>
    </div>

    <div class="heatmap-card">
      <h3>Активность за {{ monthLabel }}</h3>
      <div class="calendar-grid">
        <div class="calendar-weekday" v-for="day in weekdays" :key="day">{{ day }}</div>
        <div v-for="(cell, index) in calendarCells" :key="`${cell.date ?? 'empty'}-${index}`" class="calendar-cell" :class="cell.level">
          <span v-if="cell.day">{{ cell.day }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWorkoutStore } from '../store/workoutStore'
import {
  avgWorkoutsPerWeek,
  completedWorkoutsCount,
  countWorkouts,
  totalLiftedWeight,
  workoutsByDay,
} from '../services/statsService'

const store = useWorkoutStore()
const total = computed(() => countWorkouts(store.workouts))
const avg = computed(() => avgWorkoutsPerWeek(store.workouts))
const totalWeight = computed(() => totalLiftedWeight(store.workouts))
const completedCount = computed(() => completedWorkoutsCount(store.workouts))
const workoutByDate = computed(() => workoutsByDay(store.workouts))

const now = new Date()
const year = now.getFullYear()
const month = now.getMonth()
const daysInMonth = new Date(year, month + 1, 0).getDate()
const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7

const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

const monthLabel = now.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })

const calendarCells = computed(() => {
  const cells: { day?: number; date?: string; level: string }[] = []

  for (let i = 0; i < firstWeekday; i += 1) {
    cells.push({ level: 'empty' })
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const isoDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const count = workoutByDate.value[isoDate] ?? 0

    let level = 'level-0'
    if (count >= 3) level = 'level-3'
    else if (count === 2) level = 'level-2'
    else if (count === 1) level = 'level-1'

    cells.push({ day, date: isoDate, level })
  }

  return cells
})
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 12px;
}

.stat-card {
  padding: 12px;
  background: var(--card);
  border-radius: 12px;
  text-align: center;
}

.heatmap-card {
  margin-top: 14px;
  padding: 12px;
  background: var(--card);
  border-radius: 12px;
}

.calendar-grid {
  margin-top: 8px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}

.calendar-weekday {
  text-align: center;
  font-size: 12px;
  opacity: 0.7;
}

.calendar-cell {
  min-height: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.calendar-cell.empty {
  background: transparent;
}

.level-0 { background: rgba(255, 255, 255, 0.05); }
.level-1 { background: rgba(64, 168, 255, 0.35); }
.level-2 { background: rgba(64, 168, 255, 0.55); }
.level-3 { background: rgba(64, 168, 255, 0.8); }
</style>
