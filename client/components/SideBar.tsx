import { Board, SideBarProps } from "@/types/types"

function SideBar({addBoard, boards, fetchBoardTasks}: SideBarProps) {

  return (
    <div className='justify-between  hidden sm:flex lg:w-64 flex-col h-full pl-10 pr-6 border-r border-gray-200'>
        <div>
            <div className='mt-6'>
                meybe logo here
            </div>
            <ul className='mt-6 cursor-pointer'>
                {boards.length > 0 ? (
                    boards.map((board: Board) =>(
                            <li onClick={() => {fetchBoardTasks(board.id)}} key={board.id} className='border-b border-gray-200'>{board.title}</li>
                    ))
                ): (
                    <li>no boards</li>
                )}
                <li>
                    <button onClick={()=>{addBoard()}} className='rounded-xl mt-2 hover:bg-blue-400 p-2 hover:text-white'> + Add New Board</button>
                </li>
            </ul>
        </div>

        <div className='mb-12'>
            cia bus logout
        </div>
    </div>
  )
}

export default SideBar