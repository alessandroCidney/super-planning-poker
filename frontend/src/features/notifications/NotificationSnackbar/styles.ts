import styled from 'styled-components'

import { motion } from 'motion/react'

interface StyledFigureProps {
  $backgroundColor?: string
}

export const StyledFigure = styled(motion.figure)<StyledFigureProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;

  position: absolute;
  bottom: 20px;
  right: 20px;

  min-width: 450px;
  height: 100px;

  padding: 0 20px;

  color: #fff;

  background-color: ${props => props.$backgroundColor || 'var(--theme-primary-color)'};

  border-radius: 20px;

  figcaption {
    font-size: 1.2rem;
    font-weight: 600;
  }
`

export const StyledContentContainer = styled.div`
  margin-right: 20px;
`

export const FloatingActions = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`
