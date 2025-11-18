import styled from 'styled-components'

import { PokerCard } from './components/PokerCard'

export const StyledMain = styled.section`
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledSection = styled.section`
  height: 100%;

  position: relative;
  
  flex: 1 1 0;
`

interface StyledPokerCardProps {
  $translateX: string
  $translateY: string
  $rotate: string
}

export const StyledPokerCard = styled(PokerCard)<StyledPokerCardProps>`
  position: absolute;
  top: 0;

  transform: translate(${props => props.$translateX}, ${props => props.$translateY}) rotate(${props => props.$rotate});

  transition: all .1s linear;

  &:hover {
    transform: translate(${props => props.$translateX}, calc(${props => props.$translateY} - 20px)) rotate(${props => props.$rotate});

    filter: brightness(.9);
  }
`

export const StyledCardsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;

  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  height: 200px;

  &.cards-container--disabled {
    pointer-events: none;

    filter: saturate(0);
  }

  &.cards-container--readonly {
    pointer-events: none;
  }
`