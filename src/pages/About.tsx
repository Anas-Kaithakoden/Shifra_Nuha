import { CtaPair } from '../components/CtaButtons'
import { Reveal } from '../components/Reveal'
import { aboutPage, site } from '../content/site'
import { useDocumentMeta } from '../lib/seo'
import { PageIntro, PageShell } from './PageShell'

/**
 * ---------------------------------------------------------------------------
 * /about
 * ---------------------------------------------------------------------------
 * Short on purpose. This is a conversion site, not a company profile: the
 * visitor arrived from an ad about registering a business, and the only thing
 * they need from this page is reassurance that the people who will do the work
 * know where the boundary of their own competence is.
 *
 * The partner section is the part that earns its place. Anyone registering a
 * company in India is told to "use a professional"; saying plainly which
 * professional does which part, and that we will tell you in advance when an
 * external partner is involved, is a stronger claim than any adjective.
 */
export default function About() {

  useDocumentMeta({
    title: `About — Business Registration and Professional Support in Kerala | ${site.name}`,
    description:
      `${site.name} helps businesses across Kerala with registration, tax, accounting and professional work — coordinating qualified partners where the work requires them, through one point of contact.`,
    path: '/about',
  })

  return (
    <PageShell>
      <PageIntro
        eyebrow={aboutPage.eyebrow}
        title={aboutPage.heading}
        intro={aboutPage.intro}
      />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* Positioning */}
        <section className="py-14 sm:py-16">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-balance text-ink-950 sm:text-3xl">
                  {aboutPage.positioning.title}
                </h2>
                <p className="mt-6 text-lg leading-relaxed font-medium text-pretty text-ink-900">
                  “{aboutPage.positioning.primary}”
                </p>
                <p className="mt-3 text-lg leading-relaxed text-pretty text-ink-500">
                  “{aboutPage.positioning.secondary}”
                </p>
              </div>
              <p className="text-base leading-relaxed text-pretty text-ink-600 lg:pt-3">
                {aboutPage.positioning.body}
              </p>
            </div>
          </Reveal>
        </section>

        {/* How we work with professional partners */}
        <section className="border-t border-paper-200 py-14 sm:py-16">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-balance text-ink-950 sm:text-3xl">
                  {aboutPage.boundaries.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-pretty text-ink-600">
                  {aboutPage.boundaries.body}
                </p>
              </div>
              <ul className="space-y-3 lg:pt-2">
                {aboutPage.boundaries.points.map((point) => (
                  <li
                    key={point}
                    className="rounded-xl border border-paper-200 bg-white p-5 text-sm leading-relaxed text-ink-700"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        {/* Partner network */}
        <section className="border-t border-paper-200 py-14 sm:py-16">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-ink-950 sm:text-3xl">
              {aboutPage.partners.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-ink-600">
              {aboutPage.partners.intro}
            </p>

            {/*
              A list, not a table. This was a two-column table with a
              `min-w-[520px]` and an `overflow-x-auto` wrapper, which meant a
              sideways scroll inside a 320px screen to read seven short rows.
              The content is a role and its responsibility, not a data
              comparison, so a definition list reads better at every width and
              there is nothing left to overflow.
            */}
            <dl className="mt-8 divide-y divide-paper-200 overflow-hidden rounded-xl border border-paper-200 bg-white">
              {aboutPage.partners.rows.map((row) => (
                <div key={row.role} className="p-5 sm:flex sm:gap-8 sm:p-6">
                  <dt className="text-sm font-semibold tracking-tight text-ink-950 sm:w-56 sm:shrink-0">
                    {row.role}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-ink-600 sm:mt-0">{row.responsibility}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* How an engagement grows */}
        <section className="border-t border-paper-200 py-14 sm:py-16">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-ink-950 sm:text-3xl">
              {aboutPage.journey.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-ink-600">
              {aboutPage.journey.intro}
            </p>

            <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {aboutPage.journey.steps.map((step, index) => (
                <Reveal key={step.title} as="li" delay={index * 60} className="h-full">
                  <div className="flex h-full flex-col rounded-xl border border-paper-200 bg-white p-5">
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

        {/* Closing CTA */}
        <section className="border-t border-paper-200 py-14 sm:py-16">
          <Reveal>
            <div className="rounded-xl border border-paper-200 bg-white p-7 sm:p-9">
              <h2 className="text-xl font-semibold tracking-tight text-balance text-ink-950 sm:text-2xl">
                {aboutPage.closing.title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-ink-600">
                {aboutPage.closing.body}
              </p>
              <div className="mt-7">
                <CtaPair place="about-closing" whatsappVariant="whatsapp" callVariant="secondary" />
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </PageShell>
  )
}
