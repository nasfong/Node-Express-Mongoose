import { Router } from 'express'
import { authProfile } from '../../Middleware/authProfile'
import { login, register, readUser } from './auth.controller'

const routerAuth = Router()


routerAuth.post('/register', register)
routerAuth.post('/login', login)
routerAuth.get('/profile', authProfile)

export { routerAuth }