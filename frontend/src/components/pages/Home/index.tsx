import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { DefaultButton } from '../../commons/DefaultButton'

import { useRoom } from '../../../hooks/useRoom'

import { StyledMain, Form, FloatingH1, FormField, FieldTitle, FieldInput, FormButton, FormBreak } from './styles'

export function Home() {
  const navigate = useNavigate()

  const { joinRoom, createRoom, roomData } = useRoom()

  const [searchParams] = useSearchParams()

  const [enterRoomPayload, setEnterRoomPayload] = useState({
    code: searchParams.get('room') ?? '',
    name: '',
  })
  
  const [formStep, setFormStep] = useState<'room' | 'user'>(searchParams.get('room') ? 'user': 'room')

  function handleNextStep(event: React.SyntheticEvent) {
    event.preventDefault()

    setFormStep('user')
  }

  async function handleFinish(event: React.SyntheticEvent) {
    event.preventDefault()

    if (enterRoomPayload.code) {
      await joinRoom(enterRoomPayload.code, { name: enterRoomPayload.name })
    } else {
      await createRoom({ name: enterRoomPayload.name })
    }
  }
  
  useEffect(() => {
    if (roomData) {
      navigate(`/rooms/${roomData._id}`)
    }
  }, [navigate, roomData])

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
                  type='text'
                  placeholder='XXXXXX'
                  value={enterRoomPayload.code}
                  onChange={(e) => setEnterRoomPayload({ ...enterRoomPayload, code: e.target.value })}
                />

                <FormButton>
                  Entrar
                </FormButton>
              </FormField>

              <FormBreak>
                ou
              </FormBreak>

              <DefaultButton>
                Crie uma nova
              </DefaultButton>
            </Form>
          )
          : (
            <Form onSubmit={handleFinish}>
              <h2>
                Escolha seu nome
              </h2>

              <p>
                Entrando na sala { enterRoomPayload.code }
              </p>

              <FormField>
                <FieldTitle>
                  Como deseja ser chamado?
                </FieldTitle>

                <FieldInput
                  type='text'
                  placeholder='Potato Chips'
                  value={enterRoomPayload.name}
                  onChange={(e) => setEnterRoomPayload({ ...enterRoomPayload, name: e.target.value })}
                />

                <DefaultButton>
                  Continuar
                </DefaultButton>
              </FormField>
            </Form>
          )
      }
    </StyledMain>
  )
}