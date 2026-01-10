import express from 'express'
import { getToDo } from '../controllers/ToDoController'

const router = express.Router()
router.get('/todo', getToDo)

export default router