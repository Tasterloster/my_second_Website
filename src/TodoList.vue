<script setup lang="ts">
import {hiddenTodos} from "@/Todos.ts";
import TodoItemWrapper from "@/TodoItemWrapper.vue";

</script>

<template>
  <div>
    <div class="listContainer">
      <h1>Todo Liste</h1>
      <ul class="list">
        <TodoItemWrapper
          v-for="(todo, idx) in hiddenTodos"
          :key="todo.id"
          :todo="todo"
          :idx="idx"
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

</style>
