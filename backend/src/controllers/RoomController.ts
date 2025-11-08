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

  createRoom() {
    console.log('createRoom', this.socket.id)

    const room = new Room()

    room.ownerIds.push(this.socket.id)

    onlineRooms[room._id] = room

    this.joinRoom(room._id, { name: 'Sem Nome' })

    return room
  }

  joinRoom(roomId: string, userData: Partial<User>) {
    console.log('joinRoom')
    console.log('roomBefore', onlineRooms[roomId])

    const user = new User(userData.name, this.socket.id)

    this.socket.join(roomId)

    onlineRooms[roomId].users[user._id] = user

    this.io.to(roomId).emit('room:updated', onlineRooms[roomId])
    console.log('roomAfter', onlineRooms[roomId])

    return onlineRooms[roomId]
  }

  leaveRoom(roomId: string) {
    console.log('leaveRoom')

    delete onlineRooms[roomId].users[this.socket.id]

    console.log('removing user', this.socket.id, 'from', roomId)

    if (Object.keys(onlineRooms[roomId].users).length > 0) {
      this.io.to(roomId).emit('room:updated', onlineRooms[roomId])
    }
  }

  async deleteRoom(roomId: string) {
    console.log('deleteRoom')

    delete onlineRooms[roomId]
  }
}
