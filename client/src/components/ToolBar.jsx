import React, { useEffect } from 'react'

function ToolBar({setStatus, fetchTodo, status, setPriority, priority}) {

  useEffect(()=> {fetchTodo()}, [status, priority])
  return (
    <div className='tool-bar'>
        <p>filter by: <br/></p>

        <label htmlFor="status">Status</label>
        <select onChange={(e) => setStatus(e.target.value)} name="status" id="">
          <option value="">Default</option>
          <option value="In Progress">In progress</option>
          <option value="Done">Done</option>
          <option value="Waiting">Waiting</option>
        </select>

        <label htmlFor="priority">Priority</label>
        <select onChange={(e) => setPriority(e.target.value)} name="priority" id="">
          <option value="">Default</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
    </div>
  )
}

export default ToolBar