import { useMemo } from 'react'

import type { Socket } from 'socket.io-client'

import { calculateEllipseEquidistantPointsCoordinates } from '../../../../../utils/calc'
import { StyledTable, StyledTableContainer } from './styles'

import { useRoom } from '../../../../../hooks/useRoom'
import { UserAvatar } from './components/UserAvatar'

export function RoomTable() {
  const roomContext = useRoom()

  const tableDimensions = {
    width: 820,
    height: 440,
  }

  const positionedUsers = useMemo(
    () => {
      if (!roomContext.socket) {
        return []
      }

      // generate user coordinates
      let usersArr = Object.values(roomContext.roomData?.users ?? {})

      let coordinatesArr = calculateEllipseEquidistantPointsCoordinates(
        tableDimensions.width + 70,
        tableDimensions.height + 70,
        usersArr.length,
        270,
      )

      // remove current user from calculations
      usersArr = usersArr.filter(item => item._id !== (roomContext.socket as Socket).id)
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
    [roomContext.roomData?.users, roomContext.socket, tableDimensions.height, tableDimensions.width],
  )

  const votingStory = useMemo(() => {
    if (!roomContext.roomData || !roomContext.socket?.id) {
      return undefined
    }

    const activeStory = Object.values(roomContext.roomData.stories).find(storyData => storyData.votingStatus === 'in_progress')

    return activeStory
  }, [roomContext.roomData, roomContext.socket?.id])

  return roomContext.roomData
    ? (
      <StyledTableContainer>
        <StyledTable>
          {
            positionedUsers
              .map(positionedUser => <UserAvatar
                key={positionedUser.user._id}
                user={positionedUser.user}
                coordinates={positionedUser.coordinates}
                disabled={!!votingStory && positionedUser.user._id in votingStory.votes}
              />)
          }
        </StyledTable>
      </StyledTableContainer>
    )
    : null
}