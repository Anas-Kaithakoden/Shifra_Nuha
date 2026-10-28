import { Company } from '../components/Company'
import { CoreServices } from '../components/CoreServices'
import { CtaBand } from '../components/CtaBand'
import { FaqSection } from '../components/FaqSection'
import { Process } from '../components/Process'
import { WhyUs } from '../components/WhyUs'
import { servicesPage, site } from '../content/site'
import { organisationSchema, useDocumentMeta, useJsonLd } from '../lib/seo'
import { PageIntro, PageShell } from './PageShell'

/**
 * /services - Business Solutions hub
 */
export default function ServicesPage() {
  useDocumentMeta({
    title: `Business Solutions | ${site.name}`,
    description: servicesPage.intro,
    path: '/services',
  })

  useJsonLd(organisationSchema(), [])

  return (
    <PageShell>
      <PageIntro eyebrow={servicesPage.eyebrow} title={servicesPage.heading} intro={servicesPage.intro} />
      <CoreServices />
      <Process />
      <WhyUs />
      <Company />
      <FaqSection />
      <CtaBand />
    </PageShell>
  )
}