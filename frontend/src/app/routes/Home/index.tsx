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

import { Form, FormField, FieldTitle, FieldInput, FormBreak, FormActions, FormErrorMessage } from './styles'
import { allFormRules, useFormRules } from '@/hooks/useFormRules'

export function Home() {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const roomSelector = useAppSelector(state => state.room)

  const [searchParams, setSearchParams] = useSearchParams()

  const { getRandomAvatar } = useAvatars()
  const notifications = useNotifications()

  const roomCodeFieldControls = useFormRules({
    initialValue: '',
    selectedRules: [
      allFormRules.requiredString,
      allFormRules.maxLength(36),
    ],
  })

  const nameFieldControls = useFormRules({
    initialValue: '',
    selectedRules: [
      allFormRules.requiredString,
      allFormRules.maxLength(300),
    ],
  })
  
  const [formStep, setFormStep] = useState<'room' | 'user'>('room')

  async function handleStartJoinRoom() {
    const validationResult = roomCodeFieldControls.validate()

    if (validationResult.valid) {
      setFormStep('user')
    }
  }

  async function handleStartCreateRoom() {
    roomCodeFieldControls.setValue('')
    nameFieldControls.setValue('')

    setFormStep('user')
  }

  async function handleFinish(event: React.SyntheticEvent) {
    event.preventDefault()

    if (!nameFieldControls.validate().valid) {
      return
    }

    if (roomCodeFieldControls.value) {
      dispatch(roomSlice.joinRoom({
        roomId: roomCodeFieldControls.value,
        userData: {
          name: nameFieldControls.value,

          avatar: {
            type: 'internal_photo',
            path: getRandomAvatar().imageId,
          },
        },
      }))
    } else {
      dispatch(roomSlice.createRoom({
        userData: {
          name: nameFieldControls.value,

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
      await api.get(`/rooms/${roomId}`)

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
        const roomIdValidationResult = roomCodeFieldControls.validate(urlRoomId)

        if (roomIdValidationResult.valid) {
          roomCodeFieldControls.setValue(urlRoomId)

          setFormStep('user')
        } else {
          roomCodeFieldControls.setValue('')

          setFormStep('room')
        }
      } else {
        notifications.showMessage({
          title: 'Sala não encontrada!',
          description: 'A sala não existe ou foi removida.',
          type: 'info',
        })

        roomCodeFieldControls.setValue('')

        setSearchParams({})

        setFormStep('room')
          
        return
      }
    }
  }, [checkIfRoomExists, notifications, roomCodeFieldControls, searchParams, setSearchParams])
  
  useEffect(() => {
    if (roomSelector.currentRoom) {
      navigate(`/rooms/${roomSelector.currentRoom._id}`)

      return
    }

    urlRoomCheck()
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
                  placeholder='Código da Sala'
                  value={roomCodeFieldControls.value}
                  onChange={(e) => roomCodeFieldControls.setValue(e.target.value)}
                />
              </FormField>

              {
                roomCodeFieldControls.errorMessage && (
                  <FormErrorMessage>
                    { roomCodeFieldControls.errorMessage }
                  </FormErrorMessage>
                )
              }

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
                  roomCodeFieldControls.value
                    ? <>Entrando na sala { roomCodeFieldControls.value }</>
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
                  value={nameFieldControls.value}
                  onChange={(e) => nameFieldControls.setValue(e.target.value)}
                />
              </FormField>

              {
                nameFieldControls.errorMessage && (
                  <FormErrorMessage>
                    { nameFieldControls.errorMessage }
                  </FormErrorMessage>
                )
              }

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