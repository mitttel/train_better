<template>
  <div class="set-row">
    <div class="line-1">Подход #{{ indexLabel }}</div>
    <div class="line-2">{{ set.reps }} × {{ set.weight ?? '-' }}</div>
    <div v-if="set.restSec" class="line-3">Отдых: {{ set.restSec }}с</div>
  </div>
</template>

<script setup lang="ts">
import type { SetRow as SetRowType } from '../../types/exercise'
const props = defineProps<{ set: SetRowType }>()
const indexLabel = 1 // placeholder — component consumer can extend
</script>

<style scoped>
.set-row {
  width: 100%;
  padding:8px 10px;
  border-radius:8px;
  background:rgba(0,0,0,0.03);
  font-size:14px;
}
.line-1 { color: var(--muted); font-size: 12px; }
.line-2 { font-weight: 600; margin-top: 2px; }
.line-3 { margin-top: 4px; font-size: 12px; }
</style>
