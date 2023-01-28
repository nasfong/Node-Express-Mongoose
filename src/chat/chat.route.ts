import { Router } from 'express'
import { authMiddleware } from '../../Middleware/authMiddleware'
import { createData, readAllData, readData, updateData, deleteData } from './chat.controller'

const routerChat = Router()

routerChat.get('', readAllData)
routerChat.post('', authMiddleware, createData)
routerChat.get('/:id', authMiddleware, readData)
routerChat.put('/:id', authMiddleware, updateData)
routerChat.delete('/:id', authMiddleware, deleteData)

export { routerChat }