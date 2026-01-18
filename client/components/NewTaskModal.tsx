import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

function NewTaskModal({task, show, closeModal, setTask, handleSubmit}) {

  return (
    <>
        <Dialog open={show} onClose={()=>{closeModal(!show)}} className='relative z-50'>
            <div className='fixed inset-0 flex w-screen bg-black/50 items-center justify-center'>
                <DialogPanel className='bg-white p-4 rounded-xl'>
                    <DialogTitle className='font-bold text-3xl border-b border-gray-200'> Add New Task</DialogTitle>
                    <div>
                        <div className='flex flex-col   mb-2'>
                            <label htmlFor="">Title</label>
                            <input 
                                className='border border-gray-200 rounded-xl p-1' 
                                type="text" 
                                placeholder='e.g. Buy a thing'
                                onChange={(e)=>{setTask({...task, title: e.target.value})}}
                            />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label htmlFor="">End Date</label>
                            <input 
                                className='border border-gray-200 rounded-xl p-1' 
                                type="date"
                                onChange={(e)=>{setTask({...task, dueDate: e.target.value})}}
                            />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <label htmlFor="">Description</label>
                            <input 
                                className='border border-gray-200 rounded-xl p-1' 
                                type="text" 
                                placeholder='e.g. Buy a thing at shop'
                                onChange={(e)=>{setTask({...task, description: e.target.value})}}
                            />
                        </div>
                    </div>
                    <div className='border-t border-gray-200 flex justify-end gap-5 p-2'>
                        <button onClick={()=>{closeModal(!show)}} className='bg-red-400 rounded-xl pt-1 pb-1 pr-2 pl-2'>close</button>
                        <button
                            onClick={()=>{handleSubmit()}}
                            className='bg-green-400 rounded-xl pt-1 pb-1 pr-2 pl-2'>Add Task</button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    </>
  )
}

export default NewTaskModal