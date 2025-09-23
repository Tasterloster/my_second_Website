<script setup lang="ts">
  const done_Button_text = "X"
</script>

<template>
  <button @click="$emit('done')"> {{ done_Button_text }} </button>
</template>

<style scoped>

</style>