import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { serviceByPath } from '../content/services'
import { onWhatsappClick, whatsappLink } from '../lib/contactLinks'
import { IconWhatsApp } from './icons'

/**
 * ---------------------------------------------------------------------------
 * FLOATING WHATSAPP — desktop only
 * ---------------------------------------------------------------------------
 * A persistent way to start the conversation once the visitor is past the
 * hero. It appears only after the first screen, so the hero keeps a single
 * obvious action rather than two competing ones, and it stays out of the way
 * of the sticky bar by being desktop-only (the bar is mobile-only).
 *
 * On a service page it carries that service's prefilled message; everywhere
 * else it uses the site-wide enquiry message. Hiding is done with `invisible`
 * rather than opacity alone, so a hidden button cannot be reached by keyboard
 * or announced by a screen reader.
 */
export function FloatingWhatsApp() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY > Math.max(window.innerHeight * 0.9, 560))
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    setVisible(false)
  }, [pathname])

  const message = serviceByPath[pathname]?.whatsapp
  const whatsapp = whatsappLink(message)

  return (
    <div
      aria-hidden={!visible}
      className={`fixed right-6 bottom-6 z-40 hidden transition-all duration-200 md:block ${
        visible ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0'
      }`}
    >
      <a
        href={whatsapp.href}
        {...(whatsapp.ready ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        onClick={onWhatsappClick('floating', message)}
        title={whatsapp.ready ? undefined : 'Opens the contact page until this number is added.'}
        className="group inline-flex min-h-12 items-center gap-2.5 border border-ink-950 bg-ink-950 px-5 text-[13px] font-semibold tracking-[0.02em] text-white shadow-[0_14px_30px_-16px_rgba(7,29,43,0.65)] transition-colors duration-200 hover:border-brand-700 hover:bg-brand-700 focus-visible:outline-brand-600"
      >
        <IconWhatsApp width={18} height={18} className="shrink-0" />
        WhatsApp
        <span
          aria-hidden="true"
          className="h-px w-4 bg-brand-300 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </a>
    </div>
  )
}
