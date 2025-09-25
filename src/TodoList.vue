<script setup lang="ts">
import { computed, ref } from "vue";
import TodoItem from "@/TodoItem.vue";

let id = 0
const todosSize = 10
const globalEditActive = ref(false)

interface todo {
  id: number
  text: string
  done: boolean
}

const todos = ref<todo[]>([])
for (let i = 0; i < todosSize; i++) {
  todos.value.push({ id: id++, text: `Eintrag ${i}`, done: false })
}

const hiddenTodos = computed(() => {
  return todos.value.filter((t) => !t.done)
})

function updateTodo(new_Name: string, id: number) {
  globalEditActive.value = false
  const todo_to_update = todos.value.find((t) => t.id === id)
  if (todo_to_update) {
    todo_to_update.text = new_Name
  }
}

function flagDone(id: number) {
  const todo_to_set_done = todos.value.find((t) => t.id === id)
  if (todo_to_set_done) {
    todo_to_set_done.done = true
  }
}

function editActive() {
  globalEditActive.value = true
}

const draggingItem = ref<todo | null>(null)
const dragOverItem = ref<todo | null>(null)

function startDragging(todo: todo) {
  draggingItem.value = todo
}

function handleDragOver(todo: todo) {
  dragOverItem.value = todo
}

function handleDrop(targetItem: todo) {
  console.log(dragOverItem.value)
  if (!draggingItem.value || draggingItem.value.id === targetItem.id) return

  const draggedIndex = todos.value.findIndex(i => i.id === draggingItem.value!.id)
  const targetIndex = todos.value.findIndex(i => i.id === targetItem.id)

  // swap
  const temp = todos.value[draggedIndex]
  todos.value[draggedIndex] = todos.value[targetIndex]
  todos.value[targetIndex] = temp

  draggingItem.value = null
  dragOverItem.value = null
  console.log(todos)
}

function handleDragLeave(todo: todo) {
  if (dragOverItem.value && dragOverItem.value.id === todo.id) {
    dragOverItem.value = null
  }
}
</script>

<template>
  <div>
    <div class="listContainer">
      <h1>Todo Liste</h1>
      <ul class="list">
        <TodoItem
            class="listItem"
            v-for="(todo, idx) in hiddenTodos"
            :key="todo.id"
            :list_id="idx"
            :initial_id="todo.id"
            :initial_todo_item_name="todo.text"
            :disable_edit="globalEditActive"
            draggable="true"
            :class="{
            dragging: draggingItem && draggingItem.id === todo.id,
            dragover: draggingItem && dragOverItem && dragOverItem.id === todo.id
          }"
            @edit_done="updateTodo"
            @done="flagDone"
            @edit="editActive"
            @dragstart="startDragging(todo)"
            @dragover.prevent="handleDragOver(todo)"
            @dragleave="handleDragLeave(todo)"
            @drop="handleDrop(todo)"
            @dragend="draggingItem = null"
        />
      </ul>
    </div>
  </div>
</template>

<style scoped>
body{
  font-family: "open sans",sans-serif;
}

.listContainer {
  margin: 15px;
  box-sizing: border-box;
  justify-content: center;
}

.listItem {
  display: flex;
  flex-direction: column;
  padding: 1.5em .5em .5em .5em;
  background: whitesmoke;
  border: 2px solid lightgray;
  margin-bottom: 8px;
  transition: background 0.2s, border 0.2s, opacity 0.2s;
}

.listItem.dragging {
  opacity: 0.5;
  background: lightblue;
  border-color: blue;
}

.listItem.dragover {
  background: lightgreen;
  border-color: green;
}

.h1{
  display: flex;
  flex-direction: column;
}
</style>
