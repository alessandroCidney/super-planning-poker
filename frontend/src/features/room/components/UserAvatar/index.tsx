import { useEffect, useMemo, useState } from 'react'

import { useAppSelector } from '@/app/storeHooks'

import { StyledImgContainer } from './style'

interface UserAvatarProps {
  className?: string
  imageId?: string
  size?: string

  bordered?: boolean
  disabled?: boolean
}

export function UserAvatar({ className, imageId, size, bordered, disabled }: UserAvatarProps) {
  const userAvatarPath = useAppSelector(state => state.room.currentRoom?.users[state.room.socketId ?? ''].avatar.path)

  const selectedAvatar = imageId ?? userAvatarPath

  const [loadedPhoto, setLoadedPhoto] = useState('')

  const classNames = useMemo(() => {
    const classNameArr = className ? [className] : []
    
    if (bordered) {
      classNameArr.push('user-avatar--bordered')
    }

    if (disabled) {
      classNameArr.push('user-avatar--disabled')
    }

    return classNameArr.join(' ')
  }, [bordered, className, disabled])

  useEffect(() => {
    async function loadPhoto() {
      const importedImage = await import(`@/assets/images/pixelarts/${selectedAvatar}.jpg`)

      setLoadedPhoto(importedImage.default)
    }

    loadPhoto()
  }, [selectedAvatar])

  return (
    <StyledImgContainer
      $size={size}
      className={classNames}
    >
      {
        loadedPhoto && (
          <img
            src={loadedPhoto}
          />
        )
      }
    </StyledImgContainer>
  )
}