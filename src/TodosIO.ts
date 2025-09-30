import {type Todo} from "@/Todos"

const toBool = (v: unknown) => v=== true || v===  1 || v === "true"
type RawTodo = {
    id: unknown
    text?: unknown
    deleted?: unknown
    check?: unknown
    checked?: unknown
}

const TODOS_KEY = "todos.v1"
const TS_KEY = "todos.updatedAt.v1"

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
    const json = JSON.stringify(todos)
    localStorage.setItem(TODOS_KEY, json)
    localStorage.setItem(TS_KEY, new Date().toISOString())
}

export function loadTodosFromLocalStorage(): Todo[] | null{
    const raw = localStorage.getItem(TODOS_KEY)
    if (!raw) {
        return null
    }
    try{
        const data = JSON.parse(raw)
        return parseTodos(data)
    } catch{
        return null
    }
}

export function clearTodosInLocalStorage(){
    localStorage.removeItem(TODOS_KEY)
    localStorage.removeItem(TS_KEY)
}

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