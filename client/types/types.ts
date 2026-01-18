
export type TaskType = {
    id: number
    title: string
    priority: string
    status:string
    description: string
    dueDate: Date
    boardId: number
}

export type TaskUpdate = {
    id?: number
    title?: string
    priority?: string
    status?:string
    description?: string
    dueDate?: string
}

export type Board = {
    id: number
    title: string
}

export type TaskProps = {
    tasks: TaskType[]
    deleteTask: (id: number, boardId: number)=> void
    setSelected: (boardId: number)=> void
    selected: number
    setUpdateData: (data: TaskUpdate)=> void
    updateData: TaskUpdate
    patch: ( boardId: number) => void
}

export type TaskPost = {
    title: string
    dueDate: Date
    description: string
    //boardId: number
}

export type ToolBarProps = {
    setShowModal: (showModal: boolean) => void
}

export type NewTaskModalProps = {
  task: TaskType;
  show: boolean;
  closeModal: (show: boolean) => void;
  setTask: (task: TaskType) => void;
  handleSubmit: () => void;
};

export type SideBarProps = {
    addBoard: ()=> void
    boards: Board[]
    fetchBoardTasks: (boardId: number) => void
}