import { Reveal } from '../components/Reveal'
import { legalDocs, type LegalDoc } from '../content/legal'
import { site } from '../content/site'
import { useLocale } from '../i18n/LocaleProvider'
import { useDocumentMeta } from '../lib/seo'
import { PageIntro, PageShell } from './PageShell'

/**
 * Renders either legal document. One component, because the two pages have the
 * same structure and the same job — publish the text, flag that it is a draft
 * a lawyer should confirm, and offer a way to ask a question about it.
 *
 * The draft banner is deliberately prominent. A boilerplate legal page that
 * looks authoritative but has never been reviewed is worse than an obviously
 * provisional one.
 */
export function Legal({ doc }: { doc: LegalDoc }) {
  const { t } = useLocale()

  useDocumentMeta({
    title: `${doc.title} — ${site.name}`,
    description: doc.intro,
    path: `/${doc.slug}`,
  })

  return (
    <PageShell>
      <PageIntro eyebrow={doc.eyebrow} title={doc.title} intro={doc.intro} />

      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
          <Reveal>
            <div className="space-y-5 lg:sticky lg:top-28">
              {doc.draft ? (
                <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
                  <span className="font-semibold">{t('legal.draft')}</span> {t('legal.draftBody')}
                </div>
              ) : null}

              <nav aria-label="On this page" className="rounded-xl border border-ink-200 bg-white p-5">
                <h2 className="text-xs font-semibold tracking-[0.18em] text-ink-500 uppercase">
                  On this page
                </h2>
                <ol className="mt-4 space-y-0.5">
                  {doc.sections.map((section, index) => (
                    <li key={section.heading}>
                      <a
                        href={`#${doc.slug}-${index}`}
                        className="inline-flex min-h-10 items-center gap-2 text-sm text-ink-700 transition-colors hover:text-brand-700"
                      >
                        <span className="font-mono text-xs text-ink-400">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="space-y-9">
              {doc.sections.map((section, index) => (
                <section key={section.heading} id={`${doc.slug}-${index}`} className="scroll-mt-28">
                  <h2 className="text-lg font-semibold tracking-tight text-balance text-ink-950">
                    {section.heading}
                  </h2>
                  <div className="mt-3 space-y-3 text-base leading-relaxed text-ink-600">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-pretty">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <section className="rounded-xl border border-ink-200 bg-white p-6">
                <h2 className="text-lg font-semibold tracking-tight text-ink-950">Questions</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  If anything on this page is unclear, or you think something has gone wrong, tell us and we
                  will pick it up. Use the{' '}
                  <a
                    href="/contact#enquiry"
                    className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800"
                  >
                    enquiry form
                  </a>{' '}
                  or message us on WhatsApp. Contact details are published on the contact page once they are
                  confirmed.
                </p>
              </section>
            </div>
          </Reveal>
        </div>
      </div>
    </PageShell>
  )
}

export default function Terms() {
  return <Legal doc={legalDocs.terms} />
}
