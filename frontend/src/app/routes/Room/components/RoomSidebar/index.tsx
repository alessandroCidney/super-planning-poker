import { useMemo, useState } from 'react'

import { useAppSelector } from '@/app/storeHooks'

import { DefaultButton } from '@/components/commons/DefaultButton'

import * as roomSlice from '@/features/room/roomSlice'
import { useWebSocketActions } from '@/features/websocket/hooks/useWebSocketActions'

import type { Story } from '@/types/stories'

import { UsCard } from './components/UsCard'
import { UsForm } from './components/UsForm'

import { StyledUsList, StyledContentContainer, StyledContentActions } from './styles'

export function RoomSidebar() {
  const roomSelector = useAppSelector(state => state.room)

  const isRoomOwner = !!roomSelector.currentRoom
    && !!roomSelector.socketId
    && roomSelector.currentRoom.ownerIds.includes(roomSelector.socketId)

  const webSocketActions = useWebSocketActions()

  const [showForm, setShowForm] = useState(false)

  async function createStory(title: string) {
    await webSocketActions.callActionAndWait(roomSlice.createStory, { title })

    setShowForm(false)
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
          disabled={showForm || !isRoomOwner}
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
            />
          ))
        }
      </StyledUsList>
    </StyledContentContainer>
  )
}