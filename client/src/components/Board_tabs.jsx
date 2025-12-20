import React from 'react'
import { useEffect } from 'react'
import '../app.css'

function Board_tabs({getBoards, boards, setBoardId, fetchTodo, boardId, addBoard, isClicked, setBoardTitle, clicked}) {

    useEffect(()=>{
        getBoards()
    }, [])

    useEffect(() => {
        fetchTodo()
    },[boardId])
  return (
    <>
        <p className='location'>Current Tab: {localStorage.getItem('location')}</p>
        <div className='tab'>
            {boards.length > 0 ? (
                boards.map((item) => (
                    <span key={item.id} onClick={() =>{ setBoardId(item.id); localStorage.setItem('location', item.title);}}>
                        {item.title}
                    </span>
                ))
            ):(
                <p>no boards yet</p>
            )}
            {clicked && (
                <input value={boardId} onChange={(e)=>setBoardTitle(e.target.value)} onKeyDown={(e) => {if(e.key === 'Enter'){addBoard(); isClicked(false)}}} type="text" />
            )}
            <span><h4 onClick={() => isClicked(true)}>+</h4></span>
        </div>
    </>
  )
}

export default Board_tabs