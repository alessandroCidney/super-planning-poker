import { combineReducers, configureStore, Tuple } from '@reduxjs/toolkit'

import { setupSocketMiddleware } from '@/features/room/api'

import sidebarReducer from '../features/sidebar/sidebarSlice'
import notificationsReducer from '../features/notifications/notificationsSlice'
import roomReducer from '../features/room/roomSlice'
import websocketReducer from '../features/websocket/websocketSlice'

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  notifications: notificationsReducer,
  room: roomReducer,
  websocket: websocketReducer,
})

export const store = configureStore({
  reducer: rootReducer,

  middleware: () => new Tuple(setupSocketMiddleware),
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store