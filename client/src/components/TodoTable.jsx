import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import '../app.css'
import { useState } from 'react';


function TodoTable({todo, editableId, setEditedValue, editedValue, editTodo, deleteTodo, setEditibleId}) {
    const [clickedId, setClickedId] = useState(null)
  return (
    <Table hover className>
        <thead>
        <tr>
            <th>TODO</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {todo.length > 0 ? todo.map(item =>(
            <tr key={item.id}>
            {editableId === item.id ? (
                <td>
                    <label>Title</label>
                    <input type="text" value={editedValue.title} onChange={(e)=>setEditedValue({... editedValue, title: e.target.value})} />
                    <label htmlFor="">Due date</label>
                    <input type="date" value={editedValue.due_date} onChange={(e)=> setEditedValue({...editedValue, due_date: e.target.value})} />
                    <Button onClick={()=>editTodo(item.id, editedValue?.title?.length > 0 ? editedValue.title : item.title, editedValue?.due_date?.length > 0 ? editedValue.due_date : item.due_date, item.status, item.priority)} variant='primary'>save chenges</Button>
                </td>
            ): (
                <>
                    <td>{item.title}</td>
                    { clickedId === item.id ? (
                        <td>
                            <select value={item.status} onChange={(e) =>{editTodo(item.id, item.title, item.due_date, e.target.value, item.priority ); setClickedId(null)}}>
                                <option value="Waiting">Waiting</option>
                                <option value="Done">Done</option>
                                <option value="In progress">Doing</option>
                            </select>
                        </td>): 
                        (<td><span onClick={()=>setClickedId(item.id)} className={`${item.status}`}>{item.status}</span></td>)}
                    { clickedId === item.id ? (
                        <td>
                            <select value={item.priority} onChange={(e) =>{editTodo(item.id, item.title, item.due_date, item.status, e.target.value ); setClickedId(null)}}>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </td>): 
                        (<td><span onClick={()=>setClickedId(item.id)} className={`${item.priority}`}>{item.priority}</span></td>)}
                    <td>{new Date(item.due_date).toLocaleDateString()}</td>
                </>
            )}
            <td><Button onClick={()=>deleteTodo(item.id)} variant='danger'>Delete</Button> <Button onClick={()=>{ setEditibleId(item.id); setEditedValue(item.title)}} variant='success'>Edit</Button></td>
            </tr>
        )):(
            <tr>
            <td>no todo yet</td>
            </tr>
        )}
        </tbody>
    </Table>
  )
}

export default TodoTable