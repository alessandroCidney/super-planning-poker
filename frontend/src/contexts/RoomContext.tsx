import { createContext, useState, type ReactNode, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { io, type Socket } from 'socket.io-client'

import type { Room } from '../types/rooms'
import type { User } from '../types/users'

import type { SocketResponse } from '../types/socket'
import type { Story } from '../types/stories'

interface RoomContextValue {
  createRoom: (userData: Partial<User>) => Promise<void>
  joinRoom: (roomId: string, userData: Partial<User>) => Promise<void>
  leaveRoom: () => void

  createStory: (title: string) => Promise<void>
  removeStory: (storyId: string) => Promise<void>
  startVoting: (storyId: string) => Promise<void>
  saveVote: (storyId: string, voteValue: number) => Promise<void>
  concludeVoting: (storyId: string) => Promise<void>

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

  const getSocket = useCallback(async () => {
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
    const newSocket = await getSocket()

    const response = await new Promise<SocketResponse<Room>>((resolve) => {
      newSocket.emit('room:create', userData, (res: SocketResponse<Room>) => {
        resolve(res)
      })
    })

    if (response.error) {
      window.alert('Erro ao criar sala')
    } else {
      setRoomData(response.data)

      newSocket.on('room:updated', updateRoom)

      newSocket.onAny((eventName, ...args) => {
        console.log('catch all', eventName, ...args)
      })

      navigate(`/rooms/${response.data._id}`)
    }
  }

  console.log('render room context')

  const joinRoom = useCallback(async (roomId: string, userData: Partial<User>) => {
    const newSocket = await getSocket()

    const response = await new Promise<SocketResponse<Room>>((resolve) => {
      newSocket.emit('room:join', roomId, userData, (res: SocketResponse<Room>) => {
        resolve(res)
      })
    })

    console.log('joinResponse', response)

    if (response.error) {
      window.alert('Não foi possível se conectar à sala.')

      navigate('/')
    } else {
      setRoomData(response.data)

      newSocket.on('room:updated', updateRoom)

      navigate(`/rooms/${response.data._id}`)
    }
  }, [getSocket, navigate])

  const createStory = useCallback(async (title: string) => {
    const currentSocket = await getSocket()

    if (!roomData) {
      throw new Error('The room data has not yet been loaded.')
    }

    const response = await new Promise<SocketResponse<Story>>((resolve) => {
      currentSocket.emit('story:create', roomData._id, title, (res: SocketResponse<Story>) => {
        resolve(res)
      })
    })

    if (response.error) {
      window.alert('Não foi possível criar a história de usuário.')
    }
  }, [getSocket, roomData])

  const removeStory = useCallback(async (storyId: string) => {
    const currentSocket = await getSocket()

    if (!roomData) {
      throw new Error('The room data has not yet been loaded.')
    }

    const response = await new Promise<SocketResponse>((resolve) => {
      currentSocket.emit('story:remove', roomData._id, storyId, (res: SocketResponse) => {
        resolve(res)
      })
    })

    if (response.error) {
      window.alert('Não foi possível remover a história de usuário.')
    }
  }, [getSocket, roomData])

  const startVoting = useCallback(async (storyId: string) => {
    const currentSocket = await getSocket()

    if (!roomData) {
      throw new Error('The room data has not yet been loaded.')
    }

    const response = await new Promise<SocketResponse<Story>>((resolve) => {
      currentSocket.emit('story:start-voting', roomData._id, storyId, (res: SocketResponse<Story>) => {
        resolve(res)
      })
    })

    if (response.error) {
      window.alert('Não foi possível iniciar a votação.')
    }
  }, [getSocket, roomData])

  const saveVote = useCallback(async (storyId: string, voteValue: number) => {
    const currentSocket = await getSocket()

    if (!roomData) {
      throw new Error('The room data has not yet been loaded.')
    }

    const response = await new Promise<SocketResponse<Story>>((resolve) => {
      currentSocket.emit('story:start-voting', roomData._id, storyId, voteValue, (res: SocketResponse<Story>) => {
        resolve(res)
      })
    })

    if (response.error) {
      window.alert('Não foi possível salvar o voto.')
    }
  }, [getSocket, roomData])

  const concludeVoting = useCallback(async (storyId: string) => {
    const currentSocket = await getSocket()

    if (!roomData) {
      throw new Error('The room data has not yet been loaded.')
    }

    const response = await new Promise<SocketResponse<Story>>((resolve) => {
      currentSocket.emit('story:conclude-voting', roomData._id, storyId, (res: SocketResponse<Story>) => {
        resolve(res)
      })
    })

    if (response.error) {
      window.alert('Não foi possível concluir a votação.')
    }
  }, [getSocket, roomData])

  return (
    <RoomContext.Provider
      value={{
        createRoom,
        joinRoom,
        leaveRoom,

        createStory,
        removeStory,
        startVoting,
        saveVote,
        concludeVoting,

        roomData,
        socket,
      }}
    >
      { children }
    </RoomContext.Provider>
  )
}