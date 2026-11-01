import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * ---------------------------------------------------------------------------
 * REDUCED MOTION
 * ---------------------------------------------------------------------------
 * Read synchronously during the first render, so a reduced-motion visitor never
 * sees a scroll animation start and then get reverted. The site is a
 * client-rendered SPA, so the browser can always answer immediately.
 *
 * Components use it to choose a plain, fully readable layout rather than trying
 * to run a scroll-driven sequence with zero motion. CSS animations are also
 * disabled by the global media query in `index.css`.
 */
export function useReducedMotion(): boolean {
  // Read the preference during the first render rather than after mount. This
  // is a client-rendered SPA, so the server never owns the DOM; initialising
  // synchronously means a reduced-motion visitor never sees an animation start
  // (and then get reverted) on the first frame.
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  )

  useEffect(() => {
    const media = window.matchMedia(QUERY)
    const update = () => setReduced(media.matches)
    update()

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', update)
      return () => media.removeEventListener('change', update)
    }

    // Safari below 14 exposes the deprecated listener API.
    media.addListener(update)
    return () => media.removeListener(update)
  }, [])

  return reduced
}
