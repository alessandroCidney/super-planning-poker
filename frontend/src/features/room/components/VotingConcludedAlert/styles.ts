import styled from 'styled-components'

export const StyledDialog = styled.div`
  position: relative;

  width: 600px;
  max-width: 90vw;
  height: 600px;
  max-height: 90vh;

  overflow: hidden;
  
  background-color: #fff;

  border-radius: 24px;
`

export const StyledDialogIcon = styled.div`
  position: absolute;
  bottom: -35px;
  left: 50%;
  transform: translateX(-50%);
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: 130px;
  height: 130px;

  color: #fff;

  background-color: var(--theme-primary-color);

  border-radius: 50%;

  span {
    height: 100%;

    line-height: 145px;
    font-family: Modak;
    font-size: 6rem;
  }
`

export const StyledDialogIconContainer = styled.div`
  position: relative;
  
  width: 100%;
  height: 35%;

  background-color: rgb(4, 150, 255, .3);
`

export const StyledDialogContent = styled.div`
  margin: auto;
  padding-top: 50px;

  max-width: 90%;

  text-align: center;
`

export const StyledDialogActions = styled.div`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
`

export const StyledFloatingActions = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`

