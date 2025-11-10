import { StyledButton } from './styles'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string
  hoverColor?: string
  minWidth?: string
}

export function DefaultButton({ children, color, hoverColor, minWidth, ...rest }: ButtonProps) {
  return (
    <StyledButton
      $color={color}
      $hoverColor={hoverColor}
      $minWidth={minWidth}
      {...rest}
    >
      { children }
    </StyledButton>
  )
}