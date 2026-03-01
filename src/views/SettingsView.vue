<template>
  <div>
    <h2>Настройки</h2>
    <div style="margin-top:12px">
      <label><input type="checkbox" v-model="useKg" /> Использовать кг (иначе — lb)</label>
    </div>

    <div style="margin-top:12px">
      <label class="field-label" for="default-rest">Отдых по умолчанию (сек.)</label>
      <input
        id="default-rest"
        type="number"
        min="0"
        step="1"
        :value="defaultRestSec"
        @input="onRestSecInput"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettings } from '../composables/useSettings'

const { useKg, defaultRestSec } = useSettings()

function onRestSecInput(event: Event) {
  const target = event.target as HTMLInputElement
  defaultRestSec.value = Number(target.value)
}
</script>

<style scoped>
input {
  margin-top: 6px;
  width: 100%;
  max-width: 220px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.15);
}

.field-label {
  display: block;
  font-size: 14px;
}
</style>
