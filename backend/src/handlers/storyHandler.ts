import { Socket, Server } from 'socket.io'

import { StoryController } from '../controllers/StoryController'

import { websocketErrorHandlerWrapper } from '../helpers/error'

import { SocketCallback } from '../types/socket'

function setupStoryEvents(io: Server, socket: Socket) {
  const storyController = new StoryController(io, socket)

  socket.on('story:create', websocketErrorHandlerWrapper((payload: Parameters<typeof storyController.createStory>[0], callback: SocketCallback) => {
    const newStory = storyController.createStory(payload)

    callback({
      status: 201,
      error: false,
      data: newStory,
    })
  }))

  socket.on('story:remove', websocketErrorHandlerWrapper((payload: Parameters<typeof storyController.removeStory>[0], callback: SocketCallback) => {
    storyController.removeStory(payload)

    callback({
      status: 200,
      error: false,
      data: null,
    })
  }))

  socket.on('story:start-voting', websocketErrorHandlerWrapper((payload: Parameters<typeof storyController.startVoting>[0], callback: SocketCallback) => {
    const updatedStory = storyController.startVoting(payload)

    callback({
      status: 200,
      error: false,
      data: updatedStory,
    })
  }))

  socket.on('story:save-vote', websocketErrorHandlerWrapper((payload: Parameters<typeof storyController.saveVote>[0], callback: SocketCallback) => {
    const updatedStory = storyController.saveVote(payload)

    callback({
      status: 200,
      error: false,
      data: updatedStory,
    })
  }))

  socket.on('story:conclude-voting', websocketErrorHandlerWrapper((payload: Parameters<typeof storyController.concludeVoting>[0], callback: SocketCallback) => {
    const updatedStory = storyController.concludeVoting(payload)

    callback({
      status: 200,
      error: false,
      data: updatedStory,
    })
  }))

  socket.on('story:restart-voting', websocketErrorHandlerWrapper((payload: Parameters<typeof storyController.restartVoting>[0], callback: SocketCallback) => {
    const updatedStory = storyController.restartVoting(payload)

    callback({
      status: 200,
      error: false,
      data: updatedStory,
    })
  }))
}

export {
  setupStoryEvents,
}