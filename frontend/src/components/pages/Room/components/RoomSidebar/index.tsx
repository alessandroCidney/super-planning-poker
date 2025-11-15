import { useState } from 'react'

import { DefaultButton } from '../../../../commons/DefaultButton'

import { UsCard } from './components/UsCard'
import { UsForm } from './components/UsForm'

import { useRoom } from '../../../../../hooks/useRoom'

import { StyledAside, StyledUsList, StyledContentContainer, StyledContentActions } from './styles'

export function RoomSidebar() {
  const roomContext = useRoom()

  const [showForm, setShowForm] = useState(false)

  console.log('render RoomSidebar')

  async function createStory(title: string) {
    await roomContext.createStory(title)

    setShowForm(false)
  }

  async function removeStory(storyId: string) {
    await roomContext.removeStory(storyId)
  }

  async function startVoting(storyId: string) {
    await roomContext.startVoting(storyId)
  }

  async function concludeVoting(storyId: string) {
    await roomContext.concludeVoting(storyId)
  }

  return (
    <StyledAside>
      <header>
        <h2>
          Tarefas
        </h2>
      </header>

      <StyledContentContainer>
        <StyledContentActions>
          <DefaultButton
            disabled={showForm}
            block
            onClick={() => setShowForm(true)}
          >
            Nova Tarefa
          </DefaultButton>
        </StyledContentActions>

        <StyledUsList>
          {
            showForm && (
              <UsForm
                onSubmit={createStory}
                onCancel={() => setShowForm(false)}
              />
            )
          }

          {
            Object.values(roomContext.roomData?.stories ?? {}).map(storyData => (
              <UsCard
                key={storyData._id}
                storyData={storyData}
                removeStory={removeStory}
                startVoting={startVoting}
                concludeVoting={concludeVoting}
              />
            ))
          }
        </StyledUsList>
      </StyledContentContainer>
    </StyledAside>
  )
}