import styled from 'styled-components'

interface ButtonProps {
  $color?: string
}

export const StyledButton = styled.button<ButtonProps>`
  display: block;

  width: 100%;

  padding: 10px;

  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;

  background-color: ${(props) => props.$color || 'var(--theme-primary-color)'};

  border: none;
  border-radius: 8px;

  cursor: pointer;

  transition: all .1s ease-in-out;

  &:hover {
    background-color: #fff;
    color: ${(props) => props.$color || 'var(--theme-primary-color)'};

    outline: ${(props) => props.$color || 'var(--theme-primary-color)'};
  }
`