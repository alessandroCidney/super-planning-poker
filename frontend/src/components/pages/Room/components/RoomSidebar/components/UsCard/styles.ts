import styled from 'styled-components'

export const StyledCardContainer = styled.article`
  position: relative;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  
  background-color: var(--theme-primary-lighten-1-color);

  border-radius: 24px;

  width: 100%;
  aspect-ratio: 2 / 1;

  margin-bottom: 20px;

  &.us-card--voting {
    border: 3px solid #fff;
  }
`

export const StyledHeader = styled.header`
  padding: 20px;

  font-size: 1.2rem;
`

export const StyledCardActions = styled.div`
  flex: 1 1 0;

  width: 100%;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  
  padding: 10px;
`

export const StyledWarning = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  position: absolute;
  top: 10px;
  right: 10px;

  height: 50px;

  padding: 0 20px;
  
  font-size: 1.1rem;
  font-weight: 500;
  color: #fff;

  background-color: var(--theme-primary-lighten-3-color);

  /* border: 3px solid #fff; */
  border-radius: 999px;
`

export const StyledVotingResultContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
`

export const StyledVotingResult = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;

  color: var(--theme-primary-color);
  font-weight: 600;
  font-size: 1.5rem;

  background-color: #fff;

  border-radius: 50%;
`

export const FloatingActions = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`