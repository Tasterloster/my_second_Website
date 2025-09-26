<script setup lang="ts">
  const emit = defineEmits<{
    (e: 'click'): void
  }>()
  const { type = 'button' } = defineProps<{
    type?: 'button' | 'submit' | 'reset'
  }>()

</script>

<template>
  <button @click="emit('click')" :type="type">
    <slot name="content"/>
  </button>
</template>

<style scoped>

</style>