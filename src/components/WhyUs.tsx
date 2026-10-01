import { Reveal } from './Reveal'
import { Section } from './Section'
import { reasonIcons } from './iconRegistry'
import { whyUs } from '../content/site'

/**
 * ---------------------------------------------------------------------------
 * WHY WORK WITH US
 * ---------------------------------------------------------------------------
 * Four points, and every one of them is a statement about how the work is
 * organised rather than a claim about results. There is no "trusted by hundreds
 * of businesses", no rating and no award here, because none of those has been
 * verified — and a first-time business owner comparing three registration
 * companies is exactly the person who asks to see them.
 *
 * WHAT THIS SECTION IS FOR. The real objections a visitor has are not "is this
 * company good" but "will I understand what I am paying for", "will I be passed
 * between four people", and "who exactly is doing the regulated part". Each
 * point answers one of those. That is why the titles are about the arrangement
 * rather than about us: they describe what the visitor will experience.
 *
 * The four are set as a 2×2 grid separated by hairlines rather than as cards.
 * Four bordered boxes on a page that already has a grid of eight immediately
 * above would turn the page into a wall of tiles.
 */
export function WhyUs() {
  return (
    <Section
      eyebrow={whyUs.eyebrow}
      title={whyUs.title}
      intro={whyUs.intro}
      surface="page"
      divided
    >
      <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-y-12">
        {whyUs.points.map((point, index) => {
          const Icon = reasonIcons[point.icon] ?? reasonIcons.document

          return (
            <Reveal as="li" key={point.title} delay={index * 60}>
              <div className="border-t border-paper-300 pt-5">
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700 ring-1 ring-brand-100 ring-inset">
                  <Icon width={18} height={18} />
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-ink-950">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{point.body}</p>
              </div>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}