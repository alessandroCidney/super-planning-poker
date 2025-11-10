import type React from 'react'
import { StyledButton } from './styles'

interface PokerCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  cardValue: number
  width?: string
}

export function PokerCard({ cardValue, width, ...rest }: PokerCardProps) {
  return (
    <StyledButton
      $width={width}
      {...rest}
    >
      { cardValue }
    </StyledButton>
  )
}