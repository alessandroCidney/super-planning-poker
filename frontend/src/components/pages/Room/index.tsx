import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { useRoom } from '../../../hooks/useRoom'

import { RoomSidebar } from './components/RoomSidebar'

import { StyledMain, StyledSection, StyledCard, StyledCardsContainer } from './styles'
import { PokerCard } from './components/PokerCard'
import { RoomHeader } from './components/RoomHeader'

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
        <RoomHeader />

        <StyledCardsContainer>
          <PokerCard
            cardValue={5}
          />
        </StyledCardsContainer>
      </StyledSection>

      <RoomSidebar />
    </StyledMain>
  )
}
