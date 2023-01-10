import { Router } from 'express'
import { authMiddleware } from '../../Middleware/authMiddleware'
import { createData, readAllData, readData, updateData, deleteData, readDropdown } from './role.controller'

const routerRole = Router()
const routerRoleDropdown = Router()

routerRole.get('', authMiddleware, readAllData)
routerRole.post('', authMiddleware, createData)
routerRole.get('/:id', authMiddleware, readData)
routerRole.put('/:id', authMiddleware, updateData)
routerRole.delete('/:id', authMiddleware, deleteData)

//dropdown
routerRoleDropdown.get('', authMiddleware, readDropdown)


export { routerRole, routerRoleDropdown }