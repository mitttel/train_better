<template>
  <div>
    <BaseCard>
      <h2>Профиль</h2>
      <p class="subtitle">Персональные настройки приложения.</p>

      <div class="field">
        <label class="label" for="name">Имя</label>
        <BaseInput id="name" v-model="profile.name" placeholder="Ваше имя" />
      </div>

      <div class="field">
        <span class="label">Единицы измерения</span>
        <div class="inline-options">
          <label><input type="radio" value="kg" v-model="profile.units" /> кг</label>
          <label><input type="radio" value="lb" v-model="profile.units" /> lb</label>
        </div>
      </div>

      <div class="field">
        <label class="label" for="restTimer">Таймер отдыха (сек.)</label>
        <BaseInput id="restTimer" v-model="profile.restTimer" type="number" min="15" step="5" />
      </div>

      <div class="field">
        <label class="label" for="warmupTimer">Таймер разминки (сек.)</label>
        <BaseInput id="warmupTimer" v-model="profile.warmupTimer" type="number" min="30" step="10" />
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import BaseCard from '../components/ui/BaseCard.vue'
import BaseInput from '../components/ui/BaseInput.vue'

const profile = reactive({
  name: 'Атлет',
  units: 'kg',
  restTimer: 90,
  warmupTimer: 300
})
</script>

<style scoped>
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
}
</style>
