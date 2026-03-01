<template>
  <div>
    <BaseCard>
      <h2>{{ isEdit ? 'Редактировать шаблон' : 'Добавить тренировку' }}</h2>

      <div class="field">
        <label>Название</label>
        <BaseInput v-model="name" placeholder="Например: День ног" />
      </div>

      <div class="field">
        <label>Тип измерения по умолчанию</label>
        <select v-model="defaultUnit">
          <option v-for="option in measurementOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
      </div>

      <div class="field">
        <label>Отдых (сек)</label>
        <input v-model.number="defaultRestSec" type="number" min="0" placeholder="Необязательно" />
      </div>

      <div class="field">
        <h3>Упражнения</h3>
        <div v-if="exercises.length === 0" class="empty">Добавьте хотя бы одно упражнение.</div>

        <div v-for="(exercise, idx) in exercises" :key="exercise.id" class="exercise-row">
          <input v-model="exercise.name" class="name" placeholder="Название упражнения" />

          <div class="secondary-fields">
            <select v-model="exercise.measurementType" class="measure">
              <option v-for="option in measurementOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
            </select>
            <input v-model="exercise.notes" class="notes" placeholder="Заметка" />
          </div>

          <div class="controls">
            <button type="button" @click="moveExercise(idx, idx - 1)" :disabled="idx === 0">↑</button>
            <button type="button" @click="moveExercise(idx, idx + 1)" :disabled="idx === exercises.length - 1">↓</button>
            <button type="button" @click="removeExercise(idx)">Удалить</button>
          </div>
        </div>

        <BaseButton @click="addExercise">Добавить упражнение</BaseButton>
      </div>

      <div class="actions">
        <BaseButton @click="saveTemplate">Сохранить шаблон</BaseButton>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseCard from '../components/ui/BaseCard.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import BaseInput from '../components/ui/BaseInput.vue'
import { useTemplateStore } from '../store/templateStore'
import type { MeasurementType, TemplateExercise } from '../types/templateExercise'

function uid() {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

const templateStore = useTemplateStore()
const router = useRouter()
const route = useRoute()
const templateId = route.params.id as string | undefined
const template = templateId ? templateStore.templates.find(t => t.id === templateId) : undefined

const isEdit = computed(() => Boolean(template))
const measurementOptions: { value: MeasurementType; label: string }[] = [
  { value: 'weight', label: 'Вес' },
  { value: 'minutes', label: 'Минуты' },
  { value: 'centimeters', label: 'Сантиметры' },
  { value: 'meters', label: 'Метры' }
]

const name = ref(template?.name ?? '')
const defaultUnit = ref<MeasurementType>(template?.defaultUnit ?? 'weight')
const defaultRestSec = ref<number | undefined>(template?.defaultRestSec)
const exercises = ref<TemplateExercise[]>(
  (template?.exercises ?? []).map(ex => ({ ...ex }))
)

function addExercise() {
  exercises.value.push({
    id: uid(),
    name: '',
    notes: '',
    order: exercises.value.length,
    measurementType: defaultUnit.value
  })
}

function removeExercise(index: number) {
  exercises.value.splice(index, 1)
  exercises.value = exercises.value.map((exercise, idx) => ({ ...exercise, order: idx }))
}

function moveExercise(from: number, to: number) {
  if (to < 0 || to >= exercises.value.length) return
  const next = [...exercises.value]
  const [moved] = next.splice(from, 1)
  next.splice(to, 0, moved)
  exercises.value = next.map((exercise, idx) => ({ ...exercise, order: idx }))
}

function saveTemplate() {
  const filteredExercises = exercises.value
    .map((exercise, index) => ({ ...exercise, name: exercise.name.trim(), order: index }))
    .filter(exercise => exercise.name.length > 0)

  if (!name.value.trim() || filteredExercises.length === 0) return

  if (template) {
    templateStore.updateTemplate({
      ...template,
      name: name.value.trim(),
      defaultUnit: defaultUnit.value,
      defaultRestSec: defaultRestSec.value,
      exercises: filteredExercises
    })
  } else {
    templateStore.createTemplate({
      name: name.value.trim(),
      defaultUnit: defaultUnit.value,
      defaultRestSec: defaultRestSec.value,
      exercises: filteredExercises.map(exercise => ({
        name: exercise.name,
        measurementType: exercise.measurementType,
        notes: exercise.notes
      }))
    })
  }

  router.push('/templates')
}
</script>

<style scoped>
.field { display:flex; flex-direction:column; gap:8px; margin-top:12px; min-width: 0; }
label { font-size:14px; color:var(--muted); }
input, select {
  width: 100%;
  padding:10px;
  border-radius:10px;
  border:1px solid rgba(0,0,0,0.08);
  font-size:14px;
}
.exercise-row {
  display:flex;
  flex-direction:column;
  gap:8px;
  margin-bottom:10px;
  padding:10px;
  border-radius:10px;
  background: rgba(0,0,0,0.03);
}
.secondary-fields {
  display:grid;
  grid-template-columns: 1fr;
  gap:8px;
}
.controls {
  display:flex;
  gap:6px;
  flex-wrap: wrap;
}
.controls button {
  border:none;
  border-radius:8px;
  padding:8px;
}
.actions { margin-top:16px; display:flex; justify-content:flex-end; }
.empty { color: var(--muted); font-size: 14px; }

@media (min-width: 480px) {
  .secondary-fields {
    grid-template-columns: minmax(130px, 180px) 1fr;
  }
}
</style>
