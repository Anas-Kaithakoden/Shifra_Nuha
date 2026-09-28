import { ContactForm } from '../components/ContactForm'
import { Reveal } from '../components/Reveal'
import { contact, contactPage, site } from '../content/site'
import { useDocumentMeta } from '../lib/seo'
import { IconClock, IconMail, IconPhone, IconPin } from '../components/icons'
import { PageIntro, PageShell } from './PageShell'

export default function Contact() {
  useDocumentMeta({
    title: `Contact — ${site.name}`,
    description: `Tell us what your business needs. ${site.name} helps businesses start, build, grow and automate.`,
    path: '/contact',
  })

  const hasContactDetails = Boolean(contact.email || contact.phone || contact.whatsapp)

  return (
    <PageShell>
      <PageIntro eyebrow="Contact" title={contactPage.heading} intro={contactPage.intro} />

      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
          <Reveal>
            <div id="enquiry" className="scroll-mt-28">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="space-y-5">
              <div className="rounded-xl border border-ink-200 bg-white p-6">
                <h2 className="text-xs font-semibold tracking-[0.18em] text-ink-500 uppercase">Direct contact</h2>

                {hasContactDetails ? (
                  <dl className="mt-5 space-y-4 text-sm">
                    {contact.phone ? (
                      <div>
                        <dt className="flex items-center gap-2 text-ink-500">
                          <IconPhone width={16} height={16} /> Phone
                        </dt>
                        <dd className="mt-1">
                          <a
                            href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                            className="text-base font-medium text-ink-950 hover:text-brand-700"
                          >
                            {contact.phone}
                          </a>
                        </dd>
                      </div>
                    ) : null}
                    {contact.whatsapp ? (
                      <div>
                        <dt className="flex items-center gap-2 text-ink-500">
                          <IconPhone width={16} height={16} /> WhatsApp
                        </dt>
                        <dd className="mt-1">
                          <a
                            href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="text-base font-medium text-ink-950 hover:text-brand-700"
                          >
                            {contact.whatsapp}
                          </a>
                        </dd>
                      </div>
                    ) : null}
                    {contact.email ? (
                      <div>
                        <dt className="flex items-center gap-2 text-ink-500">
                          <IconMail width={16} height={16} /> Email
                        </dt>
                        <dd className="mt-1">
                          <a
                            href={`mailto:${contact.email}`}
                            className="text-base font-medium break-all text-ink-950 hover:text-brand-700"
                          >
                            {contact.email}
                          </a>
                        </dd>
                      </div>
                    ) : null}
                    {contact.hours ? (
                      <div>
                        <dt className="flex items-center gap-2 text-ink-500">
                          <IconClock width={16} height={16} /> Hours
                        </dt>
                        <dd className="mt-1 text-base font-medium text-ink-950">{contact.hours}</dd>
                      </div>
                    ) : null}
                    {contact.address ? (
                      <div>
                        <dt className="flex items-center gap-2 text-ink-500">
                          <IconPin width={16} height={16} /> Address
                        </dt>
                        <dd className="mt-1 text-base font-medium text-ink-950">{contact.address}</dd>
                      </div>
                    ) : null}
                  </dl>
                ) : (
                  <p className="mt-5 rounded-lg border border-dashed border-ink-300 bg-ink-50 px-4 py-4 text-sm leading-relaxed text-ink-600">
                    <span className="font-semibold text-ink-900">Placeholder.</span> Our phone, WhatsApp and email
                    details have not been published yet. They will be added here as soon as they are confirmed — the
                    form on this page is the fastest way to reach us in the meantime.
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-ink-200 bg-white p-6">
                <h2 className="text-xs font-semibold tracking-[0.18em] text-ink-500 uppercase">
                  {contactPage.serviceAreaTitle}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{contactPage.serviceAreaBody}</p>
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
          <h2 className="text-2xl font-semibold tracking-tight text-ink-950">What happens after you get in touch</h2>
          <ol className="mt-8 grid gap-px overflow-hidden rounded-xl bg-ink-200 ring-1 ring-ink-200 sm:grid-cols-3">
            {contactPage.nextSteps.map((step) => (
              <Reveal key={step.number} as="li" className="h-full bg-white p-6">
                <span className="font-mono text-xs font-semibold text-brand-600">{step.number}</span>
                <h3 className="mt-3 text-base font-semibold tracking-tight text-ink-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </section>
      </div>
    </PageShell>
  )
}
