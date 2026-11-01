import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { structureOptions, structureSection } from '../content/site'
import { onWhatsappClick, whatsappLink } from '../lib/contactLinks'
import { IconArrowRight, IconWhatsApp } from './icons'

/**
 * ---------------------------------------------------------------------------
 * BUSINESS STRUCTURE COMPARISON
 * ---------------------------------------------------------------------------
 * Three tabs, one panel, four fields. Short enough to compare without a table
 * that scrolls sideways on a phone.
 *
 * The tabs implement the keyboard pattern people expect: arrow keys move
 * selection and focus, Home and End jump to the ends. The panel is animated
 * with a keyed CSS entrance rather than a height transition, so switching never
 * causes layout thrash and reduced motion simply renders it in place.
 *
 * The copy is deliberately general, ends with a plain "not legal or tax advice"
 * note, and links into the relevant service page rather than presenting a
 * conclusion. The structure decision is a conversation, not a lookup table.
 */
export function StructureComparison() {
  const [active, setActive] = useState(0)
  const baseId = useId()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const option = structureOptions[active]
  const whatsapp = whatsappLink(structureSection.whatsappMessage)

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = structureOptions.length - 1
    let next = index

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = index === last ? 0 : index + 1
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = index === 0 ? last : index - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last
    else return

    event.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  const fields = [
    { label: 'Legal structure', value: option.legal },
    { label: 'Ownership', value: option.ownership },
    { label: 'Liability', value: option.liability },
    { label: 'Suitable business type', value: option.suitable },
  ]

  return (
    <section
      id="business-structure"
      aria-labelledby="structure-heading"
      className="scroll-mt-20 border-t border-paper-200 bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-brand-600" />
              <p className="text-[11px] font-semibold tracking-[0.2em] text-brand-700 uppercase">
                {structureSection.eyebrow}
              </p>
            </div>
            <h2
              id="structure-heading"
              className="mt-4 max-w-md font-display text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.02] font-normal tracking-[-0.025em] text-ink-950"
            >
              {structureSection.title}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-pretty text-ink-600">
              {structureSection.intro}
            </p>

            <div className="mt-8 max-w-md border-t border-paper-200 pt-5">
              <p className="text-[11px] leading-relaxed text-ink-500">{structureSection.note}</p>
              <a
                href={whatsapp.href}
                {...(whatsapp.ready ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                onClick={onWhatsappClick('structure', structureSection.whatsappMessage)}
                title={whatsapp.ready ? undefined : 'Opens the contact page until this number is added.'}
                className="group mt-4 inline-flex min-h-11 items-center gap-2 border-b border-ink-950 pb-1 text-sm font-semibold text-ink-950 transition-colors hover:border-brand-700 hover:text-brand-700"
              >
                <IconWhatsApp width={16} height={16} className="shrink-0 text-brand-700" />
                {structureSection.ctaLabel}
                <IconArrowRight
                  width={15}
                  height={15}
                  className="shrink-0 text-brand-700 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>

          <div className="self-start">
            <div
              role="tablist"
              aria-label="Business structures"
              className="grid grid-cols-1 border border-paper-200 sm:grid-cols-3"
            >
              {structureOptions.map((item, index) => {
                const isActive = index === active
                return (
                  <button
                    key={item.id}
                    ref={(node) => {
                      tabRefs.current[index] = node
                    }}
                    id={`${baseId}-tab-${item.id}`}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    aria-controls={`${baseId}-panel`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(index)}
                    onKeyDown={(event) => onKeyDown(event, index)}
                    className={`relative min-h-12 border-b border-paper-200 px-4 py-3 text-left text-[13px] font-semibold transition-colors last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0 ${
                      isActive
                        ? 'bg-ink-950 text-white'
                        : 'bg-paper-50 text-ink-700 hover:bg-paper-100'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 bottom-0 h-[2px] ${
                        isActive ? 'bg-brand-400' : 'bg-transparent'
                      }`}
                    />
                  </button>
                )
              })}
            </div>

            <div
              id={`${baseId}-panel`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${option.id}`}
              tabIndex={0}
              className="border-x border-b border-paper-200 bg-paper-50"
            >
              <div key={option.id} className="panel-enter p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-paper-200 pb-4">
                  <h3 className="font-display text-2xl leading-none font-normal tracking-[-0.02em] text-ink-950">
                    {option.label}
                  </h3>
                  <Link
                    to={option.to}
                    className="group inline-flex min-h-8 items-center gap-1.5 text-[11px] font-semibold tracking-[0.08em] text-brand-700 uppercase transition-colors hover:text-ink-950"
                  >
                    Related service
                    <IconArrowRight
                      width={14}
                      height={14}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-pretty text-ink-600">
                  {option.summary}
                </p>

                <dl className="mt-6 divide-y divide-paper-200 border-t border-paper-200">
                  {fields.map((field) => (
                    <div key={field.label} className="grid gap-1 py-3 sm:grid-cols-[150px_1fr] sm:gap-6">
                      <dt className="text-[10px] font-semibold tracking-[0.14em] text-ink-400 uppercase">
                        {field.label}
                      </dt>
                      <dd className="text-[13px] leading-relaxed text-ink-700">{field.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
