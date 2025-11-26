import { useCallback } from 'react'

import type { Dispatch, UnknownAction } from '@reduxjs/toolkit'

import { v4 as uuidV4 } from 'uuid'

import { useAppDispatch, useAppStore } from '@/app/storeHooks'

import * as notificationsSlice from '../notificationsSlice'

import { wait } from '@/utils/time'

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
    await wait(1000)
    dispatch(notificationsSlice.hideMessage())
    await wait(100)
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

/*
  It was necessary to use the "useStore" hook instead of "useSelector"
  because the values in the Redux store are updated during the method's execution,
  and this method always needs the most recent value.
*/

export function useNotifications() {
  const dispatch = useAppDispatch()

  const store = useAppStore()

  const showMessage = useCallback(async (payload: Omit<notificationsSlice.NotificationsState, 'active'>) => {
    await showMessageWithDelay(() => store.getState().notifications, dispatch, payload)
  }, [dispatch, store])

  return {
    showMessage,
  }
}