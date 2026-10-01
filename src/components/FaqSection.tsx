import { faqs, faqsSection } from '../content/site'
import { faqSchema, useJsonLd } from '../lib/seo'
import { Faq } from './Faq'
import { Section } from './Section'

/**
 * ---------------------------------------------------------------------------
 * FAQ
 * ---------------------------------------------------------------------------
 * Six questions, and the section is deliberately short.
 *
 * The first two are the questions every visitor opens an FAQ to check — what it
 * costs, and how long it takes — and both get the answer that is actually true
 * rather than the one that closes a sale. Answering them here is the point of
 * having the section: a visitor who cannot get a straight answer to "what does
 * it cost" from a firm leaves to ask somebody else, and we never find out why.
 *
 * It also carries the page's structured data from the same array, so the
 * FAQPage markup and the visible questions can never disagree.
 *
 * The per-service questions live on the service pages, where they are relevant.
 * Folding nine services' FAQs in here used to produce fifteen questions, which
 * is a wall, not an FAQ.
 */
export function FaqSection() {
  useJsonLd(faqSchema(faqs), [faqs.length])

  return (
    <Section
      id="faq"
      eyebrow={faqsSection.eyebrow}
      title={faqsSection.title}
      intro={faqsSection.intro}
      surface="page"
      divided
    >
      <Faq items={faqs} />
    </Section>
  )
}
