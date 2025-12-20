import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button'

function RegisterForm() {

    const [newUser, setNewUser] = useState({
        name: '',
        surname: '',
        email: '',
        password: ''
    })

    const submit = () => {
        console.log(newUser)
    }
  return (
    <form className='register-form' action="">

        <div className='auth-input'>
            <label htmlFor="">Name</label>
            <input type="text"  onChange={(e) => {setNewUser({... newUser, name: e.target.value})}}/>
        </div>
        <div className='auth-input'>
            <label htmlFor="">Surname</label>
            <input type="text" onChange={(e) => {setNewUser({... newUser, surname: e.target.value})}} />
        </div>
        <div className='auth-input'>
            <label htmlFor="">Email</label>
            <input type="text" onChange={(e) => {setNewUser({... newUser, email: e.target.value})}} />
        </div>
        <div className='auth-input'>
            <label htmlFor="">Password</label>
            <input type="text" onChange={(e) => {setNewUser({... newUser, password: e.target.value})}} />
        </div>
        <Button onClick={()=>submit()}>Register</Button>
    </form>
  )
}

export default RegisterForm