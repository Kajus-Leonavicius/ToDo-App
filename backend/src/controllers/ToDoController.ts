import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import {Request, Response} from 'express'

export const getToDo = async(req: Request, res: Response) =>{
    try{
        const ToDo = await prisma.user.findMany()
        return res.json(ToDo)
    }catch(e){
        console.error(e)
    }
}