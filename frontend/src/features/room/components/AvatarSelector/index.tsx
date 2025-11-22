import { useMemo, useState } from 'react'

import { AnimatePresence } from 'motion/react'
import { BsArrowLeft, BsArrowRight, BsX } from 'react-icons/bs'

import { useAppDispatch, useAppSelector } from '@/app/storeHooks'

import * as roomSlice from '@/features/room/roomSlice'

import { DefaultButton } from '@/components/commons/DefaultButton'

import { useElementDimensions } from '@/hooks/useElementDimensions'

import { UserAvatar } from '../UserAvatar'

import { useAvatars } from '../../hooks/useAvatars'

import { StyledAvatarButton, StyledCardContainer, StyledCornerActions, StyledCardImage, StyledCardsList, StyledOverlay, StyledCloseButton } from './style'

export function AvatarSelector() {
  const dispatch = useAppDispatch()

  const showAvatarSelector = useAppSelector(state => state.room.showAvatarSelector)
  const currentUserAvatar = useAppSelector(state => state.room.currentRoom?.users[state.room.socketId ?? ''].avatar)

  const windowDimensions = useElementDimensions()

  const { avatarsArr } = useAvatars()

  const [selectedIndex, setSelectedIndex] = useState(avatarsArr.findIndex(imageData => imageData.imageId === currentUserAvatar?.path))

  const cardImageDimensions = useMemo(() => {
    const baseDimensions = {
      width: 350,
      height: 450,
    }

    const baseAspectRatio = baseDimensions.width / baseDimensions.height

    if (windowDimensions && baseDimensions.height >= 0.4 * windowDimensions.height) {
      return {
        height: windowDimensions.height * 0.4,
        width: windowDimensions.height * 0.4 * baseAspectRatio,
      }
    }

    return baseDimensions
  }, [windowDimensions])

  const positionedImages = useMemo(() => {
    const translateStep = cardImageDimensions.width + 100

    return avatarsArr.map((imageData, imageOriginalIndex) => ({
      ...imageData,
      translateX: (imageOriginalIndex - selectedIndex) * translateStep,
      originalIndex: imageOriginalIndex,
      selected: imageOriginalIndex === selectedIndex,
    }))
  }, [avatarsArr, cardImageDimensions.width, selectedIndex])

  function incrementIndex() {
    if (selectedIndex + 1 < positionedImages.length) {
      setSelectedIndex(selectedIndex + 1)
    }
  }

  function decrementIndex() {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  function setIndex(originalImageIndex: number) {
    setSelectedIndex(originalImageIndex)
  }

  function selectAvatar(imageId: string) {
    dispatch(roomSlice.updateAvatar({
      avatar: {
        path: imageId,
        type: 'internal_photo',
      },
    }))

    dispatch(roomSlice.toggleAvatarSelector())
  }

  return (
    <div>
      <StyledAvatarButton
        onClick={() => dispatch(roomSlice.toggleAvatarSelector())}
      >
        <UserAvatar />
      </StyledAvatarButton>

      <AnimatePresence>
        {
          showAvatarSelector && (
            <StyledOverlay
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            >
              <StyledCardsList>
                {
                  positionedImages.map((imageData) => (
                    <StyledCardContainer
                      key={imageData.imagePath}
                      $width={cardImageDimensions.width}
                      animate={{ x: imageData.translateX, scale: imageData.selected ? 1.3 : 1 }}
                      whileHover={{ scale: imageData.selected ? 1.3 : 1.1 }}
                      layout
                    >
                      <StyledCardImage
                        className={imageData.selected ? 'card-image--selected' : ''}
                        $width={cardImageDimensions.width}
                        $imageUrl={imageData.imagePath}
                        onClick={() => setIndex(imageData.originalIndex)}
                      />

                      {
                        imageData.selected && (
                          <DefaultButton
                            block
                            onClick={() => selectAvatar(imageData.imageId)}
                          >
                            Selecionar avatar
                          </DefaultButton>
                        )
                      }
                    </StyledCardContainer>
                  ))
                }
              </StyledCardsList>

              <StyledCornerActions>
                <DefaultButton
                  color='transparent'
                  hoverColor='rgb(255, 255, 255, .1)'
                  icon
                  onClick={decrementIndex}
                >
                  <BsArrowLeft size={25} />
                </DefaultButton>

                <DefaultButton
                  color='transparent'
                  hoverColor='rgb(255, 255, 255, .1)'
                  icon
                  onClick={incrementIndex}
                >
                  <BsArrowRight size={25} />
                </DefaultButton>
              </StyledCornerActions>

              <StyledCloseButton
                color='transparent'
                hoverColor='rgb(255, 255, 255, .1)'
                icon
                onClick={() => dispatch(roomSlice.toggleAvatarSelector())}
              >
                <BsX size={25} />
              </StyledCloseButton>
            </StyledOverlay>
          )
        }
      </AnimatePresence>
    </div>
  )
}