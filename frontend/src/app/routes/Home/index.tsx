import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { useAppDispatch, useAppSelector } from '@/app/storeHooks'

import { DefaultButton } from '@/components/commons/DefaultButton'

import { createRoom, joinRoom } from '@/features/room/roomSlice'
import { useAvatars } from '@/features/room/hooks/useAvatars'

import { StyledMain, Form, FormField, FieldTitle, FieldInput, FormBreak, FormActions } from './styles'

export function Home() {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const roomSelector = useAppSelector(state => state.room)

  const [searchParams] = useSearchParams()

  const { getRandomAvatar } = useAvatars()

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
      dispatch(joinRoom({
        roomId: enterRoomPayload.code,
        userData: {
          name: enterRoomPayload.name,

          avatar: {
            type: 'internal_photo',
            path: getRandomAvatar().imageId,
          },
        },
      }))
    } else {
      dispatch(createRoom({
        userData: {
          name: enterRoomPayload.name,

          avatar: {
            type: 'internal_photo',
            path: getRandomAvatar().imageId,
          },
        },
      }))
    }
  }
  
  useEffect(() => {
    if (roomSelector.currentRoom) {
      navigate(`/rooms/${roomSelector.currentRoom._id}`)
    }
  }, [navigate, roomSelector.currentRoom])

  return (
    <StyledMain>
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
              </FormField>

              <DefaultButton
                color='var(--theme-primary-darken-2-color)'
                hoverColor='var(--theme-primary-darken-3-color)'
                block
                type='submit'
              >
                Entrar
              </DefaultButton>

              <FormBreak>
                ou
              </FormBreak>

              <DefaultButton
                color='var(--theme-primary-darken-2-color)'
                hoverColor='var(--theme-primary-darken-3-color)'
                block
                type='submit'
              >
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
              </FormField>

              <FormActions>
                <DefaultButton
                  color='var(--theme-primary-darken-2-color)'
                  hoverColor='var(--theme-primary-darken-3-color)'
                  block
                  type='submit'
                >
                  Continuar
                </DefaultButton>

                <DefaultButton
                  color='var(--theme-primary-lighten-2-color)'
                  hoverColor='var(--theme-primary-lighten-1-color)'
                  block
                  type='button'
                  onClick={() => setFormStep('room')}
                >
                  Voltar
                </DefaultButton>
              </FormActions>
            </Form>
          )
      }
    </StyledMain>
  )
}