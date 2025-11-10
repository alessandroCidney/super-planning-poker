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

  createStory(roomId: string, title: string, description: string) {
    const story = new Story(title, description)

    onlineRooms[roomId].stories[story._id] = story

    this.io.to(roomId).emit('room:updated', onlineRooms[roomId])

    return story
  }

  removeStory(roomId: string, storyId: string) {
    delete onlineRooms[roomId].stories[storyId]

    this.io.to(roomId).emit('room:updated', onlineRooms[roomId])
  }

  startVoting(roomId: string, storyId: string) {
    onlineRooms[roomId].stories[storyId].votingStatus = 'in_progress'

    this.io.to(roomId).emit('room:updated', onlineRooms[roomId])

    return onlineRooms[roomId].stories[storyId]
  }

  saveVote(roomId: string, storyId: string, voteValue: number) {
    onlineRooms[roomId].stories[storyId].votes[this.socket.id] = voteValue

    this.io.to(roomId).emit('room:updated', onlineRooms[roomId])

    return onlineRooms[roomId].stories[storyId]
  }

  concludeVoting(roomId: string, storyId: string) {
    onlineRooms[roomId].stories[storyId].votingStatus = 'concluded'

    this.io.to(roomId).emit('room:updated', onlineRooms[roomId])

    return onlineRooms[roomId].stories[storyId]
  }
}