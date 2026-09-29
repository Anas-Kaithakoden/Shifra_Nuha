import { CONFIG, hasEmail, toTelHref, whatsappDigits } from '../config/site.config'
import { track } from './tracking'

/**
 * ---------------------------------------------------------------------------
 * CONTACT LINKS
 * ---------------------------------------------------------------------------
 * The three ways this business can be reached, built in one place so a number
 * is never hard-coded in a component and the WhatsApp prefilled message is
 * never written twice.
 *
 * WhatsApp and Call are the primary conversions, so they appear everywhere and
 * every one of them fires a tracked event. The enquiry form is the secondary
 * path and is used as the fallback: while a number is unconfirmed the button
 * still works — it simply opens the form instead of a dialler that would not
 * connect. A dead button is a lost lead; a button that lands somewhere
 * sensible is not.
 */

export const ENQUIRY_FALLBACK = '/contact#enquiry'

export type ContactLink = {
  /** False while the underlying value has not been confirmed. */
  ready: boolean
  /** A real wa.me / tel: / mailto: link, or the enquiry form fallback. */
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
 * The WhatsApp link, with an optional prefilled message.
 *
 * The message is the whole reason this is a helper: a visitor who taps through
 * from a service landing page should arrive in the chat with their interest
 * already stated, so the first reply is a real reply and not "how can I help".
 */
export function whatsappLink(message?: string): ContactLink {
  const digits = whatsappDigits()

  if (!digits) {
    return { ready: false, href: ENQUIRY_FALLBACK, label: '' }
  }

  const query = message ? `?text=${encodeURIComponent(message)}` : ''
  return { ready: true, href: `https://wa.me/${digits}${query}`, label: formatDigits(digits) }
}

export function callLink(): ContactLink {
  if (!CONFIG.PHONE_NUMBER) {
    return { ready: false, href: ENQUIRY_FALLBACK, label: '' }
  }
  return {
    ready: true,
    href: toTelHref(CONFIG.PHONE_NUMBER),
    label: CONFIG.PHONE_NUMBER,
  }
}

export function mailtoLink(): ContactLink {
  if (!hasEmail) {
    return { ready: false, href: ENQUIRY_FALLBACK, label: '' }
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

export const onFormSubmit = (service?: string) => () => {
  track({ name: 'EnquirySubmit', service })
}
