import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { AxiosError } from 'axios'

import { useAppDispatch, useAppSelector } from '@/app/storeHooks'

import { DefaultButton } from '@/components/commons/DefaultButton'
import { HomeLayout } from '@/components/layouts/HomeLayout'

import { useNotifications } from '@/features/notifications/hooks/useNotifications'
import * as roomSlice from '@/features/room/roomSlice'
import { useAvatars } from '@/features/room/hooks/useAvatars'

import { api } from '@/utils/api'

import { Form, FormField, FieldTitle, FieldInput, FormBreak, FormActions } from './styles'

let loadedOnce = false

export function Home() {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const roomSelector = useAppSelector(state => state.room)

  const [searchParams] = useSearchParams()

  const { getRandomAvatar } = useAvatars()
  const notifications = useNotifications()

  const [enterRoomPayload, setEnterRoomPayload] = useState({
    code: '',
    name: '',
  })
  
  const [formStep, setFormStep] = useState<'room' | 'user'>('room')

  async function handleStartJoinRoom() {
    if (enterRoomPayload.code) {
      setFormStep('user')
    }
  }

  async function handleStartCreateRoom() {
    setEnterRoomPayload({
      code: '',
      name: '',
    })

    setFormStep('user')
  }

  async function handleFinish(event: React.SyntheticEvent) {
    event.preventDefault()

    if (enterRoomPayload.code) {
      dispatch(roomSlice.joinRoom({
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
      dispatch(roomSlice.createRoom({
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

  const checkIfRoomExists = useCallback(async (roomId: string) => {
    try {
      const response = await api.get(`/rooms/${roomId}`)

      console.log('response', response.data)

      return true
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 404) {
        return false
      }

      throw err
    }
  }, [])

  const urlRoomCheck = useCallback(async () => {
    const urlRoomId = searchParams.get('room')

    if (urlRoomId) {
      const roomExists = await checkIfRoomExists(urlRoomId)

      if (roomExists) {
        setEnterRoomPayload({
          code: urlRoomId,
          name: '',
        })

        setFormStep('user')
      } else {
        notifications.showMessage({
          title: 'Sala não encontrada!',
          description: 'A sala não existe ou foi removida.',
          type: 'info',
        })

        setEnterRoomPayload({
          code: '',
          name: '',
        })

        setFormStep('room')

        navigate('/')
          
        return
      }
    }
  }, [checkIfRoomExists, navigate, notifications, searchParams])
  
  useEffect(() => {
    if (roomSelector.currentRoom) {
      navigate(`/rooms/${roomSelector.currentRoom._id}`)

      return
    }

    if (!loadedOnce) {
      loadedOnce = true

      urlRoomCheck()
    }
  }, [urlRoomCheck, navigate, roomSelector.currentRoom])

  return (
    <HomeLayout>
      {
        formStep === 'room'
          ? (
            <Form onSubmit={e => e.preventDefault()}>
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
                onClick={handleStartJoinRoom}
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
                onClick={handleStartCreateRoom}
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
                {
                  enterRoomPayload.code
                    ? <>Entrando na sala { enterRoomPayload.code }</>
                    : <>Criando nova sala</>
                }
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
    </HomeLayout>
  )
}