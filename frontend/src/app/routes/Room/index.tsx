import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { useRedux } from '@/hooks/useRedux'

import * as roomSlice from '@/features/room/roomSlice'
import { NotificationSnackbar } from '@/features/notifications/NotificationSnackbar'

import { RoomLayout } from '@/components/layouts/RoomLayout'

import { generateQuadraticEquation } from '@/utils/calc'

import { RoomCodeCopyButton } from './components/RoomCodeCopyButton'
import { RoomSidebar } from './components/RoomSidebar'
import { RoomHeader } from './components/RoomHeader'
import { RoomTable } from './components/RoomTable'

import { StyledCardsContainer, StyledPokerCard } from './styles'

export function Room() {
  const navigate = useNavigate()
  const { roomId } = useParams()

  const { useAppDispatch, useAppSelector } = useRedux() 

  const dispatch = useAppDispatch()

  const roomSelector = useAppSelector(state => state.room)

  const [hoveringCards, setHoveringCards] = useState(false)

  const cardWidth = 120

  function saveVote(voteValue: number) {
    if (!roomSelector.currentRoom) {
      throw new Error('Cannot found room data.')
    }

    const activeStory = Object.values(roomSelector.currentRoom.stories).find(storyData => storyData.votingStatus === 'in_progress')

    if (!activeStory) {
      throw new Error('There are no stories up for vote.')
    }

    dispatch(
      roomSlice.saveVote({
        storyId: activeStory._id,
        voteValue,
      }),
    )
  }

  const votingStatus = useMemo(() => {
    if (!roomSelector.currentRoom || !roomSelector.socketId) {
      return 'disconnected'
    }

    const activeStory = Object.values(roomSelector.currentRoom.stories).find(storyData => storyData.votingStatus === 'in_progress')

    if (!activeStory) {
      return 'no_voting_started'
    }

    if (roomSelector.socketId in activeStory.votes) {
      return 'already_voted'
    }

    return 'in_progress'
  }, [roomSelector.currentRoom, roomSelector.socketId])

  const positionedCardsData = useMemo(() => {
    const initialCardsData = [
      {
        value: 1,
        color: 'var(--theme-primary-darken-2-color)',
        translateX: 0,
        translateY: 0,
        rotate: 0,
      },
      {
        value: 3,
        color: 'var(--theme-primary-darken-1-color)',
        translateX: 0,
        translateY: 0,
        rotate: 0,
      },
      {
        value: 5,
        color: 'var(--theme-primary-color)',
        translateX: 0,
        translateY: 0,
        rotate: 0,
      },
      {
        value: 8,
        color: 'var(--theme-primary-lighten-1-color)',
        translateX: 0,
        translateY: 0,
        rotate: 0,
      },
      {
        value: 13,
        color: 'var(--theme-primary-lighten-2-color)',
        translateX: 0,
        translateY: 0,
        rotate: 0,
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
        translateX: finalTranslateX,
        translateY: finalTranslateY,
        rotate: finalRotate,
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
    if (!roomSelector.currentRoom) {
      navigate({
        pathname: '/',
        search: `?room=${roomId}`,
      })
    }
  }, [navigate, roomId, roomSelector.currentRoom])

  return (
    <RoomLayout
      sidebarTitle='Tarefas'
      sidebarContent={<RoomSidebar />}
    >
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

              initial={{
                translateX: cardData.translateX,
                translateY: cardData.translateY,
                rotate: cardData.rotate,
              }}

              animate={{
                translateX: cardData.translateX,
                translateY: cardData.translateY,
                rotate: cardData.rotate,
              }}

              whileHover={{
                translateX: cardData.translateX,
                translateY: cardData.translateY - 20,
                rotate: cardData.rotate,

                filter: 'brightness(0.9)',
              }}

              onClick={() => saveVote(cardData.value)}
            />
          ))
        }
      </StyledCardsContainer>
    
      <NotificationSnackbar />

      <RoomCodeCopyButton />
    </RoomLayout>
  )
}
