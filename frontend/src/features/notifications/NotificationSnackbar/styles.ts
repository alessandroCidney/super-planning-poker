import styled from 'styled-components'

export const StyledFigure = styled.figure`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;

  position: absolute;
  bottom: 20px;
  right: 20px;

  min-width: 450px;
  height: 100px;

  padding: 0 20px;

  color: #fff;

  background-color: var(--theme-primary-color);

  border-radius: 20px;

  figcaption {
    font-size: 1.2rem;
    font-weight: 600;
  }
`

export const FloatingActions = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`
