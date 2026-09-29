import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CtaPair } from './CtaButtons'

/**
 * ---------------------------------------------------------------------------
 * STICKY CTA BAR — small screens only
 * ---------------------------------------------------------------------------
 * The traffic this site exists for is on a phone, mid-scroll, probably from a
 * Malayalam ad. A bar pinned to the bottom means the two things that matter —
 * WhatsApp and Call — are always within thumb reach, without the visitor having
 * to find their way back to a button they have already scrolled past.
 *
 * It stays out of the way until it is worth appearing:
 *  - Hidden on anything `md` and up, where the header already carries a
 *    permanent WhatsApp button and a pinned bar would just be clutter.
 *  - Hidden until the visitor has scrolled past the hero, so the first screen
 *    still has one obvious call to action instead of two competing ones.
 *  - Remounted away on route change, so a new page starts clean.
 *  - `invisible` rather than unmounted, which keeps its height reserved and
 *    prevents the page jumping as it appears.
 */
export function StickyCtaBar() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 240)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // A new page is a new decision; do not carry the bar across the navigation.
  useEffect(() => {
    setVisible(false)
  }, [pathname])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink-200 bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden ${
        visible ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-3 opacity-0'
      } transition-[opacity,transform] duration-200`}
    >
      <CtaPair
        place="sticky-bar"
        size="md"
        whatsappVariant="whatsapp"
        callVariant="secondary"
        stack={false}
        className="mx-auto max-w-6xl"
      />
    </div>
  )
}
