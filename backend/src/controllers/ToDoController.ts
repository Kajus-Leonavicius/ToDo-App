import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import {Request, Response} from 'express'

export const getTasks = async(req: Request, res: Response) =>{
    try{
        const {boardId} = req.params
        const {status, priority} = req.query
        const tasks = await prisma.tasks.findMany({
            where: {
                boardId: Number(boardId),
                ...(status &&{status}),
                ...(priority &&{priority})
            }
        })
        console.log(tasks.length)
        if(tasks.length === 0){
            res.status(404).json({'message': 'no task found'})
        }
        return res.status(200).json(tasks)
    }catch(e){
        console.error(e)
        return res.status(500).json({'message': 'Internal server error'})
    }
}

export const createTask = async (req: Request, res: Response) =>{
    try{
        const {title, status, priority, description, dueDate, boardId} = req.body

        const task = await prisma.tasks.create({
            data: {
                title: title,
                status: status,
                priority: priority,
                description: description,
                dueDate: new Date(dueDate).toISOString(),
                boardId: boardId
            }
        })

        return res.status(201).json({'message':'Task Created'})
    }catch(e){
        console.error(e)
        return res.status(500).json({'message': 'Internal server Error'})
    }
}

export const deleteTask = async (req: Request, res: Response)=> {
    try{
        const {id} = req.params

        const taskDelete = await prisma.tasks.delete({
            where: {
                id: Number(id)
            }
        })

        return res.status(200).json({'message': 'Deleted'})
    }catch(e){
        console.error(e)
        return res.status(500).json({'message': 'Internal server error'})
    }
}

export const updateTask = async (req: Request, res: Response) =>{
    try{
        const {id} = req.params
        const {title, status, priority, description, dueDate} = req.body


        const taskUpdate = await prisma.tasks.update({
            where:{
                id: Number(id)
            },
            data :{
                title: title,
                status: status,
                priority: priority,
                description: description,
                dueDate: new Date(dueDate).toISOString()
            }
        })

        return res.status(200).json({'message': 'Updated'})
    }catch(e){
        console.error(e)
        return res.status(500).json({'message': 'Internal server error'})
    }
}