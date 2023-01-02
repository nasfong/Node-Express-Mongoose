import express from 'express'
import { authMiddleware } from '../../Middleware/authMiddleware';
import { createData, deleteData, readAllData, readData, updateData, upload } from './game.controller';

const routerGame = express.Router()

routerGame.get('/', authMiddleware, readAllData)
routerGame.post('/', authMiddleware, upload, createData)
routerGame.get('/:id', authMiddleware, readData)
routerGame.put('/:id', authMiddleware, upload, updateData)
routerGame.delete('/:id', authMiddleware, deleteData)


export { routerGame }

