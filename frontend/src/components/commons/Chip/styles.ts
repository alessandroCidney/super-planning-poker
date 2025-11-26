import styled from 'styled-components'

interface StyledContainerProps {
  $backgroundColor?: string
  $color?: string
}

export const StyledContainer = styled.span<StyledContainerProps>`
  display: inline;

  padding: 5px 10px;

  background-color: ${props => props.$backgroundColor || '#f0f0f0'};

  color: ${props => props.$color || 'black'};
  font-size: .7rem;

  border-radius: 9999px;
`