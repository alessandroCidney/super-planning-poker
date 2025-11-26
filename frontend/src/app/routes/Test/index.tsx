import { useCallback, useEffect, useState } from 'react'

import { api } from '@/utils/api'

import { PokerCard } from '../Room/components/PokerCard'
import { LinearLoading } from './components/LinearLoading'

import { StyledCardsContainer, StyledContainer } from './styles'
import { wait } from '@/utils/time'

let loadedOnce = false

export function TestPage() {
  const [completeLoading, setCompleteLoading] = useState(false)

  const cardValues = ['L', 'O', 'A', 'D', 'I', 'N', 'G']

  const callHealthCheck = useCallback(async () => {
    try {
      await api.get('/')

      await wait(10000)

      setCompleteLoading(true)

      await wait(2000)
    } catch (err) {

    }
  }, [])

  useEffect(() => {
    if (!loadedOnce) {
      loadedOnce = true
      callHealthCheck()
    }
  }, [callHealthCheck])

  return (
    <StyledContainer>
      <StyledCardsContainer>
        {
          cardValues.map((cardValue, cardIndex) => (
            <div
              key={`cardIndex${cardIndex}`}
              style={{
                transform: `translateX(${10 * (cardValues.length * 0.5 - cardIndex)}px)`,
                zIndex: cardValues.length - cardIndex,
              }}
            >
              <PokerCard
                cardValue={cardValue}
                style={{
                  filter: `brightness(${1 - cardIndex / 30})`,
                }}
                animate={{
                  y: 30,
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'mirror',
                  duration: 1,
                  delay: -1 * (cardValues.length - cardIndex) / 4,
                  ease: 'easeInOut',
                }}
                width='70px'
              />
            </div>
          ))
        }
      </StyledCardsContainer>

      <p>
        Para evitar consumo excessivo de recursos, nossos serviços entram em estado de sonolência após longa inatividade.
        Por essa razão, o carregamento inicial após inatividade pode demorar até 1 minuto.
      </p>

      <LinearLoading
        complete={completeLoading}
      />
    </StyledContainer>
  )
}