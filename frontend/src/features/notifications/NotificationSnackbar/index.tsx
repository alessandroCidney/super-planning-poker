import { BsCheckCircleFill, BsX } from 'react-icons/bs'

import * as notificationsSlice from '@/features/notifications/notificationsSlice'

import { DefaultButton } from '@/components/commons/DefaultButton'

import { useRedux } from '@/hooks/useRedux'

import { FloatingActions, StyledFigure } from './styles'

export function NotificationSnackbar() {
  const { useAppSelector, useAppDispatch } = useRedux()

  const dispatch = useAppDispatch()
  
  const notificationsSelector = useAppSelector(state => state.notifications)

  return notificationsSelector.active
    ? (
      <StyledFigure>
        <div>
          <BsCheckCircleFill size={40} />
        </div>

        <div>
          <figcaption>
            { notificationsSelector.title }
          </figcaption>

          <p>
            { notificationsSelector.description }
          </p>
        </div>

        <FloatingActions>
          <DefaultButton
            iconSize='40px'
            icon
            onClick={() => dispatch(notificationsSlice.hideMessage())}
          >
            <BsX size={25} />
          </DefaultButton>
        </FloatingActions>
      </StyledFigure>
    )
    : null
}