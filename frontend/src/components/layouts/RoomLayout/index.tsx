import { useMemo, type ReactNode } from 'react'

import { LayoutGroup } from 'motion/react'

import { useAppSelector } from '@/app/storeHooks'

import { Sidebar } from '@/features/sidebar/components/Sidebar'
import { NotificationSnackbar } from '@/features/notifications/components/NotificationSnackbar'

import { useElementDimensions } from '@/hooks/useElementDimensions'

import { StyledMain, StyledSection } from './style'

interface RoomLayoutProps {
  children: ReactNode

  sidebarContent: ReactNode
  sidebarTitle: string
}

export function RoomLayout({ children, sidebarContent, sidebarTitle }: RoomLayoutProps) {
  const sidebarIsOpen = useAppSelector(state => state.sidebar.open)

  const windowDimensions = useElementDimensions()

  const finalSectionWidth = useMemo(() => {
    if (windowDimensions && windowDimensions.width <= 960) {
      return '100%'
    }

    return sidebarIsOpen ? 'calc(100% - 500px)' : '100%'
  }, [sidebarIsOpen, windowDimensions])

  return (
    <StyledMain>
      <LayoutGroup>
        <StyledSection
          initial={{
            width: '100%',
          }}
          animate={{
            width: finalSectionWidth,
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