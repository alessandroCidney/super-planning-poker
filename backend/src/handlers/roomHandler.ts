import { Socket, Server } from 'socket.io'

import { RoomController, onlineRooms } from '../controllers/RoomController'

import { User } from '../models/User'
import { Room } from '../models/Room'

type SocketCallback<T> = (param: T) => void

function setupRoomEvents(io: Server, socket: Socket) {
  console.log('setupRoomEvents', socket?.id)

  const roomControler = new RoomController(io, socket)

  socket.on('room:create', async (callback: SocketCallback<Room>) => {
    const newRoom = roomControler.createRoom()

    callback(newRoom)
  })

  socket.on('room:join', async (roomId: string, userData: Partial<User>, callback: SocketCallback<Room>) => {
    const joinedRoom = roomControler.joinRoom(roomId, userData)

    callback(joinedRoom)
  })

  socket.on('disconnecting', () => {
    for (const roomId of socket.rooms) {
      if (onlineRooms[roomId]) {
        roomControler.leaveRoom(roomId)
      }
    }
  })

  // Socket IO Events

  io.of('/').adapter.on('delete-room', (roomId) => {
    if (onlineRooms[roomId]) {
      roomControler.deleteRoom(roomId)
    }
  })
}

export {
  setupRoomEvents,
}