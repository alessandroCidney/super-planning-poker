import { useMemo, type ReactNode } from 'react'
import { BsFillTrash3Fill, BsCircleFill, BsArrowCounterclockwise } from 'react-icons/bs'

import { DefaultButton } from '@/components/commons/DefaultButton'

import { useVoting } from '@/features/room/hooks/useVoting'

import type { Story } from '@/types/stories'

import { FloatingActions, StyledCardActions, StyledCardContainer, StyledHeader, StyledVotingResultContainer, StyledVotingResult, StyledWarning } from './styles'
import type { HTMLMotionProps } from 'motion/react'

interface UsCardProps extends HTMLMotionProps<'article'> {
  storyData: Story

  startVoting: (storyId: string) => void | Promise<void>
  concludeVoting: (storyId: string) => void | Promise<void>
  restartVoting: (storyId: string) => void | Promise<void>
  removeStory: (storyId: string) => void | Promise<void>

  width?: string
  className?: string
}

export function UsCard({
  storyData,
  
  startVoting,
  concludeVoting,
  restartVoting,
  removeStory,
  
  width,
  className = '',

  ...rest
}: UsCardProps) {
  const customClassName = useMemo(() => {
    const classNameArr = []
    
    if (storyData.votingStatus === 'in_progress') {
      classNameArr.push('us-card--voting')
    }

    // Allows CSS extension via styled components
    classNameArr.push(className)

    return classNameArr.join(' ')
  }, [className, storyData.votingStatus])

  const { getVotingResult } = useVoting()

  const votingResult = useMemo(() => getVotingResult(storyData), [getVotingResult, storyData])

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
          { storyData.title }
        </StyledHeader>

        <StyledCardActions>
          <DefaultButton
            color='var(--theme-primary-lighten-2-color)'
            onClick={() => startVoting(storyData._id)}
          >
            Iniciar votação
          </DefaultButton>

          <DefaultButton
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
          { storyData.title }
        </StyledHeader>

        <StyledWarning>
          <BsCircleFill size={15} />

          <span>
            Em votação
          </span>
        </StyledWarning>

        <StyledCardActions>
          <DefaultButton
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
        { storyData.title }
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

        <DefaultButton
          color='var(--theme-primary-lighten-2-color)'
          icon
          onClick={() => removeStory(storyData._id)}
        >
          <BsFillTrash3Fill />
        </DefaultButton>

        <FloatingActions>
          <DefaultButton
            color='var(--theme-primary-lighten-2-color)'
            icon
            onClick={() => restartVoting(storyData._id)}
          >
            <BsArrowCounterclockwise size={25} />
          </DefaultButton>
        </FloatingActions>
      </StyledCardActions>
    </AnimatedContainer>
  )
}