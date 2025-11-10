import { createContext, useState, type ReactNode, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { io, type Socket } from 'socket.io-client'

import type { Room } from '../types/rooms'
import type { User } from '../types/users'

import type { SocketResponse } from '../types/socket'

interface RoomContextValue {
  createRoom: (userData: Partial<User>) => Promise<void>
  joinRoom: (roomId: string, userData: Partial<User>) => Promise<void>
  leaveRoom: () => void

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

  const connectToSocket = useCallback(async () => {
    if (socket) {
      return socket
    }

    const newSocket = io(import.meta.env.VITE_API_URL)

    setSocket(newSocket)

    return new Promise<Socket>((resolve) => {
      newSocket.on('connect', () => {
        resolve(newSocket)
      })
    })
  }, [socket])

  const leaveRoom = useCallback(async () => {
    if (socket) {
      socket.removeAllListeners()

      socket.disconnect()

      setRoomData(undefined)

      window.location.href = window.location.origin
    }
  }, [socket])

  function updateRoom(updatedRoom: Room) {
    console.log('updated room', updatedRoom)

    setRoomData(updatedRoom)
  }

  async function createRoom(userData: Partial<User>) {
    const newSocket = await connectToSocket()

    const createRoomResponse = await new Promise<SocketResponse<Room>>((resolve) => {
      newSocket.emit('room:create', userData, (response: SocketResponse<Room>) => {
        resolve(response)
      })
    })

    if (createRoomResponse.error) {
      window.alert('Erro ao criar sala')
    } else {
      setRoomData(createRoomResponse.data)

      newSocket.on('room:updated', updateRoom)

      newSocket.onAny((eventName, ...args) => {
        console.log('catch all', eventName, ...args)
      })

      navigate(`/rooms/${createRoomResponse.data._id}`)
    }
  }

  console.log('render room context')

  const joinRoom = useCallback(async (roomId: string, userData: Partial<User>) => {
    const newSocket = await connectToSocket()

    const joinResponse = await new Promise<SocketResponse<Room>>((resolve) => {
      newSocket.emit('room:join', roomId, userData, (response: SocketResponse<Room>) => {
        resolve(response)
      })
    })

    console.log('joinResponse', joinResponse)

    if (joinResponse.error) {
      window.alert('Não foi possível se conectar à sala.')

      navigate('/')
    } else {
      setRoomData(joinResponse.data)

      newSocket.on('room:updated', updateRoom)

      navigate(`/rooms/${joinResponse.data._id}`)
    }
  }, [connectToSocket, navigate])

  // TODO: Leave room when user change route

  return (
    <RoomContext.Provider
      value={{
        createRoom,
        joinRoom,
        leaveRoom,
        roomData,
        socket,
      }}
    >
      { children }
    </RoomContext.Provider>
  )
}