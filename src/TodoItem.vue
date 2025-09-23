<script setup lang="ts">
import TodoDoneButton from "@/TodoDoneButton.vue";
import TodoEditButton from "@/TodoEditButton.vue";

defineProps<{
  id: number
  todo_item_name: string
}>();
</script>

<template>
  <div class="container">
    <input type="checkbox"></input>
    <span>{{ id }} - {{ todo_item_name }} </span>
    <TodoDoneButton @done="$emit('done')" />
    <TodoEditButton/>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  gap: .5em;
}
</style>