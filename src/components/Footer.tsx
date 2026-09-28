import { Link } from 'react-router-dom'
import { contact, footer, nav, site, social } from '../content/site'
import { Logo } from './Logo'
import { IconArrowRight } from './icons'

const socialEntries = [
  { key: 'linkedin', label: 'LinkedIn', href: social.linkedin },
  { key: 'facebook', label: 'Facebook', href: social.facebook },
  { key: 'instagram', label: 'Instagram', href: social.instagram },
  { key: 'x', label: 'X', href: social.x },
] as const

export function Footer() {
  const year = new Date().getFullYear()
  const activeSocials = socialEntries.filter((entry) => entry.href)

  return (
    <footer className="border-t border-ink-200 bg-ink-50">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm font-semibold tracking-tight text-ink-950">{site.tagline}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">{footer.blurb}</p>
          </div>

          <div>
            <h2 className="text-xs font-semibold tracking-[0.18em] text-ink-500 uppercase">{footer.navTitle}</h2>
            <ul className="mt-4 space-y-1">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex min-h-10 items-center text-sm text-ink-700 transition-colors hover:text-brand-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/privacy"
                  className="inline-flex min-h-10 items-center text-sm text-ink-700 transition-colors hover:text-brand-700"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold tracking-[0.18em] text-ink-500 uppercase">Get in touch</h2>

            {/* Contact details are intentionally empty until the real values are
                supplied — a labelled placeholder is shown instead. */}
            {contact.email || contact.phone ? (
              <ul className="mt-4 space-y-2 text-sm text-ink-700">
                {contact.phone ? (
                  <li>
                    <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="hover:text-brand-700">
                      {contact.phone}
                    </a>
                  </li>
                ) : null}
                {contact.email ? (
                  <li>
                    <a href={`mailto:${contact.email}`} className="hover:text-brand-700">
                      {contact.email}
                    </a>
                  </li>
                ) : null}
              </ul>
            ) : (
              <p className="mt-4 rounded-lg border border-dashed border-ink-300 bg-white px-3 py-3 text-sm leading-relaxed text-ink-500">
                Phone, WhatsApp and email will be published here once confirmed.
              </p>
            )}

            <Link
              to="/contact#enquiry"
              className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink-950 transition-colors hover:text-brand-700"
            >
              Send an enquiry
              <IconArrowRight width={16} height={16} />
            </Link>

            {activeSocials.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {activeSocials.map((entry) => (
                  <li key={entry.key}>
                    <a
                      href={entry.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-sm text-ink-600 transition-colors hover:text-brand-700"
                    >
                      {entry.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-xs leading-relaxed text-ink-500">
                Social profiles will be linked once the official accounts are available.
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-200 pt-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="max-w-md sm:text-right">
            Work that requires a qualified professional is performed or supervised by the appropriate professional
            partner.
          </p>
        </div>
      </div>
    </footer>
  )
}
