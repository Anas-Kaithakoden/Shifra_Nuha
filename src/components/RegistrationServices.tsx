import { Link } from 'react-router-dom'
import { serviceBySlug } from '../content/services'
import { registrationSection } from '../content/site'
import { ui } from '../content/ui'
import { WhatsAppButton } from './CtaButtons'
import { IconArrowRight } from './icons'
import { Reveal } from './Reveal'
import { Section } from './Section'

/**
 * ---------------------------------------------------------------------------
 * REGISTRATION SERVICES
 * ---------------------------------------------------------------------------
 * Two cards, because the offer covers two registrations: LLP and Company. The
 * other seven services are real, and they are all linked from `/services`, the
 * footer and each service page — but a founder deciding between an LLP and a
 * company should not have to read eight cards to make that decision.
 *
 * Each card carries a name, one sentence, a WhatsApp button and a link to the
 * full page. No icon, no illustration, no bullet list of inclusions: the point
 * of this section is that the choice is easy, and clutter is what makes a
 * choice hard.
 */
export function RegistrationServices() {
  return (
    <Section
      id="services"
      eyebrow={registrationSection.eyebrow}
      title={registrationSection.title}
      intro={registrationSection.intro}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {registrationSection.cards.map((card, index) => {
          const service = serviceBySlug[card.slug]
          return (
            <Reveal key={card.slug} delay={index * 70} className="h-full">
              <article className="flex h-full flex-col rounded-xl border border-paper-200 bg-white p-6 transition-colors duration-150 hover:border-brand-200 sm:p-7">
                <h3 className="text-lg font-semibold tracking-tight text-ink-950">{card.name}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{card.body}</p>

                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <WhatsAppButton
                    place={`registration-${card.slug}`}
                    message={service?.whatsapp}
                    size="md"
                    variant="whatsapp"
                    label={ui['cta.getStarted']}
                  />
                  <Link
                    to={`/${card.slug}`}
                    className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink-800 transition-colors hover:text-brand-700"
                  >
                    {ui['cta.readMore']}
                    <IconArrowRight width={16} height={16} />
                  </Link>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
