import { Link } from 'react-router-dom'
import { ButtonLink } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { IconArrowRight, IconCheck } from '../components/icons'
import { services, site } from '../content/site'
import { useDocumentMeta } from '../lib/seo'
import { PageIntro, PageShell } from './PageShell'

export default function ServicesPage() {
  useDocumentMeta({
    title: `Services — Start, Build, Grow, Automate | ${site.name}`,
    description:
      'Business setup and compliance, branding and digital presence, marketing and lead generation, and AI & business automation — coordinated by one team.',
    path: '/services',
  })

  return (
    <PageShell>
      <PageIntro
        eyebrow="Services"
        title="Start. Build. Grow. Automate."
        intro="Four service areas that work better together than separately. Pick the one you need now — the rest can follow when you are ready."
      />

      <div className="space-y-16 sm:space-y-20">
        {services.map((service, index) => (
          <Reveal key={service.id}>
            <section
              id={service.id}
              className="scroll-mt-28 overflow-hidden rounded-2xl border border-ink-200 bg-white"
            >
              <span className={`block h-1 w-full bg-gradient-to-r ${service.accent.rule}`} aria-hidden="true" />
              <div className="grid gap-10 p-6 sm:p-9 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:p-12">
                <div>
                  <p
                    className={`inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-semibold tracking-[0.16em] ring-1 ring-inset ${service.accent.chip}`}
                  >
                    {service.step} · {service.title}
                  </p>
                  <h2 className="mt-5 text-2xl leading-snug font-semibold tracking-tight text-balance text-ink-950 sm:text-3xl">
                    {service.category}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-pretty text-ink-600">{service.description}</p>

                  <div className="mt-7">
                    <h3 className="text-xs font-semibold tracking-[0.18em] text-ink-500 uppercase">What this means for you</h3>
                    <ul className="mt-4 space-y-2.5">
                      {service.outcomes.map((outcome) => (
                        <li key={outcome} className="flex gap-3 text-sm leading-relaxed text-ink-700">
                          <IconCheck className="mt-0.5 size-4 shrink-0 text-brand-600" width={16} height={16} />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <ButtonLink to="/contact#enquiry" variant="primary">
                      Get started with {service.title.toLowerCase()}
                      <IconArrowRight width={16} height={16} />
                    </ButtonLink>
                    <Link
                      to="/#services"
                      className="inline-flex min-h-11 items-center text-sm font-semibold text-ink-700 transition-colors hover:text-brand-700"
                    >
                      All services
                    </Link>
                  </div>
                </div>

                <div className="rounded-xl border border-ink-200 bg-ink-50 p-6 sm:p-7">
                  <h3 className="text-xs font-semibold tracking-[0.18em] text-ink-500 uppercase">What is included</h3>
                  <ul className="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-1">
                    {service.capabilities.map((capability) => (
                      <li key={capability} className="flex gap-3 text-sm leading-relaxed text-ink-700">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                        {capability}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-t border-ink-200 pt-4 text-xs leading-relaxed text-ink-500">
                    Scope is confirmed after a short discussion, based on your entity type, complexity and
                    requirements.
                  </p>
                </div>
              </div>

              {index < services.length - 1 ? null : (
                <p className="border-t border-ink-200 bg-ink-50 px-6 py-4 text-center text-sm text-ink-500 sm:px-9">
                  Not sure which service applies?{' '}
                  <Link to="/contact#enquiry" className="font-semibold text-brand-700 hover:text-brand-800">
                    Describe the problem
                  </Link>{' '}
                  and we will tell you what is actually needed.
                </p>
              )}
            </section>
          </Reveal>
        ))}
      </div>
    </PageShell>
  )
}
