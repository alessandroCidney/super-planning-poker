import type React from 'react'
import { StyledButton } from './styles'

interface PokerCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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