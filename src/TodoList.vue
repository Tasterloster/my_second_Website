<script setup lang="ts">
import {computed, ref, watch} from "vue";
import TodoItem from "@/TodoItem.vue";

let id = 0
let idx = 0
const todos = ref<{ id: number, text: string, done: boolean }[]>([])
for (let i = 0; i < 10; i++) {
  todos.value.push({ id:id++, text: `Eintrag ${i}`, done: false})
}

const hiddenTodos = computed(() => {
  return todos.value.filter((t) => !t.done)
})

function updateTodo(new_Name: string, id: number){
  const todo_to_update = todos.value.filter((t) => t.id == id)[0]
  if(todo_to_update){
    todo_to_update.text = new_Name
  }
  idx = 0
}

function flagDone(id: number){
  const todo_to_set_done = todos.value.filter((t) => t.id == id)[0]
  console.log(todo_to_set_done)
  console.log(todos)
  console.log(hiddenTodos)
  todo_to_set_done.done = true
  idx = 0
}
</script>

<template>
  <div class="container">
    <h1>Todo Liste</h1>
    <ul class="list">
        <TodoItem
          v-for = "todo in hiddenTodos" :key="todo.id"
          :list_id =idx++
          :initial_id = todo.id
          :initial_todo_item_name = todo.text
          @edit_done="updateTodo"
          @done="flagDone">
        </TodoItem>
    </ul>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
}
.list{
  display: flex;
  flex-direction: column;
}
</style>