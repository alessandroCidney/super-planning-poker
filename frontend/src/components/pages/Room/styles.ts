import styled from 'styled-components'

export const StyledMain = styled.section`
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledSection = styled.section`
  height: 100%;

  position: relative;
  
  flex: 1 1 0;
`

export const StyledCard = styled.article`
  padding: 20px;
  
  background-color: #fff;

  border-radius: 8px;

  header {
    margin-bottom: 10px;

    h3 {
      font-weight: 600;
    }
  }
`

export const StyledCardsContainer = styled.div`
  position: absolute;

  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
`