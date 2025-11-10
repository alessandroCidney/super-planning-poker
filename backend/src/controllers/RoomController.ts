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

  createRoom() {
    const room = new Room()

    room.ownerIds.push(this.socket.id)

    onlineRooms[room._id] = room

    this.joinRoom(room._id, { name: 'Sem Nome' })

    return room
  }

  joinRoom(roomId: string, userData: Partial<User>) {
    if (!onlineRooms[roomId]) {
      throw new AppError('Cannot found room', 404)
    }

    const user = new User(userData.name, this.socket.id)

    this.socket.join(roomId)

    onlineRooms[roomId].users[user._id] = user

    this.io.to(roomId).emit('room:updated', onlineRooms[roomId])

    return onlineRooms[roomId]
  }

  leaveRoom(roomId: string) {
    delete onlineRooms[roomId].users[this.socket.id]

    if (Object.keys(onlineRooms[roomId].users).length > 0) {
      this.io.to(roomId).emit('room:updated', onlineRooms[roomId])
    }
  }

  async deleteRoom(roomId: string) {
    delete onlineRooms[roomId]
  }
}
