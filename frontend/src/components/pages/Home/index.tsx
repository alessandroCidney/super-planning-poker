import React, { useState } from 'react'

import { AppButton } from '../../commons/AppButton'

import { useRoom } from '../../../hooks/useRoom'

import { StyledMain, Form, FloatingH1, FormField, FieldTitle, FieldInput, FormButton, FormBreak } from './styles'

export function Home() {
  const roomContext = useRoom()

  const [enterRoomPayload, setEnterRoomPayload] = useState({
    code: '',
    name: '',
  })
  
  const [formStep, setFormStep] = useState<'room' | 'user'>('room')

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEnterRoomPayload({
      ...enterRoomPayload,
      [event.target.name]: event.target.value,
    })
  }

  function handleNextStep(event: React.SyntheticEvent) {
    event.preventDefault()

    setFormStep('user')
  }

  async function handleCreateRoom() {
    try {
      roomContext.createRoom()
    } catch (err) {
      console.error('err', err)
    }
  }

  async function handleFinish(event: React.SyntheticEvent) {
    event.preventDefault()

    if (!enterRoomPayload.code) {
      await handleCreateRoom()
    }
  }
  
  return (
    <StyledMain>
      <FloatingH1>
        Home
      </FloatingH1>

      {
        formStep === 'room'
          ? (
            <Form onSubmit={handleNextStep}>
              <h2>
                Entre em uma sala
              </h2>

              <FormField>
                <FieldTitle>
                  Informe o código da sala em que deseja entrar:
                </FieldTitle>

                <FieldInput
                  name='code'
                  type='text'
                  placeholder='XXXXXX'
                  onChange={handleInputChange}
                />

                <FormButton>
                  Entrar
                </FormButton>
              </FormField>

              <FormBreak>
                ou
              </FormBreak>

              <AppButton>
                Crie uma nova
              </AppButton>
            </Form>
          )
          : (
            <Form onSubmit={handleFinish}>
              <h2>
                Escolha seu nome
              </h2>

              <FormField>
                <FieldTitle>
                  Como deseja ser chamado?
                </FieldTitle>

                <FieldInput
                  name='name'
                  type='text'
                  placeholder='Potato Chips'
                  onChange={handleInputChange}
                />

                <AppButton>
                  Continuar
                </AppButton>
              </FormField>
            </Form>
          )
      }
    </StyledMain>
  )
}