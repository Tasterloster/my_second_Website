import {computed, ref} from "vue";
import type {todo} from "@/TodoInterface.ts";

let id = 0
const todosSize = 10

export const todos = ref<todo[]>([])
for (let i = 0; i < todosSize; i++) {
    todos.value.push({ id: id++, text: `Eintrag ${i}`, done: false })
}

export const globalEditActive = ref(false)

export const hiddenTodos = computed(() => {
    return todos.value.filter((t) => !t.done)
})

export function updateTodo(new_Name: string, id: number) {
    globalEditActive.value = false
    const todo_to_update = todos.value.find((t) => t.id === id)
    if (todo_to_update) {
        todo_to_update.text = new_Name
    }
}

export function flagDone(id: number) {
    const todo_to_set_done = todos.value.find((t) => t.id === id)
    if (todo_to_set_done) {
        todo_to_set_done.done = true
    }
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
