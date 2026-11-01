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
      <div className="grid gap-px border border-paper-200 bg-paper-200 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {brandingSection.items.map((item, index) => {
          const Icon = digitalIcons[item.icon] ?? digitalIcons.branding

          return (
            <Reveal key={item.title} delay={index * 50} className="h-full bg-white">
              <article className="flex h-full flex-col bg-white p-6 transition-colors duration-200 hover:bg-paper-50">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-brand-700 uppercase tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <Icon width={19} height={19} className="shrink-0 text-ink-400" />
                </div>

                <h3 className="mt-5 font-display text-[1.3rem] leading-[1.12] font-normal tracking-[-0.015em] text-balance text-ink-950">
                  {item.title}
                </h3>

                <p className="mt-3 text-[13px] leading-relaxed text-ink-600">{item.body}</p>

                <ul className="mt-4 space-y-2">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2 text-[12px] leading-relaxed text-ink-700">
                      <IconCheck width={14} height={14} className="mt-0.5 shrink-0 text-brand-600" />
                      <span className="text-pretty">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <div className="border-t border-paper-200 pt-4">
                    <WhatsAppButton
                      place="branding-service"
                      message={item.whatsappMessage}
                      size="md"
                      variant="secondary"
                      className="w-full"
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
