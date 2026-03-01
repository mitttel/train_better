<template>
  <button class="btn" :type="type" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ type?: 'button' | 'submit' | 'reset' }>()
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  border-radius: 12px;
  background: var(--accent);
  color: white;
  font-weight: 600;
  border: none;
  font-size: 16px;
}
</style>