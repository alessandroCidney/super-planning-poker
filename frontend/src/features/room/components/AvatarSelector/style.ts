import styled from 'styled-components'

import { motion } from 'motion/react'

export const StyledAvatarButton = styled.button`
  border: none;

  border-radius: 50%;

  cursor: pointer;
`

export const StyledCardsList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
`

interface StyledCardContainerProps {
  $width: number
}

export const StyledCardContainer = styled(motion.div)<StyledCardContainerProps>`
  z-index: 2;

  position: absolute;

  display: inline-block;

  width: ${props => props.$width}px;

  button:last-of-type {
    margin-top: 20px;
  }
`

interface StyledCardImageProps {
  $width: number
  $imageUrl: string
}

export const StyledCardImage = styled.button<StyledCardImageProps>`
  width: ${props => props.$width}px;
  max-width: ${props => props.$width}px;
  aspect-ratio: 2 / 3;

  background-image: url(${props => props.$imageUrl});
  background-size: cover;
  background-repeat: no-repeat;

  border: 7px solid #fff;
  border-radius: 16px;

  cursor: pointer;

  &.card-image--selected {
    cursor: auto;
  }
`

export const StyledCornerActions = styled.div`
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  padding: 10px;

  button {
    z-index: 3;
  }
`