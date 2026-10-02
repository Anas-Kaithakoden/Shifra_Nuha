import { WhatsAppButton } from './CtaButtons'
import { Reveal } from './Reveal'
import { Section } from './Section'
import { digitalIcons } from './iconRegistry'
import { IconCheck } from './icons'
import { digitalSection } from '../content/site'

/**
 * ---------------------------------------------------------------------------
 * TIER 2 — DIGITAL SERVICES
 * ---------------------------------------------------------------------------
 * Two entries, on white, after the primary work has been established. Both are
 * genuinely optional and neither is needed to get started, and the section says
 * so in its first sentence rather than burying it.
 *
 * WHY NOT A CARD GRID. Two items in a grid is a grid with two items in it, which
 * is how a website ends up looking like a template. They are set as two quiet
 * bordered panels instead, with the smaller type and flatter treatment the
 * secondary tier should have. The eyebrow, the type weight and the surface all
 * step back, so a visitor who came for the registration work does not have to
 * read past this to find the rest of the site.
 *
 * There is no page behind either of these, deliberately: they are bought as an
 * addition to an existing client rather than searched for on their own, and a
 * thin landing page would be worse than a paragraph that says what they are.
 *
 * Each carries its own prefilled WhatsApp message rather than the site-wide
 * default, so the chat opens with the reason that particular card was tapped
 * already stated.
 */
export function DigitalServices() {
  return (
    <Section
      id="digital-services"
      eyebrow={digitalSection.eyebrow}
      title={digitalSection.title}
      intro={digitalSection.intro}
      surface="plain"
      divided
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        {digitalSection.items.map((item, index) => {
          const Icon = digitalIcons[item.icon] ?? digitalIcons.automation

          return (
            <Reveal key={item.title} delay={index * 60} className="h-full">
              <article className="flex h-full flex-col rounded-xl border border-paper-200 bg-paper-50 p-6 sm:p-7">
                <span className="inline-flex size-10 items-center justify-center rounded-lg border border-paper-200 bg-white text-ink-700">
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
                    place="digital-service"
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