import { createContext, useState, type ReactNode, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { io, type Socket } from 'socket.io-client'

import type { Room } from '../types/rooms'
import type { User } from '../types/users'

interface RoomContextValue {
  createRoom: () => Promise<void>
  joinRoom: (roomId: string, userData: Partial<User>) => Promise<void>

  roomData?: Room

  socket?: Socket
}

export const RoomContext = createContext<RoomContextValue | undefined>(undefined)

interface RoomContextProviderProps {
  children: ReactNode
}

export function RoomContextProvider({ children }: RoomContextProviderProps) {
  const navigate = useNavigate()

  const [socket, setSocket] = useState<Socket>()

  const [roomData, setRoomData] = useState<Room>()

  async function connectToSocket() {
    const newSocket = io(import.meta.env.VITE_API_URL)

    setSocket(newSocket)

    return new Promise<Socket>((resolve) => {
      newSocket.on('connect', () => {
        resolve(newSocket)
      })
    })
  }

  function updateRoom(updatedRoom: Room) {
    console.log('updated room', updatedRoom)

    setRoomData(updatedRoom)
  }

  async function createRoom() {
    const newSocket = await connectToSocket()

    const createdRoom = await new Promise<Room>((resolve) => {
      newSocket.emit('room:create', (newRoom: Room) => {
        console.log('front-end callback', newRoom)

        resolve(newRoom)
      })
    })

    setRoomData(createdRoom)

    newSocket.on('room:updated', updateRoom)

    newSocket.onAny((eventName, ...args) => {
      console.log('catch all', eventName, ...args)
    })

    navigate(`/rooms/${createdRoom?._id}`)
  }

  console.log('render room context')

  const joinRoom = useCallback(async (roomId: string, userData: Partial<User>) => {
    const newSocket = await connectToSocket()

    const joinedRoom = await new Promise<Room>((resolve) => {
      newSocket.emit('room:join', roomId, userData, (joinedRoom: Room) => {
        resolve(joinedRoom)
      })
    })

    setRoomData(joinedRoom)

    newSocket.on('room:updated', updateRoom)
  }, [])

  // TODO: Leave room when user change route

  return (
    <RoomContext.Provider
      value={{
        createRoom,
        joinRoom,
        roomData,
        socket,
      }}
    >
      { children }
    </RoomContext.Provider>
  )
}