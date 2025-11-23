import { Socket, Server } from 'socket.io'

import { UserController } from '../controllers/UserController'

import { SocketCallback } from '../types/socket'

import { websocketErrorHandlerWrapper } from '../helpers/error'

function setupUserEvents(io: Server, socket: Socket) {
  const userController = new UserController(io, socket)

  socket.on('user:update-avatar', websocketErrorHandlerWrapper((payload: Parameters<typeof userController.updateAvatar>[0], callback: SocketCallback) => {
    const updatedUser = userController.updateAvatar(payload)

    callback({
      status: 201,
      error: false,
      data: updatedUser,
    })
  }))
}

export {
  setupUserEvents,
}