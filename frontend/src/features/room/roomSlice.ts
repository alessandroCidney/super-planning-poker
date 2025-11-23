import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { Room } from '@/types/rooms'
import type { User } from '@/types/users'
import type { Story } from '@/types/stories'

export interface RoomState {
  socketId?: string

  currentRoom?: Room

  showAvatarSelector: boolean
  
  showVotingConcludedAlert: boolean
  votingConcludedStory?: Story
}

const initialState: RoomState = {
  socketId: undefined,

  currentRoom: undefined,

  showAvatarSelector: false,

  showVotingConcludedAlert: false,
  votingConcludedStory: undefined,
}

export const roomSlice = createSlice({
  name: 'room',

  initialState,

  reducers: {
    setSocketId: (state, action: PayloadAction<string | undefined>) => {
      state.socketId = action.payload
    },

    setCurrentRoom: (state, action: PayloadAction<Room | undefined>) => {
      state.currentRoom = action.payload
    },

    toggleAvatarSelector: (state) => {
      state.showAvatarSelector = !state.showAvatarSelector
    },

    showVotingConcludedAlert: (state, action: PayloadAction<Story>) => {
      state.votingConcludedStory = action.payload
      state.showVotingConcludedAlert = true
    },

    closeVotingConcludedAlert: (state) => {
      state.showVotingConcludedAlert = false
    },

    /* WebSocket Events */
    createRoom: (_state, _action: PayloadAction<{ userData: Partial<User> }>) => {},
    joinRoom: (_state, _action: PayloadAction<{ roomId: string, userData: Partial<User> }>) => {},
    leaveRoom: (_state) => {},

    createStory: (_state, _action: PayloadAction<{ title: string }>) => {},
    removeStory: (_state, _action: PayloadAction<{ storyId: string }>) => {},

    startVoting: (_state, _action: PayloadAction<{ storyId: string }>) => {},
    saveVote: (_state, _action: PayloadAction<{ storyId: string, voteValue: number }>) => {},
    concludeVoting: (_state, _action: PayloadAction<{ storyId: string }>) => {},
    restartVoting: (_state, _action: PayloadAction<{ storyId: string }>) => {},

    updateAvatar: (_state, _action: PayloadAction<{ avatar: User['avatar'] }>) => {},
  },
})

export const {
  setSocketId,
  setCurrentRoom,

  toggleAvatarSelector,

  showVotingConcludedAlert,
  closeVotingConcludedAlert,

  createRoom,
  joinRoom,
  leaveRoom,

  createStory,
  removeStory,

  startVoting,
  saveVote,
  concludeVoting,
  restartVoting,

  updateAvatar,
} = roomSlice.actions

export default roomSlice.reducer
