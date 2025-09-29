import {ref} from "vue";
import {type Todo, type TodosStore} from "@/Todos"


const draggingItem = ref<Todo | null>(null)
const dragOverItem = ref<Todo | null>(null)

// Store Instanz importieren
let _store: TodosStore | null = null
export function setDNDStore(store: TodosStore) {
    _store = store
}

function getStore(): TodosStore {
    if (!_store) throw new Error("DragAndDropHandler: setDndStore(...) must be called first")
    return _store
}

// export function setDraggingItem(todo: Todo) {
//     draggingItem.value = todo
// }
export function resetDraggingItem() {
    draggingItem.value = null
}
export function getDraggingItem() {
    return draggingItem.value
}
export function getDraggingItemId() {
    return draggingItem.value?.id
}

// export function setDragOverItem(todo: Todo) {
//     dragOverItem.value = todo
// }
export function getDragOverItem() {
    return dragOverItem.value
}
export function getDragOverItemId() {
    return dragOverItem.value?.id
}

export function startDragging(todo: Todo) {
    draggingItem.value = todo
}

export function handleDragOver(todo: Todo) {
    dragOverItem.value = todo
}

export function handleDrop( targetItem: Todo) {
    const store = getStore()
   if (!draggingItem.value || draggingItem.value.id === targetItem.id) return

    const draggedIndex = store.todos.value.findIndex(i => i.id === draggingItem.value!.id)
    const targetIndex = store.todos.value.findIndex(i => i.id === targetItem.id)

    console.log(
        draggedIndex,
        targetIndex,
        draggingItem,
        targetItem,
        "store.todos: ", store.todos,
        "hiddenTodos: " , store.hiddenTodos.value
    )

    // swap
    // const temp = store.todos.value[draggedIndex]
    // store.todos.value[draggedIndex] = store.todos.value[targetIndex]
    // store.todos.value[targetIndex] = temp

    // Einfügen
    store.todos.value.splice(draggedIndex, 1)
    store.todos.value.splice(targetIndex, 0, draggingItem.value)

    draggingItem.value = null
    dragOverItem.value = null
}

export function handleDragLeave(todo: Todo) {
    if (dragOverItem.value && dragOverItem.value.id === todo.id) {
        dragOverItem.value = null
    }
}