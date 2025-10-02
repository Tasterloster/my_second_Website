import {type Todo} from "@/Todos"

const toBool = (v: unknown) => v=== true || v===  1 || v === "true"
type RawTodo = {
    id: unknown
    text?: unknown
    deleted?: unknown
    check?: unknown
    checked?: unknown
}

const TODOS_ALL_KEY = "todos.v1"
const TRASH_CURR_KEY = "todos.trash.curr.v1"
// const TRASH_PREV_KEY = "todos.trash.prev.v1"

export function parseTodos(raw: unknown): Todo[]{
    if(!Array.isArray(raw)) {
        throw new Error(`Invalid JSON: not an array`)
    }
    return (raw as RawTodo[]).map(t => ({
        id: Number(t.id),
        text: String(t.text ?? ""),
        deleted: toBool(t.deleted ?? false),
        checked: toBool(t.check ?? (t as any).checked ?? false),
    }))
}

export function splitTodos(todos: Todo[]){
    const active = todos.filter(t => !t.deleted)
    const deleted = todos.filter(t => t.deleted)
    return {active, deleted}
}

export function saveTodosToLocalStorage(todos: Todo[]) {
    let { active, deleted } = splitTodos(todos)
    const jsonActive = JSON.stringify(active)
    localStorage.setItem(TODOS_ALL_KEY, jsonActive)
    const jsonDeleted = JSON.stringify(deleted)
    localStorage.setItem(TRASH_CURR_KEY, jsonDeleted)
}

// export function saveCurrDeletedIntoPrevDeleted(todos: Todo[]){
//     let { active, deleted } = splitTodos(todos)
//     const jsonDeleted = JSON.stringify(deleted)
//     localStorage.setItem(TRASH_PREV_KEY, jsonDeleted)
// }

export function loadTodosFromLocalStorage(storage: string): Todo[]{
    storage = storage==="" ? TODOS_ALL_KEY : TRASH_CURR_KEY
    const raw = localStorage.getItem(storage)
    if (!raw) {
        return []
    }
    try{
        const data = JSON.parse(raw)
        return parseTodos(data)
    } catch{
        return []
    }
}

export function deleteCurrentTrash(){
    localStorage.removeItem(TRASH_CURR_KEY)
}

// export function deleteBackupTrash(){
//     localStorage.removeItem(TRASH_PREV_KEY)
// }

export function downloadJSON(data: unknown, filename: string){
    const json = JSON.stringify(data, null, 4)
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
}

export async function fetchTodosFromPublic(filename: string = "todos.json"): Promise<Todo[]>{
    const base = new URL(import.meta.env.BASE_URL, window.location.origin)
    const url = new URL(filename, base).toString()
    console.log("[import] URL:", url)
    const res = await fetch(url)
    console.log("[import] status:", res.status)

    if(!res.ok){
        throw new Error(`Fetch failed: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()

    return parseTodos(data)
}

export function saveWithBackupFiles(allTodos: Todo[], opts?:{
    activeFilename?: string
    deletedFilename?:string
    includeTimestamp?: boolean
}) {
    const {active, deleted } = splitTodos(allTodos)

    const {
        activeFilename = "todos.json",
        deletedFilename = "todos.deleted.json",
        includeTimestamp = true,
    } = opts ?? {}

    const stamp = includeTimestamp ? "-" + new Date().toISOString().replace(/[:.]/g, "-") : ""

    if (deleted.length > 0) {
        downloadJSON(deleted, deletedFilename.replace(/(\.json)?$/, `${stamp}.json`))
    }

    downloadJSON(active, activeFilename.replace(/(\.json)?$/, `${stamp}.json`))

    return {active, deletedCount: deleted.length}
}

export function saveActiveOnly(allTodos: Todo[], filename = "todos.json", includeTimestamp = true) {
    const {active } = splitTodos(allTodos)

    const stamp = includeTimestamp ? "-" + new Date().toISOString().replace(/[:.]/g, "-") : ""

    downloadJSON(active, filename.replace(/(\.json)?$/, `${stamp}.json`))

    return {active}
}