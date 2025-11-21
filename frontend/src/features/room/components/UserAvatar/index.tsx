import { useEffect, useState } from 'react'

import { useAppSelector } from '@/app/storeHooks'

import { StyledImgContainer } from './style'

export function UserAvatar() {
  const userAvatarPath = useAppSelector(state => state.room.currentRoom?.users[state.room.socketId ?? ''].avatar.path)

  const [loadedPhoto, setLoadedPhoto] = useState('')

  useEffect(() => {
    async function loadPhoto() {
      const importedImage = await import(`@/assets/images/pixelarts/${userAvatarPath}.png`)

      setLoadedPhoto(importedImage.default)
    }

    loadPhoto()
  }, [userAvatarPath])

  return (
    <StyledImgContainer
      $backgroundImage={loadedPhoto}
    />
  )
}