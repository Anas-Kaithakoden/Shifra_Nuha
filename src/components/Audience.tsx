import { audience } from '../content/site'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Audience() {
  return (
    <Section
      id="who"
      eyebrow="Who we help"
      title={audience.heading}
      intro={audience.intro}
      surface="subtle"
      divided
    >
      <Reveal>
        <ul className="flex flex-wrap gap-2.5">
          {audience.pills.map((pill) => (
            <li
              key={pill}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-800 ring-1 ring-ink-200 ring-inset"
            >
              {pill}
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {audience.situations.map((situation, index) => (
          <Reveal key={situation.title} delay={index * 70}>
            <div className="flex h-full gap-4 rounded-xl border border-ink-200 bg-white p-6">
              <span className="mt-0.5 font-mono text-xs font-semibold text-brand-600">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-base font-semibold tracking-tight text-ink-950 text-balance">
                  {situation.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{situation.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
