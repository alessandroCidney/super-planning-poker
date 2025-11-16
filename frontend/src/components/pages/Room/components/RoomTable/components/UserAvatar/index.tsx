import type { EllipseCoordinate } from '../../../../../../../utils/calc'

import type { User } from '../../../../../../../types/users'

import { StyledUserContainer, StyledUserName } from './styles'

interface UserAvatarProps {
  user: User
  coordinates: EllipseCoordinate

  disabled: boolean
}

export function UserAvatar({ user, coordinates, disabled }: UserAvatarProps) {
  return (
    <StyledUserContainer
      $translateX={coordinates.x}
      $translateY={coordinates.y * -1}
      className={disabled ? 'user-avatar--disabled' : ''}
    >
      <StyledUserName>
        { user.name }
      </StyledUserName>
    </StyledUserContainer>
  )
}