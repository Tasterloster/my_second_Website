<script setup lang="ts">
  const cancel_Button_Text = "🚫"
</script>

<template>
  <button @click="$emit('cancel')"> {{ cancel_Button_Text }} </button>
</template>

<style scoped>

</style>