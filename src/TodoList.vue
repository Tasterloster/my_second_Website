<script setup lang="ts">
import {computed, ref} from "vue";
import TodoItem from "@/TodoItem.vue";

let id = 0
const todos = ref<{ id: number, text: string, done: boolean }[]>([])
for (let i = 0; i < 10; i++) {
  todos.value.push({ id:id++, text: `Eintrag ${i}`, done: false})
}

const hiddenTodos = computed(() => {
  return todos.value.filter((t) => !t.done)
})
</script>

<template>
  <div>
    <ul>
        <TodoItem @done="todo.done = true"
          v-for = "todo in hiddenTodos"
          :id = todo.id
          :todo_item_name = todo.text></TodoItem>
    </ul>
  </div>
</template>

<style scoped>

</style>