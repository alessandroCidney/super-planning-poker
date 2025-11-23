import type { Dispatch, UnknownAction } from '@reduxjs/toolkit'

import { v4 as uuidV4 } from 'uuid'

import { useAppDispatch, useAppSelector } from '@/app/storeHooks'

import * as notificationsSlice from '../notificationsSlice'

import { waitFor, wait } from '@/utils/time'

/*
  Some code parts, like websocket handlers, cannot use react hooks because they are inside Redux middlewares.
  Therefore, I have extracted the notification logic here.
*/
export async function showMessageWithDelay(
  getStoreNotificationsData: () => notificationsSlice.NotificationsState,
  dispatch: Dispatch<UnknownAction>,
  payload: Omit<notificationsSlice.NotificationsState, 'active'>,
) {
  if (getStoreNotificationsData().active) {
    await waitFor(() => !getStoreNotificationsData().active)
    await wait(500)
  }

  const customMessageId = uuidV4()

  dispatch(notificationsSlice.showMessage({
    ...payload,
    id: customMessageId,
  }))

  setTimeout(() => {
    // ID check to prevent message conflicts on close
    if (getStoreNotificationsData().id === customMessageId) {
      dispatch(notificationsSlice.hideMessage())
    }
  }, 5000)
}

export function useNotifications() {
  const dispatch = useAppDispatch()
  const currentNotificationsData = useAppSelector(state => state.notifications)

  async function showMessage(payload: Omit<notificationsSlice.NotificationsState, 'active'>) {
    await showMessageWithDelay(() => currentNotificationsData, dispatch, payload)
  }

  return {
    showMessage,
  }
}