<script setup lang="ts">
import {hiddenTodos} from "@/Todos.ts";
import TodoItem from "@/TodoItem.vue";

</script>

<template>
  <div>
    <div class="listContainer">
      <ul class="list">
        <TodoItem
          v-for="(todo, idx) in hiddenTodos"
          :key="todo.id"
          :initial_id="todo.id"
          :initial_todo_item_name="todo.text"
          :list_id="idx"
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

</style>
