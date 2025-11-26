import { useCallback, useEffect, useState, type ReactNode } from 'react'

import { motion } from 'motion/react'

import { api } from '@/utils/api'

import { LinearLoading } from './components/LinearLoading'

import { StyledCardsContainer, StyledContainer, StyledErrorContainer, StyledPokerCard } from './styles'
import { wait } from '@/utils/time'
import { BsArrowCounterclockwise, BsExclamationCircleFill } from 'react-icons/bs'
import { DefaultButton } from '@/components/commons/DefaultButton'

let loadedOnce = false

interface HealthCheckLayoutProps {
  children: ReactNode
}

export function HealthCheckLayout({ children }: HealthCheckLayoutProps) {
  const [completeLoading, setCompleteLoading] = useState(false)
  const [showChildren, setShowChildren] = useState(false)
  const [showP, setShowP] = useState(false)
  const [fatalError, setFatalError] = useState(false)

  const cardValues = ['L', 'O', 'A', 'D', 'I', 'N', 'G']

  function restartPage() {
    window.location.href = window.location.origin
  }

  const callHealthCheck = useCallback(async () => {
    try {
      await api.get('/')

      await wait(500)

      setCompleteLoading(true)

      await wait(1000)

      setShowChildren(true)
    } catch (err) {
      setCompleteLoading(true)
      setFatalError(true)
    }
  }, [])

  useEffect(() => {
    if (!loadedOnce) {
      loadedOnce = true
      callHealthCheck()
    }

    const timeoutId = setTimeout(() => {
      setShowP(true)
    }, 3000)

    return () => clearTimeout(timeoutId)
  }, [callHealthCheck])

  if (fatalError) {
    return (
      <StyledErrorContainer>
        <BsExclamationCircleFill
          color='var(--theme-error-color)'
          size={100}
        />

        <div>
          <h1>
            Ocorreu um erro interno
          </h1>

          <p>
            Nossos serviços estão indisponíveis no momento,
            por favor, tente novamente mais tarde.
          </p>
        </div>

        <DefaultButton
          color='var(--theme-error-color)'
          hoverColor='var(--theme-error-darken-2-color)'
          minWidth='200px'
          prependIcon={<BsArrowCounterclockwise size={25} />}
          onClick={restartPage}
        >
          Reiniciar
        </DefaultButton>
      </StyledErrorContainer>
    )
  }

  if (showChildren) {
    return (
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
      >
        { children }
      </motion.div>
    )
  }

  return (
    <StyledContainer
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >
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
              <StyledPokerCard
                forwardedAs={motion.div}
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

      {
        showP && (
          <motion.p
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            Para evitar consumo excessivo de recursos, nossos serviços entram em estado de sonolência após longa inatividade.
            Por essa razão, o carregamento inicial após inatividade pode demorar até 1 minuto.
          </motion.p>
        )
      }

      <LinearLoading
        complete={completeLoading}
      />
    </StyledContainer>
  )
}