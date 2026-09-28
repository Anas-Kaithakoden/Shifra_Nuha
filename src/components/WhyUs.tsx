import { whyUs } from '../content/site'
import { ButtonLink } from './Button'
import { Reveal } from './Reveal'
import { Section } from './Section'
import { IconArrowRight, IconAutomation, IconLayers, IconShield, IconTarget, IconUsers } from './icons'

const icons = [IconLayers, IconTarget, IconShield, IconAutomation, IconUsers]

export function WhyUs() {
  return (
    <Section
      id="why"
      eyebrow="Why Shifra Nuha Technologies"
      title={whyUs.heading}
      intro={whyUs.intro}
      surface="subtle"
      divided
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {whyUs.points.map((point, index) => {
          const Icon = icons[index] ?? IconLayers
          return (
            <Reveal key={point.title} delay={index * 60}>
              <div className="h-full rounded-xl border border-ink-200 bg-white p-6 sm:p-7">
                <span className="inline-flex size-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700 ring-1 ring-brand-200 ring-inset">
                  <Icon width={20} height={20} />
                </span>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-ink-950">{point.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{point.body}</p>
              </div>
            </Reveal>
          )
        })}

        {/* Fills the sixth cell in the 3-column layout and reinforces the CTA. */}
        <Reveal delay={300}>
          <div className="flex h-full flex-col justify-between rounded-xl border border-ink-950 bg-ink-950 p-6 text-white sm:p-7">
            <p className="text-base font-semibold tracking-tight text-balance">
              Start with one service. Add the next when you are ready.
            </p>
            <ButtonLink to="/contact#enquiry" variant="onDark" className="mt-6 self-start">
              Talk to us
              <IconArrowRight width={16} height={16} />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
