<script setup lang="ts">
import Header_components from "@/Header_components.vue";
import TodoList from "@/TodoList.vue";

</script>

<template>
  <header>
    <header_components/>
  </header>
  <body>
    <TodoList/>
  </body>
</template>

<style scoped>
  body{
    display: flex;
    justify-content: center;
  }
</style>
