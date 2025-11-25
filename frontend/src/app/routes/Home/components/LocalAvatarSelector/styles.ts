import styled from 'styled-components'

export const StyledContainer = styled.div`
  width: 100%;
`

export const StyledButton = styled.button`
  display: block;

  position: relative;
  
  margin: auto;

  background-color: transparent;

  border-radius: 50%;
  border: 3px solid #fff;
  outline: 3px solid #000;

  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
`

export const StyledFloatingIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  right: -5px;
  bottom: -5px;

  width: 40px;
  height: 40px;

  padding: 10px;

  color: #FFF;

  background-color: var(--theme-primary-lighten-1-color);

  border-radius: 50%;
`