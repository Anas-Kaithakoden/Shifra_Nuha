import { Link } from 'react-router-dom'
import { coreServices } from '../content/services'
import { footer, site, social } from '../content/site'
import { ui } from '../content/ui'
import { callLink, mailtoLink, whatsappLink } from '../lib/contactLinks'
import { WhatsAppButton } from './CtaButtons'
import { Logo } from './Logo'
import { IconCheck, IconMail, IconPhone } from './icons'

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
 * Three columns — who this is, what we do, how to reach us — then a hairline,
 * the legal pages, and the disclaimer.
 *
 * THE SERVICE CHECKLIST. All nine services are listed here as real links, not
 * just the eight on the homepage grid. That is how somebody on a phone reaches a
 * specific page, and it is how a crawler finds them: `/services` alone would
 * leave every service page two hops from the home page and further from anything
 * else. A footer link list is the least glamorous internal-linking there is, and
 * it does more work here than any other single element on the site.
 *
 * CONTACT DETAILS. Printed only when they exist. An unverified number that does
 * not connect is worse than a labelled placeholder, so while nothing is
 * configured the block says so plainly instead of showing a link that goes
 * nowhere.
 *
 * The disclaimer states plainly that nothing here is advice, that regulated
 * work is done or supervised by the appropriate professional, and that fees are
 * quoted rather than published. Those three sentences are the site's whole claim
 * to being a business rather than a brochure, and they are the first thing a
 * careful buyer looks for.
 *
 * The extra bottom padding on small screens leaves room for the sticky mobile
 * bar, so it never sits on top of the last line.
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
      <div className="mx-auto w-full max-w-6xl px-5 pt-16 pb-28 sm:px-8 sm:pt-16 sm:pb-14">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          <div>
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-ink-600">{footer.blurb}</p>

            <ul className="mt-5 space-y-2">
              {[
                `Serving businesses across ${site.region}.`,
                'Registration work is filed with the central or state authority wherever you are based.',
              ].map((line) => (
                <li key={line} className="flex gap-2 text-sm leading-relaxed text-ink-500">
                  <IconCheck width={15} height={15} className="mt-0.5 shrink-0 text-ink-400" />
                  <span className="text-pretty">{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={footer.servicesTitle}>
            <h2 className="text-xs font-semibold tracking-[0.14em] text-ink-500 uppercase">
              {footer.servicesTitle}
            </h2>
            <ul className="mt-4 grid gap-0.5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              {coreServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={service.path}
                    className="inline-flex min-h-10 items-center text-sm text-ink-700 transition-colors hover:text-brand-700"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold tracking-[0.14em] text-ink-500 uppercase">
              {footer.contactTitle}
            </h2>

            {hasContact ? (
              <ul className="mt-4 space-y-1 text-sm text-ink-700">
                {phone.ready ? (
                  <li>
                    <a
                      href={phone.href}
                      className="inline-flex min-h-10 items-center gap-2 transition-colors hover:text-brand-700"
                    >
                      <IconPhone width={15} height={15} className="shrink-0 text-ink-400" />
                      {phone.label}
                    </a>
                  </li>
                ) : null}
                {email.ready ? (
                  <li>
                    <a
                      href={email.href}
                      className="inline-flex min-h-10 items-center gap-2 break-all transition-colors hover:text-brand-700"
                    >
                      <IconMail width={15} height={15} className="shrink-0 text-ink-400" />
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
                      className="inline-flex min-h-10 items-center gap-2 transition-colors hover:text-brand-700"
                    >
                      <IconPhone width={15} height={15} className="shrink-0 text-ink-400" />
                      WhatsApp: {whatsapp.label}
                    </a>
                  </li>
                ) : null}
              </ul>
            ) : (
              <p className="mt-4 border border-dashed border-ink-300 bg-white px-4 py-3 text-sm leading-relaxed text-ink-500">
                {ui['placeholder.contact']}
              </p>
            )}

            <div className="mt-5 space-y-2">
              <WhatsAppButton place="footer" size="md" className="w-full" />
              {/* The third and quietest path, for someone who would rather not
                  start a chat. */}
              <Link
                to="/contact#enquiry"
                className="flex min-h-11 items-center justify-center text-sm font-semibold text-ink-800 transition-colors hover:text-brand-700"
              >
                {ui['cta.enquiry']}
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

        {/* Legal pages and the disclaimer. Linked for trust and for search. */}
        <div className="mt-14 flex flex-col gap-5 border-t border-paper-200 pt-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
          <div>
            <p className="text-xs text-ink-500">
              © {year} {site.name}. All rights reserved.
            </p>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
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

          {/* Also opts out of the justified body copy. This is the densest text
              in the footer, and justified grey fine print at this size is much
              harder to read than a ragged right edge. */}
          <p className="max-w-md text-left text-xs leading-relaxed text-ink-500">
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