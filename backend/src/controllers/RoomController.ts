import { Socket, Server } from 'socket.io'

import { Room } from '../models/Room'
import { User } from '../models/User'

import { AppError } from '../helpers/error'

export const onlineRooms: Record<string, Room> = {}

export class RoomController {
  io: Server
  socket: Socket

  constructor(io: Server, socket: Socket) {
    this.io = io
    this.socket = socket
  }

  createRoom(params: { userData: Partial<User> }) {
    const room = new Room()

    room.ownerIds.push(this.socket.id)

    onlineRooms[room._id] = room

    this.joinRoom({ roomId: room._id, userData: { name: params.userData.name, avatar: params.userData.avatar } })

    return room
  }

  joinRoom(params: { roomId: string, userData: Partial<User> }) {
    if (!onlineRooms[params.roomId]) {
      throw new AppError({
        message: 'Sala não encontrada!',
        details: 'A sala não existe ou foi removida.',
        status: 404,
      })
    }

    const user = new User(params.userData.name, this.socket.id, params.userData.avatar)

    this.socket.join(params.roomId)

    onlineRooms[params.roomId].users[user._id] = user

    this.io.to(params.roomId).emit('room:updated', onlineRooms[params.roomId])

    return onlineRooms[params.roomId]
  }

  leaveRoom(params: { roomId: string }) {
    delete onlineRooms[params.roomId].users[this.socket.id]

    if (Object.keys(onlineRooms[params.roomId].users).length > 0) {
      this.io.to(params.roomId).emit('room:updated', onlineRooms[params.roomId])
    }
  }

  async deleteRoom(roomId: string) {
    delete onlineRooms[roomId]
  }
}
