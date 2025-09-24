<script setup lang="ts">
import TodoDoneButton from "@/TodoDoneButton.vue";
import TodoEditButton from "@/TodoEditButton.vue";
import {ref} from "vue";
import TodoEditDoneButton from "@/TodoEditDoneButton.vue";

const props = defineProps<{
  id: number
  initial_todo_item_name: string
}>();

const emit = defineEmits<{
  (e: 'done'): void
  (e: 'edit_done', value: string): void
}>()

const todo_item_name = ref(props.initial_todo_item_name)
const edit = ref(false)
</script>

<template>
  <div class="container">
    <input type="checkbox">
    <input v-if="edit" type="text" v-model="todo_item_name"/>
    <span >{{ id }} - {{ todo_item_name }} </span>
    <TodoDoneButton v-if="!edit" @done="$emit('done')" />
    <TodoEditButton v-if="!edit" @edit="edit = true"/>
    <TodoEditDoneButton v-if="edit" @edit_done="$emit('edit_done', todo_item_name.value)" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  gap: .5em;
}
</style>