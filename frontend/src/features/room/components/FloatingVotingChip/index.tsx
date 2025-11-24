import { BsCheckCircleFill, BsCircleFill } from 'react-icons/bs'
import { AnimatePresence } from 'motion/react'

import { useAppSelector } from '@/app/storeHooks'

import { Container } from './styles'
import { useVoting } from '../../hooks/useVoting'

export function FloatingVotingChip() {
  const roomSelector = useAppSelector(state => state.room)

  const { votingStory } = useVoting()

  return (
    <AnimatePresence>
      {
        votingStory && (
          <Container
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            {
              roomSelector.socketId && roomSelector.socketId in votingStory.votes
                ? (
                  <BsCheckCircleFill size={20} />
                )
                : (
                  <BsCircleFill size={15} />
                )
            }

            <span>
              Votação: { votingStory.title }
            </span>
          </Container>
        )
      }
    </AnimatePresence>
  )
}