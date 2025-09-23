<script setup lang="ts">
import {ref} from "vue";
import TodoItem from "@/TodoItem.vue";

let id = 0
const todos = ref<{ id: number, text: string, list: number}[]>([])
for (let i = 0; i < 10; i++) {
  todos.value.push({ id:id++, text: `Eintrag ${i}`, list: 1})
}
</script>

<template>
  <div>
    <ul >
        <TodoItem
          v-for="todo in todos"
          :id="todo.id"
          :todo_item_name = todo.text></TodoItem>
    </ul>
  </div>
</template>

<style scoped>

</style>