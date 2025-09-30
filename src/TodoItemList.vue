<script setup lang="ts">
import {type Directive, nextTick, ref} from "vue"
import {useTodosStore} from "@/Todos";
import TodoItem from "@/TodoItem.vue";
import DeleteButton from "@/DeleteButton.vue";
import EditButton from "@/EditButton.vue";
import DownloadButton from "@/DownloadButton.vue";
import CancelButton from "@/CancelButton.vue";
import {
  getDraggingItem,
  getDraggingItemId,
  getDragOverItem,
  getDragOverItemId, handleDragLeave, handleDragOver, handleDrop,
  resetDraggingItem, startDragging
} from "@/DragAndDropHandler";
import SaveButton from "@/SaveButton.vue";

const store = useTodosStore();
const hiddenTodos = store.hiddenTodos
const isEditing = (id: number) => store.editingTodoId.value === id

const vFocus: Directive<HTMLInputElement, void> = {
  mounted(el){
    nextTick(() => {
      el.focus()
    })
  }
}


</script>

<template>
  <div>
    <div class="listContainer">
      <ul class="list">
        <TodoItem class="TodoItem"
                  v-for="(todo, idx) in hiddenTodos"
                  :key="todo.id"
                  draggable="true"
                  :class="{
                    dragging: getDraggingItem() && getDraggingItemId() === todo.id,
                    dragover: getDraggingItem() && getDragOverItem() && getDragOverItemId() === todo.id
                  }"
                  @dragstart="startDragging(todo)"
                  @dragover.prevent="handleDragOver(todo)"
                  @dragleave="handleDragLeave(todo)"
                  @drop="handleDrop(todo)"
                  @dragend="resetDraggingItem()"
        >
          <template #prefix>
            <input type="checkbox"
                   :checked="todo.checked"
                   @change="store.toggleCheck(todo.id)"
            />
          </template>
          <template #content>
            {{ idx + 1 }}. {{ todo.text }}
          </template>
          <template #actions>
            <div class="actionsContainer">
            <EditButton
                v-if="!isEditing(todo.id)"
                @click="store.startEdit(todo.id)"
            />
            <DeleteButton
                @click="store.flagDelete(todo.id)"
            />
            </div>
          </template>
          <template #inputField v-if="isEditing(todo.id)">
            <form @submit.prevent="store.saveEdit()">
              <input
                  type="text"
                  v-focus
                  v-model="store.editDraft.value"
                  @keyup.esc="store.cancelEdit()"
              />
              <save-button @click="store.saveEdit()"/>
              <cancel-button @click="store.cancelEdit()"/>
            </form>
          </template>
        </TodoItem>
      </ul>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: "open sans", sans-serif;
}

.listContainer {
  margin: 15px;
  box-sizing: border-box;
  justify-content: center;
}

.TodoItem {
  display: flex;
  flex-direction: column;
  background: whitesmoke;
  border: 2px solid lightgray;
  border-radius: 5px;
  margin-bottom: 8px;
  transition: background 0.2s, border 0.2s, opacity 0.2s;
}

.TodoItem.dragging {
  opacity: 0.5;
  background: lightblue;
  border-color: blue;
}

.TodoItem.dragover {
  background: lightgreen;
  border-color: green;
}

.TodoItem .actionsContainer{
  opacity: 0;
  transition: opacity 0.2s ease;
}

.TodoItem:hover .actionsContainer{
  opacity: 1;
}
</style>
