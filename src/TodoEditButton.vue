<script setup lang="ts">
  const edit_Button_text = "Edit"

</script>

<template>
  <button class="editButton"@click="$emit('edit')"> {{ edit_Button_text }} </button>
</template>

<style scoped>

</style>