const express = require('express')
const router = express.Router()
const db = require('./db')

router.get('/:board_id', (req, res) => {
    try{
        const {status, priority} = req.query
        const {board_id} = req.params

        sql = 'SELECT * FROM task WHERE 1=1 AND board_id =?'
        const params= []
        params.push(board_id)

        if(status){
            sql += ` AND status=?`
            params.push(status)
        }

        if(priority){
            sql += ' AND priority=?'
            params.push(priority)
        }

        db.query(sql, params, (err, result) =>{
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
        const{title, due_date, board_id } = req.body

        if(!title){
            return res.status(500).json({'message: ': 'no title provided'})
        }else{
            db.query('INSERT INTO task (title, due_date, board_id) VALUES (?,?,?) ', [title, due_date, board_id], (err, result) =>{
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