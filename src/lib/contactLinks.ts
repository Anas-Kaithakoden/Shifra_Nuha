import { CONFIG, hasEmail, toTelHref, whatsappDigits } from '../config/site.config'
import { enquiry } from '../content/site'
import { track } from './tracking'

/**
 * ---------------------------------------------------------------------------
 * CONTACT LINKS
 * ---------------------------------------------------------------------------
 * The three ways this business can be reached, built in one place so a number
 * is never hard-coded in a component and the WhatsApp prefilled message is
 * never written twice.
 *
 * WHATSAPP-FIRST, BY DESIGN. WhatsApp is the primary conversion and Call is the
 * secondary one; both appear everywhere and every one of them fires a tracked
 * event. Email is a real address for someone who prefers it, deliberately not a
 * button. There is no contact form anywhere on this site: the advertising sends
 * people straight to WhatsApp, and a form on the way there is a step that loses
 * people. Nothing is transmitted through this site, so there is no server, no
 * form handler and nowhere for visitor details to be stored.
 *
 * While a number is unconfirmed the buttons fall back to the contact page rather
 * than a dialler that would not connect. A dead button is a lost lead; a button
 * that lands somewhere sensible is not.
 */

export const CONTACT_FALLBACK = '/contact'

export type ContactLink = {
  /** False while the underlying value has not been confirmed. */
  ready: boolean
  /** A real wa.me / tel: / mailto: link, or the contact-page fallback. */
  href: string
  /** What the visitor sees, e.g. `+91 98765 43210`. */
  label: string
}

/**
 * Groups bare digits for display. Indian numbers are shown in the familiar
 * `+91 XXXXX XXXXX` form; anything else is grouped from the right in fives, so
 * an unexpected value is still legible rather than a wall of digits.
 */
function formatDigits(digits: string): string {
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`
  }
  if (digits.length > 5) {
    return `+${digits.slice(0, digits.length - 5)} ${digits.slice(-5, -2)} ${digits.slice(-2)}`
  }
  return digits
}

/**
 * The WhatsApp link, with a prefilled message.
 *
 * The message is the whole reason this is a helper: a visitor who taps through
 * from a service landing page should arrive in the chat with their interest
 * already stated, so the first reply is a real reply and not "how can I help".
 *
 * The message defaults to the site-wide one rather than to nothing, because a
 * `wa.me` link with no `?text=` opens an entirely blank chat — the worst
 * possible first message. Defaulting here means no call site can produce one by
 * forgetting to pass an argument.
 */
export function whatsappLink(message: string = enquiry.whatsappMessage): ContactLink {
  const digits = whatsappDigits()

  if (!digits) {
    return { ready: false, href: CONTACT_FALLBACK, label: '' }
  }

  return {
    ready: true,
    href: `https://wa.me/${digits}?text=${encodeURIComponent(message)}`,
    label: formatDigits(digits),
  }
}

export function callLink(): ContactLink {
  if (!CONFIG.PHONE_NUMBER) {
    return { ready: false, href: CONTACT_FALLBACK, label: '' }
  }
  return {
    ready: true,
    href: toTelHref(CONFIG.PHONE_NUMBER),
    label: CONFIG.PHONE_NUMBER,
  }
}

export function mailtoLink(): ContactLink {
  if (!hasEmail) {
    return { ready: false, href: CONTACT_FALLBACK, label: '' }
  }
  return { ready: true, href: `mailto:${CONFIG.EMAIL}`, label: CONFIG.EMAIL }
}

/** Returns a click handler rather than tracking on render, so it is one event. */
export const onWhatsappClick = (place: string, message?: string) => () => {
  track({ name: 'WhatsAppClick', place, label: message })
}

export const onPhoneClick = (place: string) => () => {
  track({ name: 'PhoneClick', place, label: CONFIG.PHONE_NUMBER })
}
