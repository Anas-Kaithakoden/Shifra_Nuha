import { Link } from 'react-router-dom'
import { CtaPair } from '../components/CtaButtons'
import { Reveal } from '../components/Reveal'
import { ServiceCard } from '../components/ServiceCard'
import { IconArrowRight } from '../components/icons'
import { coreServices } from '../content/services'
import { servicesPage, site } from '../content/site'
import { useLocale } from '../i18n/LocaleProvider'
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
 * early is more persuasive than a number we would later have to retract.
 */
export default function ServicesPage() {
  const { pick, t } = useLocale()

  useDocumentMeta({
    title: `Business Registration, GST, Tax & Accounting Services in Kerala | ${site.name}`,
    description:
      'Company incorporation, LLP and partnership registration, GST, accounting and bookkeeping, income tax, auditing, project reports and trademark support for businesses across Kerala.',
    path: '/services',
  })

  useJsonLd(
    {
      ...organisationSchema(),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: pick(servicesPage.title.en, servicesPage.title.ml),
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

  return (
    <PageShell>
      <PageIntro
        eyebrow={pick(servicesPage.eyebrow.en, servicesPage.eyebrow.ml)}
        title={pick(servicesPage.title.en, servicesPage.title.ml)}
        intro={pick(servicesPage.intro.en, servicesPage.intro.ml)}
      >
        <div className="mt-9">
          <CtaPair place="services-hub-hero" whatsappVariant="whatsapp" callVariant="onDark" />
        </div>
      </PageIntro>

      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        {/* The cost policy, stated up front. */}
        <Reveal>
          <div className="rounded-xl border border-ink-200 bg-white p-6 sm:p-7">
            <h2 className="text-base font-semibold tracking-tight text-ink-950">
              {pick(servicesPage.pricingPolicy.title.en, servicesPage.pricingPolicy.title.ml)}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">
              {pick(servicesPage.pricingPolicy.body.en, servicesPage.pricingPolicy.body.ml)}
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
          <div className="mt-12 rounded-2xl bg-ink-950 p-8 text-white sm:p-10">
            <h2 className="text-2xl font-semibold tracking-tight text-balance text-white sm:text-3xl">
              {t('cta.notSure')}
            </h2>
            <div className="mt-7">
              <CtaPair place="services-hub" whatsappVariant="whatsapp" callVariant="onDark" />
            </div>
            <p className="mt-6 text-sm text-ink-400">
              Or{' '}
              <Link
                to="/contact#enquiry"
                className="inline-flex min-h-10 items-center gap-1.5 font-semibold text-brand-200 hover:text-white"
              >
                {t('cta.enquiry')}
                <IconArrowRight width={16} height={16} />
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </PageShell>
  )
}
