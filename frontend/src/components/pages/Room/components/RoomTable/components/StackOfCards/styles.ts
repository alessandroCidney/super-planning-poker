import styled from 'styled-components'

interface StyledCardProps {
  $brightness: number
  $rotate: number
}

export const StyledCard = styled.div<StyledCardProps>`
  position: absolute;

  transform: rotate(${props => props.$rotate ?? 0}deg);

  width: 70px;
  aspect-ratio: 2 / 3;

  background-color: #ccc;

  border-radius: 10px;

  filter: brightness(${props => props.$brightness});
`

export const StackOfCardsContainer = styled.div`
  position: relative;

  transform: rotate3d(1, 0, 0, 30deg);

  width: 70px;
  height: calc(70px * 3 / 2);
`