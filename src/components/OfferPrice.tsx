import { registrationOffer } from '../content/offer'

/**
 * ---------------------------------------------------------------------------
 * THE PRICE
 * ---------------------------------------------------------------------------
 * The single most important piece of type on the site, and the reason somebody
 * who clicked a Facebook ad stays on the page. Three rules govern it:
 *
 *  1. The figure is large, but not enormous. It is a professional firm's price,
 *     not a discount poster, and the brief asks for a site that does not look
 *     like a cheap offers page.
 *  2. "+ applicable charges" is a sibling of the number, never a footnote and
 *     never omitted. A starting price without it is misleading, and the whole
 *     point of showing the price is to be trusted.
 *  3. The small print sits directly underneath the price, at reading size.
 *
 * `size="hero"` is for the first screen; `size="inline"` is the same thing
 * quieter, for the closing CTA and the service pages.
 */
export function OfferPrice({
  size = 'hero',
  className = '',
}: {
  size?: 'hero' | 'inline'
  className?: string
}) {
  const hero = size === 'hero'

  return (
    <div className={className}>
      <p
        className={`text-xs font-semibold tracking-[0.16em] text-brand-700 uppercase ${
          hero ? '' : 'sr-only sm:not-sr-only'
        }`}
      >
        {registrationOffer.label}
      </p>

      {/*
        `text-left` for the same reason the buttons carry it: a price is a
        label, not prose, and at `text-[2.75rem]` this line wraps on a phone.
        Inheriting the justified body alignment stretched the first line.
      */}
      <p
        className={`mt-2 text-left font-semibold tracking-tight text-ink-950 text-balance ${
          hero ? 'text-[2.75rem] leading-[1.05] sm:text-5xl' : 'text-3xl leading-tight sm:text-4xl'
        }`}
      >
        {registrationOffer.priceFrom}{' '}
        <span className="text-ink-500">{registrationOffer.qualifier}</span>
      </p>

      <p className="mt-3 max-w-md text-xs leading-relaxed text-ink-500">{registrationOffer.note}</p>
    </div>
  )
}
