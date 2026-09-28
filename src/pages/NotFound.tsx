import { ButtonLink } from '../components/Button'
import { notFound, site } from '../content/site'
import { useDocumentMeta } from '../lib/seo'

export default function NotFound() {
  useDocumentMeta({
    title: `Page not found — ${site.name}`,
    description: 'The page you are looking for does not exist or has moved.',
    path: '/404',
  })

  return (
    <section className="bg-ink-50">
      <div className="mx-auto flex min-h-[60vh] w-full max-w-6xl flex-col items-start justify-center px-5 py-24 sm:px-8">
        <p className="font-mono text-sm font-semibold text-brand-600">404</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">{notFound.heading}</h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-ink-600">{notFound.body}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to="/">{notFound.button}</ButtonLink>
          <ButtonLink to="/services" variant="secondary">
            View services
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
