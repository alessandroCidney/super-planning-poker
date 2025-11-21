import { useEffect, useState } from 'react'

import type { EllipseCoordinate } from '@/utils/calc'

import type { User } from '@/types/users'

import { StyledUserContainer, StyledUserName } from './styles'

interface UserAvatarProps {
  user: User
  coordinates: EllipseCoordinate

  disabled: boolean
}

export function UserAvatar({ user, coordinates, disabled }: UserAvatarProps) {
  const [loadedPhoto, setLoadedPhoto] = useState('')

  useEffect(() => {
    async function loadPhoto() {
      const importedImage = await import(`@/assets/images/pixelarts/${user.avatar.path}.png`)

      setLoadedPhoto(importedImage.default)
    }

    loadPhoto()
  }, [user.avatar.path])

  return (
    <StyledUserContainer
      $backgroundImage={loadedPhoto}
      className={disabled ? 'user-avatar--disabled' : ''}
      initial={{
        translateX: coordinates.x,
        translateY: coordinates.y * -1,
        scale: 0,
        opacity: 0,
      }}
      animate={{
        translateX: coordinates.x,
        translateY: coordinates.y * -1,
        scale: 1,
        opacity: 1,
      }}
    >
      <StyledUserName>
        { user.name }
      </StyledUserName>
    </StyledUserContainer>
  )
}