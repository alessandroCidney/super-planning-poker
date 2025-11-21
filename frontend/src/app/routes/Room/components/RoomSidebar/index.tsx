import { useState } from 'react'

import { DefaultButton } from '@/components/commons/DefaultButton'

import * as roomSlice from '@/features/room/roomSlice'

import { UsCard } from './components/UsCard'
import { UsForm } from './components/UsForm'

import { StyledUsList, StyledContentContainer, StyledContentActions } from './styles'
import { useRedux } from '@/hooks/useRedux'

export function RoomSidebar() {
  const { useAppDispatch, useAppSelector } = useRedux()

  const dispatch = useAppDispatch()

  const roomSelector = useAppSelector(state => state.room)

  const [showForm, setShowForm] = useState(false)

  console.log('render RoomSidebar')

  function createStory(title: string) {
    dispatch(roomSlice.createStory({ title }))

    setShowForm(false)
  }

  async function removeStory(storyId: string) {
    dispatch(roomSlice.removeStory({ storyId }))
  }

  async function startVoting(storyId: string) {
    dispatch(roomSlice.startVoting({ storyId }))
  }

  async function concludeVoting(storyId: string) {
    dispatch(roomSlice.concludeVoting({ storyId }))
  }

  async function restartVoting(storyId: string) {
    dispatch(roomSlice.restartVoting({ storyId }))
  }

  return (
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
          Object.values(roomSelector.currentRoom?.stories ?? {}).map(storyData => (
            <UsCard
              key={storyData._id}
              storyData={storyData}
              removeStory={removeStory}
              startVoting={startVoting}
              concludeVoting={concludeVoting}
              restartVoting={restartVoting}
            />
          ))
        }
      </StyledUsList>
    </StyledContentContainer>
  )
}