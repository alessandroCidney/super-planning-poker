import type { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { v4 as uuidV4 } from 'uuid'

import { useAppDispatch, useAppStore } from '@/app/storeHooks'

import { waitFor } from '@/utils/time'

import * as websocketSlice from '../websocketSlice'

interface MessageIdObject {
  messageId?: string
}

export function useWebSocketActions() {
  const dispatch = useAppDispatch()

  const store = useAppStore()
  
  async function callActionAndWait<P extends MessageIdObject, T extends string>(
    websocketAction: ActionCreatorWithPayload<P, T>,
    websocketActionPartialPayload: P,
  ) {
    const messageId = websocketActionPartialPayload.messageId ?? uuidV4()

    dispatch(websocketSlice.listenMessage(messageId))

    const fullPayload = {
      ...websocketActionPartialPayload,
      messageId,
    }

    dispatch(websocketAction(fullPayload))

    await waitFor(() => store.getState().websocket.monitoredMessages[messageId].status === 'concluded')

    dispatch(websocketSlice.unsubscribeMessage(messageId))
  }

  return {
    callActionAndWait,
  }
}