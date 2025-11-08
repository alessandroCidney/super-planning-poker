import { Socket, Server } from 'socket.io'

import { Room } from '../models/Room'
import { User } from '../models/User'

export const onlineRooms: Record<string, Room> = {}

export class RoomController {
  io: Server
  socket: Socket

  constructor(io: Server, socket: Socket) {
    console.log('socket', socket?.id)

    this.io = io
    this.socket = socket
  }

  async createRoom() {
    console.log('createRoom', this.socket.id)

    const room = new Room()

    room.ownerIds.push(this.socket.id)

    onlineRooms[room._id] = room

    this.joinRoom(room._id, { name: 'Sem Nome' })

    this.io.to(room._id).emit('room:created', room)
  }

  async joinRoom(roomId: string, userData: Partial<User>) {
    console.log('joinRoom')

    const user = new User(userData.name, this.socket.id)

    this.socket.join(roomId)

    onlineRooms[roomId].users.push(user)

    this.io.to(roomId).emit('room:updated', onlineRooms[roomId])
  }

  async leaveRoom(roomId: string) {
    console.log('leaveRoom')

    const onlineUsers = onlineRooms[roomId].users

    const userIndex = onlineUsers.findIndex(userData => userData._id === this.socket.id)
    onlineUsers.splice(userIndex, 1)

    if (onlineUsers.length > 0) {
      this.io.to(roomId).emit('room:updated', onlineRooms[roomId])
    }
  }

  async deleteRoom(roomId: string) {
    console.log('deleteRoom')

    delete onlineRooms[roomId]
  }
}
