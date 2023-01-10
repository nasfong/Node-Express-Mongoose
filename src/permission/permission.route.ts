import { Router } from 'express'
import { authMiddleware } from '../../Middleware/authMiddleware'
import { createData, readAllData, readData, updateData, deleteData, readDropdown } from './permission.controller'

const routerPermission = Router()
const routerPermissionDropdown = Router()

routerPermission.get('', authMiddleware, readAllData)
routerPermission.post('', authMiddleware, createData)
routerPermission.get('/:id', authMiddleware, readData)
routerPermission.put('/:id', authMiddleware, updateData)
routerPermission.delete('/:id', authMiddleware, deleteData)

//dropdown
routerPermissionDropdown.get('', authMiddleware, readDropdown)


export { routerPermission, routerPermissionDropdown }