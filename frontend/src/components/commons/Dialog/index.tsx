import type { ReactNode } from 'react'

import { BsX } from 'react-icons/bs'

import { DefaultButton } from '../DefaultButton'
import { Overlay } from '../Overlay'

import { StyledDialog } from './styles'

interface DialogProps {
  value: boolean
  setValue: (newValue: boolean) => void

  children: ReactNode
  actions?: ReactNode
  
  title: string
}

export function Dialog({ value, setValue, children, actions, title }: DialogProps) {
  return (
    <Overlay
      value={value}
      setValue={setValue}
    >
      <StyledDialog
        role='dialog'
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <header>
          <h2>
            { title }
          </h2>

          <DefaultButton
            color='transparent'
            hoverColor='rgb(0, 0, 0, .1)'
            textHoverColor='black'
            textColor='black'
            icon
            onClick={() => setValue(false)}
          >
            <BsX size={30} />
          </DefaultButton>
        </header>

        <section>
          <div className='dialog__content'>
            { children }
          </div>

          {
            actions && (
              <div className='dialog__actions'>
                { actions }
              </div>
            )
          }
        </section>
      </StyledDialog>
    </Overlay>
  )
}