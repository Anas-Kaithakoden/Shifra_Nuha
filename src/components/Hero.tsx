import { ButtonAnchor } from './Button'
import { WhatsAppButton } from './CtaButtons'
import { IconCheck } from './icons'
import { hero } from '../content/site'
import { ui } from '../content/ui'

/**
 * ---------------------------------------------------------------------------
 * HERO
 * ---------------------------------------------------------------------------
 * The first screen, and the only section with a fixed job order. It has to
 * answer three questions in the time it takes to read one line: what does this
 * company do, is it for a business like mine, and how do I start.
 *
 * So it carries, in order: what this is, the headline naming the three pillars,
 * one paragraph, the primary WhatsApp button with an in-page anchor beside it,
 * and a short set of commitments. That is all. The full service list moved to
 * the grid below, where it cannot push the WhatsApp button below the fold on a
 * phone — which is the one thing this section is not allowed to do.
 *
 * THERE IS NO PRICE HERE, and that is a decision rather than an omission. The
 * work is quoted per engagement once the facts are known. A headline figure on
 * a hero is a number we would have to defend in a message at eleven at night,
 * and the visitors who can compare it are exactly the ones who then argue about
 * what was included.
 *
 * The secondary action is an anchor to the service grid rather than a route.
 * Someone who is still deciding between services should be able to read the
 * whole list without changing page, and there is no second page to build.
 */
export function Hero() {
  return (
    <section className="border-b border-paper-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.16em] text-brand-700 uppercase">
            {hero.eyebrow}
          </p>

          <h1 className="mt-4 text-[2rem] leading-[1.12] font-semibold tracking-tight text-balance text-ink-950 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            {hero.heading}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-ink-600 sm:text-lg">
            {hero.supporting}
          </p>

          {/*
            WhatsApp first and full width on a phone, because that is where the
            traffic lands. The anchor sits beside it from `sm` up and reads as the
            quieter of the two — it is a way of finding out more, not a way of
            committing.
          */}
          <div className="mt-8 flex w-full flex-col gap-3 sm:max-w-md sm:flex-row">
            <WhatsAppButton place="hero" size="lg" variant="whatsapp" className="w-full" />
            <ButtonAnchor href="#services" variant="secondary" size="lg" className="w-full">
              {ui['cta.exploreServices']}
            </ButtonAnchor>
          </div>

          {/*
            What the business can honestly commit to before anything has been
            measured: how the work is arranged, not what it has achieved. No
            ratings, no client counts, no years — none of those have been
            verified, and this is exactly the audience that checks.
          */}
          <ul className="mt-10 flex flex-col gap-2.5 border-t border-paper-200 pt-6 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2.5">
            {hero.points.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-ink-600 sm:items-center">
                <IconCheck width={16} height={16} className="mt-0.5 shrink-0 text-brand-600 sm:mt-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}