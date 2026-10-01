import { WhatsAppButton } from './CtaButtons'
import { Reveal } from './Reveal'
import { Section } from './Section'
import { IconCheck, IconQuote } from './icons'
import { company } from '../content/site'

/**
 * ---------------------------------------------------------------------------
 * ABOUT / COMPANY CONTEXT
 * ---------------------------------------------------------------------------
 * The "who is this" block. It is deliberately free of statistics. The number of
 * businesses assisted, the years in business, the professional credentials and
 * the client testimonials are the things that belong in this section — and none
 * of them has been verified yet, so none of them is here.
 *
 * THE PANEL ON THE RIGHT. Rather than padding the section with figures that are
 * not real, the right column carries the four promises the business can actually
 * make: one point of contact, documents named before you gather them, a
 * straight answer when it is not our work, and advance notice of which part
 * involves an external professional. Those are checkable by the visitor within
 * a week, which is a stronger argument than an unverifiable claim would be.
 *
 * TESTIMONIALS. `company.testimonials` is empty and the block below it renders
 * nothing. It exists so that a real, attributable, verifiable quote is a
 * one-object edit here and nothing else — and so that adding one is impossible to
 * do by accident, because the only source is this list.
 */
export function Company() {
  const testimonials = company.testimonials

  return (
    <Section
      id="about"
      eyebrow={company.eyebrow}
      title={company.title}
      surface="plain"
      divided
    >
      <div className="grid gap-10 lg:grid-cols-[1.45fr_1fr] lg:gap-14">
        <div>
          <p className="max-w-2xl text-base leading-relaxed text-pretty text-ink-600 sm:text-lg">
            {company.body}
          </p>

          {testimonials.length > 0 ? (
            <ul className="mt-10 space-y-5">
              {testimonials.map((testimonial) => (
                <li
                  key={testimonial.name}
                  className="rounded-xl border border-paper-200 bg-paper-50 p-6"
                >
                  <IconQuote width={20} height={20} className="text-brand-400" />
                  <blockquote className="mt-3 text-base leading-relaxed text-pretty text-ink-800">
                    {testimonial.quote}
                  </blockquote>
                  <p className="mt-3 text-sm text-ink-500">
                    {testimonial.name}
                    {testimonial.business ? `, ${testimonial.business}` : ''}
                  </p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <Reveal>
          <div className="rounded-xl border border-paper-200 bg-paper-50 p-6 sm:p-7">
            <h3 className="text-base font-semibold tracking-tight text-ink-950">
              What you can hold us to
            </h3>
            <ul className="mt-4 space-y-3">
              {company.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-ink-700">
                  <IconCheck width={16} height={16} className="mt-0.5 shrink-0 text-brand-600" />
                  <span className="text-pretty">{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <WhatsAppButton
                place="company"
                size="md"
                variant="secondary"
                className="w-full"
                label={company.button}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}