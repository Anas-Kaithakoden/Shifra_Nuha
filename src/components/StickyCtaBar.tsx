import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { serviceByPath } from '../content/services'
import { CtaPair } from './CtaButtons'

/**
 * ---------------------------------------------------------------------------
 * STICKY CTA BAR — small screens only
 * ---------------------------------------------------------------------------
 * The traffic this site exists for is on a phone, mid-scroll, probably from an
 * ad. A bar pinned to the bottom keeps the two things that matter — WhatsApp and
 * Call — within thumb reach, so a visitor who has decided to act never has to
 * scroll back up to find the button they already passed.
 *
 * It stays out of the way until it is worth appearing:
 *  - Hidden from `md` up, where the header already carries a permanent WhatsApp
 *    button and a pinned bar would be clutter.
 *  - Hidden until the visitor has scrolled past the hero, so the first screen
 *    has one obvious call to action rather than two competing ones.
 *  - Remounted away on route change, so a new page starts clean.
 *  - `invisible` rather than unmounted, which keeps its height reserved and
 *    stops the page jumping as it appears.
 *
 * Solid white, no blur: a translucent bar over a scrolling page costs contrast
 * on the button label, which is the one thing on this site that must stay
 * readable at a glance.
 *
 * The WhatsApp button follows the page it is pinned to. On a service page it
 * carries that service's message, so a visitor who has read down the LLP page
 * and tapped the bar arrives in the chat already saying so; everywhere else it
 * falls back to the site-wide default.
 */
export function StickyCtaBar() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320)
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
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-paper-200 bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-opacity duration-150 md:hidden ${
        visible ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      <CtaPair
        place="sticky-bar"
        message={serviceByPath[pathname]?.whatsapp}
        size="md"
        whatsappVariant="whatsapp"
        callVariant="secondary"
        stack={false}
        className="mx-auto max-w-6xl"
      />
    </div>
  )
}
