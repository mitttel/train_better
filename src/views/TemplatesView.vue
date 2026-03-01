<template>
  <div>
    <BaseCard>
      <div class="header">
        <h2>Шаблоны тренировок</h2>
        <BaseButton @click="router.push('/templates/new')">+ Новый шаблон</BaseButton>
      </div>

      <div v-if="templateStore.templates.length === 0" class="empty">
        Пока нет шаблонов. Создайте первый шаблон тренировки.
      </div>

      <div v-else class="list">
        <div v-for="template in templateStore.templates" :key="template.id" class="item">
          <div>
            <strong>{{ template.name }}</strong>
            <div class="meta">{{ template.exercises.length }} упражнений</div>
          </div>

          <div class="actions">
            <button @click="startFromTemplate(template.id)">Начать</button>
            <button @click="router.push(`/templates/${template.id}/edit`)">Изменить</button>
            <button @click="templateStore.deleteTemplate(template.id)">Удалить</button>
          </div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseCard from '../components/ui/BaseCard.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import { useTemplateStore } from '../store/templateStore'
import { useWorkoutStore } from '../store/workoutStore'

const router = useRouter()
const templateStore = useTemplateStore()
const workoutStore = useWorkoutStore()

function startFromTemplate(templateId: string) {
  const template = templateStore.templates.find(t => t.id === templateId)
  if (!template) return

  const workout = workoutStore.createWorkoutFromTemplate(template)
  workoutStore.addWorkout(workout)
  router.push({ name: 'Workout', params: { id: workout.id } })
}
</script>

<style scoped>
.header { display:flex; justify-content:space-between; align-items:center; gap:12px; }
.empty { color:var(--muted); margin-top:10px; }
.list { display:flex; flex-direction:column; gap:8px; margin-top:12px; }
.item {
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:8px;
  padding:10px;
  border-radius:10px;
  background:rgba(0,0,0,0.03);
}
.actions { display:flex; gap:6px; }
.actions button { border:none; border-radius:8px; padding:8px 10px; }
.meta { font-size:12px; color:var(--muted); margin-top:4px; }
</style>
