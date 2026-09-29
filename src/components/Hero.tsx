import { Link } from 'react-router-dom'
import { CtaPair } from './CtaButtons'
import { coreServices } from '../content/services'
import { hero, site } from '../content/site'
import { useLocale } from '../i18n/LocaleProvider'
import { ButtonLink } from './Button'
import { IconArrowRight } from './icons'

/**
 * ---------------------------------------------------------------------------
 * HERO
 * ---------------------------------------------------------------------------
 * The page has one job: make a Malayalam-speaking visitor who arrived from a
 * Facebook ad understand within a second that this is a business registration
 * company that serves Kerala, and hand them WhatsApp and a phone number.
 *
 * Everything here earns its place by doing one of those things. There is no
 * illustration, no animation and no claim we cannot back up — a visitor with a
 * question should see the answer and the two buttons before they scroll.
 */
export function Hero() {
  const { pick, t } = useLocale()

  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand-600/12 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-12 pb-16 sm:px-8 sm:pt-20 sm:pb-24 lg:pt-24">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-brand-300 uppercase">
            {pick(hero.eyebrow.en, hero.eyebrow.ml)}
          </p>

          <h1 className="mt-5 text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {pick(hero.heading.en, hero.heading.ml)}
          </h1>

          <p className="mt-6 text-xl leading-snug font-medium text-pretty text-white sm:text-2xl">
            {pick(hero.subheading.en, hero.subheading.ml)}
          </p>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-ink-300 sm:text-lg">
            {pick(hero.supporting.en, hero.supporting.ml)}
          </p>

          {/* The two actions that matter, in that order, full width on mobile. */}
          <div className="mt-9">
            <CtaPair place="hero" whatsappVariant="whatsapp" callVariant="onDark" />
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <ButtonLink
              to="/services"
              size="md"
              variant="ghost"
              className="self-center text-brand-200 hover:bg-white/10 hover:text-white sm:self-start"
            >
              {t('cta.viewServices')}
              <IconArrowRight width={16} height={16} />
            </ButtonLink>
            <p className="flex items-center justify-center gap-2 text-sm text-ink-400 sm:justify-start">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden="true" />
              {pick(hero.note.en, hero.note.ml)}
            </p>
          </div>

          {/* The services, named plainly. This is also the natural, non-stuffed
              place for the search terms the page actually covers. */}
          <div className="mt-12 border-t border-white/10 pt-8">
            <h2 className="text-xs font-semibold tracking-[0.18em] text-ink-400 uppercase">
              What we do across {site.market}
            </h2>
            <ul className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
              {coreServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/${service.slug}`}
                    className="inline-flex min-h-10 items-center rounded-lg bg-white/5 px-3 py-1.5 text-sm font-medium text-ink-200 ring-1 ring-white/10 ring-inset transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-ink-400">
              {t('cta.notSure')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
