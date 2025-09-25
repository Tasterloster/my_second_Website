<script setup lang="ts">
  const delete_Button_text = "🗑️"
</script>

<template>
  <button @click="$emit('delete')"> {{ delete_Button_text }} </button>
</template>

<style scoped>

</style>