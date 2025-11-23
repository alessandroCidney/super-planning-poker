import { useMemo, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/storeHooks'

import { DefaultButton } from '@/components/commons/DefaultButton'

import * as roomSlice from '@/features/room/roomSlice'

import type { Story } from '@/types/stories'

import { UsCard } from './components/UsCard'
import { UsForm } from './components/UsForm'

import { StyledUsList, StyledContentContainer, StyledContentActions } from './styles'

export function RoomSidebar() {
  const dispatch = useAppDispatch()

  const roomSelector = useAppSelector(state => state.room)

  const [showForm, setShowForm] = useState(false)

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

  const orderedStoriesList = useMemo(() => {
    const originalList = Object.values(roomSelector.currentRoom?.stories ?? {})

    const notStartedArr = originalList.filter(item => item.votingStatus === 'not_started')
    const inProgressArr = originalList.filter(item => item.votingStatus === 'in_progress')
    const concludedArr = originalList.filter(item => item.votingStatus === 'concluded')

    function orderByCreatedAt(arr: Story[]) {
      return arr.sort((a, b) => {
        return b.createdAt - a.createdAt
      })
    }

    return [
      ...orderByCreatedAt(inProgressArr),
      ...orderByCreatedAt(notStartedArr),
      ...orderByCreatedAt(concludedArr),
    ]
  }, [roomSelector.currentRoom?.stories])

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
          orderedStoriesList.map(storyData => (
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