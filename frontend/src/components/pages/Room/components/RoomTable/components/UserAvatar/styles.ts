import styled from 'styled-components'

interface StyledCircleProps {
  $translateX: number
  $translateY: number
}

export const StyledUserContainer = styled.div<StyledCircleProps>`
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;

  border-radius: 50%;

  background-color: var(--theme-primary-color);

  transform: translate(${props => props.$translateX ? `${props.$translateX}px` : '0px'}, ${props => props.$translateY ? `${props.$translateY}px` : '0px'});

  transition: all 1s ease-in-out;

  &.user-avatar--disabled {
    filter: saturate(0);
  }
`

export const StyledUserName = styled.div`
  position: absolute;

  top: -25px;
  
  min-width: 100%;

  padding: 0 10px;

  color: #767676;
  font-size: 12px;
  text-align: center;
  
  background-color: #f6f6f6;

  border-radius: 8px;
`