import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import 'dotenv/config'

import { setupRoomEvents } from './handlers/roomHandler'
import { onlineRooms } from './controllers/RoomController'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000'],
  },
})

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'OK',
  })
})

app.get('/rooms', (req, res) => {
  res.status(200).json({
    rooms: onlineRooms,
  })
})

io.on('connection', (socket) => {
  console.log('new socket connection', socket.id)

  setupRoomEvents(io, socket)
})

httpServer.listen(process.env.PORT, () => {
  console.log(`Listening at port ${process.env.PORT}`)
})