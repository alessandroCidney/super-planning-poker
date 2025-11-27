import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import 'dotenv/config'

import { onlineRooms } from './controllers/RoomController'

import { setupRoomEvents } from './handlers/roomHandler'
import { setupStoryEvents } from './handlers/storyHandler'
import { setupUserEvents } from './handlers/userHandler'

if (!process.env.WEBSITE_URL) {
  throw new Error('Please set the WEBSITE_URL environment variable')
}

const app = express()

app.use(cors({
  origin: process.env.WEBSITE_URL,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: [process.env.WEBSITE_URL],
  },
})

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'OK',
  })
})

app.get('/rooms', (req, res) => {
  res.status(200).json({
    totalRooms: Object.keys(onlineRooms).length,
  })
})

app.get('/rooms/:id', (req, res) => {
  const roomId = req.params.id

  const roomData = onlineRooms[roomId]

  if (roomData) {
    res.status(200).json({
      _id: roomData._id,
    })
  } else {
    res.status(404).json({
      message: 'Cannot found room',
    })
  }
})

io.on('connection', (socket) => {
  setupRoomEvents(io, socket)
  setupStoryEvents(io, socket)
  setupUserEvents(io, socket)
})

httpServer.listen(process.env.PORT || 8080, () => {
  console.log(`Listening at port ${process.env.PORT}`)
})