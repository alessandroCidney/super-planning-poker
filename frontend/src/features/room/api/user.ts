import type { Middleware, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '@/app/store'

import * as roomSlice from '@/features/room/roomSlice'
import { showMessageWithDelay } from '@/features/notifications/hooks/useNotifications'

import type { User } from '@/types/users'
import type { Room } from '@/types/rooms'
import type { SocketResponse } from '@/types/socket'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type MiddlewareType = Middleware<{}, RootState>

type MiddlewareStoreParam = Parameters<MiddlewareType>[0]

export function setupUserHandlers(
  store: MiddlewareStoreParam,
  action: PayloadAction<unknown>,
  makeSureRoomIsLoaded: () => Room,
  emitMessage: <T>(type: string, payload: unknown) => Promise<SocketResponse<T>>,
) {

  async function updateAvatar(avatarData: User['avatar']) {
    const currentRoom = makeSureRoomIsLoaded()

    await emitMessage<Room>('user:update-avatar', {
      roomId: currentRoom._id,
      avatar: avatarData,
    })

    showMessageWithDelay(
      () => store.getState().notifications,
      store.dispatch,
      {
        title: 'Avatar atualizado!',
        description: 'O novo avatar foi salvo com sucesso.',
        type: 'success',
      },
    )
  }

  switch (action.type) {
    case 'room/updateAvatar': {
      const actionPayload = action.payload as Parameters<typeof roomSlice['updateAvatar']>[0]
  
      updateAvatar(actionPayload.avatar)
  
      return { stopAction: true }
    }

    default:
      return { stopAction: false }
  }
}