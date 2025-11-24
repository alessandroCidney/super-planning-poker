import { useCallback, useMemo } from 'react'

import { useAppSelector } from '@/app/storeHooks'

export function useVoting() {
  const roomSelector = useAppSelector(state => state.room)

  const votingStory = useMemo(() => {
    if (!roomSelector.currentRoom || !roomSelector.socketId) {
      return undefined
    }

    const activeStory = Object.values(roomSelector.currentRoom.stories)
      .find(storyData => storyData.votingStatus === 'in_progress')

    return activeStory
  }, [roomSelector.currentRoom, roomSelector.socketId])

  const getVotingResult = useCallback((storyData = votingStory) => {
    if (!storyData) {
      return undefined
    }

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
  }, [votingStory])

  return {
    votingStory,
    getVotingResult,
  }
}