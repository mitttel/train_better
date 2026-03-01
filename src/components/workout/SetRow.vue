<template>
  <div class="set-row">
    <div>#{indexLabel}</div>
    <div>{{ set.reps }}× {{ set.weight ?? '-' }}</div>
    <div v-if="set.restSec">rest {{ set.restSec }}s</div>
  </div>
</template>

<script setup lang="ts">
import type { SetRow as SetRowType } from '../../types/exercise'
const props = defineProps<{ set: SetRowType, index: number }>()
const indexLabel = props.index
</script>

<style scoped>
.set-row { padding:6px 8px; border-radius:8px; background:rgba(0,0,0,0.03); font-size:14px }
</style>
