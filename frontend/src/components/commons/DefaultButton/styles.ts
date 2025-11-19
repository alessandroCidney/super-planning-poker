import styled from 'styled-components'

interface ButtonProps {
  $color?: string
  $textColor?: string
  $hoverColor?: string

  $minWidth?: string

  $iconSize?: string
}

export const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 50px;
  min-width: ${props => props.$minWidth || 'auto'};

  padding: 0 20px;

  font-size: 1.1rem;
  font-weight: 500;
  color: ${props => props.$textColor || '#fff'};

  background-color: ${props => props.$color || 'var(--theme-primary-darken-1-color)'};

  border: none;
  border-radius: 16px;

  cursor: pointer;

  transition: all .1s ease-in-out;

  &:hover {
    background-color: ${props => props.$hoverColor || 'var(--theme-primary-darken-2-color)'};
  }

  &.default-button--block {
    width: 100%;
  }

  &.default-button--icon {
    width: ${props => props.$iconSize ?? '50px'};
    height: ${props => props.$iconSize ?? '50px'};

    padding: 0;

    border-radius: 50%;
  }

  &.default-button--text-and-icon {
    > * {
      margin-right: 5px;
    }
  }

  &.default-button--disabled {
    opacity: 0.7;

    pointer-events: none;

    // prevent copy text
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
`