<script setup lang="ts">
import TodoItem from "@/TodoItem.vue";
import {
  getDraggingItem,
  getDraggingItemId,
  getDragOverItem,
  getDragOverItemId, handleDragLeave,
  handleDragOver, handleDrop, resetDraggingItem,
  startDragging
} from "@/DragAndDropHandler.ts";
import { updateTodo, flagDelete, editActive, getEditStatus } from "@/Todos";
import type {todo} from "@/assets/TodoInterface.ts";

const props = defineProps<{
  todo: todo
  idx: number
}>();
</script>

<template>
  <TodoItem
      class="listItem"
      :list_id="props.idx"
      :initial_id="props.todo.id"
      :initial_todo_item_name="props.todo.text"
      :disable_edit="getEditStatus()"
      draggable="true"
      :class="{
            dragging: getDraggingItem() && getDraggingItemId() === todo.id,
            dragover: getDraggingItem() && getDragOverItem() && getDragOverItemId() === todo.id
          }"
      @edit_done="updateTodo"
      @delete="flagDelete"
      @edit="editActive"
      @dragstart="startDragging(todo)"
      @dragover.prevent="handleDragOver(todo)"
      @dragleave="handleDragLeave(todo)"
      @drop="handleDrop(todo)"
      @dragend="resetDraggingItem()"
  />
</template>

<style scoped>

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