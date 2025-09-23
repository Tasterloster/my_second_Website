<script setup lang="ts">
import {ref} from "vue";
import TodoItem from "@/TodoItem.vue";

// let id = 0
// const todos = ref<{ id: number, text: string, list: number}[]>([])
// for (let i = 0; i < 10; i++) {
//   todos.value.push({ id:id++, text: `Eintrag ${i}`, list: 1})
// }
</script>

<template>
  <div>
    <ul>
        <TodoItem todo_item_name="Item 1"></TodoItem>
        <TodoItem todo_item_name="Item 2"></TodoItem>
        <TodoItem todo_item_name="Item 3"></TodoItem>
        <TodoItem todo_item_name="Item 4"></TodoItem>
    </ul>
  </div>
</template>

<style scoped>

</style>