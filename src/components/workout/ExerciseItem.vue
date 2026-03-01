<template>
  <div class="exercise">
    <div class="title">
      <strong>{{ exercise.name }}</strong>
      <small v-if="exercise.notes">{{ exercise.notes }}</small>
    </div>

    <div class="rest-default">
      <label>Отдых упражнения (сек.)</label>
      <input type="number" min="0" step="1" :value="exercise.defaultRestSec ?? ''" @input="onExerciseRestInput" />
    </div>

    <div class="sets">
      <SetRow v-for="(s, idx) in exercise.sets" :key="s.id" :set="s" :index-label="idx + 1" />
    </div>

    <div class="set-form">
      <input v-model.number="draftReps" type="number" min="1" placeholder="Повторы" />
      <input v-model.number="draftWeight" type="number" min="0" step="0.5" placeholder="Вес" />
      <input v-model.number="draftRestSec" type="number" min="0" step="1" placeholder="Отдых (сек.)" />
      <button class="save-set" @click="saveSet">Сохранить подход</button>
    </div>

    <div v-if="timer.isActive.value" class="timer">
      <div class="timer-title">Отдых: {{ timer.remainingSec.value }} сек.</div>
      <div class="timer-actions">
        <button @click="togglePause">{{ timer.isRunning.value ? 'Пауза' : 'Продолжить' }}</button>
        <button @click="timer.reset">Сброс</button>
        <button @click="timer.skip">Пропустить</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Exercise } from '../../types/exercise'
import SetRow from './SetRow.vue'
import { useRestTimer } from '../../composables/useRestTimer'
import { useSettings } from '../../composables/useSettings'

const props = defineProps<{ exercise: Exercise }>()
const timer = useRestTimer()
const { defaultRestSec } = useSettings()

const draftReps = ref<number | null>(null)
const draftWeight = ref<number | null>(null)
const draftRestSec = ref<number | null>(null)

function uid() {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

function normalized(value: number | null | undefined) {
  if (typeof value !== 'number' || Number.isNaN(value)) return undefined
  return Math.max(0, Math.round(value))
}

function onExerciseRestInput(event: Event) {
  const target = event.target as HTMLInputElement
  const next = normalized(Number(target.value))
  props.exercise.defaultRestSec = next
}

function saveSet() {
  const reps = normalized(draftReps.value)
  if (!reps || reps <= 0) return

  const restFromSet = normalized(draftRestSec.value)
  const restSec = restFromSet ?? props.exercise.defaultRestSec ?? defaultRestSec.value

  props.exercise.sets.push({
    id: uid(),
    reps,
    weight: draftWeight.value ?? undefined,
    restSec,
    completedAt: new Date().toISOString()
  })

  timer.start(restSec)

  draftReps.value = null
  draftWeight.value = null
  draftRestSec.value = null
}

function togglePause() {
  if (timer.isRunning.value) {
    timer.pause()
    return
  }

  timer.resume()
}
</script>

<style scoped>
.exercise { margin-bottom: 14px; padding: 10px; border-radius: 10px; background: rgba(255, 255, 255, 0.7); }
.title { display:flex; justify-content:space-between; align-items:center; gap:8px; }
.rest-default { margin-top: 8px; display: flex; flex-direction: column; gap: 4px; }
.rest-default input { max-width: 160px; }
.sets { margin-top: 8px; display:flex; flex-direction:column; gap:8px; }
.set-form { margin-top: 10px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
.set-form input, .set-form button, .rest-default input { padding: 8px; border-radius: 8px; border: 1px solid rgba(0,0,0,0.14); }
.save-set { grid-column: 1 / -1; background: var(--accent); color: white; border: none; font-weight: 600; }
.timer { margin-top: 10px; padding: 10px; border-radius: 10px; background: rgba(37, 99, 235, 0.1); }
.timer-title { font-weight: 700; }
.timer-actions { margin-top: 8px; display: flex; gap: 8px; }
.timer-actions button { padding: 8px 10px; border-radius: 8px; border: 1px solid rgba(0,0,0,0.18); background: white; }
</style>
