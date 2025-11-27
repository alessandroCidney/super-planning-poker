import type { Middleware, PayloadAction } from '@reduxjs/toolkit'

import type { Socket } from 'socket.io-client'

import * as roomSlice from '@/features/room/roomSlice'
import { showMessageWithDelay } from '@/features/notifications/hooks/useNotifications'

import type { RootState } from '@/app/store'

import type { Room } from '@/types/rooms'
import type { SocketResponse } from '@/types/socket'
import type { Story } from '@/types/stories'

import { createWebSocketEventHandler } from '../utils/handlers'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type MiddlewareType = Middleware<{}, RootState>

type MiddlewareStoreParam = Parameters<MiddlewareType>[0]

export function setupStoryHandlers(
  store: MiddlewareStoreParam,
  action: PayloadAction<unknown>,
  makeSureRoomIsLoaded: () => Room,
  emitMessage: <T>(type: string, payload: unknown) => Promise<SocketResponse<T>>,
) {
  const createStory = createWebSocketEventHandler(store, async (payload: Parameters<typeof roomSlice['createStory']>[0]) => {
    const currentRoom = makeSureRoomIsLoaded()

    await emitMessage<Story>('story:create', {
      roomId: currentRoom._id,
      ...payload,
    })

    showMessageWithDelay(
      () => store.getState().notifications,
      store.dispatch,
      {
        title: 'Tarefa adicionada!',
        description: 'A nova tarefa foi adicionada com sucesso.',
        type: 'success',
      },
    )
  })

  const removeStory = createWebSocketEventHandler(store, async (payload: Parameters<typeof roomSlice['removeStory']>[0]) => {
    const currentRoom = makeSureRoomIsLoaded()

    await emitMessage('story:remove', {
      roomId: currentRoom._id,
      ...payload,
    })
  })

  const startVoting = createWebSocketEventHandler(store, async (payload: Parameters<typeof roomSlice['startVoting']>[0]) => {
    const currentRoom = makeSureRoomIsLoaded()

    await emitMessage('story:start-voting', {
      roomId: currentRoom._id,
      ...payload,
    })
  })

  const saveVote = createWebSocketEventHandler(store, async (payload: Parameters<typeof roomSlice['saveVote']>[0]) => {
    const currentRoom = makeSureRoomIsLoaded()

    await emitMessage('story:save-vote', {
      roomId: currentRoom._id,
      ...payload,
    })

    showMessageWithDelay(
      () => store.getState().notifications,
      store.dispatch,
      {
        title: 'Voto salvo!',
        description: 'Seu voto foi registrado com sucesso.',
        type: 'success',
      },
    )
  })

  const concludeVoting = createWebSocketEventHandler(store, async (payload: Parameters<typeof roomSlice['concludeVoting']>[0]) => {
    const currentRoom = makeSureRoomIsLoaded()

    await emitMessage('story:conclude-voting', {
      roomId: currentRoom._id,
      ...payload,
    })
  })

  const restartVoting = createWebSocketEventHandler(store, async (payload: Parameters<typeof roomSlice['restartVoting']>[0]) => {
    const currentRoom = makeSureRoomIsLoaded()

    await emitMessage('story:restart-voting', {
      roomId: currentRoom._id,
      ...payload,
    })
  })

  switch (action.type) {
    case 'room/createStory': {
      const actionPayload = action.payload as Parameters<typeof roomSlice['createStory']>[0]
  
      createStory(actionPayload)
  
      return { stopAction: true }
    }
  
    case 'room/removeStory': {
      const actionPayload = action.payload as Parameters<typeof roomSlice['removeStory']>[0]
  
      removeStory(actionPayload)
  
      return { stopAction: true }
    }
  
    case 'room/startVoting': {
      const actionPayload = action.payload as Parameters<typeof roomSlice['startVoting']>[0]
  
      startVoting(actionPayload)
  
      return { stopAction: true }
    }
  
    case 'room/saveVote': {
      const actionPayload = action.payload as Parameters<typeof roomSlice['saveVote']>[0]
  
      saveVote(actionPayload)
  
      return { stopAction: true }
    }
  
    case 'room/concludeVoting': {
      const actionPayload = action.payload as Parameters<typeof roomSlice['concludeVoting']>[0]
  
      concludeVoting(actionPayload)
  
      return { stopAction: true }
    }
  
    case 'room/restartVoting': {
      const actionPayload = action.payload as Parameters<typeof roomSlice['restartVoting']>[0]
  
      restartVoting(actionPayload)
  
      return { stopAction: true }
    }
  
    default:
      return { stopAction: false }
  }
}

export function setupStoryListeners(
  socket: Socket,
  store: MiddlewareStoreParam,
) {
  socket.on('story:voting-started', (storyData: Story) => {
    showMessageWithDelay(
      () => store.getState().notifications,
      store.dispatch,
      {
        title: 'Nova votação iniciada!',
        description: `Aguardando votos para a tarefa "${storyData.title}".`,
        type: 'info',
      },
    )
  })

  socket.on('story:voting-restarted', (storyData: Story) => {
    showMessageWithDelay(
      () => store.getState().notifications,
      store.dispatch,
      {
        title: 'Votação reiniciada!',
        description: `Aguardando votos para a tarefa "${storyData.title}".`,
        type: 'info',
      },
    )
  })

  socket.on('story:voting-concluded', (storyData: Story) => {
    store.dispatch(roomSlice.showVotingConcludedAlert(storyData))
  })
}