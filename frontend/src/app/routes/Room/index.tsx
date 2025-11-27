import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { useAppDispatch, useAppSelector } from '@/app/storeHooks'

import * as roomSlice from '@/features/room/roomSlice'
import { VotingConcludedAlert } from '@/features/room/components/VotingConcludedAlert'
import { useVoting } from '@/features/room/hooks/useVoting'
import { FloatingVotingChip } from '@/features/room/components/FloatingVotingChip'
import { AvatarSelector } from '@/features/room/components/AvatarSelector'

import { DefaultButton } from '@/components/commons/DefaultButton'
import { RoomLayout } from '@/components/layouts/RoomLayout'
import { Overlay } from '@/components/commons/Overlay'

import { useElementDimensions } from '@/hooks/useElementDimensions'

import { generateQuadraticEquation } from '@/utils/calc'

import { RoomSidebar } from './components/RoomSidebar'
import { RoomHeader } from './components/RoomHeader'
import { RoomTable } from './components/RoomTable'
import { PokerCard } from './components/PokerCard'

import { StyledCardOverlayActions, StyledCardOverlayContent, StyledCardsContainer, StyledPokerCard } from './styles'

export function Room() {
  const navigate = useNavigate()
  const { roomId } = useParams()

  const dispatch = useAppDispatch()
  const roomSelector = useAppSelector(state => state.room)

  const { votingStory } = useVoting()

  const [hoveringCards, setHoveringCards] = useState(false)
  const [showVoteConfirmation, setShowVoteConfirmation] = useState(false)
  const [voteConfirmationPayload, setVoteConfirmationPayload] = useState(0)

  const windowDimensions = useElementDimensions()
  
  const isMobile = windowDimensions && windowDimensions.width <= 960

  const cardWidth = 120

  function showVoteConfirmationScreen(voteValue: number) {
    setVoteConfirmationPayload(voteValue)
    setShowVoteConfirmation(true)
  }

  function confirmVote() {
    setShowVoteConfirmation(false)
    saveVote(voteConfirmationPayload)
  }

  function saveVote(voteValue: number) {
    if (votingStory) {
      dispatch(
        roomSlice.saveVote({
          storyId: votingStory._id,
          voteValue,
        }),
      )
    }
  }

  const votingStatus = useMemo(() => {
    if (!roomSelector.currentRoom || !roomSelector.socketId) {
      return 'disconnected'
    }

    if (!votingStory) {
      return 'no_voting_started'
    }

    if (roomSelector.socketId in votingStory.votes) {
      return 'already_voted'
    }

    return 'in_progress'
  }, [roomSelector.currentRoom, roomSelector.socketId, votingStory])

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

      const openCardsDeck = (hoveringCards || isMobile && votingStatus === 'in_progress')

      const translateXStep = openCardsDeck ? 30 : 90

      const finalTranslateX = translateXBaseValue + translateXStep * (centralIndex - itemIndex)

      // translate Y calculations
      const translateYQuadraticEquation = generateQuadraticEquation(0.0005, 0, 0)

      const finalTranslateY = translateYQuadraticEquation(finalTranslateX)

      // rotate calculations
      const rotateStep = openCardsDeck ? 5 : 2

      const finalRotate = rotateStep * (itemIndex - centralIndex)

      return {
        ...item,
        translateX: finalTranslateX,
        translateY: finalTranslateY,
        rotate: finalRotate,
      }
    })

    return updatedCards
  }, [hoveringCards, isMobile, votingStatus])

  const cardsContainerClassName = useMemo(() => {
    const classNameArr = []

    if (['disconnected'].includes(votingStatus)) {
      classNameArr.push('cards-container--disabled')
    }

    if (['no_voting_started'].includes(votingStatus)) {
      classNameArr.push('cards-container--readonly')
    }

    return classNameArr.join(' ')
  }, [votingStatus])

  useEffect(() => {
    if (!roomSelector.currentRoom && !roomSelector.socketId) {
      navigate({
        pathname: '/',
        search: `?room=${roomId}`,
      })
    }
  }, [navigate, roomId, roomSelector.currentRoom, roomSelector.socketId])

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

              onClick={() => showVoteConfirmationScreen(cardData.value)}
            />
          ))
        }
      </StyledCardsContainer>

      <FloatingVotingChip />

      <AvatarSelector />

      <Overlay
        value={showVoteConfirmation}
        setValue={setShowVoteConfirmation}
      >
        <StyledCardOverlayContent>
          <h1>
            O seu voto será
          </h1>

          <PokerCard
            width='300px'
            cardValue={voteConfirmationPayload}
          />

          <StyledCardOverlayActions>
            <DefaultButton
              color='var(--theme-primary-darken-2-color)'
              hoverColor='var(--theme-primary-darken-3-color)'
              onClick={(e) => {
                e.stopPropagation()

                confirmVote()
              }}
            >
              Confirmar
            </DefaultButton>

            <DefaultButton
              color='#f1f1f1'
              hoverColor=''
              textColor='#424a52'
              onClick={(e) => {
                e.stopPropagation()

                setShowVoteConfirmation(false)
              }}
            >
              Cancelar
            </DefaultButton>
          </StyledCardOverlayActions>
        </StyledCardOverlayContent>
      </Overlay>

      <VotingConcludedAlert />
    </RoomLayout>
  )
}
