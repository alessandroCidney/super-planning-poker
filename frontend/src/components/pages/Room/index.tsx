import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { useRoom } from '../../../hooks/useRoom'

import { RoomSidebar } from './components/RoomSidebar'

import { StyledMain, StyledSection, StyledCardsContainer, StyledPokerCard } from './styles'
import { RoomHeader } from './components/RoomHeader'
import { RoomTable } from './components/RoomTable'
import { generateQuadraticEquation } from '../../../utils/calc'

export function Room() {
  const navigate = useNavigate()
  const { roomId } = useParams()

  const roomContext = useRoom()

  const [hoveringCards, setHoveringCards] = useState(false)

  const cardWidth = 120

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

    return 'in_progress'
  }, [roomContext.roomData, roomContext.socket?.id])

  const positionedCardsData = useMemo(() => {
    const initialCardsData = [
      {
        value: 1,
        color: 'var(--theme-primary-darken-2-color)',
        translateX: '0px',
        translateY: '0px',
        rotate: '0deg',
      },
      {
        value: 3,
        color: 'var(--theme-primary-darken-1-color)',
        translateX: '0px',
        translateY: '0px',
        rotate: '0deg',
      },
      {
        value: 5,
        color: 'var(--theme-primary-color)',
        translateX: '0px',
        translateY: '0px',
        rotate: '0deg',
      },
      {
        value: 8,
        color: 'var(--theme-primary-lighten-1-color)',
        translateX: '0px',
        translateY: '0px',
        rotate: '0deg',
      },
      {
        value: 13,
        color: 'var(--theme-primary-lighten-2-color)',
        translateX: '0px',
        translateY: '0px',
        rotate: '0deg',
      },
    ]

    const updatedCards = initialCardsData.map((item, itemIndex) => {
      const centralIndex = (initialCardsData.length - 1) / 2

      // translate X calculations
      const translateXBaseValue = (itemIndex - centralIndex) * cardWidth

      const translateXStep = hoveringCards ? 30 : 90

      const finalTranslateX = translateXBaseValue + translateXStep * (centralIndex - itemIndex)

      // translate Y calculations
      const translateYQuadraticEquation = generateQuadraticEquation(0.0005, 0, 0)

      const finalTranslateY = translateYQuadraticEquation(finalTranslateX)

      // rotate calculations
      const rotateStep = hoveringCards ? 5 : 2

      const finalRotate = rotateStep * (itemIndex - centralIndex)

      return {
        ...item,
        translateX: `${finalTranslateX}px`,
        translateY: `${finalTranslateY}px`,
        rotate: `${finalRotate}deg`,
      }
    })

    return updatedCards
  }, [hoveringCards])

  const cardsContainerClassName = useMemo(() => {
    const classNameArr = []

    if (['disconnected', 'already_voted'].includes(votingStatus)) {
      classNameArr.push('cards-container--disabled')
    }

    if (['no_voting_started'].includes(votingStatus)) {
      classNameArr.push('cards-container--readonly')
    }

    return classNameArr.join(' ')
  }, [votingStatus])

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
          className={cardsContainerClassName}
          onMouseEnter={() => setHoveringCards(true)}
          onMouseLeave={() => setHoveringCards(false)}
        >
          {
            positionedCardsData.map((cardData, cardDataIndex) => (
              <StyledPokerCard
                key={`cardDataIndex${cardDataIndex}`}
                cardValue={cardData.value}
                color={cardData.color}
                width={`${cardWidth}px`}

                $translateX={cardData.translateX}
                $translateY={cardData.translateY}
                $rotate={cardData.rotate}

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
