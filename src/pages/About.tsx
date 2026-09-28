import { ButtonLink } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { IconArrowRight } from '../components/icons'
import { aboutPage, site } from '../content/site'
import { useDocumentMeta } from '../lib/seo'
import { PageIntro, PageShell } from './PageShell'

export default function About() {
  useDocumentMeta({
    title: `About — ${site.name}`,
    description: aboutPage.intro,
    path: '/about',
  })

  return (
    <PageShell>
      <PageIntro eyebrow="About" title={aboutPage.heading} intro={aboutPage.intro} />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* Positioning */}
        <section className="py-14 sm:py-16">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-balance text-ink-950 sm:text-3xl">
                  {aboutPage.positioning.title}
                </h2>
                <p className="mt-6 text-lg leading-relaxed font-medium text-ink-900">
                  “{aboutPage.positioning.primary}”
                </p>
                <p className="mt-3 text-lg leading-relaxed text-ink-500">
                  “{aboutPage.positioning.secondary}”
                </p>
              </div>
              <p className="text-base leading-relaxed text-ink-600 lg:pt-3">{aboutPage.positioning.body}</p>
            </div>
          </Reveal>
        </section>

        {/* How we work with professional partners */}
        <section className="border-t border-ink-200 py-14 sm:py-16">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-balance text-ink-950 sm:text-3xl">
                  {aboutPage.boundaries.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-ink-600">{aboutPage.boundaries.body}</p>
              </div>
              <ul className="space-y-3 lg:pt-2">
                {aboutPage.boundaries.points.map((point) => (
                  <li key={point} className="rounded-xl border border-ink-200 bg-white p-5 text-sm leading-relaxed text-ink-700">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        {/* Partner network */}
        <section className="border-t border-ink-200 py-14 sm:py-16">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-ink-950 sm:text-3xl">
              {aboutPage.partners.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-600">{aboutPage.partners.intro}</p>

            {/* The table scrolls horizontally on narrow screens rather than
                forcing the whole page to overflow. */}
            <div className="mt-8 overflow-x-auto rounded-xl border border-ink-200 bg-white">
              <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                <caption className="sr-only">Professional partners and their responsibilities</caption>
                <thead>
                  <tr className="border-b border-ink-200 bg-ink-50">
                    <th
                      scope="col"
                      className="px-5 py-3.5 text-xs font-semibold tracking-[0.14em] text-ink-500 uppercase"
                    >
                      Partner
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3.5 text-xs font-semibold tracking-[0.14em] text-ink-500 uppercase"
                    >
                      Main responsibility
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {aboutPage.partners.rows.map((row) => (
                    <tr key={row.role} className="border-b border-ink-100 last:border-0">
                      <th scope="row" className="px-5 py-4 align-top font-semibold text-ink-950">
                        {row.role}
                      </th>
                      <td className="px-5 py-4 align-top text-ink-600">{row.responsibility}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        {/* Journey */}
        <section className="border-t border-ink-200 py-14 sm:py-16">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-ink-950 sm:text-3xl">
              {aboutPage.journey.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-600">{aboutPage.journey.intro}</p>

            <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {aboutPage.journey.steps.map((step, index) => (
                <Reveal key={step.title} as="li" delay={index * 60} className="h-full">
                  <div className="flex h-full flex-col rounded-xl border border-ink-200 bg-white p-5">
                    <span className="font-mono text-xs font-semibold text-brand-600">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-3 text-sm font-semibold tracking-tight text-ink-950">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{step.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </Reveal>
        </section>

        {/* Principles: outcomes, not tools */}
        <section className="border-t border-ink-200 py-14 sm:py-16">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-ink-950 sm:text-3xl">
              {aboutPage.principles.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-600">{aboutPage.principles.body}</p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {aboutPage.principles.examples.map((example) => (
                <li key={example.weak} className="rounded-xl border border-ink-200 bg-white p-5">
                  <p className="text-sm text-ink-500 line-through decoration-ink-300">{example.weak}</p>
                  <p className="mt-3 flex gap-3 text-sm leading-relaxed font-medium text-ink-900">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                    {example.better}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* Where this is going */}
        <section className="border-t border-ink-200 py-14 sm:py-16">
          <Reveal>
            <div className="rounded-2xl bg-ink-950 p-8 text-white sm:p-10">
              <h2 className="text-2xl font-semibold tracking-tight text-white">{aboutPage.future.title}</h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-300">{aboutPage.future.body}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink to="/contact#enquiry" variant="onDark">
                  Start a conversation
                  <IconArrowRight width={16} height={16} />
                </ButtonLink>
                <ButtonLink to="/services" variant="onDarkGhost">
                  See the services
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </PageShell>
  )
}
