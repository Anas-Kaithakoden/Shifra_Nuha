import { Link } from 'react-router-dom'
import type { CoreService } from '../content/services'
import { serviceIcons } from './iconRegistry'
import { useLocale } from '../i18n/LocaleProvider'
import { IconArrowRight } from './icons'

/**
 * A card for one of the nine core services. Each links to its own landing
 * page, because that is where the ad lands and where the SEO entry point is —
 * never a generic contact form.
 */
export function ServiceCard({ service }: { service: CoreService }) {
  const { pick, t } = useLocale()
  const Icon = serviceIcons[service.icon]

  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-ink-200 bg-white transition-colors duration-200 hover:border-brand-300 hover:shadow-sm hover:shadow-ink-950/5">
      <div className="flex flex-1 flex-col p-6">
        <span className="inline-flex size-11 self-center items-center justify-center rounded-lg bg-brand-50 text-brand-700 ring-1 ring-brand-200 ring-inset sm:self-start">
          <Icon width={20} height={20} />
        </span>

        <h3 className="mt-5 text-lg leading-snug font-semibold tracking-tight text-balance text-ink-950">
          {pick(service.name, service.ml?.name)}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-ink-600">
          {pick(service.summary, service.ml?.summary)}
        </p>

        <div className="mt-auto pt-6">
          <Link
            to={`/${service.slug}`}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink-950 transition-colors group-hover:text-brand-700"
          >
            {t('cta.learnMore')}
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
