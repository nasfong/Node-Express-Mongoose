import { Router } from 'express'
import { createData, readAllData, readData, updateData, deleteData } from './todo.controller'

const routerTodo = Router()

routerTodo.get('', readAllData)
routerTodo.post('', createData)
routerTodo.get('/:id', readData)
routerTodo.put('/:id', updateData)
routerTodo.delete('/:id', deleteData)

export { routerTodo }