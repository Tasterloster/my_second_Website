<script setup lang="ts">
import TodoDoneButton from "@/TodoDoneButton.vue";
import TodoEditButton from "@/TodoEditButton.vue";
import {ref} from "vue";
import TodoEditDoneButton from "@/TodoEditDoneButton.vue";

const edit  = ref(false)

const props = defineProps<{
  initial_id: number
  initial_todo_item_name: string
  list_id: number
}>();

const todo_item_name = ref(props.initial_todo_item_name)
const id = ref(props.initial_id)

const emit = defineEmits<{
  (e: 'done', id: number): void
  (e: 'edit_done', value: string, id: number): void
}>()

function editDone(): void {
  emit("edit_done",
      todo_item_name.value , id.value )
  edit.value = false
}

function flagDone(): void {
  emit("done", id.value)
}
</script>

<template>
  <div class="container">
    <input type="checkbox">
    <input v-if="edit" type="text" v-model="todo_item_name"/>
    <span v-if="!edit">
      {{ list_id +1 }} - {{ todo_item_name }}
    </span>
    <TodoDoneButton v-if="!edit"
                    @done="flagDone" />
    <TodoEditButton v-if="!edit"
                    @edit="edit = true"/>
    <TodoEditDoneButton v-if="edit"
                    @edit_done="editDone" />


  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  gap: .5em;
}
</style>