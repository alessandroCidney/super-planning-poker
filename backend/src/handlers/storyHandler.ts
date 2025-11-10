import { Socket, Server } from 'socket.io'

import { StoryController } from '../controllers/StoryController'

import { SocketCallback } from '../types/socket'

function setupStoryEvents(io: Server, socket: Socket) {
  const storyController = new StoryController(io, socket)

  socket.on('story:create', (roomId: string, title: string, description: string, callback: SocketCallback) => {
    const newStory = storyController.createStory(roomId, title, description)

    callback({
      status: 201,
      error: false,
      data: newStory,
    })
  })

  socket.on('story:remove', (roomId: string, storyId: string, callback: SocketCallback) => {
    storyController.removeStory(roomId, storyId)

    callback({
      status: 200,
      error: false,
      data: null,
    })
  })

  socket.on('story:start-voting', (roomId: string, storyId: string, callback: SocketCallback) => {
    const updatedStory = storyController.startVoting(roomId, storyId)

    callback({
      status: 200,
      error: false,
      data: updatedStory,
    })
  })

  socket.on('story:save-vote', (roomId: string, storyId: string, voteValue: number, callback: SocketCallback) => {
    const updatedStory = storyController.saveVote(roomId, storyId, voteValue)

    callback({
      status: 200,
      error: false,
      data: updatedStory,
    })
  })

  socket.on('story:conclude-voting', (roomId: string, storyId: string, callback: SocketCallback) => {
    const updatedStory = storyController.concludeVoting(roomId, storyId)

    callback({
      status: 200,
      error: false,
      data: updatedStory,
    })
  })
}

export {
  setupStoryEvents,
}