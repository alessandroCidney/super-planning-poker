import type { ReactNode } from 'react'

import { BsX } from 'react-icons/bs'

import { useAppDispatch, useAppSelector } from '@/app/storeHooks'

import { DefaultButton } from '@/components/commons/DefaultButton'

import * as sidebarSlice from '../../sidebarSlice'

import { StyledAside } from './styles'

interface SidebarProps {
  children: ReactNode

  title: string
}

export function Sidebar({ children, title }: SidebarProps) {
  const dispatch = useAppDispatch()

  const sidebarIsOpen = useAppSelector(state => state.sidebar.open)

  return (
    <StyledAside
      initial={{
        translateX: '500px',
      }}
      animate={{
        translateX: sidebarIsOpen ? '0px' : '500px',
      }}
      transition={{
        type: 'spring',
        bounce: 0,
        visualDuration: 0.25,
      }}
    >
      <header>
        <h2>
          { title }
        </h2>

        <DefaultButton
          icon
          onClick={() => dispatch(sidebarSlice.toggleSidebar())}
        >
          <BsX size={30} />
        </DefaultButton>
      </header>

      { children }
    </StyledAside>
  )
}