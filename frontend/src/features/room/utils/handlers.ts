import type { Middleware } from '@reduxjs/toolkit'

import type { RootState } from '@/app/store'

import * as webSocketSlice from '@/features/websocket/websocketSlice'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type MiddlewareType = Middleware<{}, RootState>

type MiddlewareStoreParam = Parameters<MiddlewareType>[0]

interface MessageIdObject {
  messageId?: string
}

type WebSocketActionBasePayload<P> = P & MessageIdObject

type HandlerFunction<P extends MessageIdObject> = (payload: P) => void | Promise<void>

export function createWebSocketEventHandler<P extends MessageIdObject>(
  store: MiddlewareStoreParam,
  handlerFn: HandlerFunction<P>,
) {
  async function handlerWithMessageUpdate(payload: WebSocketActionBasePayload<Parameters<typeof handlerFn>[0]>) {
    if (payload.messageId) {
      await handlerFn(payload)

      store.dispatch(webSocketSlice.concludeMessage(payload.messageId))
    }
  }

  return handlerWithMessageUpdate
}
