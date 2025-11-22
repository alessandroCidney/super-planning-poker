export function waitFor(conditionFn: () => boolean) {
  return new Promise<void>((resolve) => {
    if (conditionFn()) {
      return resolve()
    }

    setTimeout(async () => {
      await waitFor(conditionFn)

      resolve()
    }, 1000)
  })
}

export const debounce = (callback: (...rest: unknown[]) => unknown | void, wait: number) => {
  let timeoutId: number | null = null

  return (...args: unknown[]) => {
    if (timeoutId) {
      window.clearTimeout(timeoutId)
    }
 
    timeoutId = window.setTimeout(() => {
      callback(...args)
    }, wait)
  }
}
