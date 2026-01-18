import express from 'express'
import { getTasks, createTask, deleteTask, updateTask } from '../controllers/ToDoController'

const router = express.Router()
router.get('/todo/:boardId', getTasks)
router.post('/todo/:boardId', createTask )
router.delete('/todo/:id', deleteTask)
router.patch('/todo/:id', updateTask)

export default router