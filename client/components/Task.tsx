import { TaskProps } from '@/types/types'
import React from 'react'


function Task({tasks, deleteTask, setSelected, selected, setUpdateData, updateData, patch}:TaskProps) {
  return (
    <table className='w-auto sm:w-full'>
        <thead className='border-b border-gray-200'>
            <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {tasks.length > 0 ? (
                tasks.map((todo)=>(
                    <tr 
                        className='border-b border-gray-200'
                        key={todo.id}
                    >
                        {selected === todo.id ? (
                            <td className='flex justify-center'>
                                <input 
                                    className='rounded-xl border p-1 border-gray-200' 
                                    type="text" 
                                    defaultValue={todo.title}
                                    onChange={(e)=>{setUpdateData({...updateData, title: e.target.value})}}
                                />
                            </td>
                        ):(
                            <td className='text-center p-2'>{todo.title}</td>
                        ) }
                        {selected === todo.id ? (
                            <td className='text-center'>
                            <select
                                onChange={(e) =>{setUpdateData({...updateData, status:e.target.value})}}
                            >
                                <option value="Default">{todo.status}</option>
                                <option value='Waiting'>Waiting</option>
                                <option value='Doing'>Doing</option>
                                <option value='Done'>Done</option>
                            </select>
                        </td>
                        ):(
                            <td>
                                <span
                                    className={`rounded-xl pt-1 pb-1 pr-2 pl-2
                                        ${todo.status === 'Waiting' && 'bg-gray-400'}
                                        ${todo.status === 'Doing' && 'bg-orange-400'}
                                        ${todo.status === 'Done' && 'bg-green-400'}`
                                    }
                                >
                                    {todo.status}
                                </span>
                            </td>
                        )}
                        {selected === todo.id ? (
                            <td className='text-center'>
                            <select
                                onChange={(e) =>{setUpdateData({...updateData, priority :e.target.value})}}
                            >
                                <option value="Default">{todo.priority}</option>
                                <option value='High'>High</option>
                                <option value='Medium'>Medium</option>
                                <option value='Low'>Low</option>
                            </select>
                        </td>
                        ):(
                            <td>
                                <span
                                    className={`rounded-xl pt-1 pb-1 pr-2 pl-2
                                        ${todo.priority === 'Low' && 'bg-gray-400'}
                                        ${todo.priority === 'Medium' && 'bg-orange-400'}
                                        ${todo.priority === 'High' && 'bg-red-400'}`
                                    }
                                >
                                    {todo.priority}
                                </span>
                            </td>
                        )}
                        {selected === todo.id ? (
                            /*<td>
                                <input 
                                    className='rounded-xl border p-1 border-gray-200' 
                                    type="date" 
                                    defaultValue={new Date(todo.dueDate)}
                                    onChange={(e)=>{setUpdateData({...updateData, dueDate: e.target.value})}}
                                />
                            </td>*/
                            <td></td>
                        ):(
                            <td className='text-center p-2'>{new Date(todo.dueDate).toDateString()}</td>
                        ) }
                        {selected === todo.id ? (
                            <td>
                                <input 
                                    className='rounded-xl border w-auto p-1 border-gray-200' 
                                    type="text" 
                                    defaultValue={todo.description}
                                    onChange={(e)=>{setUpdateData({...updateData, description: e.target.value})}}
                                />
                            </td>
                        ):(
                            <td className='text-center p-2'>{todo.description}</td>
                        ) }
                        <td className='flex gap-5 justify-center'>
                            {selected === todo.id && (
                                <div className='flex items-center gap-5'>
                                    <button onClick={() => setSelected(Number())}>X</button>
                                    <button onClick={()=>{patch(Number(todo.boardId))}} className='bg-green-400 pt-1 pb-1 pr-2 pl-2 rounded-xl'>save</button>
                                </div>
                            )}
                            <button 
                                onClick={() => {setSelected(todo.id)}}
                                className=' mt-1 rounded-xl bg-green-400 pt-1 pb-1 pr-4 pl-4'
                            >
                                Edit
                            </button>
                            <button 
                                onClick={()=>{deleteTask(todo.id, todo.boardId)}}
                                className=' mt-1 rounded-xl bg-red-400 pt-1 pb-1 pr-4 pl-4'
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))
            ):(
                <tr className='w-full flex justify-center'>
                    <td>No task yet</td>
                </tr>
            )}
        </tbody>
    </table>
  )
}

export default Task