import { closing, journeyStages } from '../content/site'
import { callLink, onPhoneClick, onWhatsappClick, whatsappLink } from '../lib/contactLinks'
import { IconArrowRight, IconPhone, IconWhatsApp } from './icons'
import { Reveal } from './Reveal'

/**
 * ---------------------------------------------------------------------------
 * CLOSING CTA
 * ---------------------------------------------------------------------------
 * The end of the argument, and the beginning of the conversation. It repeats
 * the hero's primary action in the same words the visitor has now earned, with
 * a single quiet alternative for someone who would rather call.
 *
 * The four stage labels on the right are not decoration: they summarise the
 * journey the page just walked through, so the closing reads as a conclusion
 * rather than a new pitch.
 */
export function CtaBand() {
  const whatsapp = whatsappLink(closing.whatsappMessage)
  const phone = callLink()
  const titleStart = closing.title.split('starts here.')[0]

  return (
    <section className="border-t border-white/10 bg-ink-950 py-20 text-paper-100 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20">
            <div>
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 bg-brand-400" />
                <p className="text-[11px] font-semibold tracking-[0.2em] text-brand-300 uppercase">
                  {closing.eyebrow}
                </p>
              </div>

              <h2 className="mt-5 max-w-2xl font-display text-[clamp(2.5rem,5.5vw,4.8rem)] leading-[0.98] font-normal tracking-[-0.03em] text-paper-50">
                {titleStart}
                <em className="font-normal text-brand-300 italic">starts here.</em>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-paper-100/65 sm:text-lg">
                {closing.body}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href={whatsapp.href}
                  {...(whatsapp.ready ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                  onClick={onWhatsappClick('closing', closing.whatsappMessage)}
                  title={whatsapp.ready ? undefined : 'Opens the contact page until this number is added.'}
                  className="group inline-flex min-h-12 items-center justify-center gap-2.5 border border-brand-300 bg-brand-300 px-6 text-[15px] font-semibold text-ink-950 transition-colors duration-200 hover:border-white hover:bg-white"
                >
                  <IconWhatsApp width={18} height={18} className="shrink-0" />
                  {closing.ctaLabel}
                  <IconArrowRight
                    width={17}
                    height={17}
                    className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </a>

                {phone.ready ? (
                  <a
                    href={phone.href}
                    onClick={onPhoneClick('closing')}
                    className="inline-flex min-h-12 items-center gap-2 px-1 text-sm text-paper-100/60 transition-colors hover:text-paper-50"
                  >
                    <IconPhone width={15} height={15} className="shrink-0" />
                    Or call {phone.label}
                  </a>
                ) : null}
              </div>
            </div>

            <div className="border-t border-white/15 pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-14">
              <p className="text-[10px] font-semibold tracking-[0.18em] text-paper-100/35 uppercase">
                The whole journey
              </p>
              <ol className="mt-4 space-y-3">
                {journeyStages.map((stage) => (
                  <li
                    key={stage.id}
                    className="flex items-baseline justify-between gap-6 border-b border-white/10 pb-2.5 last:border-b-0"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-display text-xs text-brand-300 tabular-nums">
                        {stage.number}
                      </span>
                      <span className="font-display text-lg text-paper-50">{stage.label}</span>
                    </span>
                    <span className="text-[9px] font-semibold tracking-[0.14em] text-paper-100/30 uppercase">
                      Handled with you
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
