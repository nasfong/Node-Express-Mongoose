import { Router } from 'express'
import { createData, readAllData, readData, updateData, deleteData } from './menu.controller'

const routerMenu = Router()

routerMenu.get('', readAllData)
routerMenu.post('', createData)
routerMenu.get('/:id', readData)
routerMenu.put('/:id', updateData)
routerMenu.delete('/id', deleteData)
export { routerMenu }