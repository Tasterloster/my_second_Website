<script setup lang="ts">
import {useTodosStore} from "@/Todos";
import TodoItem from "@/TodoItem.vue";
import BaseButton from "@/BaseButton.vue";
import DeleteButton from "@/DeleteButton.vue";
import EditButton from "@/EditButton.vue";

const store = useTodosStore();
const hiddenTodos = store.hiddenTodos

</script>

<template>
  <div>
    <div class="listContainer">
      <ul class="list">
        <TodoItem
            v-for="(todo) in hiddenTodos"
            :key="todo.id"
        >
          <template #prefix>
            <input type="checkbox">
          </template>
          <template #content>
            {{ todo.text }}
          </template>
          <template #actions>
            <DeleteButton/>
            <EditButton/>
          </template>
        </TodoItem>
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
