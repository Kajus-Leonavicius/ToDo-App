require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const db = require('./db')
const bcrypt = require('bcrypt')

router.post('/register', (req, res) => {

    const {name, surname, email, password} = req.body
    sql = 'INSERT INTO user name=?, surname=?, email=? password=? VAlUES (?,?,?,?)'


    db.query(sql,[name, surname, email, password] ,(err, res) => {

    })

})

module.exports = router