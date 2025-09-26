<script setup lang="ts">
import {useTodosStore} from "@/Todos";
import TodoItem from "@/TodoItem.vue";
import DeleteButton from "@/DeleteButton.vue";
import EditButton from "@/EditButton.vue";
import SaveButton from "@/SaveButton.vue";
import CancelButton from "@/CancelButton.vue";

const store = useTodosStore();
const hiddenTodos = store.hiddenTodos

const isEditing = (id: number) => store.editingTodoId.value === id

function onToggle(todo: { id: number; check: boolean }) {
  todo.check = !todo.check
}
function onEdit(todoId: number) {
  store.startEdit(todoId)
}
function onDelete(todoId: number) {
  store.flagDelete(todoId)
}
function onInput(todoId: number, e: Event) {
  const val = (e.target as HTMLInputElement).value
  store.updateTodo(todoId, val)
}
function onSave() {
  store.endEdit()
}
function onCancel() {
  store.cancelEdit()
}
</script>

<template>
  <div>
    <div class="listContainer">
      <ul class="list">
        <TodoItem class="TodoItem"
            v-for="(todo, idx) in hiddenTodos"
            :key="todo.id">
          <template #prefix>
            <input type="checkbox"
              :checked="todo.check"
              @change="onToggle(todo)"
            />
          </template>
          <template #content>
            {{ idx+1 }}. {{ todo.text }}
          </template>
          <template #actions>
            <DeleteButton
              @click="onDelete(todo.id)"
            />
            <EditButton
              v-if="!isEditing(todo.id)"
              @click="onEdit(todo.id)"
            />
          </template>
          <template #inputField v-if="isEditing(todo.id)">
            <form>
              <input
                type="text"
                :value="todo.text"
                @input="onInput(todo.id, $event)"
                @keyup.esc="onCancel"
              />
              <save-button @click.lazy="onSave()" />
              <cancel-button @click="onCancel()" />
            </form>
          </template>/
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
.TodoItem{
  display: flex;
  flex-direction: column;
  background: whitesmoke;
  border: 2px solid lightgray;
  border-radius: 5px;
  margin-bottom: 8px;
  transition: background 0.2s, border 0.2s, opacity 0.2s;
}

</style>
