import React, { useMemo, type ReactNode } from 'react'

import { Link } from 'react-router'

import loadingCircleSvg from '@/assets/images/vectors/loading-circle.svg'

import { StyledButton, StyledButtonLoading } from './styles'

export type CustomButtonProperties = {
  color?: string
  textColor?: string
  textHoverColor?: string
  hoverColor?: string
  minWidth?: string
  iconSize?: string
  type?: 'button' | 'submit' | 'reset'

  block?: boolean
  icon?: boolean
  list?: boolean
  disabled?: boolean
  readonly?: boolean
  loading?: boolean
  anchor?: boolean

  prependIcon?: ReactNode
  appendIcon?: ReactNode
}

type ButtonVersionProps = CustomButtonProperties & React.ButtonHTMLAttributes<HTMLButtonElement> & {
  anchor?: false
}

type LinkVersionProps = CustomButtonProperties & React.ComponentProps<typeof Link> & {
  anchor: true
}

type ButtonProps = ButtonVersionProps | LinkVersionProps

export function DefaultButton({
  children,

  color,
  textColor,
  textHoverColor,
  hoverColor,
  minWidth,
  iconSize,
  type = 'button',

  className,

  block,
  icon,
  list,
  disabled,
  readonly,
  loading,
  anchor,
  
  prependIcon,
  appendIcon,

  ...rest
}: ButtonProps) {
  const buttonClassNames = useMemo(
    () => {
      const customClassesArr = className ? [className] : []
  
      if (block) {
        customClassesArr.push('default-button--block')
      }
  
      if (icon) {
        customClassesArr.push('default-button--icon')
      }
  
      if (list) {
        customClassesArr.push('default-button--list')
      }
  
      if (prependIcon) {
        customClassesArr.push('default-button--text-and-icon')
      }
  
      if (disabled) {
        customClassesArr.push('default-button--disabled')
      }

      if (loading) {
        customClassesArr.push('default-button--loading')
      }
  
      if (readonly || loading) {
        customClassesArr.push('default-button--readonly')
      }
  
      return `${customClassesArr.join(' ')} ${className}`
    },
    [className, block, icon, list, prependIcon, disabled, readonly, loading],
  )

  const baseProperties = {
    'className': buttonClassNames,
    '$color': color,
    '$textColor': textColor,
    '$textHoverColor': textHoverColor,
    '$hoverColor': hoverColor,
    '$minWidth': minWidth,
    '$iconSize': iconSize,
  }

  function BaseChildren() {
    return (
      <>
        { prependIcon }

        {
          icon
            ? children
            : <span>{ children }</span>
        }

        { appendIcon }

        <StyledButtonLoading
          src={loadingCircleSvg}
          width='30px'
        />
      </>
    )
  }

  return anchor
    ? (
      <StyledButton
        as={Link}
        {...baseProperties}
        {...rest as React.ComponentProps<typeof Link>}
      >
        <BaseChildren />
      </StyledButton>
    )
    : (
      <StyledButton
        {...baseProperties}
        type={type}
        {...rest as React.ButtonHTMLAttributes<HTMLButtonElement>}
      >
        <BaseChildren />
      </StyledButton>
    )
}