<template>
  <div class="profile-view">
    <BaseCard>
      <h2>Профиль</h2>
      <p class="subtitle">Персональные настройки приложения.</p>

      <div class="field">
        <label class="label" for="name">Имя</label>
        <BaseInput id="name" v-model="name" placeholder="Ваше имя" />
      </div>

      <div class="field">
        <span class="label">Единицы измерения</span>
        <div class="inline-options">
          <label><input type="radio" :checked="useKg" @change="setUnit(true)" /> кг</label>
          <label><input type="radio" :checked="!useKg" @change="setUnit(false)" /> lb</label>
        </div>
      </div>

      <div class="field">
        <label class="label" for="restTimer">Таймер отдыха по умолчанию (сек.)</label>
        <BaseInput
          id="restTimer"
          :model-value="defaultRestSec"
          type="number"
          min="15"
          step="5"
          @update:model-value="onDefaultRestChange"
        />
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseCard from '../components/ui/BaseCard.vue'
import BaseInput from '../components/ui/BaseInput.vue'
import { useSettings } from '../composables/useSettings'

const name = ref('Атлет')
const { useKg, defaultRestSec } = useSettings()

function setUnit(next: boolean) {
  useKg.value = next
}

function onDefaultRestChange(value: string) {
  const parsed = Number(value)
  if (Number.isNaN(parsed)) return
  defaultRestSec.value = parsed
}
</script>

<style scoped>
.profile-view {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.subtitle {
  margin-bottom: 12px;
  opacity: 0.75;
}

.field {
  margin-bottom: 12px;
}

.label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
}

.inline-options {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}
</style>
