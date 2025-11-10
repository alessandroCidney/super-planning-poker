import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { AppButton } from '../../commons/AppButton'

import { useRoom } from '../../../hooks/useRoom'

import { StyledAside, StyledMain, StyledSection, StyledCard } from './styles'

export function Room() {
  const navigate = useNavigate()
  const { roomId } = useParams()

  const { roomData, socket, leaveRoom } = useRoom()

  const [loading, setLoading] = useState({
    createStory: false,
    removeStory: false,
    startVoting: false,
    concludeVoting: false,
  })

  const [newStoryPayload, setNewStoryPayload] = useState({
    title: '',
    description: '',
  })

  function createStory(event: React.SyntheticEvent) {
    event.preventDefault()

    if (!socket) {
      return
    }
    
    setLoading({ ...loading, createStory: true })

    socket.emit('story:create', roomId, newStoryPayload.title, newStoryPayload.description, () => {
      setLoading({ ...loading, createStory: false })

      setNewStoryPayload({ title: '', description: '' })
    })
  }

  function removeStory(storyId: string) {
    if (!socket) {
      return
    }
    
    setLoading({ ...loading, removeStory: true })

    socket.emit('story:remove', roomId, storyId, () => {
      setLoading({ ...loading, removeStory: false })
    })
  }

  function startVoting(storyId: string) {
    if (!socket) {
      return
    }

    setLoading({ ...loading, startVoting: true })

    socket.emit('story:start-voting', roomId, storyId, () => {
      setLoading({ ...loading, startVoting: false })
    })
  }

  function concludeVoting(storyId: string) {
    if (!socket) {
      return
    }

    setLoading({ ...loading, concludeVoting: true })

    socket.emit('story:conclude-voting', roomId, storyId, () => {
      setLoading({ ...loading, concludeVoting: false })
    })
  }

  console.log('render room page')

  useEffect(() => {
    if (!roomData) {
      navigate({
        pathname: '/',
        search: `?room=${roomId}`,
      })
    }
  }, [navigate, roomData, roomId])

  return (
    <StyledMain>
      <StyledSection>
        <h1>
          Connected as {socket?.id || 'None'}
        </h1>

        <pre>{JSON.stringify(roomData, null, 2)}</pre>
      </StyledSection>

      <StyledAside>
        <header>
          <h2>
            Fila de USs
          </h2>

          <form onSubmit={createStory}>
            <input
              type='text'
              placeholder='Digite o título'
              value={newStoryPayload.title}
              onChange={(e) => setNewStoryPayload({ ...newStoryPayload, title: e.target.value })}
            />

            <input
              type='text'
              placeholder='Digite a descrição'
              value={newStoryPayload.description}
              onChange={(e) => setNewStoryPayload({ ...newStoryPayload, description: e.target.value })}
            />

            <button type='submit'>
              Salvar
            </button>
          </form>
        </header>

        <div>
          {
            roomData && Object.values(roomData.stories).map((storyData) => (
              <StyledCard
                key={storyData._id}
              >
                <header>
                  <h3>
                    { storyData.title }
                  </h3>
                </header>

                <p>
                  { storyData.description }
                </p>

                <p>
                  { storyData.votingStatus }
                </p>

                <button onClick={() => startVoting(storyData._id)}>
                  Iniciar votação
                </button>

                <button onClick={() => concludeVoting(storyData._id)}>
                  Encerrar votação
                </button>

                <button
                  onClick={() => removeStory(storyData._id)}
                >
                  Remover
                </button>
              </StyledCard>
            ))
          }
        </div>

        <button onClick={leaveRoom}>
          Sair da sala
        </button>
      </StyledAside>
    </StyledMain>
  )
}
