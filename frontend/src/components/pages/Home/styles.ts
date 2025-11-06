import styled from 'styled-components'

export const Section = styled.section`
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--theme-primary-color);
`

export const Form = styled.form`
  width: 500px;

  padding: 20px;

  background-color: #30a9ffff;

  color: #fff;

  border-radius: 8px;
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

  border-radius: 8px;

  text-align: center;
  font-size: 1.5rem;
`

export const FloatingH1 = styled.h1`
  position: absolute;

  top: 20px;
  left: 20px;

  color: rgb(255, 255, 255, .8);
  font-size: 3rem;
`

export const FormButton = styled.button`
  display: block;

  width: 100%;

  padding: 10px;

  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;

  background-color: var(--theme-primary-color);

  border: none;
  border-radius: 8px;

  cursor: pointer;

  transition: all .1s ease-in-out;

  &:hover {
    background-color: white;
    color: var(--theme-primary-color);;

    outline: 4px solid var(--theme-primary-color);
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