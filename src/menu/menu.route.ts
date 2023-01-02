import { Router } from 'express'
import { authMiddleware } from '../../Middleware/authMiddleware'
import { createData, readAllData, readData, updateData, deleteData } from './menu.controller'

const routerMenu = Router()

routerMenu.get('', authMiddleware, readAllData)
routerMenu.post('', authMiddleware, createData)
routerMenu.get('/:id', authMiddleware, readData)
routerMenu.put('/:id', authMiddleware, updateData)
routerMenu.delete('/id', authMiddleware, deleteData)
export { routerMenu }