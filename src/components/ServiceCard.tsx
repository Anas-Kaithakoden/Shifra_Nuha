import { Link } from 'react-router-dom'
import type { Service } from '../content/site'
import { IconArrowRight, IconAutomation, IconDocument, IconPen, IconTarget } from './icons'

const icons: Record<Service['id'], typeof IconDocument> = {
  start: IconDocument,
  build: IconPen,
  grow: IconTarget,
  automate: IconAutomation,
}

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.id]

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-ink-200 bg-white transition-colors duration-200 hover:border-ink-300">
      <span
        className={`block h-1 w-full bg-gradient-to-r ${service.accent.rule}`}
        aria-hidden="true"
      />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <span
            className={`inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-semibold tracking-[0.16em] ring-1 ring-inset ${service.accent.chip}`}
          >
            {service.step} · {service.title}
          </span>
          <Icon className={`size-5 shrink-0 ${service.accent.icon}`} width={20} height={20} />
        </div>

        <h3 className="mt-5 text-lg leading-snug font-semibold tracking-tight text-ink-950">
          {service.category}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-ink-600">{service.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {service.points.map((point) => (
            <li
              key={point}
              className="rounded-md bg-ink-50 px-2.5 py-1 text-xs font-medium text-ink-700 ring-1 ring-ink-200/70 ring-inset"
            >
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <Link
            to={`/services#${service.id}`}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink-950 transition-colors group-hover:text-brand-700"
          >
            Learn More
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
