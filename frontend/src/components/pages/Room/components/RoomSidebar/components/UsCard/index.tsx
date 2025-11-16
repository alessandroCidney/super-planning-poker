import { useMemo } from 'react'
import { BsFillTrash3Fill, BsCircleFill, BsArrowCounterclockwise } from 'react-icons/bs'

import { DefaultButton } from '../../../../../../commons/DefaultButton'

import type { Story } from '../../../../../../../types/stories'

import { FloatingActions, StyledCardActions, StyledCardContainer, StyledHeader, StyledVotingResultContainer, StyledVotingResult, StyledWarning } from './styles'

interface UsCardProps {
  storyData: Story

  startVoting: (storyId: string) => void | Promise<void>
  concludeVoting: (storyId: string) => void | Promise<void>
  restartVoting: (storyId: string) => void | Promise<void>
  removeStory: (storyId: string) => void | Promise<void>
}

export function UsCard({ storyData, startVoting, concludeVoting, restartVoting, removeStory }: UsCardProps) {
  const customClassName = useMemo(() => {
    const classNameArr = []
    
    if (storyData.votingStatus === 'in_progress') {
      classNameArr.push('us-card--voting')
    }

    return classNameArr.join(' ')
  }, [storyData.votingStatus])

  const votingResult = useMemo(() => {
    const voteValues = Object.values(storyData.votes)

    if (!voteValues.length) {
      return [0]
    }

    type OccurenceAnalysisObj = Record<string, { occurrence: number }>

    const occurrenceAnalysis: OccurenceAnalysisObj = {}

    voteValues.forEach((voteValue) => {
      if (voteValue in occurrenceAnalysis) {
        occurrenceAnalysis[voteValue].occurrence++
      } else {
        occurrenceAnalysis[voteValue] = { occurrence: 1 }
      }
    })

    let maxOccurrenceAnalysis: OccurenceAnalysisObj = {}

    Object.entries(occurrenceAnalysis).forEach(([voteValue, voteAnalysisObj]) => {
      const alreadySavedValue = voteValue in maxOccurrenceAnalysis
      const firstValue = Object.values(maxOccurrenceAnalysis).length === 0
      const greaterOccurrence = Object.values(maxOccurrenceAnalysis).every(item => item.occurrence < voteAnalysisObj.occurrence)

      const sameOccurrence = Object.values(maxOccurrenceAnalysis).every(item => item.occurrence === voteAnalysisObj.occurrence)

      if (alreadySavedValue || firstValue || greaterOccurrence) {
        maxOccurrenceAnalysis = {
          [voteValue]: voteAnalysisObj,
        }
      } else if (sameOccurrence) {
        maxOccurrenceAnalysis[voteValue] = voteAnalysisObj
      }
    })

    return Object.keys(maxOccurrenceAnalysis).map(item => parseInt(item))
  }, [storyData.votes])

  if (storyData.votingStatus === 'not_started') {
    return (
      <StyledCardContainer
        className={customClassName}
      >
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
      </StyledCardContainer>
    )
  }

  if (storyData.votingStatus === 'in_progress') {
    return (
      <StyledCardContainer
        className={customClassName}
      >
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
      </StyledCardContainer>
    )
  }

  return (
    <StyledCardContainer
      className={customClassName}
    >
      <StyledHeader>
        { storyData.title }
      </StyledHeader>

      <StyledCardActions>
        <StyledVotingResultContainer>
          {
            votingResult.map((voteValue) => (
              <StyledVotingResult>
                { voteValue }
              </StyledVotingResult>
            ))
          }
        </StyledVotingResultContainer>

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
    </StyledCardContainer>
  )
}