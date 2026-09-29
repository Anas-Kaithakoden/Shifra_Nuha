import { coreServices, type FaqItem } from '../content/services'
import { faqs, faqsSection } from '../content/site'
import { useLocale } from '../i18n/LocaleProvider'
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
  const { pick } = useLocale()
  const items: FaqItem[] = [
    ...faqs,
    ...coreServices.flatMap((service) => service.faqs.slice(0, 1)),
  ]

  useJsonLd(faqSchema(items), [items.length])

  return (
    <Section
      id="faq"
      eyebrow={pick(faqsSection.eyebrow.en, faqsSection.eyebrow.ml)}
      title={pick(faqsSection.title.en, faqsSection.title.ml)}
      intro={pick(faqsSection.intro.en, faqsSection.intro.ml)}
      surface="subtle"
      divided
    >
      <Faq items={items} />
    </Section>
  )
}
