<script setup lang="ts">
import TodoDoneButton from "@/TodoDoneButton.vue";
import TodoEditButton from "@/TodoEditButton.vue";
import {nextTick, ref, useTemplateRef} from "vue";
import TodoEditDoneButton from "@/TodoEditDoneButton.vue";


const inputRef = ref<HTMLInputElement | null>(null)

const props = defineProps<{
  initial_id: number
  initial_todo_item_name: string
  list_id: number
  disable_edit: boolean
}>();

const edit  = ref(props.disable_edit)
const todo_item_name = ref(props.initial_todo_item_name)
const id = ref(props.initial_id)

const emit = defineEmits<{
  (e: 'done', id: number): void
  (e: 'edit'): void
  (e: 'edit_done', value: string, id: number): void
}>()

function startEdit(){
  emit("edit")
  edit.value = true
  nextTick(() => {
    inputRef.value?.focus()
  })
}

function editDone(): void {
  emit("edit_done",
      todo_item_name.value , id.value )
  nextTick(() => {
    edit.value = false
  })
}

function flagDone(): void {
  emit("done", id.value)
}
</script>

<template>
  <div class="container">
    <div class="listItem">
      <input type="checkbox">
      <br>
      <span >
        {{ list_id+1}}
      </span>
      <br>
      <span>
        -
      </span>
      <br>
      <span>
        {{ todo_item_name }}
      </span>
      <br>
      <TodoDoneButton
          @done="flagDone" />
      <br>
      <TodoEditButton
          :disabled="props.disable_edit"
          @edit="startEdit"/>
      <br>
    </div>
    <div class="editField">
      <form @submit.prevent="editDone">
      <input
          ref="inputRef"
          v-if="edit"
          type="text"
          v-model="todo_item_name"
      />
      <TodoEditDoneButton v-if="edit"
                          @edit_done="editDone" />
        </form>
    </div>
  </div>
</template>

<style scoped>
body{
  font-family: "open sans",sans-serif;
}
.container{

}
.listItem {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-around;
  padding: .5em .5em .5em .5em;
  max-width: 50vw;
  min-width: 25vw;
  text-overflow: ellipsis;
}

.editField{
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-around;
}
.itemName{
  overflow:auto;
}
.listItem.span{
  max-width: 50vw;
}
.listItem.input{
  max-width: 50vw;
}
</style>