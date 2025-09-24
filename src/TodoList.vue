<script setup lang="ts">
import {computed, ref } from "vue";
import TodoItem from "@/TodoItem.vue";

let id = 0
const todosSize = 100
const globalEditActive = ref(false)
const draggingItem = ref<todo|null>(null)

interface todo {
  id: number
  text: string
  done: boolean
}


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
function startDragging(todo: todo){
  draggingItem.value = todo
}

function handleDrop(targetItem: todo){
  if (!draggingItem.value || draggingItem.value.id === targetItem.id) return

  const draggedIndex = todos.value.findIndex(i => i.id === draggingItem.value!.id)
  const targetIndex = todos.value.findIndex(i => i.id === targetItem.id)

  todos.value.splice(draggedIndex, 1)
  todos.value.splice(targetIndex, 0, draggingItem.value)

  draggingItem.value = null
}
</script>

<template>
  <body>
  <h1>Todo Liste</h1>
  <div class="listContainer">
    <ul class="list">
        <TodoItem
          class="listItem"
          v-for = "(todo, idx) in hiddenTodos" :key="todo.id"
          :draggable="true"
          :list_id = idx
          :initial_id = todo.id
          :initial_todo_item_name = todo.text
          :disable_edit = "globalEditActive"
          @edit_done="updateTodo"
          @done="flagDone"
          @edit="editActive"
          @dragstart="startDragging(todo)"
          @dragover.prevent
          @drop="handleDrop(todo)"
        >
        </TodoItem>
    </ul>
  </div>
  </body>
</template>

<style scoped>
.listItem {
  display: flex;
  flex-direction: column;
  padding: 5px;
  background: whitesmoke;
  border: 15px solid lightgray;
}
.listContainer{
  margin: 15px;
  padding: 25px 0;
  box-sizing: border-box;

}
</style>