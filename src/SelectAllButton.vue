<script setup lang="ts">
  const select_All_Button_text = "Select All"
</script>

<template>
  <button @click="$emit('selectAll')">{{ select_All_Button_text}}</button>
</template>

<style scoped>

</style>