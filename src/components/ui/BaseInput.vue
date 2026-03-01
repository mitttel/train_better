<template>
  <label class="base-input">
    <span v-if="label" class="label">{{ label }}</span>
    <input :placeholder="placeholder" v-model="modelValue" @input="$emit('update:modelValue', modelValue)" />
  </label>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps<{ modelValue: string; label?: string; placeholder?: string }>()
const emit = defineEmits(['update:modelValue'])
const modelValue = ref(props.modelValue ?? '')
watch(() => props.modelValue, (v) => modelValue.value = v ?? '')
</script>

<style scoped>
.base-input { display:flex; flex-direction:column; gap:6px; }
.label { font-size:12px; color:var(--muted); }
input {
  padding:10px; border-radius:10px; border:1px solid rgba(0,0,0,0.08);
  font-size:16px; background:var(--card);
}
</style>