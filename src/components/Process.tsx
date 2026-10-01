import { process } from '../content/site'
import { Reveal } from './Reveal'
import { Section } from './Section'

/**
 * ---------------------------------------------------------------------------
 * HOW IT WORKS
 * ---------------------------------------------------------------------------
 * Three numbered steps in a single row, on the quiet surface. Not four, not
 * six: three is what a person can hold in their head, and the brief asks for
 * exactly these three.
 *
 * There is no duration on any step and no fourth "delivered in N days" step.
 * The note underneath says in one sentence why: processing time belongs to the
 * authority. Stating that is more credible than omitting the timeline, because
 * every other registration company the visitor has just seen is promising one.
 */
export function Process() {
  return (
    <Section
      id="how-it-works"
      eyebrow={process.eyebrow}
      title={process.title}
      intro={process.intro}
      surface="page"
      divided
    >
      <ol className="grid gap-6 sm:grid-cols-3 sm:gap-8">
        {process.steps.map((step, index) => (
          <Reveal key={step.number} as="li" delay={index * 70}>
            {/*
              The rule above each step is a hairline, not a card. It separates
              the steps without turning three short paragraphs into three boxes.
            */}
            <div className="border-t border-paper-300 pt-5">
              <span className="text-sm font-semibold tracking-[0.1em] text-brand-700 tabular-nums">
                {step.number}
              </span>
              <h3 className="mt-2.5 text-base font-semibold tracking-tight text-ink-950">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <p className="mt-10 max-w-3xl border-t border-paper-200 pt-6 text-sm leading-relaxed text-ink-500">
        {process.note}
      </p>
    </Section>
  )
}
