import styled from 'styled-components'

interface ButtonProps {
  $color?: string
  $hoverColor?: string

  $minWidth?: string
}

export const StyledButton = styled.button<ButtonProps>`
  display: block;

  width: 100%;
  height: 50px;
  min-width: ${props => props.$minWidth || 'auto'};

  font-size: 1.1rem;
  font-weight: 500;
  color: #fff;

  background-color: ${props => props.$color || 'var(--theme-primary-darken-1-color)'};

  border: none;
  border-radius: 16px;

  cursor: pointer;

  transition: all .1s ease-in-out;

  &:hover {
    background-color: ${props => props.$hoverColor || 'var(--theme-primary-darken-2-color)'};
  }
`