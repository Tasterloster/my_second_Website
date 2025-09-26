<script setup lang="ts">
  const emit = defineEmits<{
    (e: 'click'): void
  }>()
</script>

<template>
  <button @click="emit('click')">
    <slot name="content"/>
  </button>
</template>

<style scoped>

</style>