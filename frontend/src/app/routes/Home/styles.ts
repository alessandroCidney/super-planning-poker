import styled from 'styled-components'

import cardBackground from '@/assets/images/backgrounds/card-background.jpg'

export const StyledMain = styled.section`
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;

  background: url(${cardBackground});
`

export const Form = styled.form`
  width: 500px;

  padding: 30px;

  color: #fff;
  
  background-color: var(--theme-primary-color);

  border: 3px solid #fff;

  border-radius: 50px;
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

  &:focus {
    outline: 4px solid var(--theme-primary-color);
  }
`

export const FloatingH1 = styled.h1`
  position: absolute;

  top: 20px;
  left: 20px;

  color: rgb(255, 255, 255, .8);
  font-size: 3rem;
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