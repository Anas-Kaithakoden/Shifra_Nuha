import { coreServices } from '../content/services'
import { coreServicesSection } from '../content/site'
import { Reveal } from './Reveal'
import { Section } from './Section'
import { ServiceCard } from './ServiceCard'

/**
 * The core services grid. This is the primary section of the homepage and the
 * main navigation to the nine landing pages — the pages the ads point at.
 */
export function Services() {
  return (
    <Section
      id="services"
      eyebrow={coreServicesSection.eyebrow}
      title={coreServicesSection.title}
      intro={coreServicesSection.intro}
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
