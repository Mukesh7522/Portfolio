import { useEffect, useRef } from 'react'

export function useThreePerformance() {
  const pausedRef = useRef(false)

  useEffect(() => {
    const onViz = () => { pausedRef.current = document.hidden }
    document.addEventListener('visibilitychange', onViz)
    return () => document.removeEventListener('visibilitychange', onViz)
  }, [])

  const pixelRatio =
    typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.5) : 1

  return { pausedRef, pixelRatio }
}
