<script setup lang="ts">
  const undo_Delete_Button_Text = "🔄"
</script>

<template>
  <button @click="$emit('undoDelete')"> {{ undo_Delete_Button_Text }} </button>
</template>

<style scoped>

</style>