<template>
  <label class="base-input">
    <span v-if="label" class="label">{{ label }}</span>
    <input
      :id="id"
      :type="type"
      :min="min"
      :max="max"
      :step="step"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
    />
  </label>
</template>

<script setup lang="ts">
interface InputProps {
  modelValue: string | number
  label?: string
  placeholder?: string
  id?: string
  type?: 'text' | 'number' | 'email' | 'password' | 'search'
  min?: string | number
  max?: string | number
  step?: string | number
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text'
})

const emit = defineEmits<{ (e: 'update:modelValue', value: string | number): void }>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  if (props.type === 'number') {
    emit('update:modelValue', target.value === '' ? '' : Number(target.value))
    return
  }

  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.base-input { display:flex; flex-direction:column; gap:6px; }
.label { font-size:12px; color:var(--muted); }
input {
  width: 100%;
  padding:10px; border-radius:10px; border:1px solid rgba(0,0,0,0.08);
  font-size:16px; background:var(--card);
}
</style>
