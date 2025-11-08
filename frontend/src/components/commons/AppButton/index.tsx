import type React from 'react'

import { StyledButton } from './styles'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string
}

export function AppButton({ children, color, ...rest }: ButtonProps) {
  return (
    <StyledButton
      $color={color}
      {...rest}
    >
      { children }
    </StyledButton>
  )
}