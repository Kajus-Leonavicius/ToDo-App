const express = require('express')
const router = express.Router()
const db = require('./db')

router.get('/', (req, res) => {
    try{
        sql = 'SELECT * FROM boards '

        db.query(sql, (err, result) =>{
            if(err){
                console.log(err)
                res.status(500).json({'message: ': 'error occured: ', err})
            }else{
                return res.status(200).json(result)
            }
        })
    }catch(err){
        console.error('error: ', err)
        res.status(500).json({'message: ': 'error occured: ', err})
    }
})


router.post('/', (req, res) => {
    try{
        const{title} = req.body

        if(!title){
            return res.status(500).json({'message: ': 'no title provided'})
        }else{
            db.query('INSERT INTO boards (title) VALUES (?) ', [title], (err, result) =>{
                if(err){
                    console.error(err)
                    return res.status(500).json(err)
                }else{
                    return res.status(201).json({'message: ': 'succesfuly added todo!'})
                }
            })
        }
    }catch(err){
        console.error(err)
        res.status(500).json({'message: ': 'error occured: ', err})
    }
})

router.delete('/:id', (req, res) => {
    try{
        const {id} = req.params

        db.query('DELETE FROM task WHERE id=?', [id], (err, result) => {
            if(err){
                    console.error(err)
                    return res.status(500).json(err)
                }else{
                    return res.status(200).json({'message: ': 'deleted succesfuly'})
                }
        })
    }catch(err){
        console.error(err)
    }
})

router.patch('/:id', (req, res) => {
    try{
        const {id} = req.params
        const {title, status, due_date, priority} = req.body

        db.query('UPDATE task SET title=?, status=?, due_date=?, priority=? WHERE id=?', [title, status, due_date, priority, id], (err, result)=>{
            if(err){
                console.error(err)
                return res.status(500).json(err)
            }else{
                    return res.status(200).json({'message: ': 'edited succesfuly'})
                }
        })  
    }catch(err){
        console.error(err)
    }
})

module.exports = router