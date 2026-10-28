import { WhatsAppButton } from './CtaButtons'
import { Reveal } from './Reveal'
import { Section } from './Section'
import { digitalIcons } from './iconRegistry'
import { IconCheck } from './icons'
import { brandingSection } from '../content/site'

/**
 * ---------------------------------------------------------------------------
 * TIER 2B — BRANDING & CREATIVE SERVICES
 * ---------------------------------------------------------------------------
 * Brand identity and visual communication services. Presented as a separate
 * section after digital solutions.
 */
export function BrandingServices() {
  return (
    <Section
      id="branding-services"
      eyebrow={brandingSection.eyebrow}
      title={brandingSection.title}
      intro={brandingSection.intro}
      surface="page"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {brandingSection.items.map((item, index) => {
          const Icon = digitalIcons[item.icon] ?? digitalIcons.branding

          return (
            <Reveal key={item.title} delay={index * 60} className="h-full">
              <article className="flex h-full flex-col rounded-xl border border-paper-200 bg-white p-6 sm:p-7">
                <span className="inline-flex size-10 items-center justify-center rounded-lg border border-paper-200 bg-paper-50 text-ink-700">
                  <Icon width={20} height={20} />
                </span>

                <h3 className="mt-4 text-lg leading-snug font-semibold tracking-tight text-balance text-ink-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-ink-600">{item.body}</p>

                <ul className="mt-5 space-y-2.5">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-ink-700">
                      <IconCheck width={16} height={16} className="mt-0.5 shrink-0 text-ink-400" />
                      <span className="text-pretty">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-7">
                  <WhatsAppButton
                    place="branding-service"
                    message={item.whatsappMessage}
                    size="md"
                    variant="secondary"
                    className="w-full sm:w-auto"
                  />
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
