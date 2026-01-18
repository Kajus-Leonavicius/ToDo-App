import axios from "axios";


export const getBoards = async () =>{
    try{
        const boards = await axios.get(process.env.NEXT_PUBLIC_TODO_API_BOARDS)

       return boards.data
    }catch(e){
        console.log(e)
    }
}

export const postBoards = async () =>{
    try{
        const board = await axios.post(process.env.NEXT_PUBLIC_TODO_API_BOARDS, {
            title: 'New board'
        })

        return board.data
    }catch(e){
        console.error(e)
    }
}