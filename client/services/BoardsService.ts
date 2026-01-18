import axios from "axios";
import { stringify } from "querystring";


export const getBoards = async () =>{
    try{
        const url = process.env.NEXT_PUBLIC_TODO_API_BOARDS

        if (!url) throw new Error("Missing env variable NEXT_PUBLIC_TODO_API_BOARDS");

        const boards = await axios.get(url)

       return boards.data
    }catch(e){
        console.log(e)
    }
}

export const postBoards = async () =>{
    try{
         const url = process.env.NEXT_PUBLIC_TODO_API_BOARDS

        if (!url) throw new Error("Missing env variable NEXT_PUBLIC_TODO_API_BOARDS");

        const board = await axios.post(url, {
            title: 'New board'
        })

        return board.data
    }catch(e){
        console.error(e)
    }
}