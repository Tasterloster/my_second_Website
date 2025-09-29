import { ref, computed, readonly } from "vue"        // Vue-Reaktivität & Hilfsfunktionen

export interface Todo {
    id: number
    text: string
    deleted: boolean
    check: boolean
}

export function createTodosStore() {
    // --- State ---
    const todos = ref<Todo[]>([])                      // Liste aller Todos
    const globalEditActive = ref(false)                      // global: ob irgendein Edit läuft
    const editingTodoId = ref<number | null>(null)     // ID des aktuell editierten Todos
    const editDraft = ref<string>("")

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

    const anyCheckedTodos = computed(() =>
        todos.value.some((t) => t.check)
    )

    const allCheckedTodos = computed(() =>
        todos.value.length > 0 && todos.value.every(t => t.check)
    )

    // --- Actions ---

    function printLog(logText: string[], actionPerformed: string) {
        if (logText.length > 0) {
            let logString =""
            switch (actionPerformed) {
                case "edited":
                    logString = `${logText.join(" ")}`
                    console.log(Date().toString(), ":", logString)
                    break;
                default:
                    logString = `${logText.join(", ")} has been ${actionPerformed}`
                    console.log(Date().toString(), ": ", logString)
                    break;
            }
        }
    }

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
        let deleted: string[] = []
        const actionPerformed = "deleted"
        if (todo) {
            todo.deleted = true
            deleted.push(`'${todo.text}'`)
        }
        endEdit()                                        // Edit beenden, falls aktiv
        printLog(deleted, actionPerformed)
    }

    function deleteAll(){
        let deleted :string[] = []
        const actionPerformed = "deleted"
        todos.value.forEach(t =>{
            if(t.check){
                t.deleted = true
                toggleCheck(t.id)
                deleted.push(`'${t.text}'`)
            }
        })
        endEdit()
        printLog(deleted, actionPerformed)
    }

    function toggleCheck(id: number) {
        const t = todos.value.find(t => t.id === id)
        if (t) t.check = !t.check
    }

    function toggleAll(){
        if (allCheckedTodos.value) {
            todos.value.forEach(t => { if (t.check) t.check = false })
        } else {
            todos.value.forEach(t => { if (!t.check) t.check = true })
        }
    }


    function restoreAll(){
        let restored :string[] = []
        const actionPerformed = "restored"
        todos.value.forEach(t => {
            if(t.deleted){
                t.deleted = false
                restored.push(`'${t.text}'`)
            }})
        printLog(restored, actionPerformed)
    }

    function startEdit(id: number) {                   // Edit-Modus starten
        editingTodoId.value = id
        globalEditActive.value = true
        const t = todos.value.find((t) => t.id === id)
        editDraft.value = t ? t.text : ""
    }

    function saveEdit(){
        let edited :string[] = []
        const actionPerformed = "edited"
        const id = editingTodoId.value
        if (id== null) return
        const t = todos.value.find((t) => t.id === id)
        if (t){
            edited.push(`'${t?.text}'`)
            edited.push(`has been edited to`)
            edited.push(`'${editDraft.value}'`)
            t.text = editDraft.value
            printLog(edited, actionPerformed)
        }
        endEdit()
    }

    function endEdit() {                               // Edit-Modus beenden
        editingTodoId.value = null
        globalEditActive.value = false
    }

    function cancelEdit() {                            // Edit-Modus abbrechen
        editDraft.value = ""
        endEdit()
    }

    // --- Public API ---
    return {
        // State
        todos,
        globalEditActive,
        editingTodoId,
        editDraft,

        // Getters
        editStatus,
        editingTodo,
        hiddenTodos,
        checkedTodos,
        anyCheckedTodos,
        allCheckedTodos,

        // Actions
        printLog,
        addTodo,
        updateTodo,
        flagDelete,
        deleteAll,
        toggleCheck,
        toggleAll,
        restoreAll,
        startEdit,
        saveEdit,
        endEdit,
        cancelEdit
    }
}

let _store: ReturnType<typeof createTodosStore> |null = null
export function useTodosStore(){
    if(!_store){
        _store = createTodosStore()
    }
    return _store
}
export type TodosStore = ReturnType<typeof createTodosStore>