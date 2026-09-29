import { Link } from 'react-router-dom'
import { trust } from '../content/site'
import { WhatsAppButton } from './CtaButtons'
import { IconCheck, IconQuote } from './icons'
import { Reveal } from './Reveal'

/**
 * ---------------------------------------------------------------------------
 * TRUST
 * ---------------------------------------------------------------------------
 * The credibility section, and the one place on the site where the temptation to
 * invent something is strongest. A statistics bar, a five-star rating, a client
 * count and three testimonials are what this kind of section normally contains,
 * and every one of those would be a fabrication today.
 *
 * So the section makes the only credibility claim available: here is exactly
 * what happens, and here is who is on the other end of the WhatsApp message.
 * Four concrete commitments, each of which is checkable by the visitor in the
 * first ten minutes of dealing with us.
 *
 * WHEN REAL PROOF ARRIVES
 *  `trust.testimonials` in `content/site.ts` is the slot. Add real, named,
 *  attributable quotes — a person's name, their business, the words they
 *  actually said — and they render here, below the commitments. Do not write
 *  them from imagination: a fabricated testimonial is the single fastest way to
 *  lose a customer who was otherwise ready to send you their PAN card.
 *  The same applies to a client count, a review score and professional
 *  credentials. They belong in this section, and only once they are true.
 */
export function Trust() {
  return (
    <section className="border-y border-paper-200 bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <div className="max-w-xl">
              <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-brand-700 uppercase">
                {trust.eyebrow}
              </p>
              <h2 className="text-2xl leading-[1.2] font-semibold tracking-tight text-balance text-ink-950 sm:text-3xl">
                {trust.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-pretty text-ink-600 sm:text-lg">
                {trust.body}
              </p>

              <WhatsAppButton
                place="trust"
                size="lg"
                variant="whatsapp"
                label={trust.button}
                className="mt-7"
              />
              <p className="mt-3 text-sm text-ink-500">
                Or call us — whichever is easier. Our contact details are on the{' '}
                <Link
                  to="/contact"
                  className="font-semibold text-ink-800 underline underline-offset-2 hover:text-brand-700"
                >
                  contact page
                </Link>
                .
              </p>
            </div>
          </Reveal>

          <Reveal delay={70}>
            <ul className="space-y-3.5">
              {trust.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <IconCheck width={18} height={18} className="mt-0.5 shrink-0 text-brand-600" />
                  <span className="text-base leading-relaxed text-ink-700">{point}</span>
                </li>
              ))}
            </ul>

            {/*
              Real testimonials render here. The block is removed entirely while
              the array is empty, so there is never an empty heading or a
              "testimonials coming soon" panel for a visitor to notice.
            */}
            {trust.testimonials.length > 0 ? (
              <ul className="mt-8 space-y-4 border-t border-paper-200 pt-8">
                {trust.testimonials.map((item) => (
                  <li key={item.name}>
                    <IconQuote width={20} height={20} className="text-brand-600" />
                    <blockquote className="mt-2 text-base leading-relaxed text-ink-700">
                      {item.quote}
                    </blockquote>
                    <p className="mt-2 text-sm text-ink-500">
                      {item.name}
                      {item.business ? `, ${item.business}` : ''}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
