import { CallButton, WhatsAppButton } from '../components/CtaButtons'
import { ContactForm } from '../components/ContactForm'
import { Reveal } from '../components/Reveal'
import { IconClock, IconMail, IconPhone, IconPin } from '../components/icons'
import { callLink, mailtoLink, whatsappLink } from '../lib/contactLinks'
import { contact, contactPage, site } from '../content/site'
import { useLocale } from '../i18n/LocaleProvider'
import { useDocumentMeta } from '../lib/seo'
import { PageIntro, PageShell } from './PageShell'

/**
 * ---------------------------------------------------------------------------
 * /contact
 * ---------------------------------------------------------------------------
 * WhatsApp and Call come first, in the intro, before the form. That ordering is
 * deliberate and matches every other page: the form is the option for someone
 * who would rather not start a conversation yet, not the main event.
 *
 * The direct-contact block renders whatever has actually been configured and
 * shows a labelled placeholder for the rest. Publishing an unverified number
 * that does not connect is worse than admitting it is not there yet.
 */
export default function Contact() {
  const { pick, t } = useLocale()

  useDocumentMeta({
    title: `Contact — WhatsApp, Call or Enquiry Form | ${site.name}`,
    description: `Message ${site.name} on WhatsApp, call, or send an enquiry. Business registration, GST, accounting, tax and trademark support for businesses across Kerala.`,
    path: '/contact',
  })

  const phone = callLink()
  const email = mailtoLink()
  const whatsapp = whatsappLink()
  const hasContactDetails = Boolean(contact.phone || contact.email || contact.whatsapp)

  return (
    <PageShell>
      <PageIntro
        eyebrow={pick(contactPage.eyebrow.en, contactPage.eyebrow.ml)}
        title={pick(contactPage.heading.en, contactPage.heading.ml)}
        intro={pick(contactPage.intro.en, contactPage.intro.ml)}
      >
        <div className="mt-9 flex flex-col gap-3 sm:max-w-md sm:flex-row">
          <WhatsAppButton place="contact-hero" size="lg" variant="whatsapp" className="w-full" />
          <CallButton place="contact-hero" size="lg" variant="onDark" className="w-full" />
        </div>
      </PageIntro>

      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
          <Reveal>
            <div id="enquiry" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold tracking-tight text-ink-950">
                {pick(contactPage.formTitle.en, contactPage.formTitle.ml)}
              </h2>
              <p className="mt-3 mb-6 max-w-2xl text-sm leading-relaxed text-ink-600">
                {pick(contactPage.formIntro.en, contactPage.formIntro.ml)}
              </p>
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="space-y-5">
              <div className="rounded-xl border border-ink-200 bg-white p-6">
                <h2 className="text-xs font-semibold tracking-[0.18em] text-ink-500 uppercase">
                  {pick(contactPage.directTitle.en, contactPage.directTitle.ml)}
                </h2>

                {hasContactDetails ? (
                  <dl className="mt-5 space-y-4 text-sm">
                    {phone.ready ? (
                      <div>
                        <dt className="flex items-center gap-2 text-ink-500">
                          <IconPhone width={16} height={16} /> {t('section.phone')}
                        </dt>
                        <dd className="mt-1">
                          <a
                            href={phone.href}
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
                          <IconPhone width={16} height={16} /> {t('section.whatsapp')}
                        </dt>
                        <dd className="mt-1">
                          <a
                            href={whatsapp.href}
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
                          <IconMail width={16} height={16} /> {t('section.email')}
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
                          <IconClock width={16} height={16} /> {t('section.hours')}
                        </dt>
                        <dd className="mt-1 text-base font-medium text-ink-950">{contact.hours}</dd>
                      </div>
                    ) : null}
                    {contact.address ? (
                      <div>
                        <dt className="flex items-center gap-2 text-ink-500">
                          <IconPin width={16} height={16} /> {t('section.address')}
                        </dt>
                        <dd className="mt-1 text-base font-medium text-ink-950">{contact.address}</dd>
                      </div>
                    ) : null}
                  </dl>
                ) : (
                  <p className="mt-5 rounded-lg border border-dashed border-ink-300 bg-ink-50 px-4 py-4 text-sm leading-relaxed text-ink-600">
                    <span className="font-semibold text-ink-900">Placeholder.</span>{' '}
                    {t('placeholder.contact')}
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-ink-200 bg-white p-6">
                <h2 className="text-xs font-semibold tracking-[0.18em] text-ink-500 uppercase">
                  {contact.serviceAreaTitle}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{contact.serviceAreaBody}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {contact.serviceAreas.map((area) => (
                    <li
                      key={area}
                      className="rounded-md bg-ink-50 px-2.5 py-1 text-xs font-medium text-ink-700 ring-1 ring-ink-200 ring-inset"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* What happens after an enquiry */}
        <section className="mt-16 border-t border-ink-200 pt-12 sm:mt-20">
          <h2 className="text-2xl font-semibold tracking-tight text-balance text-ink-950">
            {t('section.next')}
          </h2>
          <ol className="mt-8 grid gap-px overflow-hidden rounded-xl bg-ink-200 ring-1 ring-ink-200 sm:grid-cols-3">
            {contactPage.nextSteps.map((step, index) => (
              <Reveal key={step.number} as="li" delay={index * 70} className="h-full bg-white p-6">
                <span className="font-mono text-xs font-semibold text-brand-600">{step.number}</span>
                <h3 className="mt-3 text-base font-semibold tracking-tight text-ink-950">
                  {pick(step.title.en, step.title.ml)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {pick(step.body.en, step.body.ml)}
                </p>
              </Reveal>
            ))}
          </ol>
        </section>
      </div>
    </PageShell>
  )
}
