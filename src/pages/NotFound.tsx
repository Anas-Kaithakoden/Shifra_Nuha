import { Link } from 'react-router-dom'
import { WhatsAppButton } from '../components/CtaButtons'
import { Reveal } from '../components/Reveal'
import { notFound, site } from '../content/site'
import { useDocumentMeta } from '../lib/seo'
import { PageIntro, PageShell } from './PageShell'

export default function NotFound() {
  useDocumentMeta({
    title: `Page not found | ${site.name}`,
    description: notFound.body,
    path: '/404',
  })

  return (
    <PageShell>
      <PageIntro eyebrow={notFound.eyebrow} title={notFound.heading} intro={notFound.body}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <WhatsAppButton place="not-found" size="lg" variant="whatsapp" />
          <Link
            to={notFound.ctaTo}
            className="inline-flex items-center justify-center rounded-md border border-paper-300 px-6 py-3 text-sm font-semibold text-ink-900 transition-colors hover:bg-paper-100"
          >
            {notFound.ctaLabel}
          </Link>
        </div>
      </PageIntro>
      <Reveal>
        <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
          <p className="text-sm text-ink-600">
            Try going back to <Link to="/" className="font-medium text-brand-700 underline">home</Link> or{' '}
            <Link to="/services" className="font-medium text-brand-700 underline">business solutions</Link>.
          </p>
        </div>
      </Reveal>
    </PageShell>
  )
}