import { BrandingServices } from '../components/BrandingServices'
import { CoreServices } from '../components/CoreServices'
import { CtaBand } from '../components/CtaBand'
import { DigitalServices } from '../components/DigitalServices'
import { FaqSection } from '../components/FaqSection'
import { Hero } from '../components/Hero'
import { JourneyStory } from '../components/journey/JourneyStory'
import { Process } from '../components/Process'
import { ServiceSelector } from '../components/ServiceSelector'
import { StructureComparison } from '../components/StructureComparison'
import { site } from '../content/site'
import { organisationSchema, useDocumentMeta, useJsonLd } from '../lib/seo'

/**
 * ---------------------------------------------------------------------------
 * HOME — IDEA TO LAUNCH
 * ---------------------------------------------------------------------------
 * The page is one argument, told in order:
 *
 *   Hero                 what this is, and how to start
 *   Journey              the four stages of getting a business live
 *   Selector             where the visitor is now, and what comes next
 *   Structures           the one decision that changes everything after it
 *   Services             the work itself, in full
 *   Process              what actually happens after the first message
 *   FAQ                  the questions still standing
 *   Closing CTA          the same action, now earned
 *
 * The journey is the centre of the page and the only dark chapter. Everything
 * around it is warm paper, navy type and a single teal accent, so the section
 * carries the weight rather than a stack of differently coloured bands.
 *
 * There is no price anywhere on this page, and none in the structured data
 * either. The work is quoted per engagement once the case is known, so the only
 * thing the page states about cost is the process for getting one.
 */
export default function Home() {
  useDocumentMeta({
    title: site.seoTitle,
    description: site.seoDescription,
    path: '/',
  })

  useJsonLd(organisationSchema(), [])

  return (
    <>
      <Hero />
      <JourneyStory />
      <ServiceSelector />
      <StructureComparison />
      <CoreServices />
      <DigitalServices />
      <BrandingServices />
      <Process />
      <FaqSection />
      <CtaBand />
    </>
  )
}
