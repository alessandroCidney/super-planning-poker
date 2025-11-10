import { DefaultButton } from '../../../../commons/DefaultButton'

import { useRoom } from '../../../../../hooks/useRoom'

import { StyledHeader } from './styles'

export function RoomHeader() {
  const { leaveRoom, roomData } = useRoom()

  return (
    <StyledHeader>
      <h1>
        Online Planning Poker
      </h1>

      {
        !!roomData && (
          <nav>
            <DefaultButton
              minWidth='150px'
              color='#d9d9d9'
              hoverColor='#ccc'
              onClick={leaveRoom}
            >
              Sair
            </DefaultButton>
          </nav>
        )
      }
    </StyledHeader>
  )
}