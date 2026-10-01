import { Company } from '../components/Company'
import { CoreServices } from '../components/CoreServices'
import { CtaBand } from '../components/CtaBand'
import { DigitalServices } from '../components/DigitalServices'
import { FaqSection } from '../components/FaqSection'
import { Hero } from '../components/Hero'
import { Process } from '../components/Process'
import { WhyUs } from '../components/WhyUs'
import { site } from '../content/site'
import { organisationSchema, useDocumentMeta, useJsonLd } from '../lib/seo'

/**
 * ---------------------------------------------------------------------------
 * HOME
 * ---------------------------------------------------------------------------
 * The order below is the argument, in sequence:
 *
 *   Hero → Professional services → Digital services → How We Work
 *        → Why work with us → About → FAQ → Closing CTA
 *
 * Read as a visitor does: what this is, exactly what they can get done, what
 * else there is, how the work actually runs, why they would use us rather than
 * the next firm on the list, who we are, the questions they are still unsure
 * about, and then the same two buttons.
 *
 * TIERING IS THE STRUCTURE. The professional services come first, on the
 * document surface, because they are what the business does and what a visitor
 * came for. The two digital services come after, on white, deliberately quieter
 * — both are optional, and neither is needed to get a business registered.
 * Presenting them as peers would misrepresent what the company is.
 *
 * THE SURFACES ALTERNATE: white, off-white, white, off-white, off-white, white,
 * off-white, white. Three tones and a hairline between each. That is the whole
 * of the section rhythm — no gradient, no glow, no decorative shape.
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
      <CoreServices />
      <DigitalServices />
      <Process />
      <WhyUs />
      <Company />
      <FaqSection />
      <CtaBand />
    </>
  )
}