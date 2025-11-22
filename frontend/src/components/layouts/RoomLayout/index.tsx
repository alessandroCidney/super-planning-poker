import type { ReactNode } from 'react'

import { useAppSelector } from '@/app/storeHooks'

import { Sidebar } from '@/features/sidebar/components/Sidebar'
import { NotificationSnackbar } from '@/features/notifications/components/NotificationSnackbar'

import { StyledMain, StyledSection } from './style'
import { LayoutGroup } from 'motion/react'

interface RoomLayoutProps {
  children: ReactNode

  sidebarContent: ReactNode
  sidebarTitle: string
}

export function RoomLayout({ children, sidebarContent, sidebarTitle }: RoomLayoutProps) {
  const sidebarIsOpen = useAppSelector(state => state.sidebar.open)

  return (
    <StyledMain>
      <LayoutGroup>
        <StyledSection
          initial={{
            width: '100%',
          }}
          animate={{
            width: sidebarIsOpen ? 'calc(100% - 500px)' : '100%',
          }}
        >
          { children }
              
          <NotificationSnackbar />
        </StyledSection>

        <Sidebar
          title={sidebarTitle}
        >
          { sidebarContent }
        </Sidebar>
      </LayoutGroup>
    </StyledMain>
  )
}