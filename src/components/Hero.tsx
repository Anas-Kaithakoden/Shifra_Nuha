import { CtaPair } from './CtaButtons'
import { OfferCard } from './OfferCard'
import { IconCheck } from './icons'
import { hero } from '../content/site'

/**
 * ---------------------------------------------------------------------------
 * HERO
 * ---------------------------------------------------------------------------
 * The most important section on the site, and the only one with a fixed job
 * order. A visitor who arrived from a Facebook ad has to be able to answer four
 * questions in about five seconds: what does this company do, how much does it
 * start at, can I trust it, and how do I contact them.
 *
 * The order below is that sequence, and it is also the order the brief asks
 * for — eyebrow, headline, price, supporting line, buttons, trust points.
 *
 * On a 375px screen the price sits between the headline and the supporting
 * paragraph, so the figure is on screen before the visitor has scrolled at all.
 * Everything after the buttons is secondary and is allowed to fall below the
 * fold.
 *
 * There is no illustration, no gradient, no glow and no secondary call to
 * action. The brief asks for the offer to be understood in three to five
 * seconds, and every extra element above the fold costs a fraction of one.
 */
export function Hero() {
  return (
    <section className="border-b border-paper-200 bg-paper-50">
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14 lg:py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.16em] text-brand-700 uppercase">
            {hero.eyebrow}
          </p>

          <h1 className="mt-4 text-[2rem] leading-[1.12] font-semibold tracking-tight text-balance text-ink-950 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
            {hero.heading}
          </h1>

          {/*
            The offer goes here, directly under the headline and above the
            supporting line. It is the reason the ad was clicked, so it is what
            gets read first, and putting it here rather than below the
            supporting paragraph is what keeps the figure on screen at 320px
            without having to shorten the headline to do it.
          */}
          <OfferCard className="mt-6 sm:mt-8 sm:max-w-md" />

          <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-ink-600 sm:text-lg">
            {hero.supporting}
          </p>

          <div className="mt-7 sm:mt-8">
            <CtaPair
              place="hero"
              whatsappVariant="whatsapp"
              callVariant="secondary"
              size="lg"
            />
          </div>

          {/* Why the price is believable. Checkmarks rather than a rating. */}
          <ul className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2.5">
            {hero.trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm text-ink-600">
                <IconCheck width={16} height={16} className="shrink-0 text-brand-600" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
