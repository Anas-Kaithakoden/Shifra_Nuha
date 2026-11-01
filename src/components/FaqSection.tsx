import { faqs, faqsSection } from '../content/site'
import { faqSchema, useJsonLd } from '../lib/seo'
import { Faq } from './Faq'
import { Reveal } from './Reveal'

/**
 * ---------------------------------------------------------------------------
 * FAQ
 * ---------------------------------------------------------------------------
 * Seven questions, answered plainly. The accordion sits beside the heading
 * rather than under it so a visitor scans the questions first and opens only
 * the one they came for.
 *
 * The page's FAQPage structured data comes from the same array as the visible
 * questions, so the two can never disagree.
 */
export function FaqSection() {
  const items = [...faqs]
  useJsonLd(faqSchema(items), [items.length])

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-20 border-t border-paper-200 bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 bg-brand-600" />
                <p className="text-[11px] font-semibold tracking-[0.2em] text-brand-700 uppercase">
                  {faqsSection.eyebrow}
                </p>
              </div>
              <h2
                id="faq-heading"
                className="mt-4 max-w-sm font-display text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.02] font-normal tracking-[-0.025em] text-ink-950"
              >
                {faqsSection.title}
              </h2>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-500">
                If your question is not here, message us on WhatsApp and ask directly. We answer
                during working hours.
              </p>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <Faq items={items} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
