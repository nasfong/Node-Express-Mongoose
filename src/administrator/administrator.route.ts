import { Router } from 'express'
import { authMiddleware } from '../../Middleware/authMiddleware'
import { createData, readAllData, readData, updateData, deleteData } from './administrator.controller'

const routerAdministrator = Router()

routerAdministrator.get('', authMiddleware, readAllData)
routerAdministrator.post('', authMiddleware, createData)
routerAdministrator.get('/:id', authMiddleware, readData)
routerAdministrator.put('/:id', authMiddleware, updateData)
routerAdministrator.delete('/:id', authMiddleware, deleteData)
export { routerAdministrator }