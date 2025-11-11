import { useMemo } from 'react'

import { calculateEllipseEquidistantPointsCoordinates } from '../../../../../utils/calc'
import { StyledTable, StyledTableContainer } from './styles'

import { useRoom } from '../../../../../hooks/useRoom'
import { UserAvatar } from './components/UserAvatar'

export function RoomTable() {
  const { roomData, socket } = useRoom()

  const tableDimensions = {
    width: 820,
    height: 440,
  }

  const positionedUsers = useMemo(
    () => {
      if (!socket) {
        return []
      }

      // generate user coordinates
      let usersArr = Object.values(roomData?.users ?? {})

      let coordinatesArr = calculateEllipseEquidistantPointsCoordinates(
        tableDimensions.width + 70,
        tableDimensions.height + 70,
        usersArr.length,
        270,
      )

      // remove current user from calculations
      usersArr = usersArr.filter(item => item._id !== socket.id)
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
    [roomData?.users, socket, tableDimensions.height, tableDimensions.width],
  )

  return roomData
    ? (
      <StyledTableContainer>
        <StyledTable>
          {
            positionedUsers
              .map(positionedUser => <UserAvatar
                key={positionedUser.user._id}
                user={positionedUser.user}
                coordinates={positionedUser.coordinates}
              />)
          }
        </StyledTable>
      </StyledTableContainer>
    )
    : null
}