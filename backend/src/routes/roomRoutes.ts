import express from 'express'
import { RoomController } from '../controllers/RoomController'

const roomRoutes = express.Router()

roomRoutes.post('/', RoomController.createRoom)

export {
  roomRoutes,
}