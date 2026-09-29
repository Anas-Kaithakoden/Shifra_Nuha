import { WhatsAppButton } from './CtaButtons'
import { OfferPrice } from './OfferPrice'

/**
 * The offer, boxed. A single card on the page — the hero is the one place where
 * the price needs a container to separate it from the headline, and everywhere
 * else the same price sits on the page without one.
 *
 * The card is a 1px border on the warm paper surface with no shadow beyond a
 * single hairline. A larger shadow, a gradient edge or a glow would turn the
 * most important element on the site into the exact "AI-generated" look the
 * brief asks us to remove.
 */
export function OfferCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`rounded-xl border border-paper-300 bg-white p-6 shadow-xs sm:p-7 ${className}`}
    >
      <OfferPrice />
      <WhatsAppButton
        place="offer-card"
        size="lg"
        variant="whatsapp"
        className="mt-6 w-full"
      />
    </div>
  )
}
