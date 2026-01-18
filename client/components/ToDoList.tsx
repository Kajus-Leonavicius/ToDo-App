'use client'
import Task from './Task'

function ToDoList({todo, deleteTask, selected, setSelected, setUpdateData, updateData, patch}) {

  return (
    <div className='border border-gray-200 m-6 h-auto w-auto rounded-2xl bg-white overflow-scroll'>
        <Task
          patch={patch}
          updateData={updateData}
          setUpdateData={setUpdateData}
          selected={selected}
          setSelected={(setSelected)}
          deleteTask={deleteTask}
          tasks={todo}
        />
    </div>
  )
}

export default ToDoList