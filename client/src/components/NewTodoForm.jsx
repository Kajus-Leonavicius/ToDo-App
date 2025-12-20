import React from 'react'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../app.css'

function NewTodoForm({addTodo, newTodo, setNewTodo}) {
  return (
    <div>
        <form className='new-todo'>
          
            <div className='input'>
                <label htmlFor="todo">Todo title</label>
                <input type="text" name='todo' onChange={(e)=> setNewTodo({...newTodo, title: e.target.value})} />
            </div>

            <div className='input'>
                <label htmlFor="due_date">Due Date</label>
                <input type="date" name='due_date' onChange={(e)=>setNewTodo({...newTodo, due_date: e.target.value})} />
            </div>

            <div className='button'>
                <Button onClick={()=> addTodo()} variant='primary'>Add New Task</Button>
            </div>
          </form>
    </div>
  )
}

export default NewTodoForm