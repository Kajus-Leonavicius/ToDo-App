import express from 'express'
import { getBoards } from '../controllers/boardController'

const router = express.Router()
router.get('/boards', getBoards)


export default router