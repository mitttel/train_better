<template>
  <div class="set-row">
    <div class="set-index">{{ props.indexLabel }}.</div>
    <div class="set-main">{{ set.reps }} × {{ set.weight ?? '-' }}</div>
    <div class="set-rest" v-if="typeof set.restSec === 'number'">Отдых {{ set.restSec }}с</div>
  </div>
</template>

<script setup lang="ts">
import type { SetRow as SetRowType } from '../../types/exercise'
const props = withDefaults(defineProps<{ set: SetRowType; indexLabel?: number }>(), {
  indexLabel: 1
})
</script>

<style scoped>
.set-row {
  display: grid;
  grid-template-columns: 24px 1fr auto;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(0,0,0,0.03);
  font-size: 14px;
}

.set-index {
  color: var(--muted);
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.set-main {
  font-weight: 500;
}

.set-rest {
  color: var(--muted);
  white-space: nowrap;
}
</style>
