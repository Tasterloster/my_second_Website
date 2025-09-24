<script setup lang="ts">
  const edit_Done_Button_text = "Edit Done";
</script>

<template>
  <button @click="$emit('edit_done')"> {{ edit_Done_Button_text }} </button>

</template>

<style scoped>

</style>