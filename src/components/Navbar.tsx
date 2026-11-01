import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { nav } from '../content/site'
import { ui } from '../content/ui'
import { CallButton, WhatsAppButton } from './CtaButtons'
import { Logo } from './Logo'
import { IconClose, IconMenu } from './icons'

/**
 * ---------------------------------------------------------------------------
 * NAVBAR
 * ---------------------------------------------------------------------------
 * The logo, five links, and one WhatsApp button. No mega-menu, no search, no
 * secondary row: every page on the site is at most two clicks from this bar.
 *
 * The header sits on the same warm paper as the page and is separated by a
 * single hairline. It is deliberately opaque — the hero is a light surface, and
 * a translucent bar over it only costs contrast on the one control that has to
 * stay legible while the visitor is deciding.
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

  return (
    <header className="sticky top-0 z-50 border-b border-paper-200 bg-paper-50">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-2 px-5 sm:gap-3 sm:px-8 lg:h-[72px]">
        <Logo />

        <nav aria-label={ui['nav.primary']} className="hidden h-full items-stretch lg:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `relative inline-flex items-center px-3 text-[11px] font-semibold tracking-[0.13em] uppercase transition-colors ${
                  isActive ? 'text-ink-950' : 'text-ink-500 hover:text-ink-950'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 bottom-0 h-[2px] transition-colors ${
                      isActive ? 'bg-brand-600' : 'bg-transparent'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {/*
            ONE WhatsApp button, two forms, swapped at `sm` — the labelled
            button from `sm` up, the mark alone below it, per THE 320px PROBLEM
            above.

            The visibility lives on a wrapper rather than on the button's own
            `className`, and that is load-bearing rather than stylistic.
            `Button` hard-codes `display: inline-flex` in its base classes, so
            passing `hidden` to it is a silent no-op: `.inline-flex` is emitted
            after `.hidden` in the stylesheet and wins on source order, not on
            class order. That left both buttons rendering on a phone. A plain
            wrapper carries no competing display class, so the toggle cannot
            break this way again — and because a `display: none` wrapper is
            dropped from the accessibility tree too, exactly one WhatsApp
            button is exposed at any width, as before.
          */}
          <span className="hidden sm:block">
            <WhatsAppButton place="navbar" size="md" label={ui['cta.whatsappShort']} />
          </span>
          <span className="sm:hidden">
            <WhatsAppButton place="navbar" size="md" iconOnly />
          </span>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? ui['nav.closeMenu'] : ui['nav.openMenu']}
            className="-mr-2 inline-flex size-11 items-center justify-center text-ink-800 transition-colors hover:bg-paper-200/70 lg:hidden"
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* Mobile navigation: the same links and the Call button, nothing more. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-paper-200 bg-paper-50 text-left lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto w-full max-w-7xl px-5 py-3 sm:px-8">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex min-h-12 items-center border-l-2 px-4 text-[13px] font-semibold tracking-[0.06em] uppercase transition-colors ${
                      isActive
                        ? 'border-brand-600 bg-white text-ink-950'
                        : 'border-transparent text-ink-700 hover:border-paper-300 hover:bg-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* The secondary CTA, as a real dialler link rather than a route. */}
          <div className="mt-2 border-t border-paper-200 pt-2 pb-4">
            <CallButton
              place="navbar-mobile"
              size="md"
              variant="ghost"
              className="w-full !justify-start !px-3"
            />
          </div>
        </nav>
      </div>
    </header>
  )
}
