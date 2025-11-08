import { useContext } from 'react'
import { RoomContext } from '../contexts/RoomContext'

export function useRoom() {
  const context = useContext(RoomContext)

  if (!context) {
    throw new Error('Cannot found room text data. Please make sure this hook was called inside the correct provider.')
  }

  return context
}