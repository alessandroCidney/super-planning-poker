import { useAppDispatch, useAppSelector } from '@/app/storeHooks'

import * as notificationsSlice from '../notificationsSlice'

import { waitFor } from '@/utils/time'

export function useNotifications() {
  const dispatch = useAppDispatch()
  const currentNotificationsData = useAppSelector(state => state.notifications)

  async function showMessage(payload: Omit<notificationsSlice.NotificationsState, 'active'>) {
    if (currentNotificationsData.active) {
      await waitFor(() => !currentNotificationsData.active)
    }

    dispatch(notificationsSlice.showMessage(payload))

    setTimeout(() => {
      dispatch(notificationsSlice.hideMessage())
    }, 5000)
  }

  return {
    showMessage,
  }
}