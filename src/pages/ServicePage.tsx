import { Link } from 'react-router-dom'
import { CallButton, WhatsAppButton } from '../components/CtaButtons'
import { ContactForm } from '../components/ContactForm'
import { Faq } from '../components/Faq'
import { Reveal } from '../components/Reveal'
import { serviceIcons } from '../components/iconRegistry'
import { IconArrowRight, IconCheck, IconWarning } from '../components/icons'
import { coreServices, serviceBySlug, type CoreService } from '../content/services'
import { useLocale } from '../i18n/LocaleProvider'
import { absoluteUrl, siteConfig, siteOrigin } from '../config/site.config'
import { faqSchema, useDocumentMeta, useJsonLd } from '../lib/seo'
import { PageIntro, PageShell } from './PageShell'

/**
 * ---------------------------------------------------------------------------
 * SERVICE LANDING PAGE — one per service, nine in total.
 * ---------------------------------------------------------------------------
 * These nine pages are the whole point of the site. Each is where an ad lands,
 * and each is an entry point to search, so each carries its own title and
 * description, one H1, its own copy, and its own structured data.
 *
 * The structure answers the six questions a person actually has, in the order
 * they ask them:
 *
 *  1. Is this the right service for me?      — summary, "who needs this"
 *  2. What does it actually involve?         — the plain-English explanation
 *  3. What do I get, and what do you not?    — includes, and the caveats
 *  4. What do you need from me?             — documents and information
 *  5. What will it cost and how long?       — honest answer, not a promise
 *  6. How do I start?                        — WhatsApp and Call, everywhere
 *
 * The WhatsApp button is prefilled with a message about that specific service,
 * so the conversation starts with the visitor's actual interest already stated.
 */
export function ServicePage({ service }: { service: CoreService }) {
  const { locale, pick, t } = useLocale()
  const Icon = serviceIcons[service.icon] ?? serviceIcons.document
  const message = service.whatsapp[locale === 'ml' ? 'ml' : 'en']
  const related = service.related.map((slug) => serviceBySlug[slug]).filter(Boolean)
  const pricingLine = service.startingFrom
    ? `From ₹${service.startingFrom}. ${service.pricingNote}`
    : service.pricingNote

  useDocumentMeta({
    title: service.seo.title,
    description: service.seo.description,
    path: service.path,
  })

  useJsonLd(
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: pick(service.name, service.ml?.name),
      description: pick(service.summary, service.ml?.summary),
      serviceType: service.name,
      ...(siteOrigin
        ? {
            url: absoluteUrl(service.path),
            provider: {
              '@type': 'ProfessionalService',
              name: siteConfig.COMPANY_NAME,
              ...(siteOrigin ? { url: siteOrigin } : {}),
            },
          }
        : {}),
      areaServed: { '@type': 'State', name: 'Kerala', country: 'IN' },
      availableLanguage: ['en', 'ml'],
    },
    [service.slug, locale],
  )

  useJsonLd(
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') || undefined },
        { '@type': 'ListItem', position: 2, name: 'Services', item: absoluteUrl('/services') || undefined },
        { '@type': 'ListItem', position: 3, name: service.name, item: absoluteUrl(service.path) || undefined },
      ].filter((entry) => entry.item),
    },
    [service.slug],
  )

  useJsonLd(faqSchema(service.faqs), [service.slug])

  return (
    <PageShell>
      <PageIntro
        eyebrow="Service"
        title={pick(service.name, service.ml?.name)}
        intro={pick(service.summary, service.ml?.summary)}
        meta={pricingLine}
      >
        <div className="mt-9 flex flex-col gap-3 sm:max-w-md sm:flex-row">
          <WhatsAppButton place="service-hero" message={message} size="lg" variant="whatsapp" className="w-full" />
          <CallButton place="service-hero" size="lg" variant="onDark" className="w-full" />
        </div>
      </PageIntro>

      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-14">
          {/* ---------------------------------------------------------------
              Main column
          ---------------------------------------------------------------- */}
          <div>
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-ink-500">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link to="/" className="inline-flex min-h-10 items-center hover:text-brand-700">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link to="/services" className="inline-flex min-h-10 items-center hover:text-brand-700">
                    Services
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-ink-900">{service.name}</li>
              </ol>
            </nav>

            {/* Explanation — the "clear explanation" the brief asks for. */}
            <div className="space-y-8">
              {service.explanation.map((block) => (
                <section key={block.heading}>
                  <h2 className="text-xl font-semibold tracking-tight text-balance text-ink-950">
                    {block.heading}
                  </h2>
                  <div className="mt-3 space-y-3 text-base leading-relaxed text-pretty text-ink-600">
                    {block.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Who needs this */}
            <section className="mt-12 border-t border-ink-200 pt-10">
              <h2 className="text-xl font-semibold tracking-tight text-ink-950">
                {t('section.whoNeeds')}
              </h2>
              <ul className="mt-5 space-y-2.5">
                {service.whoNeeds.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-relaxed text-ink-600">
                    <IconCheck className="mt-1 size-4 shrink-0 text-brand-600" width={16} height={16} />
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* What is included */}
            <section className="mt-12 border-t border-ink-200 pt-10">
              <h2 className="text-xl font-semibold tracking-tight text-ink-950">
                {t('section.includes')}
              </h2>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {service.includes.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-lg border border-ink-200 bg-white p-4 text-sm leading-relaxed text-ink-700"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Process */}
            <section className="mt-12 border-t border-ink-200 pt-10">
              <h2 className="text-xl font-semibold tracking-tight text-ink-950">
                {t('section.process')}
              </h2>
              <ol className="mt-6 space-y-px overflow-hidden rounded-xl bg-ink-200">
                {service.process.map((step, index) => (
                  <Reveal key={step.title} as="li" className="flex gap-4 bg-white p-5">
                    <span className="font-mono text-xs font-semibold text-brand-600">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold tracking-tight text-ink-950">{step.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{step.body}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
              <p className="mt-4 text-sm leading-relaxed text-ink-500">
                The order of the steps, and how long each takes, depends on the authority involved. We will
                tell you what is realistic for your case before you commit to anything.
              </p>
            </section>

            {/* Documents */}
            <section className="mt-12 border-t border-ink-200 pt-10">
              <h2 className="text-xl font-semibold tracking-tight text-ink-950">
                {t('section.documents')}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">
                A general list, so you can start gathering what you have. The exact list depends on your
                case, and we will confirm it before we start.
              </p>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {service.documents.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-lg border border-ink-200 bg-white p-4 text-sm leading-relaxed text-ink-700"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ink-400" aria-hidden="true" />
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Caveats — stated up front, on purpose */}
            <section className="mt-12 border-t border-ink-200 pt-10">
              <h2 className="flex items-center gap-2.5 text-xl font-semibold tracking-tight text-ink-950">
                <IconWarning width={20} height={20} className="shrink-0 text-amber-600" />
                {t('section.caveats')}
              </h2>
              <div className="mt-5 space-y-3 rounded-xl border border-amber-200 bg-amber-50/70 p-5">
                {service.caveats.map((item) => (
                  <p key={item} className="text-sm leading-relaxed text-amber-950">
                    {item}
                  </p>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="mt-12 border-t border-ink-200 pt-10">
              <h2 className="text-xl font-semibold tracking-tight text-ink-950">{t('section.faq')}</h2>
              <Faq items={service.faqs} className="mt-6" />
            </section>

            {/* Related services — internal linking, and genuinely useful */}
            {related.length > 0 ? (
              <section className="mt-12 border-t border-ink-200 pt-10">
                <h2 className="text-xl font-semibold tracking-tight text-ink-950">
                  {t('section.related')}
                </h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link
                        to={item.path}
                        className="group flex h-full items-center justify-between gap-2 rounded-lg border border-ink-200 bg-white p-4 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-300 hover:text-brand-700"
                      >
                        {item.name}
                        <IconArrowRight
                          width={16}
                          height={16}
                          className="shrink-0 text-ink-400 transition-transform group-hover:translate-x-0.5"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {/* Secondary CTA: the form, prefilled with this service */}
            <section className="mt-12 border-t border-ink-200 pt-10">
              <h2 className="text-xl font-semibold tracking-tight text-ink-950">
                {t('section.form')}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-600">
                WhatsApp and calling are faster and we read both. Use the form if you would rather not start
                a conversation — the service is already filled in.
              </p>
              <div className="mt-6">
                <ContactForm defaultService={service.name} />
              </div>
            </section>
          </div>

          {/* ---------------------------------------------------------------
              Aside: the CTA, kept in view for the length of the page
          ---------------------------------------------------------------- */}
          <aside className="lg:pt-0">
            <div className="lg:sticky lg:top-28">
              <div className="rounded-xl border border-ink-200 bg-white p-6">
                <span className="inline-flex size-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700 ring-1 ring-brand-200 ring-inset">
                  <Icon width={20} height={20} />
                </span>
                <h2 className="mt-5 text-base font-semibold tracking-tight text-balance text-ink-950">
                  Talk to someone about {pick(service.name, service.ml?.name).toLowerCase()}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-600">
                  Tell us your situation and we will say what applies, what it involves, and what it costs.
                </p>

                <div className="mt-6 space-y-3">
                  <WhatsAppButton
                    place="service-aside"
                    message={message}
                    size="lg"
                    variant="whatsapp"
                    className="w-full"
                  />
                  <CallButton place="service-aside" size="lg" variant="secondary" className="w-full" />
                </div>

                <p className="mt-4 text-xs leading-relaxed text-ink-500">{service.pricingNote}</p>
              </div>

              <nav aria-label="All services" className="mt-5 rounded-xl border border-ink-200 bg-white p-6">
                <h2 className="text-xs font-semibold tracking-[0.18em] text-ink-500 uppercase">
                  {t('nav.servicesList')}
                </h2>
                <ul className="mt-3 space-y-0.5">
                  {coreServices.map((item) => (
                    <li key={item.slug}>
                      <Link
                        to={item.path}
                        aria-current={item.slug === service.slug ? 'page' : undefined}
                        className={`inline-flex min-h-10 items-center text-sm transition-colors hover:text-brand-700 ${
                          item.slug === service.slug
                            ? 'font-semibold text-ink-950'
                            : 'text-ink-600'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </PageShell>
  )
}

export default ServicePage
