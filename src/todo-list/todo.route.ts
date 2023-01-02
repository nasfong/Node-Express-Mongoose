import { Router } from 'express'
import { authMiddleware } from '../../Middleware/authMiddleware'
import { createData, readAllData, readData, updateData, deleteData } from './todo.controller'

const routerTodo = Router()

routerTodo.get('', readAllData)
routerTodo.post('', authMiddleware, createData)
routerTodo.get('/:id', authMiddleware, readData)
routerTodo.put('/:id', authMiddleware, updateData)
routerTodo.delete('/:id', authMiddleware, deleteData)

export { routerTodo }