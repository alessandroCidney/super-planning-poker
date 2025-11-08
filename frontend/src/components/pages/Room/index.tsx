import { useEffect } from 'react'
import { useParams } from 'react-router'

import { AppButton } from '../../commons/AppButton'

import { useRoom } from '../../../hooks/useRoom'

import { StyledAside, StyledMain, StyledSection, StyledCard } from './styles'

// https://react.dev/learn/you-might-not-need-an-effect#initializing-the-application
let loadedOnce = false

export function Room() {
  const { joinRoom, roomData, socket } = useRoom()

  const { roomId } = useParams()

  const exampleCards = [
    {
      title: 'Criar novo botão',
      description: 'Eu, como usuário, gostaria de que houvesse um novo botão bolado.',
    },
  ]

  console.log('render room page')

  useEffect(() => {
    console.log('room use effect', 'roomData:', !!roomData, 'roomId:', roomId, 'loadedOnce:',loadedOnce)

    if (!roomData && roomId && !loadedOnce) {
      console.log('not connected')
      joinRoom(roomId, { name: 'Test Username' })
    } else {
      console.log('already connected')
    }

    if (!loadedOnce) {
      loadedOnce = true
    }
  }, [joinRoom, roomId, roomData])

  return (
    <StyledMain>
      <StyledSection>
        <h1>
          Connected as {socket?.id || 'None'}
        </h1>

        <pre>{JSON.stringify(roomData, null, 2)}</pre>
      </StyledSection>

      <StyledAside>
        <header>
          <h2>
            Fila de USs
          </h2>

          <AppButton
          >
            Criar nova
          </AppButton>
        </header>

        <div>
          {
            exampleCards.map((cardData, cardDataIndex) => (
              <StyledCard
                key={`cardData${cardDataIndex}`}
              >
                <header>
                  <h3>
                    { cardData.title }
                  </h3>
                </header>

                <p>
                  { cardData.description }
                </p>
              </StyledCard>
            ))
          }
        </div>
      </StyledAside>
    </StyledMain>
  )
}
