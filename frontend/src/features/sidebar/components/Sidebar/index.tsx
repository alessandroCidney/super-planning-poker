import React, { useEffect, useRef, type ReactNode } from 'react'

import { BsX } from 'react-icons/bs'

import { useAppDispatch, useAppSelector } from '@/app/storeHooks'

import { DefaultButton } from '@/components/commons/DefaultButton'

import { useElementDimensions } from '@/hooks/useElementDimensions'

import * as sidebarSlice from '../../sidebarSlice'

import { StyledAside } from './styles'

interface SidebarProps {
  children: ReactNode

  title: string
}

export function Sidebar({ children, title }: SidebarProps) {
  const dispatch = useAppDispatch()
  const sidebarIsOpen = useAppSelector(state => state.sidebar.open)

  const sidebarRef = useRef<HTMLElement>(null)

  const windowDimensions = useElementDimensions()

  const isMobile = windowDimensions && windowDimensions.width <= 960

  function handleBlur(event: React.FocusEvent) {
    if (isMobile && !event.currentTarget.contains(event.relatedTarget)) {
      dispatch(sidebarSlice.closeSidebar())
    }
  }

  useEffect(() => {
    if (isMobile && sidebarIsOpen) {
      // setTimeout prevents animation bug
      setTimeout(() => {
        sidebarRef.current?.focus()
      }, 1)
    }
  }, [isMobile, sidebarIsOpen])

  return (
    <StyledAside
      ref={sidebarRef}
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
      tabIndex={0}
      onBlur={handleBlur}
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