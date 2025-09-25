import {computed, ref} from "vue";
import type {todo} from "@/assets/TodoInterface.ts";

let id = 0
const todosSize = 10

export const todos = ref<todo[]>([])
for (let i = 0; i < todosSize; i++) {
    todos.value.push({ id: id++, text: `Eintrag ${i}`, delete: false })
}

export const globalEditActive = ref(false)

export const hiddenTodos = computed(() => {
    return todos.value.filter((t) => !t.delete)
})

export function updateTodo(new_Name: string, id: number) {
    editInactive()
    const todo_to_update = todos.value.find((t) => t.id === id)
    if (todo_to_update) {
        todo_to_update.text = new_Name
    }
}

export function flagDelete(id: number) {
    const todo_to_set_delete = todos.value.find((t) => t.id === id)
    if (todo_to_set_delete) {
        todo_to_set_delete.delete = true
    }
    editActive()
}

export function editActive() {
    globalEditActive.value = true
}

export function editInactive() {
    globalEditActive.value = false
}

export function getEditStatus() {
    return globalEditActive.value
}
