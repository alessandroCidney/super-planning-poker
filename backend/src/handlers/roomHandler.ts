import { Socket, Server } from 'socket.io'

import { RoomController, onlineRooms } from '../controllers/RoomController'

import { websocketErrorHandlerWrapper } from '../helpers/error'

import { SocketCallback } from '../types/socket'

let loadedGeneralEvents = false

function setupRoomGeneralEvents(roomController: RoomController, io: Server) {
  if (!loadedGeneralEvents) {
    loadedGeneralEvents = true

    io.of('/').adapter.on('delete-room', (roomId) => {
      if (onlineRooms[roomId]) {
        roomController.deleteRoom(roomId)
      }
    })
  }
}

function setupRoomIndividualEvents(roomController: RoomController, socket: Socket) {
  socket.on('room:create', websocketErrorHandlerWrapper((payload: Parameters<typeof roomController.createRoom>[0], callback: SocketCallback) => {
    const newRoom = roomController.createRoom(payload)

    callback({
      status: 201,
      error: false,
      data: newRoom,
    })
  }))

  socket.on('room:join', websocketErrorHandlerWrapper((payload: Parameters<typeof roomController.joinRoom>[0], callback: SocketCallback) => {
    const joinedRoom = roomController.joinRoom(payload)

    callback({
      status: 200,
      error: false,
      data: joinedRoom,
    })
  }))

  socket.on('disconnecting', () => {
    for (const roomId of socket.rooms) {
      if (onlineRooms[roomId]) {
        roomController.leaveRoom({ roomId })
      }
    }
  })
}

function setupRoomEvents(io: Server, socket: Socket) {
  const roomController = new RoomController(io, socket)

  setupRoomIndividualEvents(roomController, socket)
  setupRoomGeneralEvents(roomController, io)
}

export {
  setupRoomEvents,
}