import { process } from '../content/site'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Process() {
  return (
    <Section
      id="process"
      eyebrow="Process"
      title={process.heading}
      intro={process.intro}
      surface="dark"
      className="relative overflow-hidden"
    >
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div className="relative">
        <ol className="grid gap-px overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 70}>
              <li className="flex h-full flex-col bg-ink-950 p-6 sm:p-7">
                <span className="font-mono text-sm font-semibold text-brand-400">{step.number}</span>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-white">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-400">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  )
}
