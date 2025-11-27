import styled from 'styled-components'

export const StyledLoading = styled.div`
  width: 500px;
  max-width: 100%;
  height: 30px;

  overflow: hidden;

  background-color: var(--theme-primary-darken-3-color);

  border-radius: 9999px;
  border: 3px solid #fff;
  outline: 3px solid #000;
`

interface StyledLoadingIndicatorProps {
  $progress: number
}

export const StyledLoadingIndicator = styled.div<StyledLoadingIndicatorProps>`
  width: ${props => props.$progress}%;
  height: 100%;
  
  background-color: var(--theme-primary-color);

  border-radius: 9999px;

  transition: width .2s linear;
`