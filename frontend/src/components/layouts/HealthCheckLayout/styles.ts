import styled from 'styled-components'

import { motion } from 'motion/react'
import { PokerCard } from '@/app/routes/Room/components/PokerCard'

export const StyledContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100vw;
  height: 100vh;

  p {
    margin-bottom: 40px;

    width: 700px;
    max-width: 100%;

    text-align: center;
    font-size: 1.1rem;
    font-weight: 500;
  }

  > * {
    transition: all .2s linear;
  }
`

export const StyledCardsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 70px;
`

export const StyledErrorContainer = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;

  width: 100vw;
  height: 100vh;

  text-align: center;

  p {
    width: 500px;
    max-width: 100%;
  }
`

export const StyledPokerCard = styled(PokerCard)`
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: auto;
`
