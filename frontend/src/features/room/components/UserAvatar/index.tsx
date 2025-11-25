import { useEffect, useState } from 'react'

import { useAppSelector } from '@/app/storeHooks'

import { StyledImgContainer } from './style'

interface UserAvatarProps {
  imageId?: string
  size?: string
}

export function UserAvatar({ imageId, size }: UserAvatarProps) {
  const userAvatarPath = useAppSelector(state => state.room.currentRoom?.users[state.room.socketId ?? ''].avatar.path)

  const selectedAvatar = imageId ?? userAvatarPath

  const [loadedPhoto, setLoadedPhoto] = useState('')

  useEffect(() => {
    async function loadPhoto() {
      const importedImage = await import(`@/assets/images/pixelarts/${selectedAvatar}.png`)

      setLoadedPhoto(importedImage.default)
    }

    loadPhoto()
  }, [selectedAvatar])

  return (
    <StyledImgContainer
      $backgroundImage={loadedPhoto}
      $size={size}
    />
  )
}