import { Socket, Server } from 'socket.io'

import { RoomController, onlineRooms } from '../controllers/RoomController'

import { User } from '../models/User'

import { AppError } from '../helpers/error'

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
  socket.on('room:create', (callback: SocketCallback) => {
    const newRoom = roomController.createRoom()

    callback({
      status: 201,
      error: false,
      data: newRoom,
    })
  })

  socket.on('room:join', (roomId: string, userData: Partial<User>, callback: SocketCallback) => {
    try {
      const joinedRoom = roomController.joinRoom(roomId, userData)

      callback({
        status: 200,
        error: false,
        data: joinedRoom,
      })
    } catch (err) {
      if (err instanceof AppError) {
        callback({
          error: true,
          status: err.status,
          message: err.message,
          data: null,
        })
      }
    }
  })

  socket.on('disconnecting', () => {
    for (const roomId of socket.rooms) {
      if (onlineRooms[roomId]) {
        roomController.leaveRoom(roomId)
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