import { coreServices, type FaqItem } from '../content/services'
import { faqs, faqsSection } from '../content/site'
import { faqSchema, useJsonLd } from '../lib/seo'
import { Faq } from './Faq'
import { Section } from './Section'

/**
 * The homepage FAQ.
 *
 * Two jobs: answer the questions that stop someone from making contact, and
 * carry the homepage's structured data. Both are served by the same content —
 * questions about cost, documents and timelines, answered with what actually
 * drives each one rather than with a number we would then have to honour.
 *
 * The first question from each of the nine services is folded in, so the
 * homepage answers the single most common question per service without
 * duplicating a word of it.
 */
export function FaqSection() {
  const items: FaqItem[] = [
    ...faqs,
    ...coreServices.flatMap((service) => service.faqs.slice(0, 1)),
  ]

  useJsonLd(faqSchema(items), [items.length])

  return (
    <Section
      id="faq"
      eyebrow={faqsSection.eyebrow}
      title={faqsSection.title}
      intro={faqsSection.intro}
      surface="subtle"
      divided
    >
      <Faq items={items} />
    </Section>
  )
}
