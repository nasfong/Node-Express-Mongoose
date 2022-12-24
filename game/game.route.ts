import express from 'express'
import { createData, deleteData, readAllData, readData, updateData, upload } from './game.controller';

const routerGame = express.Router()

routerGame.get('/', readAllData)
routerGame.post('/', [upload], createData)
routerGame.get('/:id', readData)
routerGame.put('/:id', [upload], updateData)
routerGame.delete('/:id', deleteData)


export { routerGame }

