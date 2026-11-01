import { Link } from 'react-router-dom'
import { coreServices } from '../content/services'
import { contact, footer, site, social } from '../content/site'
import { ui } from '../content/ui'
import { callLink, mailtoLink, whatsappLink } from '../lib/contactLinks'
import { Logo } from './Logo'
import { IconMail, IconPhone, IconPin } from './icons'

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
 * Compact, and still the most useful page of links on the site. Every one of
 * the ten services is listed as a real link — that is how a phone visitor
 * reaches a specific page, and how a crawler finds pages that are otherwise two
 * hops from the home page.
 *
 * Contact details are printed only when they exist. A number that does not
 * connect is worse than a labelled placeholder, so the block degrades honestly
 * while the configuration is blank.
 *
 * The disclaimer is deliberately visible rather than buried in the legal
 * pages: it states that the site is general information, that regulated work is
 * carried out or supervised by the appropriate professional, and that fees are
 * quoted per engagement with government fees shown separately.
 */
export function Footer() {
  const year = new Date().getFullYear()
  const activeSocials = socialEntries.filter((entry) => entry.href)
  const whatsapp = whatsappLink()
  const phone = callLink()
  const email = mailtoLink()
  const hasContact = Boolean(phone.ready || email.ready || whatsapp.ready)

  return (
    <footer className="border-t border-paper-200 bg-paper-100">
      <div className="mx-auto w-full max-w-7xl px-5 pt-14 pb-10 sm:px-8 sm:pt-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_0.9fr_1fr] lg:gap-10">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-ink-600">{footer.blurb}</p>
            <p className="mt-4 max-w-xs text-[12px] leading-relaxed text-ink-500">
              Serving businesses across {site.region}, and remotely with businesses elsewhere in
              India.
            </p>

            {activeSocials.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1">
                {activeSocials.map((entry) => (
                  <li key={entry.key}>
                    <a
                      href={entry.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex min-h-10 items-center text-[12px] text-ink-600 transition-colors hover:text-brand-700"
                    >
                      {entry.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <nav aria-label={footer.servicesTitle}>
            <h2 className="text-[10px] font-semibold tracking-[0.16em] text-ink-500 uppercase">
              {footer.servicesTitle}
            </h2>
            <ul className="mt-3 grid gap-x-5 sm:grid-cols-2 lg:grid-cols-1">
              {coreServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={service.path}
                    className="inline-flex min-h-8 items-center text-[12px] text-ink-700 transition-colors hover:text-brand-700"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[10px] font-semibold tracking-[0.16em] text-ink-500 uppercase">
              Digital & Creative
            </h2>
            <ul className="mt-3 grid gap-0.5">
              <li>
                <Link
                  to="/digital-solutions"
                  className="inline-flex min-h-8 items-center text-[12px] text-ink-700 transition-colors hover:text-brand-700"
                >
                  Digital Solutions
                </Link>
              </li>
              <li>
                <Link
                  to="/branding-creative"
                  className="inline-flex min-h-8 items-center text-[12px] text-ink-700 transition-colors hover:text-brand-700"
                >
                  Branding & Creative Services
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="inline-flex min-h-8 items-center text-[12px] text-ink-700 transition-colors hover:text-brand-700"
                >
                  All Business Solutions
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="inline-flex min-h-8 items-center text-[12px] text-ink-700 transition-colors hover:text-brand-700"
                >
                  About Shifra Nuha
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="inline-flex min-h-8 items-center text-[12px] text-ink-700 transition-colors hover:text-brand-700"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-[10px] font-semibold tracking-[0.16em] text-ink-500 uppercase">
              {footer.contactTitle}
            </h2>

            {hasContact ? (
              <ul className="mt-3 space-y-0.5 text-[12px] text-ink-700">
                {phone.ready ? (
                  <li>
                    <a
                      href={phone.href}
                      className="inline-flex min-h-9 items-center gap-2 transition-colors hover:text-brand-700"
                    >
                      <IconPhone width={14} height={14} className="shrink-0 text-ink-400" />
                      {phone.label}
                    </a>
                  </li>
                ) : null}
                {email.ready ? (
                  <li>
                    <a
                      href={email.href}
                      className="inline-flex min-h-9 items-center gap-2 break-all transition-colors hover:text-brand-700"
                    >
                      <IconMail width={14} height={14} className="shrink-0 text-ink-400" />
                      {email.label}
                    </a>
                  </li>
                ) : null}
                {whatsapp.ready ? (
                  <li>
                    <a
                      href={whatsapp.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex min-h-9 items-center gap-2 transition-colors hover:text-brand-700"
                    >
                      <IconPhone width={14} height={14} className="shrink-0 text-ink-400" />
                      WhatsApp: {whatsapp.label}
                    </a>
                  </li>
                ) : null}
              </ul>
            ) : (
              <p className="mt-4 border border-dashed border-ink-300 bg-white px-4 py-3 text-[12px] leading-relaxed text-ink-500">
                {ui['placeholder.contact']}
              </p>
            )}

            {contact.address ? (
              <p className="mt-3 flex gap-2 text-[12px] leading-relaxed text-ink-600">
                <IconPin width={14} height={14} className="mt-0.5 shrink-0 text-ink-400" />
                <span>{contact.address}</span>
              </p>
            ) : null}

            <p className="mt-3 text-[11px] leading-relaxed text-ink-500">{contact.hours}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-paper-200 pt-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
          <div>
            <p className="text-[11px] text-ink-500">
              © {year} {site.name}. All rights reserved.
            </p>
            <ul className="mt-1 flex flex-wrap gap-x-5 gap-y-1">
              {footer.legal.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex min-h-9 items-center text-[11px] text-ink-600 transition-colors hover:text-brand-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p className="max-w-md text-left text-[10px] leading-relaxed text-ink-500">
            The information on this website is general and is not legal, tax, accounting or financial
            advice. Work that requires a qualified professional is performed or supervised by the
            appropriate professional. Fees are quoted per engagement once we understand the case, and
            government fees are always shown separately from our professional fee.
          </p>
        </div>
      </div>
    </footer>
  )
}
