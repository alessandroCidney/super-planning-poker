import styled from 'styled-components'

import { motion } from 'motion/react'

interface StyleButtonProps {
  $width?: string
  $color?: string
}

export const StyledButton = styled(motion.button)<StyleButtonProps>`
  width: ${props => props.$width || '120px'};

  aspect-ratio: 2 / 3;

  font-family: Modak, system-ui, sans-serif;
  font-size: calc(${props => props.$width || '120px'} * 3 / 4);
  color: #fff;

  border: none;
  border-radius: calc(${props => props.$width || '120px'} * 1 / 15);

  background-color: ${props => props.$color ?? 'var(--theme-primary-color)'};

  cursor: pointer;
`