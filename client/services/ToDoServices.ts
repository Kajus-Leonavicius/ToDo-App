import { TaskPost, TaskUpdate } from "@/types/types";
import axios from "axios";
import 'dotenv/config'

const Taskurl = process.env.NEXT_PUBLIC_TODO_API
export const getToDo = async(boardId:number) =>{
    try{
        const urlWithBoardId = Taskurl + `/${Number(boardId)}`
        if(!Taskurl){
            throw new Error('no url provided')
        }
        const tasks = await axios.get(urlWithBoardId)
        return tasks.data
        
    }catch(e){
        console.error(e)
    }
}

export const postToDo = async (data: TaskPost, boardId: number ) =>{
    try{
        const urlWithId = Taskurl + `/${boardId}`
        console.log(urlWithId, typeof(boardId))
        const res = await axios.post(urlWithId,{
            title: data.title,
            dueDate: new Date(data.dueDate).toISOString(),
            description: data.description,
        },
        {
            headers:{
            "Content-Type": "application/json"
            }
        }
    )
    }catch(e){
        console.error(e)
    }
}

export const deleteTodo = async (id: number) => {
    try{
        const urlWithId = Taskurl + `/${id}`
        console.log(urlWithId)
        const deleteTodo = axios.delete(urlWithId)
    }catch(e){
        console.log(e)
    }
}

export const patchTodo = async (taskId: number, data:TaskUpdate) => {
    try{
        const urlWithId = process.env.NEXT_PUBLIC_TODO_API + `/${taskId}`
        const res = await axios.patch(urlWithId, {
            title: data.title,
            status: data.status,
            priority: data.priority,
            dueDate: data.dueDate,
            description: data.description,
        })

        return res.data
    }catch(e){
        console.error(e)
    }
}