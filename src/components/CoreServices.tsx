import { Link } from 'react-router-dom'
import { WhatsAppButton } from './CtaButtons'
import { Reveal } from './Reveal'
import { Section } from './Section'
import { serviceIcons } from './iconRegistry'
import { IconArrowRight } from './icons'
import { featuredServices } from '../content/services'
import { coreSection } from '../content/site'
import { ui } from '../content/ui'

/**
 * ---------------------------------------------------------------------------
 * TIER 1 — THE PROFESSIONAL SERVICES
 * ---------------------------------------------------------------------------
 * The eight services that are the actual business, in the order a business
 * meets them: get the entity right, register for tax, keep the books, do the
 * tax, prove it to an auditor or a bank, protect the name. Each one has its own
 * page and its own WhatsApp button, so a visitor never has to choose between
 * "tell me more" and "start the conversation" — both are one tap away from here.
 *
 * WHY A GRID AND NOT A LIST. Eight services is the point at which a single
 * column becomes a scroll and a visitor gives up two thirds of the way down. At
 * four across on a laptop it is two rows, which is a shape a person can take in
 * at once. Nothing here is a rounded, glowing tile: it is a flat card, a hairline
 * border and a small brand-tinted icon square.
 *
 * `featuredServices` rather than the full catalogue. Partnership firm
 * registration is a real service with its own page, but choosing between a
 * partnership, an LLP and a company is a structure decision rather than one of
 * the eight things most businesses need — so it is offered in a line of text
 * underneath rather than given one of the eight places on the grid.
 */
export function CoreServices() {
  return (
    <Section
      id="services"
      eyebrow={coreSection.eyebrow}
      title={coreSection.title}
      intro={coreSection.intro}
      surface="page"
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featuredServices.map((service, index) => {
          const Icon = serviceIcons[service.icon] ?? serviceIcons.document

          return (
            <Reveal as="li" key={service.slug} delay={index * 50} className="h-full">
              <article className="group flex h-full flex-col rounded-xl border border-paper-200 bg-white p-5 transition-colors duration-150 hover:border-brand-300">
                <span className="inline-flex size-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700 ring-1 ring-brand-100 ring-inset">
                  <Icon width={20} height={20} />
                </span>

                <h3 className="mt-4 text-base leading-snug font-semibold tracking-tight text-balance text-ink-950">
                  {service.name}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{service.summary}</p>

                <div className="mt-auto flex flex-col gap-1 pt-6">
                  {/*
                    WhatsApp before "Learn more": a visitor who has read four words
                    of a service is more likely to want to talk about it than to
                    want to read a page about it. The message is prefilled with
                    this service, so the reply is already about the right thing.
                  */}
                  <WhatsAppButton
                    place="core-service"
                    message={service.whatsapp}
                    size="md"
                    variant="secondary"
                    className="w-full"
                    label={ui['cta.whatsappShort']}
                  />
                  <Link
                    to={service.path}
                    className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink-900 transition-colors hover:text-brand-700"
                  >
                    {ui['cta.learnMore']}
                    <IconArrowRight
                      width={16}
                      height={16}
                      className="shrink-0 text-ink-400 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </article>
            </Reveal>
          )
        })}
      </ul>

      {/* The ninth service, in a sentence rather than a card. */}
      <p className="mt-10 max-w-3xl border-t border-paper-200 pt-6 text-sm leading-relaxed text-ink-600">
        <span className="font-semibold text-ink-950">{coreSection.footnoteLead}</span>{' '}
        <Link
          to={`/${coreSection.footnoteSlug}`}
          className="font-semibold text-brand-700 underline decoration-brand-300 underline-offset-2 transition-colors hover:text-brand-800"
        >
          {coreSection.footnote}
        </Link>{' '}
        {coreSection.footnoteBody}
      </p>
    </Section>
  )
}