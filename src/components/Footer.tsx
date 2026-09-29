import { Link } from 'react-router-dom'
import { coreServices } from '../content/services'
import { footer, site, social } from '../content/site'
import { CONFIG } from '../config/site.config'
import { callLink, mailtoLink, whatsappLink } from '../lib/contactLinks'
import { useLocale } from '../i18n/LocaleProvider'
import { WhatsAppButton } from './CtaButtons'
import { Logo } from './Logo'
import { IconArrowRight, IconMail, IconPhone } from './icons'

const socialEntries = [
  { key: 'linkedin', label: 'LinkedIn', href: social.linkedin },
  { key: 'facebook', label: 'Facebook', href: social.facebook },
  { key: 'instagram', label: 'Instagram', href: social.instagram },
  { key: 'x', label: 'X', href: social.x },
] as const

/**
 * ---------------------------------------------------------------------------
 * FOOTER
 * ---------------------------------------------------------------------------
 * Carries the same three things as the rest of the site: the nine services as
 * real links (internal linking matters for search, and it is how people reach a
 * specific page from a phone), the direct contact details, and the legal pages.
 *
 * The extra bottom padding on small screens leaves room for the sticky mobile
 * bar so it never sits on top of the last line.
 */
export function Footer() {
  const { pick, t } = useLocale()
  const year = new Date().getFullYear()
  const activeSocials = socialEntries.filter((entry) => entry.href)
  const whatsapp = whatsappLink()
  const phone = callLink()
  const email = mailtoLink()
  const hasContact = Boolean(phone.ready || email.ready)

  return (
    <footer className="border-t border-ink-200 bg-ink-50">
      {/* Extra bottom room on small screens so the sticky WhatsApp / Call bar
          never covers the last line of the page. */}
      <div className="mx-auto w-full max-w-6xl px-5 pt-14 pb-28 sm:px-8 sm:pt-16 sm:pb-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm font-semibold tracking-tight text-ink-950">
              {site.tagline}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">
              {pick(footer.blurb.en, footer.blurb.ml)}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-600">
              {t('lang.note')}
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold tracking-[0.18em] text-ink-500 uppercase">
              {pick(footer.servicesTitle.en, footer.servicesTitle.ml)}
            </h2>
            <ul className="mt-4 grid gap-0.5 sm:grid-cols-2 lg:grid-cols-1">
              {coreServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/${service.slug}`}
                    className="inline-flex min-h-10 items-center text-sm text-ink-700 transition-colors hover:text-brand-700"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold tracking-[0.18em] text-ink-500 uppercase">
              {t('nav.contact')}
            </h2>

            {hasContact ? (
              <ul className="mt-4 space-y-2 text-sm text-ink-700">
                {phone.ready ? (
                  <li>
                    <a href={phone.href} className="inline-flex min-h-10 items-center gap-2 hover:text-brand-700">
                      <IconPhone width={15} height={15} className="text-ink-400" />
                      {phone.label}
                    </a>
                  </li>
                ) : null}
                {email.ready ? (
                  <li>
                    <a
                      href={email.href}
                      className="inline-flex min-h-10 items-center gap-2 break-all hover:text-brand-700"
                    >
                      <IconMail width={15} height={15} className="shrink-0 text-ink-400" />
                      {email.label}
                    </a>
                  </li>
                ) : null}
              </ul>
            ) : (
              <p className="mt-4 rounded-lg border border-dashed border-ink-300 bg-white px-3 py-3 text-sm leading-relaxed text-ink-500">
                {t('placeholder.contact')}
              </p>
            )}

            {whatsapp.ready ? (
              <p className="mt-4 text-sm text-ink-600">
                WhatsApp:{' '}
                <a
                  href={whatsapp.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-10 items-center font-medium text-ink-950 hover:text-brand-700"
                >
                  {whatsapp.label}
                </a>
              </p>
            ) : null}

            <div className="mt-5 space-y-3">
              <WhatsAppButton place="footer" size="md" className="w-full" />
              <Link
                to="/contact#enquiry"
                className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink-950 transition-colors hover:text-brand-700"
              >
                {t('cta.enquiry')}
                <IconArrowRight width={16} height={16} />
              </Link>
            </div>

            {activeSocials.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {activeSocials.map((entry) => (
                  <li key={entry.key}>
                    <a
                      href={entry.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex min-h-10 items-center text-sm text-ink-600 transition-colors hover:text-brand-700"
                    >
                      {entry.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        {/* Legal + company facts, linked for trust and for search. */}
        <div className="mt-12 flex flex-col gap-5 border-t border-ink-200 pt-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs text-ink-500">
              © {year} {site.name}. All rights reserved.
            </p>
            <p className="mt-1 text-xs text-ink-500">
              Serving businesses across {site.market}.
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
              {footer.legal.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex min-h-10 items-center text-xs text-ink-600 transition-colors hover:text-brand-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p className="max-w-md text-xs leading-relaxed text-ink-500 sm:text-right">
            Information on this website is general and is not legal, tax or financial advice. Work that
            requires a qualified professional is performed or supervised by the appropriate professional.
            {CONFIG.WEBSITE_DOMAIN ? '' : ' Prices and processing times depend on your circumstances.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
