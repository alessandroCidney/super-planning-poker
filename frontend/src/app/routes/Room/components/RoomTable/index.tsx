import { useMemo, useRef } from 'react'

import { useAppSelector } from '@/app/storeHooks'

import { useElementDimensions } from '@/hooks/useElementDimensions'

import { calculateEllipseEquidistantPointsCoordinates } from '@/utils/calc'

import { UserAvatar } from './components/UserAvatar'
import { StackOfCards } from './components/StackOfCards'

import { StyledTable, StyledTableContainer } from './styles'

export function RoomTable() {
  const roomSelector = useAppSelector(state => state.room)

  const styledTableContainerRef = useRef<HTMLDivElement>(null)

  const tableContainerDimensions = useElementDimensions(styledTableContainerRef)

  const tableDimensions = useMemo(() => {
    const baseTableDimensions = {
      width: 820,
      height: 440,
    }

    const baseAspectRatio = baseTableDimensions.width / baseTableDimensions.height
    
    if (tableContainerDimensions) {
      const enableResize = baseTableDimensions.width > 0.8 * tableContainerDimensions.width
        || baseTableDimensions.height > 0.8 * tableContainerDimensions.height

      if (enableResize && tableContainerDimensions.width / baseAspectRatio <= tableContainerDimensions.height) {
        return {
          width: tableContainerDimensions.width * 0.8,
          height: tableContainerDimensions.width * 0.8 / baseAspectRatio,
        }
      } else if (enableResize) {
        return {
          width: tableContainerDimensions.height * 0.8 * baseAspectRatio,
          height: tableContainerDimensions.height * 0.8,
        }
      }
    }

    return baseTableDimensions
  }, [tableContainerDimensions])

  const positionedUsers = useMemo(
    () => {
      if (!roomSelector.socketId) {
        return []
      }

      // generate user coordinates
      let usersArr = Object.values(roomSelector.currentRoom?.users ?? {})

      let coordinatesArr = calculateEllipseEquidistantPointsCoordinates(
        tableDimensions.width + 70,
        tableDimensions.height + 70,
        usersArr.length,
        270,
      )

      // remove current user from calculations
      usersArr = usersArr.filter(item => item._id !== roomSelector.socketId)
      coordinatesArr = coordinatesArr.filter(item => item.degree !== 270)

      if (usersArr.length !== coordinatesArr.length) {
        throw new Error('User position calculation error')
      }

      // generate final array
      const usersWithCoordinates = usersArr.map((userData, userIndex) => ({
        user: userData,
        coordinates: coordinatesArr[userIndex],
      }))

      return usersWithCoordinates
    },
    [roomSelector.currentRoom?.users, roomSelector.socketId, tableDimensions.height, tableDimensions.width],
  )

  const votingStory = useMemo(() => {
    if (!roomSelector.currentRoom || !roomSelector.socketId) {
      return undefined
    }

    const activeStory = Object.values(roomSelector.currentRoom.stories).find(storyData => storyData.votingStatus === 'in_progress')

    return activeStory
  }, [roomSelector.currentRoom, roomSelector.socketId])

  return roomSelector.currentRoom
    ? (
      <StyledTableContainer
        ref={styledTableContainerRef}
      >
        <StyledTable
          $width={tableDimensions.width}
          $height={tableDimensions.height}
        >
          {
            positionedUsers
              .map(positionedUser => (
                <UserAvatar
                  key={positionedUser.user._id}
                  user={positionedUser.user}
                  coordinates={positionedUser.coordinates}
                  disabled={!!votingStory && positionedUser.user._id in votingStory.votes}
                />
              ))
          }

          {
            votingStory?.votes && (
              <StackOfCards
                votingStory={votingStory}
              />
            )
          }
        </StyledTable>
      </StyledTableContainer>
    )
    : null
}