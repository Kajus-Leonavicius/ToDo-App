'use client'
import SideBar from '@/components/SideBar'
import ToDoList from '@/components/ToDoList'
import ToolBar from '@/components/ToolBar'
import TopBar from '@/components/TopBar'
import React, { useState, useEffect } from 'react'
import NewTaskModal from '@/components/NewTaskModal'
import { Task } from '@/types/types'
import { getToDo, postToDo, deleteTodo, patchTodo } from '@/services/ToDoServices'
import { getBoards, postBoards } from '@/services/BoardsService'

function page() {
  //modal state
  const [showModal, setShowModal] = useState(false)
  //todo state used to map in Task.tsx
  const [todo, setTodo] = useState<Task[]>([])
  //creating todo used in in NewTaskModal.tsx
  const [task, setTask] = useState<TaskPost>({title: '', dueDate: '', description: ''})
  //this state used for boards in SideBar.tsx
  const [boards, setBoards] = useState([])
  //this one used for boardId
  const [board, setBoard] = useState(null)
  // state used for editing tasks
  const [selected, setSelected] = useState('')
  //state for updating task
  const [updateData, setUpdateData] = useState({
    title: '',
    status: '',
    priority: '',
    dueDate: new Date().toISOString(),
    description: '',
  })

    const fetchBoards = async () =>{
            try{
                const boards = await getBoards()
                setBoards(boards)
                console.log(boards)
            }catch(e){
            console.error(e)
        }
        }

    const addBoard = async () =>{
        try{
            const newBoard = await postBoards()
            fetchBoards()
        }catch(e){
            console.error(e)
        }
    }
    //add mew task
  const handleSubmit = async () =>{
          try{

              await postToDo(task, localStorage.getItem('boardId'))
              setShowModal(!showModal)
              const todo = await getToDo(localStorage.getItem('boardId'))
              setTodo(todo)
          }catch(e){
              console.log(e)
          }
    }
  
  const fetchBoardTasks = async(boardId) =>{
    try{
      localStorage.setItem('boardId', boardId)
      console.log(board)
      const boardTasks = await getToDo(boardId)
      setTodo(boardTasks)
    }catch(e){
      console.error(e)  
    }
  }
  const deleteTask = async (id: string, boardId) =>{
      try{
        await deleteTodo(Number(id))
        const updatedToDo = await getToDo(boardId)
        setTodo(updatedToDo)
      }catch(e){
        console.log(e)
      }
  }

  const updateTask = async(boardId) => {
    try{
      const data = await patchTodo(Number(selected), updateData)
      const updated = await getToDo(boardId)
      setTodo(updated)
      setSelected(null)
    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    fetchBoards()
  },[])
  return (
    <div className='flex h-screen bg-blue sm:w-auto'>
      <div className='z-50'>
          <NewTaskModal
          show={showModal}
          handleSubmit = {handleSubmit}
          setTask={setTask}
          task={task}
          closeModal={setShowModal}
        />
      </div>
        <div>
            <SideBar
              fetchBoardTasks={fetchBoardTasks}
              boardTasks={fetchBoardTasks}
              addBoard={addBoard}
              boards={boards}
            />
        </div>
        <div className='w-full overflow-scroll bg-gray-100'>
            <TopBar/>
            <ToolBar 
              setShowModal={setShowModal}
            />
              <ToDoList
                patch={updateTask}
                updateData = {updateData}
                setUpdateData={setUpdateData}
                setSelected={setSelected}
                selected={selected}
                deleteTask={deleteTask}
                todo={todo}
              />
        </div>
    </div>
  )
}

export default page