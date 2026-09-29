import { coreServices } from '../content/services'
import { coreServicesSection } from '../content/site'
import { Reveal } from './Reveal'
import { Section } from './Section'
import { ServiceCard } from './ServiceCard'
import { useLocale } from '../i18n/LocaleProvider'

/**
 * The core services grid. This is the primary section of the homepage and the
 * main navigation to the nine landing pages — the pages the Malayalam ads
 * actually point at.
 */
export function Services() {
  const { pick } = useLocale()

  return (
    <Section
      id="services"
      eyebrow={pick(coreServicesSection.eyebrow.en, coreServicesSection.eyebrow.ml)}
      title={pick(coreServicesSection.title.en, coreServicesSection.title.ml)}
      intro={pick(coreServicesSection.intro.en, coreServicesSection.intro.ml)}
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {coreServices.map((service, index) => (
          <Reveal key={service.slug} delay={index * 60} className="h-full">
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
