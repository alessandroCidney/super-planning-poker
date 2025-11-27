import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface MonitoredMessage {
  status: 'in_progress' | 'concluded'
}

export interface WebSocketState {
  monitoredMessages: Record<string, MonitoredMessage>
}

const initialState: WebSocketState = {
  monitoredMessages: {},
}

export const websocketSlice = createSlice({
  name: 'websocket',

  initialState,

  reducers: {
    listenMessage: (state, action: PayloadAction<string>) => {
      state.monitoredMessages = {
        ...state.monitoredMessages,

        [action.payload]: {
          status: 'in_progress',
        },
      }
    },

    concludeMessage: (state, action: PayloadAction<string>) => {
      state.monitoredMessages = {
        ...state.monitoredMessages,

        [action.payload]: {
          status: 'concluded',
        },
      }
    },

    unsubscribeMessage: (state, action: PayloadAction<string>) => {
      const newObj = { ...state.monitoredMessages }

      delete newObj[action.payload]

      state.monitoredMessages = newObj
    },
  },
})

export const { listenMessage, concludeMessage, unsubscribeMessage } = websocketSlice.actions

export default websocketSlice.reducer
