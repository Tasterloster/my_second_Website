import {ref} from "vue";
import { type todo } from "@/Todos.ts"
import {todos} from "@/Todos.ts";


const draggingItem = ref<todo | null>(null)
const dragOverItem = ref<todo | null>(null)

export function setDraggingItem(todo: todo) {
    draggingItem.value = todo
}
export function resetDraggingItem() {
    draggingItem.value = null
}
export function getDraggingItem() {
    return draggingItem.value
}
export function getDraggingItemId() {
    return draggingItem.value?.id
}

export function setDragOverItem(todo: todo) {
    dragOverItem.value = todo
}
export function getDragOverItem() {
    return dragOverItem.value
}
export function getDragOverItemId() {
    return dragOverItem.value?.id
}

export function startDragging(todo: todo) {
    draggingItem.value = todo
}

export function handleDragOver(todo: todo) {
    dragOverItem.value = todo
}

export function handleDrop(targetItem: todo) {
   if (!draggingItem.value || draggingItem.value.id === targetItem.id) return

    const draggedIndex = todos.value.findIndex(i => i.id === draggingItem.value!.id)
    const targetIndex = todos.value.findIndex(i => i.id === targetItem.id)

    // swap
    // const temp = todos.value[draggedIndex]
    // todos.value[draggedIndex] = todos.value[targetIndex]
    // todos.value[targetIndex] = temp

    todos.value.splice(draggedIndex,1)
    todos.value.splice(targetIndex, 0,draggingItem.value)

    draggingItem.value = null
    dragOverItem.value = null
}

export function handleDragLeave(todo: todo) {
    if (dragOverItem.value && dragOverItem.value.id === todo.id) {
        dragOverItem.value = null
    }
}