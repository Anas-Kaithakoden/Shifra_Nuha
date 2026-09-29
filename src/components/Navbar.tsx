import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { nav } from '../content/site'
import { ui } from '../content/ui'
import { WhatsAppButton } from './CtaButtons'
import { Logo } from './Logo'
import { IconClose, IconMenu } from './icons'

/**
 * ---------------------------------------------------------------------------
 * NAVBAR
 * ---------------------------------------------------------------------------
 * Three things, and nothing else: the logo, five links, and one WhatsApp button.
 *
 * The brief is explicit that there is no mega-menu, and the site does not need
 * one. The nine service pages are all listed on `/services`, in the footer and
 * on each service page, so every page on the site is at most two clicks from
 * the header.
 *
 * The header is white with a hairline, always. It never becomes transparent
 * over the hero and it never picks up a blur: the hero is a light surface, and a
 * translucent bar over it only costs contrast.
 *
 * THE 320px PROBLEM
 *  A logo (≈108px), a labelled WhatsApp button (≈130px), a gap and a 44px menu
 *  button do not fit in the 280px of content a 320px screen leaves. Below `sm`
 *  the button therefore shows the WhatsApp mark alone, with the full label kept
 *  as its accessible name and tooltip — so the primary action is present at
 *  every width, and nothing overflows at the narrowest one.
 */
export function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Close the menu whenever the route changes, hash links included — those
  // navigate too, and a menu left open over the section it just scrolled to is
  // a bug every phone visitor would hit.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  // Lock body scroll and close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex min-h-11 items-center rounded-[8px] px-3 text-sm font-medium transition-colors ${
      isActive ? 'text-ink-950' : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-paper-200 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-2 px-4 sm:gap-3 sm:px-8 lg:h-[72px] lg:px-8">
        <Logo />

        <nav aria-label={ui['nav.primary']} className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <WhatsAppButton
            place="navbar"
            size="md"
            label={ui['cta.whatsappShort']}
            className="hidden sm:inline-flex"
          />
          <WhatsAppButton place="navbar" size="md" iconOnly className="sm:hidden" />

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? ui['nav.closeMenu'] : ui['nav.openMenu']}
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-[8px] text-ink-800 transition-colors hover:bg-ink-100 md:hidden"
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* Mobile navigation: the same five links and the enquiry form, nothing more. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-paper-200 bg-white text-left md:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-8">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex min-h-12 items-center rounded-[8px] px-3 text-base font-medium transition-colors ${
                      isActive ? 'bg-ink-100 text-ink-950' : 'text-ink-700 hover:bg-ink-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* The tertiary path, for someone who would rather not start a chat. */}
          <div className="mt-2 border-t border-paper-200 pt-2 pb-4">
            <Link
              to="/contact#enquiry"
              className="flex min-h-12 items-center rounded-[8px] px-3 text-sm font-semibold text-ink-800 transition-colors hover:text-brand-700"
            >
              {ui['cta.enquiry']}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
