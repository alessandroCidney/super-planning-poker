import type { HTMLMotionProps } from 'motion/react'

import { StyledButton } from './styles'

interface PokerCardProps extends HTMLMotionProps<'button'> {
  cardValue: number
  width?: string
  color?: string
}

export function PokerCard({ cardValue, width, color, ...rest }: PokerCardProps) {
  return (
    <StyledButton
      $width={width}
      $color={color}
      {...rest}
    >
      { cardValue }
    </StyledButton>
  )
}