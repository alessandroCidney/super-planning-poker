import { BsArrowLeft, BsStars } from 'react-icons/bs'

import { useAppDispatch, useAppSelector } from '@/app/storeHooks'

import { DefaultButton } from '@/components/commons/DefaultButton'
import { FloatingMenu } from '@/components/commons/FloatingMenu'
import { Chip } from '@/components/commons/Chip'

import { UserAvatar } from '@/features/room/components/UserAvatar'
import * as roomSlice from '@/features/room/roomSlice'

import { StyledUserInfoContainer } from './styles'

export function UserMenu() {
  const dispatch = useAppDispatch()

  const roomSelector = useAppSelector(state => state.room)

  const currentUser = roomSelector.socketId
    && roomSelector.currentRoom?.users[roomSelector.socketId]
    || undefined
  
  const isRoomOwner = !!roomSelector.currentRoom
    && !!roomSelector.socketId
    && roomSelector.currentRoom.ownerIds.includes(roomSelector.socketId)

  function signOut() {
    window.location.href = window.location.origin
  }

  return (
    <FloatingMenu
      activator={<UserAvatar />}
    >
      <StyledUserInfoContainer>
        <div>
          <UserAvatar />
        </div>

        <div className='user-data-text'>
          <div>
            { currentUser?.name }
          </div>

          <div>
            <Chip>
              { isRoomOwner ? 'Dono da Sala' : 'Convidado' }
            </Chip>
          </div>
        </div>
      </StyledUserInfoContainer>

      <DefaultButton
        color='transparent'
        textColor='black'
        hoverColor='rgb(0, 0, 0, .1)'
        textHoverColor='black'
        prependIcon={<BsStars size={20} />}
        block
        list
        onClick={() => dispatch(roomSlice.toggleAvatarSelector())}
      >
        Escolher avatar
      </DefaultButton>

      <DefaultButton
        color='transparent'
        textColor='black'
        hoverColor='rgb(0, 0, 0, .1)'
        textHoverColor='black'
        prependIcon={<BsArrowLeft size={20} />}
        block
        list
        onClick={signOut}
      >
        Sair
      </DefaultButton>
    </FloatingMenu>
  )
}