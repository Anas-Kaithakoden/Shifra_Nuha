import { Link } from 'react-router-dom'
import { ButtonLink } from '../components/Button'
import { coreServices } from '../content/services'
import { notFound, site } from '../content/site'
import { ui } from '../content/ui'
import { useDocumentMeta } from '../lib/seo'
import { IconArrowRight } from '../components/icons'

/**
 * The 404. Kept out of the index, and — more usefully — used as a way back into
 * the nine service pages, because a mistyped or stale URL is very often someone
 * looking for the thing they came here for.
 */
export default function NotFound() {

  useDocumentMeta({
    title: `Page not found — ${site.name}`,
    description: 'The page you are looking for does not exist or has moved.',
    path: '/404',
    noindex: true,
  })

  return (
    <section className="bg-paper-100">
      <div className="mx-auto min-h-[60vh] w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <p className="font-mono text-sm font-semibold text-brand-600">404</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-ink-950 sm:text-4xl">
          {notFound.heading}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-ink-600">
          {notFound.body}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to="/">{notFound.button}</ButtonLink>
          <ButtonLink to="/services" variant="secondary">
            {ui['cta.viewServices']}
          </ButtonLink>
        </div>

        <nav aria-label={ui['nav.servicesList']} className="mt-12 border-t border-paper-200 pt-8">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-ink-500 uppercase">
            {ui['nav.servicesList']}
          </h2>
          <ul className="mt-4 grid gap-0.5 sm:grid-cols-2 lg:grid-cols-3">
            {coreServices.map((service) => (
              <li key={service.slug}>
                <Link
                  to={service.path}
                  className="inline-flex min-h-11 items-center gap-1.5 text-sm text-ink-700 transition-colors hover:text-brand-700"
                >
                  {service.name}
                  <IconArrowRight width={14} height={14} className="text-ink-400" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
