import { cta, site } from '../content/site'
import { useLocale } from '../i18n/LocaleProvider'
import { CtaPair } from './CtaButtons'
import { ButtonLink } from './Button'
import { IconArrowRight } from './icons'

/**
 * ---------------------------------------------------------------------------
 * CLOSING CTA BAND
 * ---------------------------------------------------------------------------
 * The last thing on the homepage. Dark, full width, and the same two buttons in
 * the same order as the hero — a visitor who scrolled the whole page and is
 * now ready should not have to scroll back up to find out how.
 *
 * The enquiry form link sits underneath as the quieter third option, so the
 * page is not pushing three equally-weighted actions at someone who only needs
 * one.
 */
export function CtaBand() {
  const { pick, t } = useLocale()

  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 text-white sm:py-24 lg:py-28">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -bottom-40 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-brand-600/12 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl leading-[1.15] font-semibold tracking-tight text-balance sm:text-4xl">
            {pick(cta.title.en, cta.title.ml)}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-pretty text-ink-300 sm:text-lg">
            {pick(cta.body.en, cta.body.ml)}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-400">
            {pick(cta.note.en, cta.note.ml)}
          </p>
        </div>

        <div className="mt-9">
          <CtaPair place="cta-band" whatsappVariant="whatsapp" callVariant="onDark" />
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <ButtonLink
            to="/contact#enquiry"
            size="md"
            variant="ghost"
            className="self-start text-brand-200 hover:bg-white/10 hover:text-white"
          >
            {t('cta.enquiry')}
            <IconArrowRight width={16} height={16} />
          </ButtonLink>
          <p className="text-sm text-ink-400">Serving businesses across {site.market}.</p>
        </div>
      </div>
    </section>
  )
}
