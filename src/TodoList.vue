<script setup lang="ts">
import {computed, ref, watch} from "vue";
import TodoItem from "@/TodoItem.vue";

let id = 0
const todosSize = 100
const globalEditActive = ref(false)

const todos = ref<{ id: number, text: string, done: boolean }[]>([])
for (let i = 0; i < todosSize; i++) {
  todos.value.push({ id:id++, text: `Eintrag ${i}`, done: false})
}

const hiddenTodos = computed(() => {
  return todos.value.filter((t) => !t.done)
})

function updateTodo(new_Name: string, id: number){
  globalEditActive.value = false
  const todo_to_update = todos.value.filter((t) => t.id == id)[0]
  if(todo_to_update){
    todo_to_update.text = new_Name
  }
}

function flagDone(id: number){
  const todo_to_set_done = todos.value.filter((t) => t.id == id)[0]
  // console.log(todo_to_set_done)
  // console.log(todos)
  // console.log(hiddenTodos)
  todo_to_set_done.done = true
}

function editActive(){
  globalEditActive.value = true
}
</script>

<template>
  <body>
  <h1>Todo Liste</h1>
  <div class="container">
    <ul class="list">
        <TodoItem
          v-for = "(todo, idx) in hiddenTodos" :key="todo.id"
          :list_id = idx
          :initial_id = todo.id
          :initial_todo_item_name = todo.text
          :disable_edit = "globalEditActive"
          @edit_done="updateTodo"
          @done="flagDone"
          @edit="editActive">
        </TodoItem>
    </ul>
  </div>
  </body>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

</style>