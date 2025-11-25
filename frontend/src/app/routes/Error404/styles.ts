import styled from 'styled-components'

export const StyledContainer = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  width: 100vw;
  height: 100vh;

  text-align: center;

  img {
    aspect-ratio: 654 / 402;
  }

  p {
    margin-bottom: 20px;

    max-width: 400px;
  }
`