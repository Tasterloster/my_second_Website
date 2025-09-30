<script setup lang="ts">
import Header_components from "@/Header_components.vue";
import TodoItemList from "@/TodoItemList.vue";
import ToolList from "@/ToolList.vue";
import {onMounted} from "vue";
import { useTodosStore } from "./Todos";

const store = useTodosStore();
// onMounted(() => {
//   store.loadTodos().catch(console.warn)
// })

</script>

<template>
  <header>
    <header_components/>
  </header>
  <body>
  <h1>Todo Liste</h1>
  <ToolList/>
  <TodoItemList/>
  </body>
</template>

<style scoped>
  body{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
</style>
