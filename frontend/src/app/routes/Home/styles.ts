import styled from 'styled-components'

export const Form = styled.form`
  width: 500px;
  max-width: calc(100% - 20px);

  padding: 30px;

  color: #fff;
  
  background-color: var(--theme-primary-color);

  border: 3px solid #fff;

  border-radius: 50px;

  p {
    margin-bottom: 20px;
  }
`

export const FormField = styled.label`
  display: block;

  margin-top: 20px;
`

export const FieldTitle = styled.span`
  display: block;
`

export const FieldInput = styled.input`
  display: block;

  width: 100%;

  padding: 10px;
  margin: 20px 0;

  border: none;
  border-radius: 16px;

  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;

  &:focus {
    outline: 4px solid var(--theme-primary-darken-2-color);
  }

  &::placeholder {
    color: #d1d1d1;
  }
`

export const FormBreak = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 20px;

  padding: 10px 0;

  &::before, &::after {
    content: '';

    flex: 1 1 0;
    
    height: 1px;

    background-color: rgb(255, 255, 255, .5);
  }
`

export const FormActions = styled.div`
  button:not(:last-of-type) {
    margin-bottom: 10px;
  }
`
