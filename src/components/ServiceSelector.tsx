import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { selectorOptions, selectorSection } from '../content/site'
import { onWhatsappClick, whatsappLink } from '../lib/contactLinks'
import { IconArrowRight, IconWhatsApp } from './icons'

/**
 * ---------------------------------------------------------------------------
 * WHAT ARE YOU LOOKING TO BUILD?
 * ---------------------------------------------------------------------------
 * A real selector, not decoration. Four states of a business, four sets of
 * services, four different prefilled WhatsApp messages. Choosing an option
 * re-renders the detail panel below the row and changes the message the CTA
 * opens with, so the first reply is already about the visitor's situation.
 *
 * The four buttons are a toggle group rather than four links: selecting one
 * does not navigate, it changes what is shown. `aria-pressed` communicates that
 * to assistive technology, and the detail panel is a polite live region so the
 * change is announced without stealing focus.
 *
 * The panel is re-keyed on selection so the CSS entrance animation runs each
 * time. That keeps the movement in the stylesheet, needs no scroll listeners
 * and is disabled with the rest of the animations under reduced motion.
 */
export function ServiceSelector() {
  const [selected, setSelected] = useState(0)
  const baseId = useId()
  const option = selectorOptions[selected]
  const whatsapp = whatsappLink(option.whatsappMessage)

  return (
    <section
      id="what-do-you-need"
      aria-labelledby="selector-heading"
      className="scroll-mt-20 border-t border-paper-200 bg-paper-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-brand-600" />
              <p className="text-[11px] font-semibold tracking-[0.2em] text-brand-700 uppercase">
                {selectorSection.eyebrow}
              </p>
            </div>
            <h2
              id="selector-heading"
              className="mt-4 max-w-xl font-display text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.02] font-normal tracking-[-0.025em] text-ink-950"
            >
              {selectorSection.title}
            </h2>
          </div>
          <p className="max-w-lg text-base leading-relaxed text-pretty text-ink-600 lg:justify-self-end">
            {selectorSection.intro}
          </p>
        </div>

        <div
          role="group"
          aria-label="Choose the situation that best describes your business"
          className="mt-10 grid border-t border-l border-paper-200 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4"
        >
          {selectorOptions.map((item, index) => {
            const isSelected = index === selected
            return (
              <button
                key={item.id}
                id={`${baseId}-option-${item.id}`}
                type="button"
                aria-pressed={isSelected}
                aria-controls={`${baseId}-detail`}
                onClick={() => setSelected(index)}
                className={`group relative flex min-h-40 flex-col border-r border-b border-paper-200 px-5 py-5 text-left transition-colors duration-200 sm:px-6 sm:py-6 ${
                  isSelected
                    ? 'bg-ink-950 text-white'
                    : 'bg-white text-ink-900 hover:bg-paper-100'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-[2px] transition-colors duration-200 ${
                    isSelected ? 'bg-brand-400' : 'bg-transparent'
                  }`}
                />
                <span
                  className={`font-display text-sm leading-none tabular-nums ${
                    isSelected ? 'text-brand-300' : 'text-ink-400'
                  }`}
                >
                  {item.number}
                </span>
                <span className="mt-5 font-display text-[1.35rem] leading-[1.1] tracking-[-0.015em]">
                  {item.label}
                </span>
                <span
                  className={`mt-2 text-[12px] ${
                    isSelected ? 'text-paper-100/60' : 'text-ink-500'
                  }`}
                >
                  {item.short}
                </span>
                <span className="mt-auto flex items-center justify-between gap-3 pt-6">
                  <span
                    className={`text-[10px] font-semibold tracking-[0.16em] uppercase ${
                      isSelected ? 'text-brand-300' : 'text-ink-400'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Choose'}
                  </span>
                  <IconArrowRight
                    width={16}
                    height={16}
                    className={`shrink-0 transition-transform duration-200 ${
                      isSelected
                        ? 'translate-x-0 text-brand-300'
                        : 'text-ink-400 group-hover:translate-x-0.5'
                    }`}
                  />
                </span>
              </button>
            )
          })}
        </div>

        <div
          id={`${baseId}-detail`}
          aria-live="polite"
          aria-atomic="true"
          className="border-x border-b border-paper-200 bg-white"
        >
          <div
            key={option.id}
            className="panel-enter grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:p-10"
          >
            <div>
              <p className="text-[10px] font-semibold tracking-[0.18em] text-brand-700 uppercase">
                Selected / {option.number}
              </p>
              <h3 className="mt-3 font-display text-[clamp(1.75rem,2.6vw,2.35rem)] leading-[1.05] font-normal tracking-[-0.02em] text-ink-950">
                {option.label}
              </h3>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-pretty text-ink-600">
                {option.description}
              </p>

              <div className="mt-7">
                <a
                  href={whatsapp.href}
                  {...(whatsapp.ready ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                  onClick={onWhatsappClick(`selector-${option.id}`, option.whatsappMessage)}
                  title={whatsapp.ready ? undefined : 'Opens the contact page until this number is added.'}
                  className="group inline-flex min-h-12 items-center gap-2.5 border border-ink-950 bg-ink-950 px-5 text-sm font-semibold text-white transition-colors hover:border-brand-700 hover:bg-brand-700"
                >
                  <IconWhatsApp width={17} height={17} className="shrink-0" />
                  {option.ctaLabel}
                  <IconArrowRight
                    width={16}
                    height={16}
                    className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </a>
                <p className="mt-3 text-[11px] text-ink-500">
                  Opens WhatsApp with your selection already written.
                </p>
              </div>
            </div>

            <div className="border-t border-paper-200 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              <p className="text-[10px] font-semibold tracking-[0.18em] text-ink-400 uppercase">
                Typically includes
              </p>
              <ul className="mt-4 space-y-0.5">
                {option.services.map((service) => (
                  <li key={service.label}>
                    {service.to ? (
                      <Link
                        to={service.to}
                        className="group inline-flex min-h-10 items-center gap-2.5 text-sm text-ink-800 transition-colors hover:text-brand-700"
                      >
                        <span aria-hidden="true" className="size-1 bg-brand-600" />
                        <span className="underline decoration-paper-300 underline-offset-4 group-hover:decoration-brand-300">
                          {service.label}
                        </span>
                      </Link>
                    ) : (
                      <span className="inline-flex min-h-10 items-center gap-2.5 text-sm text-ink-800">
                        <span aria-hidden="true" className="size-1 bg-brand-600" />
                        {service.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-[12px] leading-relaxed text-ink-500">
                Not sure which applies? Message us and describe the business in a few lines. We will
                tell you what is actually needed.
              </p>
              <Link
                to="/services"
                className="mt-4 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-ink-900 transition-colors hover:text-brand-700"
              >
                See every service
                <IconArrowRight width={15} height={15} className="text-brand-700" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
