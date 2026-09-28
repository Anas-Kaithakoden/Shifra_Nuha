import { contact, cta } from '../content/site'
import { ButtonLink } from './Button'
import { IconArrowRight, IconMail, IconPhone } from './icons'

export function CtaBand() {
  return (
    <section className="border-t border-ink-200 bg-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-ink-950 px-6 py-14 sm:px-12 sm:py-16">
          <div className="bg-grid absolute inset-0" aria-hidden="true" />
          <div
            className="absolute -right-24 -bottom-24 size-80 rounded-full bg-brand-600/20 blur-[100px]"
            aria-hidden="true"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <h2 className="max-w-xl text-3xl leading-[1.15] font-semibold tracking-tight text-balance text-white sm:text-4xl">
                {cta.heading}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-300 sm:text-lg">{cta.body}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink to="/contact#enquiry" size="lg" variant="onDark">
                  {cta.button}
                  <IconArrowRight width={18} height={18} />
                </ButtonLink>
                <ButtonLink to="/services" size="lg" variant="onDarkGhost">
                  See services
                </ButtonLink>
              </div>
            </div>

            {/* Direct contact details, shown only once real values exist. */}
            {contact.email || contact.phone ? (
              <dl className="space-y-4 border-t border-white/10 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                {contact.phone ? (
                  <div>
                    <dt className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-ink-400 uppercase">
                      <IconPhone width={14} height={14} /> Phone
                    </dt>
                    <dd className="mt-2">
                      <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="text-lg text-white hover:text-brand-300">
                        {contact.phone}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {contact.email ? (
                  <div>
                    <dt className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-ink-400 uppercase">
                      <IconMail width={14} height={14} /> Email
                    </dt>
                    <dd className="mt-2">
                      <a href={`mailto:${contact.email}`} className="text-lg break-all text-white hover:text-brand-300">
                        {contact.email}
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>
            ) : (
              <div className="border-t border-white/10 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                <p className="text-sm leading-relaxed text-ink-400">
                  We usually respond to enquiries within one working day.
                </p>
                <p className="mt-4 rounded-lg border border-dashed border-white/20 bg-white/5 px-4 py-3 text-sm leading-relaxed text-ink-300">
                  <span className="font-semibold text-white">Placeholder:</span> phone, WhatsApp and email are being
                  confirmed and will be published here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
