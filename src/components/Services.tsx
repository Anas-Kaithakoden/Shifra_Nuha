import { services } from '../content/site'
import { Reveal } from './Reveal'
import { Section } from './Section'
import { ServiceCard } from './ServiceCard'

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="What we do"
      title="Four services. One coordinated team."
      intro="Most businesses need more than one of these. We handle them together instead of sending you from one vendor to the next."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {services.map((service, index) => (
          <Reveal key={service.id} delay={index * 70}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
