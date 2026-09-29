import { Audience } from '../components/Audience'
import { CtaBand } from '../components/CtaBand'
import { DigitalServices } from '../components/DigitalServices'
import { FaqSection } from '../components/FaqSection'
import { Hero } from '../components/Hero'
import { Process } from '../components/Process'
import { Services } from '../components/Services'
import { WhyUs } from '../components/WhyUs'
import { site } from '../content/site'
import { organisationSchema, useDocumentMeta, useJsonLd } from '../lib/seo'

/**
 * ---------------------------------------------------------------------------
 * HOME
 * ---------------------------------------------------------------------------
 * The section order is the brief's order, and it is not arbitrary:
 *
 *   Hero → Core Services → Why Us → How It Works → Who We Help
 *        → Secondary Digital Services → FAQ → Closing CTA
 *
 * Everything a person needs in order to decide is above the fold or close to
 * it. The digital services sit deliberately below the professional ones, on a
 * quieter surface, because the advertising this site exists to answer promises
 * registration and compliance help — not web design. The FAQ comes last of the
 * informational sections so that a visitor with an objection has somewhere to
 * take it before the closing CTA, and the closing CTA is the same two buttons
 * as the hero.
 */
export default function Home() {
  useDocumentMeta({
    title: `${site.name} — Business Registration, GST, Tax & Accounting in Kerala`,
    description: site.description,
    path: '/',
  })

  useJsonLd(organisationSchema(), [])

  return (
    <>
      <Hero />
      <Services />
      <WhyUs />
      <Process />
      <Audience />
      <DigitalServices />
      <FaqSection />
      <CtaBand />
    </>
  )
}
