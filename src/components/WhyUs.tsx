import { whyUs } from '../content/site'
import { Reveal } from './Reveal'
import { Section } from './Section'
import { reasonIcons } from './iconRegistry'
import { useLocale } from '../i18n/LocaleProvider'
import { WhatsAppButton } from './CtaButtons'

/**
 * Why choose us. Every point is a factual statement about how the work is
 * organised — no "Kerala's best", no client counts, no awards, because none of
 * those have been verified and inventing them is the fastest way to lose a
 * business owner's trust.
 */
export function WhyUs() {
  const { pick } = useLocale()

  return (
    <Section
      id="why"
      eyebrow={pick(whyUs.eyebrow.en, whyUs.eyebrow.ml)}
      title={pick(whyUs.title.en, whyUs.title.ml)}
      intro={pick(whyUs.intro.en, whyUs.intro.ml)}
      surface="subtle"
      divided
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {whyUs.points.map((point, index) => {
          const Icon = reasonIcons[point.icon] ?? reasonIcons.steps
          return (
            <Reveal key={point.title.en} delay={index * 60} className="h-full">
              <div className="flex h-full flex-col rounded-xl border border-ink-200 bg-white p-6 sm:p-7">
                <span className="inline-flex size-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700 ring-1 ring-brand-200 ring-inset">
                  <Icon width={20} height={20} />
                </span>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-ink-950">
                  {pick(point.title.en, point.title.ml)}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-600">
                  {pick(point.body.en, point.body.ml)}
                </p>
              </div>
            </Reveal>
          )
        })}

        {/* Fills the sixth cell and carries the primary action. */}
        <Reveal delay={300} className="h-full">
          <div className="flex h-full flex-col justify-between rounded-xl bg-ink-950 p-6 text-white sm:p-7">
            <p className="text-base font-semibold tracking-tight text-balance">
              {pick(whyUs.closing.title.en, whyUs.closing.title.ml)}
            </p>
            <WhatsAppButton
              place="why-us"
              variant="whatsapp"
              size="md"
              label={pick(whyUs.closing.button.en, whyUs.closing.button.ml)}
              className="mt-6 self-start"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
