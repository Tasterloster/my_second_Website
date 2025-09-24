<script setup lang="ts">
import {computed, ref} from "vue";
import TodoItem from "@/TodoItem.vue";

let id = 0
const todos = ref<{ id: number, text: string, done: boolean }[]>([])
for (let i = 0; i < 10; i++) {
  todos.value.push({ id:id++, text: `Eintrag ${i}`, done: false})
}

const hiddenTodos = computed(() => {
  return todos.value.filter((t) => !t.done)
})

function updateTodo(string: new_Name, id: number){
  let todo_to_update = todos.value.filter((t) => t.id == id)[0]
  console.log(todo_to_update)
  todo_to_update.text = new_Name
}
</script>

<template>
  <div class="container">
    <h1>Todo Liste</h1>
    <ul class="list">
        <TodoItem
          v-for = "todo in hiddenTodos"
          :id = todo.id
          :initial_todo_item_name = todo.text
          @edit_done="updateTodo(todo.text, todo.id)"
          @done="todo.done = true"></TodoItem>
<!--      //text aus emit und nicht von todo.text nehmen-->
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