import { useMemo } from 'react'
import { BsFillTrash3Fill, BsCircleFill } from 'react-icons/bs'

import { DefaultButton } from '../../../../../../commons/DefaultButton'

import type { Story } from '../../../../../../../types/stories'

import { StyledCardActions, StyledCardContainer, StyledHeader, StyledWarning } from './styles'

interface UsCardProps {
  storyData: Story

  startVoting: (storyId: string) => void | Promise<void>
  concludeVoting: (storyId: string) => void | Promise<void>
  removeStory: (storyId: string) => void | Promise<void>
}

export function UsCard({ storyData, startVoting, concludeVoting, removeStory }: UsCardProps) {
  const customClassName = useMemo(() => {
    const classNameArr = []
    
    if (storyData.votingStatus === 'in_progress') {
      classNameArr.push('us-card--voting')
    }

    return classNameArr.join(' ')
  }, [storyData.votingStatus])

  return (
    <StyledCardContainer
      className={customClassName}
    >
      <StyledHeader>
        { storyData.title }
      </StyledHeader>

      {
        storyData.votingStatus === 'in_progress' && (
          <StyledWarning>
            <BsCircleFill size={15} />

            <span>
              Em votação
            </span>
          </StyledWarning>
        )
      }

      {
        storyData.votingStatus === 'in_progress'
          ? (
            <StyledCardActions>
              <DefaultButton
                color='var(--theme-primary-lighten-2-color)'
                onClick={() => concludeVoting(storyData._id)}
              >
                Concluir votação
              </DefaultButton>
            </StyledCardActions>
          )
          : (
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
          )
      }
    </StyledCardContainer>
  )
}