import { digital } from '../content/site'
import { Reveal } from './Reveal'
import { Section } from './Section'
import { digitalIcons } from './iconRegistry'
import { useLocale } from '../i18n/LocaleProvider'

/**
 * Secondary digital and technology services.
 *
 * These are real and we do them, but they are not the reason someone should
 * contact us right now. The brief is explicit that the advertising message must
 * not be digital services, so this section sits below the professional services
 * in the page order, on a deliberately quieter surface, with a note saying so.
 */
export function DigitalServices() {
  const { pick } = useLocale()

  return (
    <Section
      id="digital"
      eyebrow={pick(digital.eyebrow.en, digital.eyebrow.ml)}
      title={pick(digital.title.en, digital.title.ml)}
      intro={pick(digital.intro.en, digital.intro.ml)}
      divided
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {digital.groups.map((group, index) => {
          const Icon = digitalIcons[group.icon] ?? digitalIcons.automation
          return (
            <Reveal key={group.title.en} delay={index * 60} className="h-full">
              <div className="flex h-full gap-4 rounded-xl border border-dashed border-ink-300 bg-ink-50/60 p-6">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-ink-600 ring-1 ring-ink-200 ring-inset">
                  <Icon width={20} height={20} />
                </span>
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-ink-900">
                    {pick(group.title.en, group.title.ml)}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                    {pick(group.body.en, group.body.ml)}
                  </p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>

      <p className="mt-8 text-sm leading-relaxed text-ink-500">
        {pick(digital.note.en, digital.note.ml)}
      </p>
    </Section>
  )
}
