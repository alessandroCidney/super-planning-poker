import { useState } from 'react'

import { BsCopy, BsPersonFillAdd } from 'react-icons/bs'

import { useAppSelector } from '@/app/storeHooks'

import { Dialog } from '@/components/commons/Dialog'
import { DefaultButton } from '@/components/commons/DefaultButton'

import { useNotifications } from '@/features/notifications/hooks/useNotifications'

import { copyText } from '@/utils/text'

import { StyledActions } from './styles'

export function InviteDialog() {
  const roomSelector = useAppSelector(state => state.room)

  const [showShareDialog, setShowShareDialog] = useState(false)

  const notifications = useNotifications()

  async function copyRoomCode() {
    const roomCode = roomSelector.currentRoom?._id as string

    await copyText(roomCode)

    notifications.showMessage({
      title: 'Código copiado!',
      description: 'Agora você compartilhar o código da sala com outras pessoas.',
      type: 'success',
    })

    setShowShareDialog(false)
  }

  async function copyRoomLink() {
    const roomCode = roomSelector.currentRoom?._id as string

    await copyText(`${window.location.origin}/rooms/${roomCode}`)

    notifications.showMessage({
      title: 'Link copiado!',
      description: 'Agora você compartilhar o link da sala com outras pessoas.',
      type: 'success',
    })

    setShowShareDialog(false)
  }

  return (
    <>
      <DefaultButton
        color='rgb(4, 150, 255, .1)'
        textColor='var(--theme-primary-darken-2-color)'
        hoverColor='var(--theme-primary-color)'
        prependIcon={<BsPersonFillAdd size={25} />}
        onClick={() => setShowShareDialog(true)}
      >
        Convidar
      </DefaultButton>

      <Dialog
        value={showShareDialog}
        setValue={setShowShareDialog}

        title='Convidar para a sala'

        actions={
          <StyledActions>
            <DefaultButton
              prependIcon={<BsCopy size={25} />}
              block
              onClick={copyRoomCode}
            >
              Copiar código da sala
            </DefaultButton>

            <DefaultButton
              color='var(--theme-primary-darken-2-color)'
              hoverColor='var(--theme-primary-darken-3-color)'
              prependIcon={<BsCopy size={25} />}
              block
              onClick={copyRoomLink}
            >
              Copiar link da sala
            </DefaultButton>
          </StyledActions>
        }
      >
        Convide outras pessoas para participar da sua sala!
      </Dialog>
    </>
  )
}