import React from 'react'
import SearchBar from './SearchBar'
import { FaRegBell } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import User from './User';

function TopBar() {
  return (
    <div className='p-6 flex justify-between items-center'>
        <SearchBar/>
        <div className='flex gap-15'>
            <FaRegBell/>
            <LuMail/>
        </div>
        <User/>
    </div>
  )
}

export default TopBar