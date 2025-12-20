import React from 'react'
import '../src/app.css'
import { useState } from 'react';
import { useEffect } from 'react';
import TodoTable from './components/TodoTable';
import NewTodoForm from './components/NewTodoForm';
import Bar from './components/Bar';
import ToolBar from './components/ToolBar';
import Board_tabs from './components/Board_tabs';

function App() {
  const [todo, setTodo] = useState([])
  const [newTodo, setNewTodo] = useState({title: '', due_date: ''})
  const [editableId, setEditibleId] = useState(null)
  const [editedValue, setEditedValue] = useState({title: '', due_date:''})
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [boards, setBoards] = useState([])
  const [boardId, setBoardId] = useState(null)
  const [boardTitle, setBoardTitle] = useState('New Board')
  const [newBoardInput, setNewBoardInput] = useState(false)

  const editTodo = async(id, title, due_date, status, priority) => {
    try{
      const body = {
        title: title,
        due_date: new Date(due_date).toISOString().split('T')[0],
        status: status,
        priority: priority
      }
      const res = await fetch(`http://127.0.0.1:3000/todo/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      })

      if(!res.ok){
        console.log('kazkas su tavimi negerai')
      }else{
        fetchTodo()
        setEditibleId(null)
        setEditedValue(null)
      }
    }catch(err){
      console.log(err)
    }
  }

  const fetchTodo = async () => {
    try{
      let url = `http://127.0.0.1:3000/todo/${boardId}`
      //kazakda grizti ir sutvarkyti sita nesamone su urlsearchParams (taip cia is chatgpt nes as nezinojau tokio dalyko)
      if(status.length > 0){
        url += `?status=${status}`
      }

      if(priority.length > 0){
        url += `?priority=${priority}`
      }

      const res = await fetch(url)

      if(res.ok){
        const data = await res.json()
        setTodo(data)
      }
    }catch(err){
      console.log(err)
    }
  }

  const addTodo = async () => {
    try{
        const body = {
          title: newTodo.title,
          due_date: newTodo.due_date,
          board_id: boardId
        }
        const res = await fetch('http://127.0.0.1:3000/todo',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          }
        )

        if(!res.ok){
          console.log('kazkas su tavimi negerai')
        }else{
          fetchTodo()
          setNewTodo({title: '', due_date: ''})
        }
    }catch(err){
      console.log(err)
    }
  }

  const deleteTodo = async (id) => {
    try{
      console.log('item id: ', id)
      const res = await fetch(`http://127.0.0.1:3000/todo/${id}`, {
        method: 'DELETE',
        'Content-Type': 'application/json'
      })

      if(!res.ok){
        console.log('kazkas su tavimi negerai')
      }else{
        fetchTodo()
      }
    }catch(err){
      console.log(err)
    }
  }

  const getBoards = async () => {
    try{
      const res = await fetch('http://127.0.0.1:3000/board')

      if(res.ok){
        const data = await res.json()
        setBoards(data)
      }else{
        console.log('error')
      }
    }catch(err){
      console.error(err)
    }
  }

  const addBoard = async () =>{
    try{
      const res = await fetch('http://127.0.0.1:3000/board',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"title": boardTitle})
      })

      if (res.ok){
        getBoards()
      }
    }catch(err){
      console.error(err)
    }
  }

  //useEffect(()=>{fetchTodo()},[])
  return (
    <>

      <div>
        <Bar/>
      </div>
      <div>
        <Board_tabs 
          getBoards={getBoards}
          boards={boards}
          setBoardId={setBoardId}
          fetchTodo={fetchTodo}
          boardId={boardId}
          setBoardTitle={setBoardTitle}
          addBoard={addBoard}
          isClicked={setNewBoardInput}
          clicked ={newBoardInput}/>
      </div>
      <div>
        <NewTodoForm 
          addTodo={addTodo} 
          newTodo={newTodo}
          setNewTodo={setNewTodo}/>
      </div>
      <div>
        <ToolBar
        setStatus = {setStatus}
        fetchTodo = {fetchTodo}
        status={status}
        setPriority= {setPriority}
        priority = {priority}
        />
      </div>
      <div className='main'>
          <TodoTable 
            editableId={editableId} 
            todo={todo} 
            setEditedValue={setEditedValue}
            editedValue={editedValue}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
            setEditibleId={setEditibleId}/>
      </div>
    </>
  )
}

export default App