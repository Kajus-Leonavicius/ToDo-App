
export type Task = {
    id: number
    title: string
    priority: string
    status:string
    description: string
    dueDate: Date
}

export type TaskProps = {
    tasks: Task
}

export type TaskPost = {
    title: string
    dueDate: string
    description: string
    boardId: number
}