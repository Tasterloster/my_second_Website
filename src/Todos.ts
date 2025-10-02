import {ref, computed, readonly, watch, onUnmounted, onBeforeUnmount, onMounted} from "vue"
import {
    saveWithBackupFiles,
    saveTodosToLocalStorage,
    loadTodosFromLocalStorage, fetchTodosFromPublic, saveCurrDeletedIntoPrevDeleted
} from "@/TodosIO.ts";        // Vue-Reaktivität & Hilfsfunktionen

export interface Todo {
    id: number
    text: string
    deleted: boolean
    checked: boolean
}

export function createTodosStore() {
    // --- State ---
    let id = 0
    const todos = ref<Todo[]>([])                      // Liste aller Todos
    const deletedTodos = ref<Todo[] >([])                      // Liste aller Todos
    const restoredTodos = ref<Todo[] >([])                      // Liste aller Todos
    const globalEditActive = ref(false)                      // global: ob irgendein Edit läuft
    const editingTodoId = ref<number | null>(null)     // ID des aktuell editierten Todos
    const editDraft = ref<string>("")

    watch(
        todos,(val) => saveTodosToLocalStorage(val),
        {deep: true},
    )

    restoredTodos.value = loadTodosFromLocalStorage("")
    // console.log("[restored]: todos list", restoredTodos.value)
    deletedTodos.value = loadTodosFromLocalStorage("deleted")
    // console.log("[restored]: trash list", restoredTodos.value)
    if (restoredTodos.value) {
        todos.value = restoredTodos.value
        let importString :string[] = []
        todos.value.forEach(t => importString.push(`'${t.text}'`))
        printLog(importString, "imported")
        resetID()
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
        todos.value.filter((t) => t.checked)
    )

    const anyCheckedTodos = computed(() =>
        todos.value.some((t) => t.checked)
    )

    const allCheckedTodos = computed(() =>
        todos.value.length > 0 && todos.value.every(t => t.checked)
    )

    // --- Actions ---
    // async function loadTodos(filename?: string) {
    //     const actionPerformed = "loaded"
    //     let parsedString: string[] = []
    //     const parsed = await fetchTodosFromPublic(filename)
    //     todos.value = parsed
    //     todos.value.forEach(t => {
    //         parsedString.push(`'${t.text}'`)
    //     })
    //     resetID()
    //     printLog(parsedString, actionPerformed)
    // }



    function printLog(logText: string[], actionPerformed: string) {
        if (logText.length > 0) {
            let logString = ""
            switch (actionPerformed) {
                case "edited":
                    logString = `${logText.join(" ")}`
                    break;
                default:
                    logString = `${logText.join(", ")} has been ${actionPerformed}`
                    break;
            }
            printFormattedLog(logString, actionPerformed)
        }
    }

    function printFormattedLog(logString: string, actionPerformed: string) {
        console.log(`[${actionPerformed}]`, Date().toString(), ": ", logString)
    }

    function resetID() {
        id = todos.value.length ? Math.max(...todos.value.map((t) => t.id)) + 1 : 0;
    }

    function addTodo(text: string) {
        todos.value.push({id: id++, text, deleted: false, checked: false})
    }

    function updateTodo(id: number, newName: string) {
        const todo = todos.value.find((t) => t.id === id)
        if (todo) {
            todo.text = newName
        }
    }

    function flagDelete(id: number) {
        const t = todos.value.find((t) => t.id === id)
        let deleted: string[] = []
        const actionPerformed = "deleted"
        if(!t) return
        t.deleted = true
        deletedTodos.value.push(t)
        todos.value = todos.value.filter(x => x.id !== id)
        deleted.push(`'${t?.text}'`)
        endEdit()
        printLog(deleted, actionPerformed)
    }

    function deleteAll() {
        let deleted: string[] = []
        const actionPerformed = "deleted"
        console.log("[todos]: ", todos.value, "[deletedTodos]: ", deletedTodos.value)
        todos.value.forEach(t => {
            if (t.checked) {
                flagDelete(t.id)
                t.deleted = true
                toggleCheck(t.id)
                deletedTodos.value?.push(t)
                deleted.push(`'${t.text}'`)
            }
        })
        console.log("[todos]: ", todos.value, "[deletedTodos]: ", deletedTodos.value)
        endEdit()
        printLog(deleted, actionPerformed)
    }

    function toggleCheck(id: number) {
        const t = todos.value.find(t => t.id === id)
        if (t) t.checked = !t.checked
    }

    function toggleAll() {
        if (allCheckedTodos.value) {
            todos.value.forEach(t => {
                if (t.checked) t.checked = false
            })
        } else {
            todos.value.forEach(t => {
                if (!t.checked) t.checked = true
            })
        }
    }

    function restoreAll() {
        let restored: string[] = []
        const actionPerformed = "restored"
        if(deletedTodos) {
            deletedTodos.value?.forEach(t => {
                let alreadyInList = todos.value.filter(x => t.id === x.id)
                console.log("[restored]", alreadyInList)
                if (!alreadyInList) {
                    restored.push(`'${t.text}'`)
                    t.deleted = false
                    t.checked = false
                }
            })
            todos.value = deletedTodos.value
        }
        printLog(restored, actionPerformed)
    }

    function startEdit(id: number) {                   // Edit-Modus starten
        editingTodoId.value = id
        globalEditActive.value = true
        const t = todos.value.find((t) => t.id === id)
        editDraft.value = t ? t.text : ""
    }

    function saveEdit() {
        let edited: string[] = []
        const actionPerformed = "edited"
        const id = editingTodoId.value
        if (id == null) return
        const t = todos.value.find((t) => t.id === id)
        if (t && t.text !== editDraft.value) {
            edited.push(`'${t?.text}'`)
            edited.push(`has been edited to`)
            edited.push(`'${editDraft.value}'`)
            t.text = editDraft.value
            printLog(edited, actionPerformed)
        }
        endEdit()
    }

    function saveAll() {
        saveWithBackupFiles(todos.value,)
    }

    function endEdit() {                               // Edit-Modus beenden
        editingTodoId.value = null
        globalEditActive.value = false
    }

    function cancelEdit() {                            // Edit-Modus abbrechen
        editDraft.value = ""
        endEdit()
    }

    async function importAll(filename = "todos.json"){
        try{
            const parsed = await fetchTodosFromPublic(filename)
            todos.value = parsed
            resetID()
        } catch(e) {
            console.warn("import failed:", e ?? e)
        }

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
        // loadTodos,
        printLog,
        printFormattedLog,
        addTodo,
        updateTodo,
        flagDelete,
        deleteAll,
        toggleCheck,
        toggleAll,
        restoreAll,
        startEdit,
        saveEdit,
        saveAll,
        endEdit,
        cancelEdit,
        importAll
    }
}

let _store: ReturnType<typeof createTodosStore> | null = null

export function useTodosStore() {
    if (!_store) {
        _store = createTodosStore()
    }
    return _store
}

export type TodosStore = ReturnType<typeof createTodosStore>