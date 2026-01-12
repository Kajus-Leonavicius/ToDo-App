import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import {Request, Response} from 'express'

export const getBoards = async (req: Request, res: Response) =>{
    try{
        const boards = await prisma.boards.findMany()
        return res.json(boards)
    }catch(e){
        console.error(e)
    }
}