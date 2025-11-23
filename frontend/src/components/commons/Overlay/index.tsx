import type { ReactNode } from 'react'

import { AnimatePresence } from 'motion/react'
import { BsX } from 'react-icons/bs'

import { StyledCloseButton, StyledOverlay } from './styles'

interface OverlayProps {
  active: boolean

  closeOverlay: () => void
  
  children: ReactNode
}

export function Overlay({ active, children, closeOverlay }: OverlayProps) {
  return (
    <AnimatePresence>
      {
        active && (
          <StyledOverlay
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={closeOverlay}
          >
            { children }

            <StyledCloseButton
              color='transparent'
              hoverColor='rgb(255, 255, 255, .1)'
              icon
              onClick={(e) => {
                e.stopPropagation()
                closeOverlay()
              }}
            >
              <BsX size={25} />
            </StyledCloseButton>
          </StyledOverlay>
        )
      }
    </AnimatePresence>
  )
}