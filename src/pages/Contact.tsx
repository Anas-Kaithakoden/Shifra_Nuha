import { CallButton, WhatsAppButton } from '../components/CtaButtons'
import { Reveal } from '../components/Reveal'
import {
  IconArrowRight,
  IconClock,
  IconMail,
  IconPhone,
  IconPin,
  IconWhatsApp,
} from '../components/icons'
import { callLink, mailtoLink, onPhoneClick, onWhatsappClick, whatsappLink } from '../lib/contactLinks'
import { contact, contactPage, site } from '../content/site'
import { ui } from '../content/ui'
import { useDocumentMeta } from '../lib/seo'
import { PageIntro, PageShell } from './PageShell'

/**
 * ---------------------------------------------------------------------------
 * /contact
 * ---------------------------------------------------------------------------
 * WHATSAPP-FIRST, AND THERE IS NO FORM.
 *
 * The page answers one question — how do I get hold of this business — and it
 * answers it three times over: WhatsApp first, phone second, email third for
 * whoever prefers writing. That ordering is the whole strategy of the site made
 * visible in one place, and it is the same ordering as the buttons in the intro,
 * the navbar, the footer and the sticky bar.
 *
 * The three cards below the intro explain what each route is actually good for,
 * rather than repeating three more large buttons. The pair of buttons in the
 * intro is the call to action; the cards are the reasoning, so a visitor can
 * pick the route that suits them instead of guessing from three identical
 * buttons.
 *
 * EMAIL IS DELIBERATELY NOT A BUTTON. It is a plain `mailto:` link at the bottom
 * of each card and in the details list. An email address is the right tool for
 * documents and for people who would rather not start a chat, and it is a worse
 * one for a first message on a phone — so it is offered, plainly, without
 * competing with WhatsApp for attention.
 *
 * Nothing on this page, or anywhere else on this site, transmits a visitor's
 * details anywhere. Tapping WhatsApp opens WhatsApp; tapping Call opens the
 * dialler; tapping email opens the visitor's own mail app. The conversation
 * happens in software the visitor already chose, and this site never sees it.
 *
 * The direct-contact block renders whatever has actually been configured and
 * shows a labelled placeholder for the rest. Publishing an unverified number
 * that does not connect is worse than admitting it is not there yet.
 */
export default function Contact() {
  useDocumentMeta({
    title: `Contact — WhatsApp or Call | ${site.name}`,
    description: `Message ${site.name} on WhatsApp, call, or write by email. Business registration, GST, accounting, tax and trademark support for businesses across Kerala.`,
    path: '/contact',
  })

  const phone = callLink()
  const email = mailtoLink()
  const whatsapp = whatsappLink()
  const hasContactDetails = Boolean(contact.phone || contact.email || contact.whatsapp)

  /*
   * Keyed by the same `icon` the copy is authored against, so a card can be
   * reordered or a fourth route added without a silent mismatch between what a
   * card says and where its link goes.
   */
  const routeLinks = {
    whatsapp,
    phone,
    email,
  } as const

  return (
    <PageShell>
      <PageIntro
        eyebrow={contactPage.eyebrow}
        title={contactPage.heading}
        intro={contactPage.intro}
      >
        <div className="mt-9 flex flex-col gap-3 sm:max-w-md sm:flex-row">
          <WhatsAppButton place="contact-hero" size="lg" variant="whatsapp" className="w-full" />
          <CallButton place="contact-hero" size="lg" variant="secondary" className="w-full" />
        </div>
        {email.ready ? (
          <p className="mt-5 text-sm text-ink-500">
            {ui['section.email']}:{' '}
            <a
              href={email.href}
              className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-800"
            >
              {email.label}
            </a>
          </p>
        ) : null}
      </PageIntro>

      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        {/* ------------------------------------------------------------------
            What each route is for. Descriptive, not three more buttons.
        ------------------------------------------------------------------ */}
        <Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {contactPage.routes
              /*
               * Only the routes that actually have an address behind them. An
               * unconfigured route would otherwise render as a link back to this
               * same page, which reads as a working button and does nothing. The
               * details block below carries the labelled placeholder for the
               * empty case.
               */
              .filter((route) => routeLinks[route.icon].ready)
              .map((route) => {
                const link = routeLinks[route.icon]
                const Icon =
                  route.icon === 'whatsapp'
                    ? IconWhatsApp
                    : route.icon === 'phone'
                      ? IconPhone
                      : IconMail
                const onClick =
                  route.icon === 'whatsapp'
                    ? onWhatsappClick('contact-route')
                    : route.icon === 'phone'
                      ? onPhoneClick('contact-route')
                      : undefined

                return (
                  <div
                    key={route.title}
                    className={`flex flex-col rounded-xl border bg-white p-6 ${
                      // WhatsApp is marked as the primary route, so the page has
                      // one obvious first choice rather than three equal ones.
                      route.icon === 'whatsapp'
                        ? 'border-brand-300 ring-1 ring-brand-200'
                        : 'border-paper-200'
                    }`}
                  >
                    <span className="inline-flex size-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700 ring-1 ring-brand-200 ring-inset">
                      <Icon width={20} height={20} />
                    </span>
                    <h2 className="mt-5 text-base font-semibold tracking-tight text-ink-950">
                      {route.title}
                    </h2>
                    <p className="mt-1 text-xs font-semibold text-brand-700">{route.lead}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">{route.body}</p>
                    <a
                      href={link.href}
                      onClick={onClick}
                      {...(route.icon !== 'email'
                        ? { target: '_blank', rel: 'noreferrer noopener' }
                        : {})}
                      className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-brand-700"
                    >
                      {route.action}
                      <IconArrowRight width={16} height={16} className="shrink-0 text-ink-400" />
                    </a>
                  </div>
                )
              })}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
          <Reveal delay={60}>
            {/* What happens after someone gets in touch */}
            <section aria-labelledby="what-next">
              <h2
                id="what-next"
                className="text-2xl font-semibold tracking-tight text-balance text-ink-950"
              >
                {ui['section.next']}
              </h2>
              <ol className="mt-8 grid gap-px overflow-hidden rounded-xl bg-paper-200 ring-1 ring-ink-300 sm:grid-cols-3">
                {contactPage.nextSteps.map((step, index) => (
                  <Reveal
                    key={step.number}
                    as="li"
                    delay={index * 70}
                    className="h-full bg-white p-6"
                  >
                    <span className="font-mono text-xs font-semibold text-brand-600">
                      {step.number}
                    </span>
                    <h3 className="mt-3 text-base font-semibold tracking-tight text-ink-950">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.body}</p>
                  </Reveal>
                ))}
              </ol>
            </section>
          </Reveal>

          <Reveal delay={80}>
            <div className="space-y-5">
              <div className="rounded-xl border border-paper-200 bg-white p-6">
                <h2 className="text-xs font-semibold tracking-[0.18em] text-ink-500 uppercase">
                  {contactPage.directTitle}
                </h2>

                {hasContactDetails ? (
                  <dl className="mt-5 space-y-4 text-sm">
                    {phone.ready ? (
                      <div>
                        <dt className="flex items-center gap-2 text-ink-500">
                          <IconPhone width={16} height={16} /> {ui['section.phone']}
                        </dt>
                        <dd className="mt-1">
                          <a
                            href={phone.href}
                            onClick={onPhoneClick('contact-details')}
                            className="inline-flex min-h-11 items-center text-base font-medium text-ink-950 hover:text-brand-700"
                          >
                            {phone.label}
                          </a>
                        </dd>
                      </div>
                    ) : null}
                    {whatsapp.ready ? (
                      <div>
                        <dt className="flex items-center gap-2 text-ink-500">
                          <IconWhatsApp width={16} height={16} /> {ui['section.whatsapp']}
                        </dt>
                        <dd className="mt-1">
                          <a
                            href={whatsapp.href}
                            onClick={onWhatsappClick('contact-details')}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex min-h-11 items-center text-base font-medium text-ink-950 hover:text-brand-700"
                          >
                            {whatsapp.label}
                          </a>
                        </dd>
                      </div>
                    ) : null}
                    {email.ready ? (
                      <div>
                        <dt className="flex items-center gap-2 text-ink-500">
                          <IconMail width={16} height={16} /> {ui['section.email']}
                        </dt>
                        <dd className="mt-1">
                          <a
                            href={email.href}
                            className="inline-flex min-h-11 items-center text-base font-medium break-all text-ink-950 hover:text-brand-700"
                          >
                            {email.label}
                          </a>
                        </dd>
                      </div>
                    ) : null}
                    {contact.hours ? (
                      <div>
                        <dt className="flex items-center gap-2 text-ink-500">
                          <IconClock width={16} height={16} /> {ui['section.hours']}
                        </dt>
                        <dd className="mt-1 text-base font-medium text-ink-950">{contact.hours}</dd>
                      </div>
                    ) : null}
                    {contact.address ? (
                      <div>
                        <dt className="flex items-center gap-2 text-ink-500">
                          <IconPin width={16} height={16} /> {ui['section.address']}
                        </dt>
                        <dd className="mt-1 text-base font-medium text-ink-950">{contact.address}</dd>
                      </div>
                    ) : null}
                  </dl>
                ) : (
                  <p className="mt-5 rounded-lg border border-dashed border-ink-300 bg-paper-100 px-4 py-4 text-sm leading-relaxed text-ink-600">
                    <span className="font-semibold text-ink-900">Placeholder.</span>{' '}
                    {ui['placeholder.contact']}
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-paper-200 bg-white p-6">
                <h2 className="text-xs font-semibold tracking-[0.18em] text-ink-500 uppercase">
                  {contact.serviceAreaTitle}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{contact.serviceAreaBody}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {contact.serviceAreas.map((area) => (
                    <li
                      key={area}
                      className="rounded-md bg-paper-100 px-2.5 py-1 text-xs font-medium text-ink-700 ring-1 ring-ink-300 ring-inset"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </PageShell>
  )
}
