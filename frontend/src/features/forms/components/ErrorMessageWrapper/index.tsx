import type { ReactNode } from 'react'
import { StyledFormErrorMessage } from './styles'

interface ErrorMessageWrapperProps {
  children: ReactNode

  errorMessage?: string
}

export function ErrorMessageWrapper({ children, errorMessage }: ErrorMessageWrapperProps) {
  return (
    <div>
      { children }

      {
        errorMessage && (
          <StyledFormErrorMessage
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            { errorMessage }
          </StyledFormErrorMessage>
        )
      }
    </div>
  )
}