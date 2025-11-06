import React, { useState } from 'react'

import { io, Socket } from 'socket.io-client'

import { Section, Form, FloatingH1, FormField, FieldTitle, FieldInput, FormButton, FormBreak } from './styles'

export function Home() {
  const [socket, setSocket] = useState<Socket>()

  const [enterRoomPayload, setEnterRoomPayload] = useState({
    code: '',
    username: '',
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
  
  return (
    <Section>
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

              <FormButton>
                Crie uma nova
              </FormButton>
            </Form>
          )
          : (
            <Form>
              <h2>
                Escolha seu nome
              </h2>

              <FormField>
                <FieldTitle>
                  Como deseja ser chamado?
                </FieldTitle>

                <FieldInput
                  name='username'
                  type='text'
                  placeholder='Potato Chips'
                  onChange={handleInputChange}
                />

                <FormButton>
                  Continuar
                </FormButton>
              </FormField>
            </Form>
          )
      }
    </Section>
  )
}