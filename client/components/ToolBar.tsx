import React from 'react'

function ToolBar({setShowModal}) {
  return (
    <div className='lg:flex-row justify-between items-center m-6 sm:flex flex-col'>
        <div>
            <p className='text-5xl font-bold'>Your ToDo</p>
        </div>
        <div className='flex gap-5 items-center'>
            <label htmlFor="">Priority:</label>
            <select 
                name="" 
                id=""
                className='rounded-xl border border-gray-200 bg-white p-2'
            >
                <option value="">Default</option>
                <option value="">Hight</option>
                <option value="">Medium</option>
                <option value="">Low</option>
            </select>
        </div>
        <div className='flex gap-5 items-center'>
            <label htmlFor="">Status:</label>
            <select 
                name="" 
                id=""
                className='rounded-xl border border-gray-200 bg-white p-2'
            >
                <option value="">Default</option>
                <option value="">Doing</option>
                <option value="">Done</option>
                <option value="">Waiting</option>
            </select>
        </div>
        <div>
            <button onClick={()=>{setShowModal(true)}} className='pr-6 pl-6 pb-2 pt-2 mr-4 rounded-xl bg-blue-400 text-white'> + Add New Task</button>
        </div>
    </div>
  )
}

export default ToolBar