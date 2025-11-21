import { useMemo } from 'react'

import { useRedux } from '@/hooks/useRedux'

import { calculateEllipseEquidistantPointsCoordinates } from '@/utils/calc'

import { UserAvatar } from './components/UserAvatar'
import { StackOfCards } from './components/StackOfCards'

import { StyledTable, StyledTableContainer } from './styles'

export function RoomTable() {
  const { useAppSelector } = useRedux()

  const roomSelector = useAppSelector(state => state.room)

  const tableDimensions = {
    width: 820,
    height: 440,
  }

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
      <StyledTableContainer>
        <StyledTable>
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