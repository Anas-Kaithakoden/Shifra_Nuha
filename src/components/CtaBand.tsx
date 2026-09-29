import { cta } from '../content/site'
import { CtaPair } from './CtaButtons'
import { OfferPrice } from './OfferPrice'
import { Reveal } from './Reveal'

/**
 * ---------------------------------------------------------------------------
 * CLOSING CTA
 * ---------------------------------------------------------------------------
 * The last thing on the homepage: the same offer, the same two buttons, in the
 * same order as the hero. Someone who scrolled the whole page is at the point
 * of deciding, and they should not have to scroll back up to find out how to
 * start.
 *
 * The surface is white with a hairline above rather than a dark band. A dark
 * full-bleed panel with a glow behind it is the look the brief is asking us to
 * remove, and on a page that is mostly warm off-white it would read as a
 * different website bolted onto the end.
 */
export function CtaBand() {
  return (
    <section className="border-t border-paper-200 bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="text-2xl leading-[1.2] font-semibold tracking-tight text-balance text-ink-950 sm:text-3xl">
              {cta.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-pretty text-ink-600 sm:text-lg">
              {cta.body}
            </p>

            <OfferPrice size="inline" className="mt-7" />

            <div className="mt-7">
              <CtaPair place="cta-band" whatsappVariant="whatsapp" callVariant="secondary" size="lg" />
            </div>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-500">{cta.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
