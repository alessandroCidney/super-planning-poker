import { createSlice, type PayloadAction, type WritableDraft } from '@reduxjs/toolkit'

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

type WebSocketActionParams<P> = [_state: WritableDraft<RoomState>, _state: PayloadAction<P & { messageId?: string }>]

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

    /*
      Actions that call the websocket

      (The actions that call the websocket are not configured here, but rather in the Redux middleware.
      Check the files in @/features/room/api)

      When calling these actions, use the useWebSocketActions hook if you want to wait for completion.
    */
    createRoom: (..._rest: WebSocketActionParams<{ userData: Partial<User> }>) => {},
    joinRoom: (..._rest: WebSocketActionParams<{ roomId: string, userData: Partial<User> }>) => {},

    createStory: (..._rest: WebSocketActionParams<{ title: string }>) => {},
    removeStory: (..._rest: WebSocketActionParams<{ storyId: string }>) => {},

    startVoting: (..._rest: WebSocketActionParams<{ storyId: string }>) => {},
    concludeVoting: (..._rest: WebSocketActionParams<{ storyId: string }>) => {},
    restartVoting: (..._rest: WebSocketActionParams<{ storyId: string }>) => {},
    saveVote: (..._rest: WebSocketActionParams<{ storyId: string, voteValue: number }>) => {},

    updateAvatar: (..._rest: WebSocketActionParams<{ avatar: User['avatar'] }>) => {},
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

  createStory,
  removeStory,

  startVoting,
  saveVote,
  concludeVoting,
  restartVoting,

  updateAvatar,
} = roomSlice.actions

export default roomSlice.reducer
