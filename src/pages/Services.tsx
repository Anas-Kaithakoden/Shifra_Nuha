import { CtaPair } from '../components/CtaButtons'
import { Reveal } from '../components/Reveal'
import { ServiceCard } from '../components/ServiceCard'
import { IconArrowRight } from '../components/icons'
import { coreServices } from '../content/services'
import { servicesPage, site } from '../content/site'
import { ui } from '../content/ui'
import { callLink, mailtoLink, onPhoneClick } from '../lib/contactLinks'
import { organisationSchema, useDocumentMeta, useJsonLd } from '../lib/seo'
import { PageIntro, PageShell } from './PageShell'

/**
 * ---------------------------------------------------------------------------
 * /services — the hub
 * ---------------------------------------------------------------------------
 * A list, not a series of sales pages. Every card links to the service's own
 * landing page, because that is where the ad lands and where the SEO entry
 * point is — a visitor who wants to know whether GST applies to them should
 * read the GST page, not a summary of it here.
 *
 * The pricing policy sits above the grid rather than being buried at the
 * bottom. The most common question about these services is what it costs, and
 * the honest answer is "it depends, and here is what it depends on". Saying that
 * before the grid — rather than after it, where it reads as an apology — is more
 * persuasive than a figure we would have to defend in every message afterwards.
 */
export default function ServicesPage() {

  useDocumentMeta({
    title: `Business Registration, GST, Tax & Accounting Services in Kerala | ${site.name}`,
    description:
      'Company and LLP registration, GST, income tax, accounting and bookkeeping, auditing, project reports and trademark and legal registration support for businesses across Kerala.',
    path: '/services',
  })

  useJsonLd(
    {
      ...organisationSchema(),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: servicesPage.title,
        itemListElement: coreServices.map((service) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.name,
            description: service.summary,
          },
        })),
      },
    },
    [],
  )

  const phone = callLink()
  const email = mailtoLink()

  return (
    <PageShell>
      <PageIntro
        eyebrow={servicesPage.eyebrow}
        title={servicesPage.title}
        intro={servicesPage.intro}
      >
        <div className="mt-9">
          <CtaPair place="services-hub-hero" whatsappVariant="whatsapp" callVariant="secondary" />
        </div>
      </PageIntro>

      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        {/* The cost policy, stated up front. */}
        <Reveal>
          <div className="rounded-xl border border-paper-200 bg-white p-6 sm:p-7">
            <h2 className="text-base font-semibold tracking-tight text-ink-950">
              {servicesPage.pricingPolicy.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">
              {servicesPage.pricingPolicy.body}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((service, index) => (
            <Reveal key={service.slug} delay={index * 60} className="h-full">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>

        {/* A second, quieter CTA, for anyone who scrolled the whole list. */}
        <Reveal>
          <div className="mt-12 rounded-xl border border-paper-200 bg-white p-7 sm:p-9">
            <h2 className="text-xl font-semibold tracking-tight text-balance text-ink-950 sm:text-2xl">
              {ui['cta.notSure']}
            </h2>
            <div className="mt-6">
              <CtaPair place="services-hub" whatsappVariant="whatsapp" callVariant="secondary" />
            </div>
            <p className="mt-5 text-sm text-ink-500">
              Or{' '}
              <a
                href={phone.href}
                onClick={onPhoneClick('services-hub')}
                className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink-800 hover:text-brand-700"
              >
                {ui['cta.call']}
                <IconArrowRight width={16} height={16} />
              </a>
              , or write to us at{' '}
              {email.ready ? (
                <a
                  href={email.href}
                  className="font-semibold break-all text-ink-800 hover:text-brand-700"
                >
                  {email.label}
                </a>
              ) : (
                <span className="text-ink-500">{ui['placeholder.contact']}</span>
              )}
              .
            </p>
          </div>
        </Reveal>
      </div>
    </PageShell>
  )
}
