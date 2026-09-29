import { Link } from 'react-router-dom'
import { serviceBySlug } from '../content/services'
import { otherServices } from '../content/site'
import { digitalIcons } from './iconRegistry'
import { IconArrowRight } from './icons'
import { Reveal } from './Reveal'
import { Section } from './Section'

/**
 * ---------------------------------------------------------------------------
 * MORE SERVICES
 * ---------------------------------------------------------------------------
 * The secondary half of the catalogue, and it is presented as secondary on
 * purpose: the quietest surface on the page, no card grid, and plain lists.
 *
 * The professional services are a two-column checklist, because that is what
 * they are — an index of things we also do. Every one of them is a real service
 * with its own landing page, so the name links straight to it and the search
 * terms are on the page without a paragraph of keyword stuffing.
 *
 * The digital services get a little more room because they are a distinct thing
 * a business may or may not want yet, but they stay text with a small icon. Six
 * illustrated cards here would be the "generic startup landing page" the brief
 * asks us to avoid.
 */
export function OtherServices() {
  return (
    <Section
      id="other-services"
      eyebrow={otherServices.eyebrow}
      title={otherServices.title}
      intro={otherServices.intro}
      surface="muted"
      divided
    >
      <h3 className="text-sm font-semibold tracking-[0.14em] text-ink-500 uppercase">
        {otherServices.professionalTitle}
      </h3>
      <ul className="mt-5 grid gap-x-10 gap-y-1 sm:grid-cols-2">
        {otherServices.professional.map((item) => {
          const service = Object.values(serviceBySlug).find((entry) => entry.name === item)
          const to = service?.path ?? '/services'
          return (
            <li key={item}>
              <Link
                to={to}
                className="inline-flex min-h-11 items-center gap-1.5 text-base text-ink-700 transition-colors hover:text-brand-700"
              >
                {item}
                <IconArrowRight width={15} height={15} className="text-ink-300" />
              </Link>
            </li>
          )
        })}
      </ul>
      <p className="mt-4 text-sm text-ink-500">
        Not on the list, or not sure which applies?{' '}
        <Link
          to="/services"
          className="font-semibold text-ink-800 underline underline-offset-2 hover:text-brand-700"
        >
          See all services
        </Link>{' '}
        or ask us on WhatsApp.
      </p>

      <div className="mt-12 border-t border-paper-200 pt-10">
        <h3 className="text-sm font-semibold tracking-[0.14em] text-ink-500 uppercase">
          {otherServices.digitalTitle}
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-600">
          {otherServices.digitalIntro}
        </p>

        <div className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {otherServices.digital.map((item, index) => {
            const Icon = digitalIcons[item.icon] ?? digitalIcons.automation
            return (
              <Reveal key={item.title} delay={index * 50}>
                <div className="flex gap-3">
                  <Icon width={20} height={20} className="mt-0.5 shrink-0 text-ink-400" />
                  <div>
                    <h4 className="text-sm font-semibold tracking-tight text-ink-900">{item.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-ink-600">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <p className="mt-8 text-sm text-ink-500">
          <span className="font-semibold text-ink-700">Registration is our main service.</span> The
          rest is available once your business exists, and you do not need any of it to get started —
          tell us where you are and we will tell you what actually applies to you.
        </p>
      </div>
    </Section>
  )
}
