import React from 'react'
import '../app.css'
import Logo from '../assets/Logo.svg'
import { NavLink } from 'react-router'

function Bar() {
  return (
    <div className='top-bar'>
        <img src={Logo} alt="" />
        <h3>TO-DO List</h3>
        <div>
        </div>
    </div>
  )
}

export default Bar