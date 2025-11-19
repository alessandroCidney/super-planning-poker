import { useMemo, type ReactNode } from 'react'
import { StyledButton } from './styles'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string
  hoverColor?: string
  minWidth?: string
  iconSize?: string

  block?: boolean
  icon?: boolean
  disabled?: boolean

  prependIcon?: ReactNode
}

export function DefaultButton({
  children,
  color,
  hoverColor,
  minWidth,
  iconSize,

  className,

  block,
  icon,
  disabled,
  
  prependIcon,
  ...rest
}: ButtonProps) {
  const adaptedClasses = useMemo(
    () => {
      const customClassesArr = []

      if (block) {
        customClassesArr.push('default-button--block')
      }

      if (icon) {
        customClassesArr.push('default-button--icon')
      }

      if (prependIcon) {
        customClassesArr.push('default-button--text-and-icon')
      }

      if (disabled) {
        customClassesArr.push('default-button--disabled')
      }

      return `${customClassesArr.join(' ')} ${className}`
    },
    [block, icon, prependIcon, disabled, className],
  )
  
  return (
    <StyledButton
      className={adaptedClasses}
      $color={color}
      $hoverColor={hoverColor}
      $minWidth={minWidth}
      $iconSize={iconSize}
      {...rest}
    >
      { prependIcon }

      { children }
    </StyledButton>
  )
}