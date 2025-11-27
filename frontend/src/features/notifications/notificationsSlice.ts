import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface NotificationsState {
  active: boolean
  id?: string
  title: string
  description: string
  type: 'success' | 'error' | 'info'
}

const initialState: NotificationsState = {
  active: false,
  id: undefined,
  title: '',
  description: '',
  type: 'success',
}

export const notificationsSlice = createSlice({
  name: 'notifications',

  initialState,

  reducers: {
    showMessage: (state, action: PayloadAction<Omit<NotificationsState, 'active'>>) => {
      state.id = action.payload.id
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

export const { showMessage, hideMessage } = notificationsSlice.actions

export default notificationsSlice.reducer
