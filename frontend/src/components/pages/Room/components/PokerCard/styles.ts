import styled from 'styled-components'

interface StyleButtonProps {
  $width?: string
  $color?: string
}

export const StyledButton = styled.button<StyleButtonProps>`
  width: ${props => props.$width || '120px'};

  aspect-ratio: 2 / 3;

  font-family: Modak, system-ui, sans-serif;
  font-size: 90px;
  color: #fff;

  border: none;
  border-radius: 8px;

  background-color: ${props => props.$color ?? 'var(--theme-primary-color)'};

  cursor: pointer;
`