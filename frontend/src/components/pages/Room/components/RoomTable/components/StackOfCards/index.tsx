import { useEffect, useMemo, useState } from 'react'

import { naturalExponentialFunction, randomIntFromInterval } from '../../../../../../../utils/calc'

import type { Story } from '../../../../../../../types/stories'

import { StackOfCardsContainer, StyledCard } from './styles'

interface StackOfCardsProps {
  votingStory: Story
}

export function StackOfCards({ votingStory }: StackOfCardsProps) {
  const [votesArr, setVotesArr] = useState<Array<{ userId: string, degree: number }>>([])

  const cardsData = useMemo(() => {
    /*
      When X is zero, the exponencial function returns 1.
      If K is negative, for values greater than 1, the function gets closer and closer to zero, without ever reaching the value zero.
      Decimal values in K make the function smoother.
    */
    const exponencialFunction = naturalExponentialFunction(-0.5)

    const updatedCards = votesArr.map((voteData, voteDataIndex) => ({
      ...voteData,
      brightness: exponencialFunction(votesArr.length - (voteDataIndex + 1)),
    }))

    return updatedCards
  }, [votesArr])

  /*
    The array is updated using useEffect to avoid
    recalculating the degree when new values are received.
  */
  useEffect(() => {
    const newVotesArr = Object.keys(votingStory.votes)

    if (newVotesArr.length === votesArr.length) {
      return
    }

    if (newVotesArr.length === 0) {
      setVotesArr([])

      return
    }

    if (newVotesArr.length > votesArr.length) {
      const registeredIds = votesArr.map(({ userId }) => userId)
      const newUsers = newVotesArr.filter(userId => !registeredIds.includes(userId))

      const newVotesData = newUsers.map(userId => ({
        userId,
        degree: randomIntFromInterval(0, 360),
      }))

      setVotesArr([
        ...votesArr,
        ...newVotesData,
      ])
    } else if (newVotesArr.length < votesArr.length) {
      const newVotesData = [...votesArr]

      newVotesData.pop()

      setVotesArr(newVotesData)
    }
  }, [votesArr, votingStory.votes])
  
  return (
    <StackOfCardsContainer>
      {
        cardsData.map((cardData, cardDataIndex) => (
          <StyledCard
            key={cardData.userId}
            className={cardDataIndex.toString()}
            $brightness={cardData.brightness}
            $rotate={cardData.degree}
          />
        ))
      }
    </StackOfCardsContainer>
  )
}