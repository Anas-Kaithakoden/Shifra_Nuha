import { registrationOffer } from '../content/offer'
import { offerSection } from '../content/site'
import { IconCheck } from './icons'
import { Reveal } from './Reveal'
import { Section } from './Section'

/**
 * ---------------------------------------------------------------------------
 * WHAT THE FEE COVERS
 * ---------------------------------------------------------------------------
 * The objection a starting price raises is "what am I actually paying for?".
 * This answers it, immediately after the hero, in plain language and without a
 * second card grid — it is a two-column list on a muted surface.
 *
 * The five items come from `registrationOffer.includes`, so this list and the
 * copy on the offer itself can never disagree. Nothing here promises an
 * approval, a timeline or an outcome: these are the things we do, not the things
 * the authority does.
 */
export function OfferIncludes() {
  return (
    <Section
      id="included"
      eyebrow={offerSection.eyebrow}
      title={offerSection.title}
      intro={offerSection.intro}
      surface="muted"
      divided
    >
      <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
        {registrationOffer.includes.map((item, index) => (
          <Reveal key={item} delay={index * 50} as="li" className="flex items-start gap-3">
            <IconCheck width={18} height={18} className="mt-0.5 shrink-0 text-brand-600" />
            <span className="text-base leading-relaxed text-ink-700">{item}</span>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
