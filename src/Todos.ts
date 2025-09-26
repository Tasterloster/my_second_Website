import { ref, computed, readonly } from "vue"        // Vue-Reaktivität & Hilfsfunktionen

export interface Todo {
    id: number
    text: string
    deleted: boolean
    check: boolean
}

export function useTodosStore() {
    // --- State ---
    const todos = ref<Todo[]>([])                      // Liste aller Todos
    const globalEditActive = ref(false)                      // global: ob irgendein Edit läuft
    const editingTodoId = ref<number | null>(null)     // ID des aktuell editierten Todos

    // Initial-Daten (10 Beispiel-Todos)
    let id = 0
    const todosSize = 10
    for (let i = 0; i < todosSize; i++) {
        todos.value.push({
            id: id++,
            text: `Eintrag ${i}`,
            deleted: false,
            check: false
        })
    }

    // --- Getters ---
    const editStatus = readonly(globalEditActive)      // nur lesbarer Zugriff auf globalEditActive

    const editingTodo = computed<Todo | null>(() =>    // liefert das aktuell editierten Todo oder null
        todos.value.find((t) => t.id === editingTodoId.value) || null
    )

    const hiddenTodos = computed<Todo[]>(() =>         // Todos, die nicht gelöscht sind
        todos.value.filter((t) => !t.deleted)
    )

    const checkedTodos = computed<Todo[]>(() =>        // Todos, die abgehakt sind
        todos.value.filter((t) => t.check)
    )

    // --- Actions ---
    function addTodo(text: string) {                   // neues Todo hinzufügen
        todos.value.push({ id: id++, text, deleted: false, check: false })
    }

    function updateTodo(id: number, newName: string) { // Todo-Text aktualisieren
        const todo = todos.value.find((t) => t.id === id)
        if (todo) {
            todo.text = newName
        }
    }

    function flagDelete(id: number) {                  // Todo als gelöscht markieren
        const todo = todos.value.find((t) => t.id === id)
        if (todo) {
            todo.deleted = true
        }
        endEdit()                                        // Edit beenden, falls aktiv
    }

    function startEdit(id: number) {                   // Edit-Modus starten
        editingTodoId.value = id
        globalEditActive.value = true
    }

    function endEdit() {                               // Edit-Modus beenden
        editingTodoId.value = null
        globalEditActive.value = false
    }

    function cancelEdit() {                            // Edit-Modus abbrechen
        endEdit()
    }

    // --- Public API ---
    return {
        // State
        todos,
        globalEditActive,
        editingTodoId,

        // Getters
        editStatus,
        editingTodo,
        hiddenTodos,
        checkedTodos,

        // Actions
        addTodo,
        updateTodo,
        flagDelete,
        startEdit,
        endEdit,
        cancelEdit
    }
}

export type TodosStore = ReturnType<typeof useTodosStore>