import { useMemo, useState, type ReactNode } from 'react'

import { BsFillTrash3Fill, BsArrowCounterclockwise } from 'react-icons/bs'
import type { HTMLMotionProps } from 'motion/react'

import { useAppSelector } from '@/app/storeHooks'

import { DefaultButton } from '@/components/commons/DefaultButton'

import { useWebSocketActions } from '@/features/websocket/hooks/useWebSocketActions'
import { useVoting } from '@/features/room/hooks/useVoting'
import * as roomSlice from '@/features/room/roomSlice'

import type { Story } from '@/types/stories'

import { StyledCardActions, StyledCardContainer, StyledHeader, StyledVotingResultContainer, StyledVotingResult, StyledCardRightActions } from './styles'

interface UsCardProps extends HTMLMotionProps<'article'> {
  storyData: Story

  width?: string
  className?: string
}

export function UsCard({
  storyData,
  
  width,
  className = '',

  ...rest
}: UsCardProps) {
  const roomSelector = useAppSelector(state => state.room)

  const isRoomOwner = !!roomSelector.currentRoom
    && !!roomSelector.socketId
    && roomSelector.currentRoom.ownerIds.includes(roomSelector.socketId)

  const { getVotingResult, votingStory } = useVoting()
  const webSocketActions = useWebSocketActions()

  const [loading, setLoading] = useState({
    removeStory: false,
    startVoting: false,
    concludeVoting: false,
    restartVoting: false,
  })

  const somethingIsLoading = Object.values(loading).some(bool => bool)

  const votingResult = useMemo(() => getVotingResult(storyData), [getVotingResult, storyData])

  const anotherStoryIsInVoting = votingStory && votingStory._id !== storyData._id

  const customClassName = useMemo(() => {
    const classNameArr = []
    
    if (storyData.votingStatus === 'in_progress') {
      classNameArr.push('us-card--voting')
    }

    // Allows CSS extension via styled components
    classNameArr.push(className)

    return classNameArr.join(' ')
  }, [className, storyData.votingStatus])
  
  async function removeStory(storyId: string) {
    setLoading({ ...loading, removeStory: true })

    await webSocketActions.callActionAndWait(roomSlice.removeStory, { storyId })

    setLoading({ ...loading, removeStory: false })
  }

  async function startVoting(storyId: string) {
    setLoading({ ...loading, startVoting: true })

    await webSocketActions.callActionAndWait(roomSlice.startVoting, { storyId })

    setLoading({ ...loading, startVoting: false })
  }

  async function concludeVoting(storyId: string) {
    setLoading({ ...loading, concludeVoting: true })

    await webSocketActions.callActionAndWait(roomSlice.concludeVoting, { storyId })

    setLoading({ ...loading, concludeVoting: false })
  }

  async function restartVoting(storyId: string) {
    setLoading({ ...loading, restartVoting: true })

    await webSocketActions.callActionAndWait(roomSlice.restartVoting, { storyId })

    setLoading({ ...loading, restartVoting: false })
  }

  interface AnimatedContainerProps {
    children: ReactNode
  }

  function AnimatedContainer({ children }: AnimatedContainerProps) {
    return (
      <StyledCardContainer
        className={customClassName}
        $width={width}
        layout
        {...rest}
      >
        { children }
      </StyledCardContainer>
    )
  }

  if (storyData.votingStatus === 'not_started') {
    return (
      <AnimatedContainer>
        <StyledHeader>
          <h3>
            { storyData.title }
          </h3>
        </StyledHeader>

        <StyledCardActions>
          <DefaultButton
            loading={loading.startVoting}
            disabled={anotherStoryIsInVoting || !isRoomOwner || (somethingIsLoading && !loading.startVoting)}
            color='var(--theme-primary-lighten-2-color)'
            onClick={() => startVoting(storyData._id)}
          >
            Iniciar votação
          </DefaultButton>

          <DefaultButton
            loading={loading.removeStory}
            disabled={!isRoomOwner || (somethingIsLoading && !loading.removeStory)}
            color='var(--theme-primary-lighten-2-color)'
            icon
            onClick={() => removeStory(storyData._id)}
          >
            <BsFillTrash3Fill />
          </DefaultButton>
        </StyledCardActions>
      </AnimatedContainer>
    )
  }

  if (storyData.votingStatus === 'in_progress') {
    return (
      <AnimatedContainer>
        <StyledHeader>
          <h3>
            { storyData.title }
          </h3>
        </StyledHeader>

        <StyledCardActions>
          <DefaultButton
            loading={loading.concludeVoting}
            disabled={!isRoomOwner || (somethingIsLoading && !loading.concludeVoting)}
            color='var(--theme-primary-lighten-2-color)'
            onClick={() => concludeVoting(storyData._id)}
          >
            Concluir votação
          </DefaultButton>
        </StyledCardActions>
      </AnimatedContainer>
    )
  }

  return (
    <AnimatedContainer>
      <StyledHeader>
        <h3>
          { storyData.title }
        </h3>
      </StyledHeader>

      <StyledCardActions>
        <StyledVotingResultContainer>
          {
            votingResult?.map((voteValue, voteValueIndex) => (
              <StyledVotingResult
                key={`voteValueIndex${voteValueIndex}`}
              >
                { voteValue }
              </StyledVotingResult>
            ))
          }
        </StyledVotingResultContainer>

        <StyledCardRightActions>
          <DefaultButton
            loading={loading.restartVoting}
            disabled={anotherStoryIsInVoting || !isRoomOwner || (somethingIsLoading && !loading.restartVoting)}
            color='var(--theme-primary-lighten-2-color)'
            icon
            onClick={() => restartVoting(storyData._id)}
          >
            <BsArrowCounterclockwise size={25} />
          </DefaultButton>

          <DefaultButton
            loading={loading.removeStory}
            disabled={!isRoomOwner || (somethingIsLoading && !loading.removeStory)}
            color='var(--theme-primary-lighten-2-color)'
            icon
            onClick={() => removeStory(storyData._id)}
          >
            <BsFillTrash3Fill />
          </DefaultButton>
        </StyledCardRightActions>
      </StyledCardActions>
    </AnimatedContainer>
  )
}