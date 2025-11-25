import { useEffect, useRef, useState, type ReactNode } from 'react'

import { AnimatePresence } from 'motion/react'
import { BsX } from 'react-icons/bs'

import { StyledCloseButton, StyledOverlay } from './styles'

interface OverlayProps {
  active: boolean

  closeOverlay: () => void
  
  children: ReactNode
}

export function Overlay({ active, children, closeOverlay }: OverlayProps) {
  const [focused, setFocused] = useState(false)

  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (active && !focused) {
      overlayRef.current?.focus()
      setFocused(true)
    }

    if (!active) {
      setFocused(false)
    }
  }, [active, focused])

  return (
    <AnimatePresence>
      {
        active && (
          <StyledOverlay
            ref={overlayRef}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            tabIndex={0}
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