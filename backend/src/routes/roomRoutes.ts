import express from 'express'
import { Socket } from 'socket.io'

import { RoomController } from '../controllers/RoomController'
import { roomSchema } from '../models/Room'
import { HydratedDocument, InferSchemaType } from 'mongoose'

const roomRoutes = express.Router()

roomRoutes.post('/', RoomController.createRoom)

function setupRoomEvents(socket: Socket) {
  const loadedRooms: HydratedDocument<InferSchemaType<typeof roomSchema>>[] = []

  socket.on('room:enter', (test) => {
    console.log('test', test)
  })
}

export {
  roomRoutes,
  setupRoomEvents,
}