import express, { Router } from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser'
import cors from 'cors'
import {
  routerMenu,
  routerTodo,
  routerGame,
  routerAuth,
  routerAdministrator
} from './src/index'

dotenv.config()
const PORT = process.env.PORT
const MONGO_DB = process.env.MONGO_DB

const app = express()

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const connect = async () => {
  try {
    mongoose.set("strictQuery", true)
    await mongoose
      .connect(MONGO_DB,
        {
          retryWrites: true,
          w: 'majority'
        }
      )
      .then(() => {
        console.log('Dabase Connected')
      })
  } catch (error) {
    console.log('Problemas al conectarse a la DB. Error ->', error);
  }
};
connect()

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})

app.use('/administrator', routerAdministrator)
app.use('/auth', routerAuth)
app.use('/menu', routerMenu)
app.use('/todo', routerTodo)
app.use('/game', routerGame)