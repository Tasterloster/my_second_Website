<script setup lang="ts">
import TodoItem from "@/TodoItem.vue";
import {
  getDraggingItem,
  getDraggingItemId,
  getDragOverItem,
  getDragOverItemId, handleDragLeave,
  handleDragOver, handleDrop, resetDraggingItem,
  startDragging
} from "@/DragAndDrop.ts";
import { updateTodo, flagDone, editActive, getEditStatus } from "@/Todos";
import type {todo} from "@/TodoInterface.ts";

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
      @done="flagDone"
      @edit="editActive"
      @dragstart="startDragging(todo)"
      @dragover.prevent="handleDragOver(todo)"
      @dragleave="handleDragLeave(todo)"
      @drop="handleDrop(todo)"
      @dragend="resetDraggingItem()"
  />
</template>

<style scoped>

</style>