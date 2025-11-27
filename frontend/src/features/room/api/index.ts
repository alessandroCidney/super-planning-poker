import { io, type Socket } from 'socket.io-client'

import type { Middleware, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '@/app/store'

import type { SocketResponse } from '@/types/socket'

import { AppError } from '@/utils/error'

import { setupRoomHandlers } from './room'
import { setupStoryHandlers, setupStoryListeners } from './story'
import { setupUserHandlers } from './user'
import { showMessageWithDelay } from '@/features/notifications/hooks/useNotifications'

/*
  The Redux documentation recommends disabling the ESLint rule.
  https://redux.js.org/usage/usage-with-typescript#type-checking-middleware
*/

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const setupSocketMiddleware: Middleware<{}, RootState> = (store) => {
  let globalSocket: Socket | undefined

  async function makeSureIsConnected() {
    if (globalSocket) {
      return globalSocket
    }

    return new Promise<Socket>((resolve) => {
      globalSocket = io(import.meta.env.VITE_API_URL)

      globalSocket.on('connect', () => {
        const connectedSocket = globalSocket as Socket

        store.dispatch({
          type: 'room/setSocketId',
          payload: connectedSocket.id,
        })

        setupStoryListeners(connectedSocket, store)

        resolve(connectedSocket)
      })
    })
  }

  async function emitMessage<T>(type: string, payload: unknown) {
    const socket = await makeSureIsConnected()

    const response = await new Promise<SocketResponse<T>>((resolve) => {
      socket.emit(type, payload, (res: SocketResponse<T>) => {
        resolve(res)
      })
    })

    if (response.error) {
      const appError = new AppError({
        message: response.message ?? 'Erro não identificado!',
        details: response.details ?? 'Por favor, tente novamente mais tarde.',
        status: response.status,
      })

      showMessageWithDelay(
        () => store.getState().notifications,
        store.dispatch,
        {
          title: appError.message,
          description: appError.details,
          type: 'error',
        },
      )

      throw appError
    }

    return response
  }

  function makeSureRoomIsLoaded() {
    const currentRoom = store.getState().room.currentRoom

    if (!currentRoom) {
      throw new Error('The room data has not yet been loaded.')
    }

    return currentRoom
  }


  return next => (action) => {
    // It was not possible to configure the type directly in the parameter.
    const typedAction = action as PayloadAction<unknown>

    const roomHandlerResult = setupRoomHandlers(store, typedAction, makeSureIsConnected, emitMessage)
    const storyHandlerResult = setupStoryHandlers(store, typedAction, makeSureRoomIsLoaded, emitMessage)
    const userHandlerResult = setupUserHandlers(store, typedAction, makeSureRoomIsLoaded, emitMessage)

    const resultArr = [roomHandlerResult, storyHandlerResult, userHandlerResult]

    if (resultArr.some(resultData => !resultData.stopAction)) {
      next(action)
    }
  }
}