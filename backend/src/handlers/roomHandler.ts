import { Socket, Server } from 'socket.io'

import { RoomController, onlineRooms } from '../controllers/RoomController'

function setupRoomEvents(io: Server, socket: Socket) {
  console.log('setupRoomEvents', socket?.id)

  const roomControler = new RoomController(io, socket)

  socket.on('room:create', () => roomControler.createRoom())

  socket.on('room:join', roomControler.joinRoom)
  socket.on('room:leave', roomControler.leaveRoom)

  // Socket IO Events

  io.of('/').adapter.on('leave-room', (roomId) => {
    if (onlineRooms[roomId]) {
      roomControler.leaveRoom(roomId)
    }
  })

  io.of('/').adapter.on('delete-room', (roomId) => {
    if (onlineRooms[roomId]) {
      roomControler.deleteRoom(roomId)
    }
  })
}

export {
  setupRoomEvents,
}