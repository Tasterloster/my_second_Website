<script setup lang="ts">
  const save_Button_text = "💾"
</script>

<template>
  <button @click="$emit('save')"> {{ save_Button_text }} </button>
</template>

<style scoped>

</style>