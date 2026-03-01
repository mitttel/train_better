<template>
  <label class="base-input">
    <span v-if="label" class="label">{{ label }}</span>
    <input
      :value="displayValue"
      :placeholder="placeholder"
      v-bind="$attrs"
      @input="onInput"
    />
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | null
    label?: string
    placeholder?: string
  }>(),
  {
    modelValue: ''
  }
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

const displayValue = computed(() => String(props.modelValue ?? ''))

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.base-input { display:flex; flex-direction:column; gap:6px; min-width: 0; }
.label { font-size:12px; color:var(--muted); }
input {
  width: 100%;
  padding:10px;
  border-radius:10px;
  border:1px solid rgba(0,0,0,0.08);
  font-size:16px;
  background:var(--card);
}
</style>
