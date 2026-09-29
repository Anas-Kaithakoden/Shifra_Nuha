import { Link } from 'react-router-dom'
import type { CoreService } from '../content/services'
import { ui } from '../content/ui'
import { serviceIcons } from './iconRegistry'
import { IconArrowRight } from './icons'

/**
 * A card for one of the nine core services. Each links to its own landing
 * page, because that is where the ad lands and where the SEO entry point is —
 * never a generic contact form.
 */
export function ServiceCard({ service }: { service: CoreService }) {
  const Icon = serviceIcons[service.icon]

  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-paper-200 bg-white transition-colors duration-150 hover:border-brand-300">
      <div className="flex flex-1 flex-col p-6">
        <span className="inline-flex size-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700 ring-1 ring-brand-200 ring-inset">
          <Icon width={20} height={20} />
        </span>

        <h3 className="mt-5 text-lg leading-snug font-semibold tracking-tight text-balance text-ink-950">
          {service.name}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-ink-600">
          {service.summary}
        </p>

        <div className="mt-auto pt-6">
          <Link
            to={`/${service.slug}`}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink-950 transition-colors group-hover:text-brand-700"
          >
            {ui['cta.learnMore']}
            <IconArrowRight
              width={16}
              height={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  )
}
