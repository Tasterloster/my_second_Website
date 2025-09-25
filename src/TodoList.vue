<script setup lang="ts">
import {hiddenTodos} from "@/Todos.ts";
import TodoItemWrapper from "@/TodoItemWrapper.vue";

</script>

<template>
  <div>
    <div class="listContainer">
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

</style>
