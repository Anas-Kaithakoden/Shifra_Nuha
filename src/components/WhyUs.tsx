import { whyUs } from '../content/site'
import { reasonIcons } from './iconRegistry'
import { Reveal } from './Reveal'
import { Section } from './Section'

/**
 * ---------------------------------------------------------------------------
 * WHY CHOOSE US
 * ---------------------------------------------------------------------------
 * Four points, in a four-column row separated by hairlines rather than four
 * cards. A row of four short statements reads as a considered argument; a
 * 2×2 grid of bordered boxes reads as filler.
 *
 * Every point is a statement about how the work is organised — nothing about
 * our history, our ranking or our client numbers. "Kerala's best", "100%
 * guaranteed" and "trusted by 10,000+ businesses" are all absent because none of
 * them has been verified, and a first-time business owner is exactly the person
 * who checks.
 */
export function WhyUs() {
  return (
    <Section
      id="why"
      eyebrow={whyUs.eyebrow}
      title={whyUs.title}
      intro={whyUs.intro}
    >
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {whyUs.points.map((point, index) => {
          const Icon = reasonIcons[point.icon] ?? reasonIcons.steps
          return (
            <Reveal key={point.title} delay={index * 60} className="border-t border-paper-300 pt-5">
              <Icon width={22} height={22} className="text-brand-600" />
              <h3 className="mt-4 text-base font-semibold tracking-tight text-ink-950">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{point.body}</p>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
