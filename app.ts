import express, { Router } from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import { routerMenu } from './menu/menu.route'
import bodyParser from 'body-parser'
import cors from 'cors'
import { routerTodo } from './todo-list/todo.route'
import { routerGame } from './game/game.route'

const { PORT, MONGO_DB }: any = process.env

const app = express()

app.use(express.static('public'))
app.use('/images', express.static('images'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

mongoose.set("strictQuery", false)
mongoose
  .connect(MONGO_DB, {
    retryWrites: true,
    w: 'majority'
  })
  .then(() => {
    console.log('Dabase Connected')
  })

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})

app.use('/menu', routerMenu)
app.use('/todo', routerTodo)
app.use('/game', routerGame)