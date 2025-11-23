import { useMemo } from 'react'

import type { Story } from '@/types/stories'

export function useVoting(storyData?: Story) {
  const votingResult = useMemo(() => {
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
  }, [storyData])

  return { votingResult }
}