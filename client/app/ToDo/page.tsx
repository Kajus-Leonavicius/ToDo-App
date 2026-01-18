'use client'
import SideBar from '@/components/SideBar'
import ToolBar from '@/components/ToolBar'
import TopBar from '@/components/TopBar'
import React, { useState, useEffect } from 'react'
import NewTaskModal from '@/components/NewTaskModal'
import Task from '@/components/Task'
import { TaskPost, Board, TaskType, TaskUpdate } from '@/types/types'
import { getToDo, postToDo, deleteTodo, patchTodo } from '@/services/ToDoServices'
import { getBoards, postBoards } from '@/services/BoardsService'

function page() {
  //modal state
  const [showModal, setShowModal] = useState(false)
  //todo state used to map in Task.tsx
  const [todo, setTodo] = useState<TaskType[]>([])
  //creating todo used in in NewTaskModal.tsx
  const [task, setTask] = useState<TaskType>({id: Number(), title: '', dueDate: new Date(), description: '', priority: '', status: '', boardId: Number()})
  //this state used for boards in SideBar.tsx
  const [boards, setBoards] = useState<Board[]>([])
  //this one used for boardId
  const [board, setBoard] = useState(null)
  // state used for editing tasks
  const [selected, setSelected] = useState(Number())
  //state for updating task
  const [updateData, setUpdateData] = useState<TaskUpdate>({
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
              const boardId = Number(localStorage.getItem('boardId'))
              await postToDo(task, boardId)
              setShowModal(!showModal)
              const todo = await getToDo(boardId)
              setTodo(todo)
          }catch(e){
              console.log(e)
          }
    }
  
  const fetchBoardTasks = async(boardId: number) =>{
    try{
      localStorage.setItem('boardId', boardId.toString())
      console.log(board)
      const boardTasks = await getToDo(boardId)
      setTodo(boardTasks)
    }catch(e){
      console.error(e)  
    }
  }
  const deleteTask = async (id: number, boardId: number) =>{
      try{
        await deleteTodo(Number(id))
        const updatedToDo = await getToDo(boardId)
        setTodo(updatedToDo)
      }catch(e){
        console.log(e)
      }
  }

  const updateTask = async(boardId: number) => {
    try{
      const data = await patchTodo(Number(selected), updateData)
      const updated = await getToDo(boardId)
      setTodo(updated)
      setSelected(Number())
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
              addBoard={addBoard}
              boards={boards}
            />
        </div>
        <div className='w-full overflow-scroll bg-gray-100'>
            <TopBar/>
            <ToolBar 
              setShowModal={setShowModal}
            />
            <div className='border border-gray-200 m-6 h-auto w-auto rounded-2xl bg-white overflow-scroll'>
              <Task
                patch={updateTask}
                updateData={updateData}
                setUpdateData={setUpdateData}
                selected={selected}
                setSelected={(setSelected)}
                deleteTask={deleteTask}
                tasks={todo}
              />
            </div>
        </div>
    </div>
  )
}

export default page