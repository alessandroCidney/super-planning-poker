import { useCallback, useEffect, useState } from 'react'

import { StyledLoading, StyledLoadingIndicator } from './styles'

interface LinearLoadingProps {
  complete?: boolean
}

export function LinearLoading({ complete }: LinearLoadingProps) {
  const [progress, setProgress] = useState(0)

  const estimatedTime = 60 * 1000

  console.log('render loading')

  const startInterval = useCallback(() => {
    const intervalId = window.setInterval(() => {
      if (progress < 100 && progress % 10 === 0) {
        setProgress(progress + 10)
      } else {
        clearInterval(intervalId)
      }
    }, estimatedTime / 10)

    return intervalId
  }, [estimatedTime, progress])

  useEffect(() => {
    console.log('load use effect')

    const intervalId = startInterval()

    if (complete) {
      console.log('complete')

      clearInterval(intervalId)
      setProgress(100)
    }

    return () => {
      console.log('unmount')

      clearInterval(intervalId)
    }
  }, [complete, startInterval])

  return (
    <StyledLoading>
      <StyledLoadingIndicator
        $progress={progress}
      />
    </StyledLoading>
  )
}