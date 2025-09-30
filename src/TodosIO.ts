import type { Todo } from "@/Todos"

export async function fetchTodosFromPublic(filename: string = "todos.json"): Promise<Todo[]>{
    const base = new URL(import.meta.env.BASE_URL, window.location.origin)
    const url = new URL(filename, base).toString()
    console.log("[loadTodos] URL:", url)
    const res = await fetch(url)
    console.log("[loadTodos] status:", res.status)

    if(!res.ok){
        throw new Error(`Fetch failed: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()

    if(!Array.isArray(data)) {
        throw new Error(`Invalid JSON: not an array`)
    }

    return data.map((t: any) => ({
        id: Number(t.id),
        text: String(t.text ?? ""),
        deleted: Boolean(t.deleted),
        check: Boolean(t.check)
    }))
}