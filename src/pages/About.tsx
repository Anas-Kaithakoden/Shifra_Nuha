import { CtaPair } from '../components/CtaButtons'
import { Reveal } from '../components/Reveal'
import { aboutPage, site } from '../content/site'
import { useLocale } from '../i18n/LocaleProvider'
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
  const { pick } = useLocale()

  useDocumentMeta({
    title: `About — Business Registration and Professional Support in Kerala | ${site.name}`,
    description:
      `${site.name} helps businesses across Kerala with registration, tax, accounting and professional work — coordinating qualified partners where the work requires them, through one point of contact.`,
    path: '/about',
  })

  return (
    <PageShell>
      <PageIntro
        eyebrow={pick(aboutPage.eyebrow.en, aboutPage.eyebrow.ml)}
        title={pick(aboutPage.heading.en, aboutPage.heading.ml)}
        intro={pick(aboutPage.intro.en, aboutPage.intro.ml)}
      />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* Positioning */}
        <section className="py-14 sm:py-16">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-balance text-ink-950 sm:text-3xl">
                  {pick(aboutPage.positioning.title.en, aboutPage.positioning.title.ml)}
                </h2>
                <p className="mt-6 text-lg leading-relaxed font-medium text-pretty text-ink-900">
                  “{pick(aboutPage.positioning.primary.en, aboutPage.positioning.primary.ml)}”
                </p>
                <p className="mt-3 text-lg leading-relaxed text-pretty text-ink-500">
                  “{pick(aboutPage.positioning.secondary.en, aboutPage.positioning.secondary.ml)}”
                </p>
              </div>
              <p className="text-base leading-relaxed text-pretty text-ink-600 lg:pt-3">
                {pick(aboutPage.positioning.body.en, aboutPage.positioning.body.ml)}
              </p>
            </div>
          </Reveal>
        </section>

        {/* How we work with professional partners */}
        <section className="border-t border-ink-200 py-14 sm:py-16">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-balance text-ink-950 sm:text-3xl">
                  {pick(aboutPage.boundaries.title.en, aboutPage.boundaries.title.ml)}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-pretty text-ink-600">
                  {pick(aboutPage.boundaries.body.en, aboutPage.boundaries.body.ml)}
                </p>
              </div>
              <ul className="space-y-3 lg:pt-2">
                {aboutPage.boundaries.points.map((point) => (
                  <li
                    key={point}
                    className="rounded-xl border border-ink-200 bg-white p-5 text-sm leading-relaxed text-ink-700"
                  >
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
              {pick(aboutPage.partners.title.en, aboutPage.partners.title.ml)}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-ink-600">
              {pick(aboutPage.partners.intro.en, aboutPage.partners.intro.ml)}
            </p>

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

        {/* How an engagement grows */}
        <section className="border-t border-ink-200 py-14 sm:py-16">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-ink-950 sm:text-3xl">
              {pick(aboutPage.journey.title.en, aboutPage.journey.title.ml)}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-ink-600">
              {pick(aboutPage.journey.intro.en, aboutPage.journey.intro.ml)}
            </p>

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

        {/* Closing CTA */}
        <section className="border-t border-ink-200 py-14 sm:py-16">
          <Reveal>
            <div className="rounded-2xl bg-ink-950 p-8 text-white sm:p-10">
              <h2 className="text-2xl font-semibold tracking-tight text-balance text-white sm:text-3xl">
                {pick(aboutPage.closing.title.en, aboutPage.closing.title.ml)}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-ink-300">
                {pick(aboutPage.closing.body.en, aboutPage.closing.body.ml)}
              </p>
              <div className="mt-8">
                <CtaPair place="about-closing" whatsappVariant="whatsapp" callVariant="onDark" />
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </PageShell>
  )
}
