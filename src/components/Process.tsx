import { process } from '../content/site'
import { Reveal } from './Reveal'
import { Section } from './Section'
import { useLocale } from '../i18n/LocaleProvider'

/**
 * How it works. Four steps, with the honest caveat about timelines directly
 * underneath — promising a turnaround we do not control is exactly the kind of
 * overpromising the brief rules out.
 */
export function Process() {
  const { pick } = useLocale()

  return (
    <Section
      id="process"
      eyebrow={pick(process.eyebrow.en, process.eyebrow.ml)}
      title={pick(process.title.en, process.title.ml)}
      intro={pick(process.intro.en, process.intro.ml)}
      surface="dark"
      className="relative overflow-hidden"
    >
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div className="relative">
        <ol className="grid gap-px overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 70} as="li" className="h-full bg-ink-950 p-6 sm:p-7">
              <span className="font-mono text-sm font-semibold text-brand-400">{step.number}</span>
              <h3 className="mt-4 text-base font-semibold tracking-tight text-white">
                {pick(step.title.en, step.title.ml)}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-400">
                {pick(step.body.en, step.body.ml)}
              </p>
            </Reveal>
          ))}
        </ol>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-400">
          {pick(process.note.en, process.note.ml)}
        </p>
      </div>
    </Section>
  )
}
