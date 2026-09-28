import { services, site } from '../content/site'
import { ButtonLink } from './Button'
import { IconArrowRight } from './icons'

const pills = services.map((service) => service.title)

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      {/* Subtle technical grid + soft brand wash, kept very low contrast */}
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand-600/12 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-28 lg:pt-28">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand-300 uppercase">
            Business setup · Digital presence · Growth · Automation
          </p>

          <h1 className="mt-6 text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-6xl">
            {site.tagline}
          </h1>

          <p className="mt-6 text-lg leading-relaxed font-medium text-pretty text-ink-200 sm:text-xl">
            {site.supportingLine}
          </p>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-ink-400 sm:text-lg">
            From business setup and branding to websites, marketing and AI automation, Shifra Nuha Technologies helps
            businesses build and improve their digital operations.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink to="/contact#enquiry" size="lg" variant="onDark" className="w-full sm:w-auto">
              Get Started
              <IconArrowRight width={18} height={18} />
            </ButtonLink>
            <ButtonLink
              to="/services"
              size="lg"
              variant="onDarkGhost"
              className="w-full sm:w-auto"
            >
              Explore Services
            </ButtonLink>
          </div>

          <ul className="mt-12 flex flex-wrap items-center gap-x-2 gap-y-3 text-sm">
            {pills.map((pill, index) => (
              <li key={pill} className="flex items-center gap-2">
                <span className="font-mono text-xs text-brand-400">0{index + 1}</span>
                <span className="font-semibold tracking-wide text-ink-200">{pill}</span>
                {index < pills.length - 1 ? (
                  <span className="ml-2 hidden h-px w-6 bg-white/15 sm:block" aria-hidden="true" />
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
