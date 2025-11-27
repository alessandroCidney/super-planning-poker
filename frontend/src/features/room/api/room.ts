import type { Socket } from 'socket.io-client'

import type { Middleware, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '@/app/store'

import * as roomSlice from '@/features/room/roomSlice'

import type { Room } from '@/types/rooms'
import type { SocketResponse } from '@/types/socket'

import { createWebSocketEventHandler } from '../utils/handlers'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type MiddlewareType = Middleware<{}, RootState>

type MiddlewareStoreParam = Parameters<MiddlewareType>[0]

export function setupRoomHandlers(
  store: MiddlewareStoreParam,
  action: PayloadAction<unknown>,
  makeSureIsConnected: () => Promise<Socket>,
  emitMessage: <T>(type: string, payload: unknown) => Promise<SocketResponse<T>>,
) {

  const createRoom = createWebSocketEventHandler(store, async (payload: Parameters<typeof roomSlice['createRoom']>[0]) => {
    const socket = await makeSureIsConnected()

    const response = await emitMessage<Room>('room:create', payload)

    store.dispatch({
      type: 'room/setCurrentRoom',
      payload: response.data,
    })

    if (socket.id && response.data.ownerIds.includes(socket.id)) {
      store.dispatch({
        type: 'sidebar/openSidebar',
      })
    }

    socket.on('room:updated', updateRoom)
  })

  const joinRoom = createWebSocketEventHandler(store, async (payload: Parameters<typeof roomSlice['joinRoom']>[0]) => {
    const socket = await makeSureIsConnected()

    const response = await emitMessage<Room>('room:join', payload)

    store.dispatch({
      type: 'room/setCurrentRoom',
      payload: response.data,
    })

    socket.on('room:updated', updateRoom)
  })

  function updateRoom(updatedRoom: Room) {
    store.dispatch({
      type: 'room/setCurrentRoom',
      payload: updatedRoom,
    })
  }

  switch (action.type) {
    case 'room/createRoom': {
      const actionPayload = action.payload as Parameters<typeof roomSlice['createRoom']>[0]
  
      createRoom(actionPayload)
  
      return { stopAction: true }
    }
  
    case 'room/joinRoom': {
      const actionPayload = action.payload as Parameters<typeof roomSlice['joinRoom']>[0]
  
      joinRoom(actionPayload)
  
      return { stopAction: true }
    }

    default:
      return { stopAction: false }
  }
}