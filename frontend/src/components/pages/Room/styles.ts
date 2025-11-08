import styled from 'styled-components'

export const StyledMain = styled.section`
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledSection = styled.section`
  flex: 1 1 0;
`

export const StyledAside = styled.aside`
  height: 100%;
  width: 500px;
  
  padding: 20px 30px;

  background-color: #f5f5f5;

  header {
    margin-bottom: 20px;

    h2 {
      margin-bottom: 20px;
    }
  }
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