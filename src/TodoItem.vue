<script setup lang="ts">
import TodoDeleteButton from "@/TodoDeleteButton.vue";
import TodoEditButton from "@/TodoEditButton.vue";
import {computed, nextTick, ref, useTemplateRef, watch} from "vue";
import TodoEditDoneButton from "@/TodoEditDoneButton.vue";
import {editActive, editInactive, getEditStatus} from "@/Todos.ts";
import SaveButton from "@/SaveButton.vue";
import CancelButton from "@/CancelButton.vue";


const inputRef = ref<HTMLInputElement | null>(null)

const props = defineProps<{
  initial_id: number
  initial_todo_item_name: string
  list_id: number
}>();

const todo_item_name = ref(props.initial_todo_item_name)
const id = ref(props.initial_id)

const emit = defineEmits<{
  (e: 'deleted', id: number): void
  (e: 'edit_done', value: string, id: number): void
}>()

function startEdit(){
  editActive()
  inputRef.value?.focus()
}

function flagDelete(): void {
  emit("deleted", id.value)
}

</script>

<template>
  <div class="container">
    <div class="listItem">
      <input type="checkbox">
      <span >
        {{ list_id+1}}.
      </span>
      <span class="todoText">
        {{ todo_item_name }}
      </span>
      <TodoDeleteButton
          @deleted="flagDelete" />
      <TodoEditButton
          :disabled="getEditStatus"
          @edit="startEdit"/>
    </div>
    <div class="editField" v-if="getEditStatus()">
      <form @submit.prevent="editInactive">
        <input
            ref="inputRef"
            type="text"
            v-model="todo_item_name"
        />
        <SaveButton/>
        <cancelButton/>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container{
  max-width: 75vw;
  min-width: 50vw;
}
.listItem {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-around;
  padding: .5em .5em .5em .5em;
  text-overflow: ellipsis;
}

.editField{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: .5em 0;
  gap: .5em;
  box-sizing: border-box;
}

.todoText{
  display: block;
  max-width: min(35vw, 100%);
  overflow-wrap: break-word;
  white-space: normal;
}

</style>