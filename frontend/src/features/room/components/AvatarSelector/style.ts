import styled from 'styled-components'

import { motion } from 'motion/react'

import { DefaultButton } from '@/components/commons/DefaultButton'

export const StyledAvatarButton = styled.button`
  border: none;

  border-radius: 50%;

  cursor: pointer;
`

export const StyledOverlay = styled(motion.div)`
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;
  
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: rgb(0, 0, 0, .7);
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

export const StyledCloseButton = styled(DefaultButton)`
  position: absolute;
  top: 10px;
  right: 10px;
`
