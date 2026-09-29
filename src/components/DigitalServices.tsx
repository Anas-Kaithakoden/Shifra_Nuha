import { digital } from '../content/site'
import { Reveal } from './Reveal'
import { Section } from './Section'
import { digitalIcons } from './iconRegistry'

/**
 * Secondary digital and technology services.
 *
 * These are real and we do them, but they are not the reason someone should
 * contact us right now. The brief is explicit that the advertising message must
 * not be digital services, so this section sits below the professional services
 * in the page order, on a deliberately quieter surface, with a note saying so.
 */
export function DigitalServices() {
  return (
    <Section
      id="digital"
      eyebrow={digital.eyebrow}
      title={digital.title}
      intro={digital.intro}
      divided
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {digital.groups.map((group, index) => {
          const Icon = digitalIcons[group.icon] ?? digitalIcons.automation
          return (
            <Reveal key={group.title} delay={index * 60} className="h-full">
              <div className="flex h-full gap-4 rounded-xl border border-dashed border-ink-300 bg-ink-50/60 p-6">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-ink-600 ring-1 ring-ink-200 ring-inset">
                  <Icon width={20} height={20} />
                </span>
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-ink-900">
                    {group.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                    {group.body}
                  </p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>

      <p className="mt-8 text-sm leading-relaxed text-ink-500">
        {digital.note}
      </p>
    </Section>
  )
}
