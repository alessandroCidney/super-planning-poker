import type { EllipseCoordinate } from '../../../../../../../utils/calc'

import type { User } from '../../../../../../../types/users'

import { StyledUserContainer, StyledUserName } from './styles'

interface UserAvatarProps {
  user: User
  coordinates: EllipseCoordinate
}

export function UserAvatar({ user, coordinates }: UserAvatarProps) {
  return (
    <StyledUserContainer
      $translateX={coordinates.x}
      $translateY={coordinates.y * -1}
    >
      <StyledUserName>
        { user.name }
      </StyledUserName>
    </StyledUserContainer>
  )
}