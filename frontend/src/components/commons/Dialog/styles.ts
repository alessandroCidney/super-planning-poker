import styled from 'styled-components'

export const StyledDialog = styled.div`
  position: relative;

  padding: 20px;

  width: 600px;
  max-width: 90vw;
  height: auto;
  max-height: 90vh;

  overflow: hidden;
  
  color: #25292D;

  background-color: #fff;

  border-radius: 24px;

  box-shadow: 0px 5px 10px rgba(0, 0, 0, .05), 0 15px 40px rgba(0, 0, 0, .2);

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 20px;

    button {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }

  .dialog__actions {
    margin-top: 40px;
  }
`
