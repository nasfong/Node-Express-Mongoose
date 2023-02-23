import express, { Router } from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io';
import {
  routerMenu,
  routerTodo,
  routerGame,
  routerAuth,
  routerAdministrator,
  routerRole,
  routerRoleDropdown,
  routerChat
} from './src/index'
import { routerPermission } from './src/permission/permission.route';

dotenv.config()
const PORT = process.env.PORT
const MONGO_DB = process.env.MONGO_DB

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: process.env.REACT_APP
    // origin: process.env.FRONTEND
  }
})
// const io = new Server({
//   path: "123"
// });

let arr = []

io.on('connect', (socket) => {
  // console.log(socket.id)
  socket.on('userupdate', (data) => {
    // arr.push({ [socket.id]: data })
    arr = arr.concat({ [data]: socket.id })
    io.emit('userpush', arr)
    // console.log(arr)
  })
  socket.on('disconnect', () => {
    arr = arr.filter((a) => a[socket.id] !== socket.id)
    io.emit('userpush', arr)
    // console.log(socket.id)
    // console.log(`user id = ${arr} disconnect`)
  })

  socket.on('userupdate', () => {
  })



  socket.on('send_message', (data) => {
    io.emit('recv_message', data)
  })

})

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

httpServer.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})

app.use('/administrator', routerAdministrator)
app.use('/auth', routerAuth)
app.use('/menu', routerMenu)
app.use('/todo', routerTodo)
app.use('/game', routerGame)
app.use('/role', routerRole)
app.use('/role-dropdown', routerRoleDropdown)
app.use('/permission', routerPermission)
app.use('/permission-dropdown', routerRoleDropdown)
app.use('/chat', routerChat)
