import type { ReactNode } from 'react'

import { NotificationSnackbar } from '@/features/notifications/NotificationSnackbar'

import { StyledMain } from './styles'

interface HomeLayoutProps {
  children: ReactNode
}

export function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <StyledMain>
      { children }

      <NotificationSnackbar />
    </StyledMain>
  )
}