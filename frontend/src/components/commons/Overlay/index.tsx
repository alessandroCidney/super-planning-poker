import { useEffect, useRef, useState, type ReactNode } from 'react'

import { AnimatePresence } from 'motion/react'
import { BsX } from 'react-icons/bs'

import { StyledCloseButton, StyledOverlay } from './styles'

interface OverlayProps {
  value: boolean
  setValue: (newValue: boolean) => void
  
  children: ReactNode
}

export function Overlay({ children, value, setValue }: OverlayProps) {
  const [focused, setFocused] = useState(false)

  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value && !focused) {
      overlayRef.current?.focus()
      setFocused(true)
    }

    if (!value) {
      setFocused(false)
    }
  }, [value, focused])

  return (
    <AnimatePresence>
      {
        value && (
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
            onClick={() => setValue(false)}
          >
            { children }

            <StyledCloseButton
              color='transparent'
              hoverColor='rgb(255, 255, 255, .1)'
              icon
              onClick={(e) => {
                e.stopPropagation()
                setValue(false)
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