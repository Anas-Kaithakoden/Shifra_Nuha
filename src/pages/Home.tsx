import { CtaBand } from '../components/CtaBand'
import { FaqSection } from '../components/FaqSection'
import { Hero } from '../components/Hero'
import { OfferIncludes } from '../components/OfferIncludes'
import { OtherServices } from '../components/OtherServices'
import { Process } from '../components/Process'
import { RegistrationServices } from '../components/RegistrationServices'
import { Trust } from '../components/Trust'
import { WhyUs } from '../components/WhyUs'
import { registrationOffer } from '../content/offer'
import { site } from '../content/site'
import { organisationSchema, useDocumentMeta, useJsonLd } from '../lib/seo'

/**
 * ---------------------------------------------------------------------------
 * HOME
 * ---------------------------------------------------------------------------
 * A landing page for an ad, not an information site. The section order is the
 * brief's order and it is not arbitrary:
 *
 *   Hero → What the fee covers → Registration services → How It Works
 *        → Why Choose Us → Trust → More Services → FAQ → Final CTA
 *
 * Reading it as the visitor does: the offer and its price, what that price buys,
 * the two registrations it buys it for, how the process works, why they should
 * believe us, everything else we do, the questions they are still unsure about,
 * and then the same two buttons.
 *
 * The order is also a conversion order. The hero, the process and the closing
 * CTA are the three places a decision is made, and they carry the WhatsApp
 * button. Everything in between exists to make one of those three decisions
 * easier. "More Services" is deliberately near the bottom and on the quietest
 * surface, because the advertising points at registration and a founder
 * scrolling eight secondary services before reaching the FAQ is a founder who
 * leaves.
 */
export default function Home() {
  useDocumentMeta({
    title: site.seoTitle,
    description: site.seoDescription,
    path: '/',
  })

  useJsonLd(
    {
      ...organisationSchema(),
      // The offer is the reason the page exists, so it is stated as structured
      // data as well as in the visible copy. `priceSpecification` carries the
      // currency and the qualifier rather than pretending the figure is a
      // fixed total.
      makesOffer: {
        '@type': 'Offer',
        name: registrationOffer.label,
        description: registrationOffer.note,
        price: registrationOffer.amount,
        priceCurrency: 'INR',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: registrationOffer.amount,
          priceCurrency: 'INR',
          valueAddedTaxIncluded: false,
          description: registrationOffer.qualifier,
        },
        availability: 'https://schema.org/LimitedAvailability',
        areaServed: { '@type': 'State', name: site.region, country: 'IN' },
      },
    },
    [],
  )

  return (
    <>
      <Hero />
      <OfferIncludes />
      <RegistrationServices />
      <Process />
      <WhyUs />
      <Trust />
      <OtherServices />
      <FaqSection />
      <CtaBand />
    </>
  )
}
