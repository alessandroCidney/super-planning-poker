import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import 'dotenv/config'

import { startMongoose } from './db/conn'

import { roomRoutes } from './routes/roomRoutes'

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

app.use('/rooms', roomRoutes)

io.on('connection', (socket) => {
  console.log('test', socket)
})

startMongoose()
  .then(() => {
    httpServer.listen(process.env.PORT, () => {
      console.log(`Listening at port ${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.error('Error establishing a connection to the database.', err)
  })