import { BsQuestion, BsX } from 'react-icons/bs'

import { useAppDispatch, useAppSelector } from '@/app/storeHooks'

import { Overlay } from '@/components/commons/Overlay'
import { DefaultButton } from '@/components/commons/DefaultButton'

import * as roomSlice from '@/features/room/roomSlice'

import { useVoting } from '../../hooks/useVoting'

import { StyledDialog, StyledDialogActions, StyledDialogContent, StyledDialogIcon, StyledDialogIconContainer, StyledFloatingActions } from './styles'
import { listToFormattedStr } from '@/utils/string'

export function VotingConcludedAlert() {
  const dispatch = useAppDispatch()
  const roomSelector = useAppSelector(state => state.room)

  const { votingResult } = useVoting(roomSelector.votingConcludedStory)

  return votingResult ?
    (
      <Overlay
        active={roomSelector.showVotingConcludedAlert}
        closeOverlay={() => dispatch(roomSlice.closeVotingConcludedAlert())}
      >
        <StyledDialog
          role='dialog'
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <StyledDialogIconContainer>
            <StyledDialogIcon>
              {
                votingResult.length > 1
                  ? (
                    <BsQuestion size={120} />
                  )
                  : (
                    <span>
                      { votingResult[0] }
                    </span>
                  )
              }
            </StyledDialogIcon>
          </StyledDialogIconContainer>

          <StyledDialogContent>
            <h2>
              Votação concluída
            </h2>

            <p>
              {
                votingResult.length > 1
                  ? `Houve a mesma quantidade de votos para os valores ${listToFormattedStr(votingResult.map(item => item.toString()))}.`
                  : `A votação foi concluída com o resultado ${votingResult[0]}`
              }
            </p>
          </StyledDialogContent>

          <StyledDialogActions>
            <DefaultButton
              onClick={() => dispatch(roomSlice.closeVotingConcludedAlert())}
            >
              Continuar
            </DefaultButton>
          </StyledDialogActions>

          <StyledFloatingActions
            onClick={() => dispatch(roomSlice.closeVotingConcludedAlert())}
          >
            <DefaultButton
              color='transparent'
              hoverColor='rgb(0, 0, 0, .1)'
              textHoverColor='black'
              textColor='black'
              icon
            >
              <BsX size={30} />
            </DefaultButton>
          </StyledFloatingActions>
        </StyledDialog>
      </Overlay>
    )
    : null
}