import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { useRoom } from '../../../hooks/useRoom'

import { RoomSidebar } from './components/RoomSidebar'

import { StyledMain, StyledSection, StyledCardsContainer } from './styles'
import { PokerCard } from './components/PokerCard'
import { RoomHeader } from './components/RoomHeader'
import { RoomTable } from './components/RoomTable'

export function Room() {
  const navigate = useNavigate()
  const { roomId } = useParams()

  const roomContext = useRoom()

  const [loading, setLoading] = useState({
    createStory: false,
    removeStory: false,
    startVoting: false,
    concludeVoting: false,
  })

  const cardsData = [
    {
      value: 1,
      color: 'var(--theme-primary-darken-2-color)',
    },
    {
      value: 3,
      color: 'var(--theme-primary-darken-1-color)',
    },
    {
      value: 5,
      color: 'var(--theme-primary-color)',
    },
    {
      value: 8,
      color: 'var(--theme-primary-lighten-1-color)',
    },
    {
      value: 13,
      color: 'var(--theme-primary-lighten-2-color)',
    },
  ]

  async function saveVote(voteValue: number) {
    if (!roomContext.roomData) {
      throw new Error('Cannot found room data.')
    }

    const activeStory = Object.values(roomContext.roomData.stories).find(storyData => storyData.votingStatus === 'in_progress')

    if (!activeStory) {
      throw new Error('There are no stories up for vote.')
    }

    await roomContext.saveVote(activeStory._id, voteValue)
  }

  const votingStatus = useMemo(() => {
    if (!roomContext.roomData || !roomContext.socket?.id) {
      return 'disconnected'
    }

    const activeStory = Object.values(roomContext.roomData.stories).find(storyData => storyData.votingStatus === 'in_progress')

    if (!activeStory) {
      return 'no_voting_started'
    }

    if (roomContext.socket.id in activeStory.votes) {
      return 'already_voted'
    }

    return 'havent_voted_yet'
  }, [roomContext.roomData, roomContext.socket?.id])

  console.log('render room page')

  useEffect(() => {
    if (!roomContext.roomData) {
      navigate({
        pathname: '/',
        search: `?room=${roomId}`,
      })
    }
  }, [navigate, roomContext.roomData, roomId])

  return (
    <StyledMain>
      <StyledSection>
        <RoomHeader />

        <RoomTable />

        <StyledCardsContainer
          className={
            ['no_voting_started', 'already_voted', 'disconnected'].includes(votingStatus)
              ? 'cards-container--disabled'
              : ''}
        >
          {
            cardsData.map((cardData, cardDataIndex) => (
              <PokerCard
                key={`cardDataIndex${cardDataIndex}`}
                cardValue={cardData.value}
                color={cardData.color}
                onClick={() => saveVote(cardData.value)}
              />
            ))
          }
        </StyledCardsContainer>
      </StyledSection>

      <RoomSidebar />
    </StyledMain>
  )
}
