import React, { useLayoutEffect, useState } from 'react'

// Get dimensions based on ref or window
export function useElementDimensions(ref?: React.RefObject<HTMLElement | null>) {
  const [dimensions, setDimensions] = useState<{ width: number, height: number }>()

  useLayoutEffect(() => {
    function handleResize() {
      if (ref?.current) {
        const newDimensions = ref.current.getBoundingClientRect()

        if (newDimensions) {
          setDimensions({
            width: newDimensions.width,
            height: newDimensions.height,
          })
        }
      } else {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
    }

    handleResize()

    if (ref?.current) {
      const observer = new ResizeObserver(handleResize)
      observer.observe(ref.current)

      return () => observer.disconnect()
    } else {
      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
    }
  }, [ref])

  return dimensions
}
