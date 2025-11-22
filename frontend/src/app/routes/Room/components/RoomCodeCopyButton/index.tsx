import { useState } from 'react'
import { useParams } from 'react-router'
import { BsCheck, BsCopy } from 'react-icons/bs'

import { useAppSelector } from '@/app/storeHooks'

import { useNotifications } from '@/features/notifications/hooks/useNotifications'

import { copyText } from '@/utils/text'

import { StyledButton, StyledRoomCode } from './style'

export function RoomCodeCopyButton() {
  const { roomId } = useParams()

  const notifications = useNotifications()

  const roomSelector = useAppSelector(state => state.room)

  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  async function handleCopyRoomId() {
    try {
      await copyText(roomSelector.currentRoom?._id ?? '')

      setShowSuccessMessage(true)

      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 2000)
    } catch (err) {
      notifications.showMessage({
        title: 'Erro ao copiar!',
        description: 'Ocorreu um erro oo tentar copiar o código da sala.',
        type: 'error',
      })
    }
  }
  
  return (
    <StyledButton
      color='rgb(4, 150, 255, .1)'
      textColor='rgb(4, 150, 255)'
      readonly={showSuccessMessage}
      appendIcon={showSuccessMessage ? <BsCheck size={25} /> : <BsCopy size={20} />}
      onClick={handleCopyRoomId}
    >
      {
        showSuccessMessage
          ? (
            <span>
              Código copiado com sucesso!
            </span>
          )
          : (
            <>
              Código da sala:

              <StyledRoomCode>
                { roomId }
              </StyledRoomCode>
            </>
          )
      }
    </StyledButton>
  )
}