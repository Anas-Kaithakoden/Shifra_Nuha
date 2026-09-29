import { audience } from '../content/site'
import { Reveal } from './Reveal'
import { Section } from './Section'
import { useLocale } from '../i18n/LocaleProvider'

/**
 * Who we help. Two audiences, stated separately, because a trading business
 * looking for GST support is a different conversation from a founder deciding
 * between an LLP and a company. Making that explicit is what stops a visitor
 * concluding "these people only work with new businesses".
 */
export function Audience() {
  const { pick } = useLocale()

  return (
    <Section
      id="who"
      eyebrow={pick(audience.eyebrow.en, audience.eyebrow.ml)}
      title={pick(audience.title.en, audience.title.ml)}
      intro={pick(audience.intro.en, audience.intro.ml)}
      surface="subtle"
      divided
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {audience.groups.map((group, index) => (
          <Reveal key={group.title.en} delay={index * 70} className="h-full">
            <div className="flex h-full flex-col rounded-xl border border-ink-200 bg-white p-6 sm:p-7">
              <span className="font-mono text-xs font-semibold text-brand-600">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-base font-semibold tracking-tight text-balance text-ink-950">
                {pick(group.title.en, group.title.ml)}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-600">
                {pick(group.body.en, group.body.ml)}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <ul className="mt-10 flex flex-wrap justify-center gap-2.5 sm:justify-start">
          {audience.types.map((type) => (
            <li
              key={type}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-800 ring-1 ring-ink-200 ring-inset"
            >
              {type}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
