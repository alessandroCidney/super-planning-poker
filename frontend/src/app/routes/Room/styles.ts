import styled from 'styled-components'

import { PokerCard } from './components/PokerCard'

export const StyledPokerCard = styled(PokerCard)`
  position: absolute;
  top: 0;
`

export const StyledCardsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;

  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  height: 210px;

  &.cards-container--disabled {
    pointer-events: none;

    filter: saturate(0);
  }

  &.cards-container--readonly {
    pointer-events: none;

    opacity: 0.8;
  }
`