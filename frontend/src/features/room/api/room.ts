import type { Socket } from 'socket.io-client'

import type { Middleware, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '@/app/store'

import * as roomSlice from '@/features/room/roomSlice'
import { showMessageWithDelay } from '@/features/notifications/hooks/useNotifications'

import type { User } from '@/types/users'
import type { Room } from '@/types/rooms'
import type { SocketResponse } from '@/types/socket'

import { AppError } from '@/utils/error'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type MiddlewareType = Middleware<{}, RootState>

type MiddlewareStoreParam = Parameters<MiddlewareType>[0]

export function setupRoomHandlers(
  store: MiddlewareStoreParam,
  action: PayloadAction<unknown>,
  makeSureIsConnected: () => Promise<Socket>,
  emitMessage: <T>(type: string, payload: unknown) => Promise<SocketResponse<T>>,
  clearSocket: () => void,
) {

  async function createRoom(userData: Partial<User>) {
    const socket = await makeSureIsConnected()

    const response = await emitMessage<Room>('room:create', {
      userData,
    })

    store.dispatch({
      type: 'room/setCurrentRoom',
      payload: response.data,
    })

    socket.on('room:updated', updateRoom)
  }

  async function joinRoom(roomId: string, userData: Partial<User>) {
    const socket = await makeSureIsConnected()

    const response = await emitMessage<Room>('room:join', {
      roomId,
      userData,
    })

    store.dispatch({
      type: 'room/setCurrentRoom',
      payload: response.data,
    })

    socket.on('room:updated', updateRoom)
  }

  function updateRoom(updatedRoom: Room) {
    store.dispatch({
      type: 'room/setCurrentRoom',
      payload: updatedRoom,
    })
  }

  async function leaveRoom() {
    const socket = await makeSureIsConnected()

    socket.removeAllListeners()

    socket.disconnect()

    clearSocket()

    store.dispatch({
      type: 'room/setSocketId',
      payload: undefined,
    })

    store.dispatch({
      type: 'room/setCurrentRoom',
      payload: undefined,
    })
  }

  switch (action.type) {
    case 'room/createRoom': {
      const actionPayload = action.payload as Parameters<typeof roomSlice['createRoom']>[0]
  
      createRoom(actionPayload.userData)
  
      return { stopAction: true }
    }
  
    case 'room/joinRoom': {
      const actionPayload = action.payload as Parameters<typeof roomSlice['joinRoom']>[0]
  
      joinRoom(actionPayload.roomId, actionPayload.userData)
  
      return { stopAction: true }
    }
  
    case 'room/leaveRoom': {
      leaveRoom()
  
      return { stopAction: true }
    }

    default:
      return { stopAction: false }
  }
}