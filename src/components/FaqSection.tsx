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
 * The first three are the ones the ₹2,999 price raises — what it costs, what is
 * in it, and what happens next — because those are what a visitor opens this
 * section to check. If the answer to "what does it cost" is not here, the
 * visitor leaves to ask somebody else and we never find out why.
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
    >
      <Faq items={faqs} />
    </Section>
  )
}
