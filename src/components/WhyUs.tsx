import { whyUs } from '../content/site'
import { Reveal } from './Reveal'
import { Section } from './Section'
import { reasonIcons } from './iconRegistry'
import { WhatsAppButton } from './CtaButtons'

/**
 * Why choose us. Every point is a factual statement about how the work is
 * organised — no "Kerala's best", no client counts, no awards, because none of
 * those have been verified and inventing them is the fastest way to lose a
 * business owner's trust.
 */
export function WhyUs() {
  return (
    <Section
      id="why"
      eyebrow={whyUs.eyebrow}
      title={whyUs.title}
      intro={whyUs.intro}
      surface="subtle"
      divided
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {whyUs.points.map((point, index) => {
          const Icon = reasonIcons[point.icon] ?? reasonIcons.steps
          return (
            <Reveal key={point.title} delay={index * 60} className="h-full">
              <div className="flex h-full flex-col rounded-xl border border-ink-200 bg-white p-6 sm:p-7">
                <span className="inline-flex size-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700 ring-1 ring-brand-200 ring-inset">
                  <Icon width={20} height={20} />
                </span>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-ink-950">
                  {point.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-600">
                  {point.body}
                </p>
              </div>
            </Reveal>
          )
        })}

        {/* Fills the sixth cell and carries the primary action. */}
        <Reveal delay={300} className="h-full">
          <div className="flex h-full flex-col justify-between rounded-xl bg-ink-950 p-6 text-white sm:p-7">
            <p className="text-base font-semibold tracking-tight text-balance">
              {whyUs.closing.title}
            </p>
            <WhatsAppButton
              place="why-us"
              variant="whatsapp"
              size="md"
              label={whyUs.closing.button}
              className="mt-6 self-start"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
