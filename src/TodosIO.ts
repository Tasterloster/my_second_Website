import {type Todo, useTodosStore} from "@/Todos"

// const store = useTodosStore();

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

    if(!Array.isArray(data)) {
        throw new Error(`Invalid JSON: not an array`)
    }

    return data.map((t: any) => ({
        id: Number(t.id),
        text: String(t.text ?? ""),
        deleted: Boolean(t.deleted),
        checked: Boolean(t.checked)
    }))
}

export async function createBlobForDownload(todos: Todo[]){
    const blob = new Blob([JSON.stringify(todos, null, 4)], { type: "application/json" })
}