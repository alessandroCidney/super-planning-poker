import { createContext, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { io, type Socket } from 'socket.io-client'

interface RoomContextValue {
  createRoom: () => Promise<void>

  roomData: unknown
}

export const RoomContext = createContext<RoomContextValue | undefined>(undefined)

interface RoomContextProviderProps {
  children: ReactNode
}

export function RoomContextProvider({ children }: RoomContextProviderProps) {
  const navigate = useNavigate()

  const [socket, setSocket] = useState<Socket>()

  const [roomData, setRoomData] = useState<unknown>()

  async function createRoom() {
    const newSocket = io(import.meta.env.VITE_API_URL)

    const createdRoom = await new Promise((resolve, reject) => {
      newSocket.once('connect', () => {
        newSocket.emit('room:create')

        newSocket.once('room:created', (newRoom) => {
          console.log('roomData', newRoom)

          resolve(newRoom)
        })
      })
    })

    setRoomData(createdRoom)

    setSocket(newSocket)

    navigate(`/rooms/${createdRoom?._id}`)
  }

  return (
    <RoomContext.Provider
      value={{
        createRoom,
        roomData,
      }}
    >
      { children }
    </RoomContext.Provider>
  )
}