import { Server, Socket } from 'socket.io'

import { onlineRooms } from './RoomController'

import { Story } from '../models/Story'

export class StoryController {
  io: Server
  socket: Socket

  constructor(io: Server, socket: Socket) {
    this.io = io
    this.socket = socket
  }

  createStory(params: { roomId: string, title: string }) {
    const story = new Story(params.title)

    onlineRooms[params.roomId].stories[story._id] = story

    this.io.to(params.roomId).emit('room:updated', onlineRooms[params.roomId])

    return story
  }

  removeStory(params: { roomId: string, storyId: string }) {
    delete onlineRooms[params.roomId].stories[params.storyId]

    this.io.to(params.roomId).emit('room:updated', onlineRooms[params.roomId])
  }

  startVoting(params: { roomId: string, storyId: string }) {
    onlineRooms[params.roomId].stories[params.storyId].votingStatus = 'in_progress'

    this.io.to(params.roomId).emit('room:updated', onlineRooms[params.roomId])

    this.io.to(params.roomId).emit('story:voting-started', onlineRooms[params.roomId].stories[params.storyId])

    return onlineRooms[params.roomId].stories[params.storyId]
  }

  saveVote(params: { roomId: string, storyId: string, voteValue: number }) {
    onlineRooms[params.roomId].stories[params.storyId].votes[this.socket.id] = params.voteValue

    this.io.to(params.roomId).emit('room:updated', onlineRooms[params.roomId])

    return onlineRooms[params.roomId].stories[params.storyId]
  }

  concludeVoting(params: { roomId: string, storyId: string }) {
    onlineRooms[params.roomId].stories[params.storyId].votingStatus = 'concluded'

    this.io.to(params.roomId).emit('room:updated', onlineRooms[params.roomId])

    this.io.to(params.roomId).emit('story:voting-concluded', onlineRooms[params.roomId].stories[params.storyId])

    return onlineRooms[params.roomId].stories[params.storyId]
  }

  restartVoting(params: { roomId: string, storyId: string }) {
    onlineRooms[params.roomId].stories[params.storyId].votes = {}
    onlineRooms[params.roomId].stories[params.storyId].votingStatus = 'in_progress'

    this.io.to(params.roomId).emit('room:updated', onlineRooms[params.roomId])

    this.io.to(params.roomId).emit('story:voting-restarted', onlineRooms[params.roomId].stories[params.storyId])

    return onlineRooms[params.roomId].stories[params.storyId]
  }
}