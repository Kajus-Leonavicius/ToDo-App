import express from 'express'
import { getBoards, postBoards } from '../controllers/boardController'

const router = express.Router()
router.get('/boards', getBoards)
router.post('/boards/:boardId', postBoards)


export default router