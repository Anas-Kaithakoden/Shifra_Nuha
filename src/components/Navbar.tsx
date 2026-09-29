import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { coreServices } from '../content/services'
import { nav } from '../content/site'
import { ui } from '../content/ui'
import { ButtonLink } from './Button'
import { Logo } from './Logo'
import { WhatsAppButton } from './CtaButtons'
import { IconArrowRight, IconClose, IconMenu } from './icons'

/**
 * ---------------------------------------------------------------------------
 * NAVBAR
 * ---------------------------------------------------------------------------
 * Two jobs, in order of importance:
 *
 *  1. Get out of the way. The logo and a conversion action are the two things a
 *     visitor needs, so both are always visible, on every screen size. Which
 *     action takes the slot is a question of width: WhatsApp from `md` up, and
 *     the enquiry form below that, where the sticky bar keeps WhatsApp and Call
 *     within thumb reach anyway.
 *  2. Make the nine landing pages reachable in one click, including on mobile,
 *     where the traffic actually comes from.
 */
export function Navbar() {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const servicesButtonRef = useRef<HTMLButtonElement>(null)
  const servicesId = useId()

  // Close both menus whenever the route changes.
  useEffect(() => {
    setOpen(false)
    setServicesOpen(false)
  }, [location.pathname, location.hash])

  // Solid background once the page is scrolled, so text stays readable.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  // The desktop services dropdown closes on Escape or on a click outside.
  useEffect(() => {
    if (!servicesOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setServicesOpen(false)
        servicesButtonRef.current?.focus()
      }
    }
    const onPointerDown = (event: MouseEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [servicesOpen])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || open ? 'border-ink-200/80 bg-white/95 backdrop-blur-md' : 'border-transparent bg-white'
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-5 sm:px-8 lg:h-[72px]">
        <Logo />

        <nav aria-label={ui['nav.primary']} className="hidden items-center gap-1 md:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium transition-colors ${
                isActive ? 'text-ink-950' : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
              }`
            }
          >
            {nav[0].label}
          </NavLink>

          {/* Services: a link to the hub, plus a dropdown to the nine pages. */}
          <div ref={servicesRef} className="relative">
            <div className="flex items-center">
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium transition-colors ${
                    isActive ? 'text-ink-950' : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
                  }`
                }
              >
                {nav[1].label}
              </NavLink>
              <button
                ref={servicesButtonRef}
                type="button"
                onClick={() => setServicesOpen((value) => !value)}
                aria-expanded={servicesOpen}
                aria-controls={servicesId}
                aria-label={ui['nav.toggleServices']}
                className="-ml-2 inline-flex size-9 items-center justify-center rounded-md text-ink-500 transition-colors hover:bg-ink-50 hover:text-ink-900"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                  className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                >
                  <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div
              id={servicesId}
              hidden={!servicesOpen}
              className="absolute left-0 top-full z-50 w-72 pt-2"
            >
              <ul className="overflow-hidden rounded-xl border border-ink-200 bg-white p-1.5 shadow-lg shadow-ink-950/8">
                {coreServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      to={`/${service.slug}`}
                      className="flex min-h-11 items-center justify-between gap-3 rounded-lg px-3 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50 hover:text-ink-950"
                    >
                      {service.name}
                      <IconArrowRight width={14} height={14} className="shrink-0 text-ink-400" />
                    </Link>
                  </li>
                ))}
                <li className="mt-1.5 border-t border-ink-200 pt-1.5">
                  <Link
                    to="/services"
                    className="flex min-h-11 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
                  >
                    {ui['nav.servicesList']}
                    <IconArrowRight width={14} height={14} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {nav.slice(2).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium transition-colors ${
                  isActive ? 'text-ink-950' : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          {/* The primary conversion action, visible on every screen size.
              WhatsApp leads from `md` up, where there is room for it; below that
              the header carries the enquiry button instead, and the sticky bar
              keeps WhatsApp and Call within thumb reach. */}
          <div className="hidden md:block">
            <WhatsAppButton place="navbar" size="md" />
          </div>

          <ButtonLink to="/contact#enquiry" size="md" variant="primary" className="md:hidden">
            {ui['cta.enquiry']}
          </ButtonLink>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? ui['nav.closeMenu'] : ui['nav.openMenu']}
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-md text-ink-800 transition-colors hover:bg-ink-50 md:hidden"
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* Mobile navigation. The services are listed inline rather than hidden
          behind a submenu, because on a phone this is the only nav most
          visitors will ever use. */}
      <div id="mobile-nav" hidden={!open} className="border-t border-ink-200/80 bg-white text-left md:hidden">
        <nav aria-label="Mobile" className="mx-auto w-full max-w-6xl px-5 py-4 sm:px-8">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex min-h-12 items-center rounded-lg px-3 text-base font-medium transition-colors ${
                      isActive ? 'bg-ink-50 text-ink-950' : 'text-ink-700 hover:bg-ink-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="sm:hidden">
            <p className="mt-5 mb-2 px-3 text-xs font-semibold tracking-[0.18em] text-ink-400 uppercase">
              {ui['nav.servicesList']}
            </p>
            <ul className="grid gap-1 sm:grid-cols-2">
              {coreServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/${service.slug}`}
                    className="flex min-h-12 items-center rounded-lg px-3 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp, from `sm` up. Below that the header carries the enquiry
              button instead, so the panel does not repeat it. */}
          <div className="mt-5 hidden sm:block">
            <WhatsAppButton place="navbar-mobile" size="lg" className="w-full" />
          </div>
        </nav>
      </div>
    </header>
  )
}
