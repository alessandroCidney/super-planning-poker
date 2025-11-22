import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface NotificationsState {
  active: boolean
  title: string
  description: string
  type: 'success' | 'error' | 'info'
}

const initialState: NotificationsState = {
  active: false,
  title: '',
  description: '',
  type: 'success',
}

export const notificationsSlide = createSlice({
  name: 'notifications',

  initialState,

  reducers: {
    showMessage: (state, action: PayloadAction<{ title: string, description: string, type: NotificationsState['type'] }>) => {
      state.title = action.payload.title
      state.description = action.payload.description
      state.type = action.payload.type
      state.active = true
    },

    hideMessage: (state) => {
      state.active = false
    },
  },
})

export const { showMessage, hideMessage } = notificationsSlide.actions

export default notificationsSlide.reducer
