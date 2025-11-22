import { useAppDispatch, useAppSelector } from '@/app/storeHooks'

import { showMessage as showMessageReducer, hideMessage as hideMessageReducer, type NotificationsState } from '../notificationsSlice'

import { waitFor } from '@/utils/time'

export function useNotifications() {
  const dispatch = useAppDispatch()
  const currentNotificationsData = useAppSelector(state => state.notifications)

  async function showMessage(payload: Omit<NotificationsState, 'active'>) {
    if (currentNotificationsData.active) {
      await waitFor(() => !currentNotificationsData.active)
    }

    dispatch(showMessageReducer(payload))

    setTimeout(() => {
      dispatch(hideMessageReducer())
    }, 5000)
  }

  return {
    showMessage,
  }
}