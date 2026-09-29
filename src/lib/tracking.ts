import { hasGoogleAnalytics, hasMetaPixel } from '../config/site.config'

/**
 * ---------------------------------------------------------------------------
 * TRACKING
 * ---------------------------------------------------------------------------
 * One funnel, one vocabulary, three destinations.
 *
 * Every meaningful action on this site is one of five things: someone arrived on
 * a page, someone opened WhatsApp, someone called, someone opened the enquiry
 * form, or someone sent an enquiry. Naming those five explicitly — rather than
 * letting each component invent its own event name — is what makes the ad
 * reports readable and the funnel measurable end to end.
 *
 * The same event is pushed to Meta Pixel, GA4 and `dataLayer` when those are
 * configured. While an ID is blank no script is loaded at all (`Analytics.tsx`)
 * and every function here is a no-op, so there is no request to a third party
 * and no console noise. Nothing is ever sent to a hard-coded destination.
 */

export type TrackEvent =
  | { name: 'PageView'; path: string; title?: string }
  | { name: 'WhatsAppClick'; place: string; label?: string }
  | { name: 'PhoneClick'; place: string; label?: string }
  | { name: 'EnquiryFormOpen'; place: string }
  | { name: 'EnquirySubmit'; service?: string }

/** What each event means to Meta, as a standard conversion event. */
const metaEvents: Record<TrackEvent['name'], string> = {
  PageView: 'PageView',
  WhatsAppClick: 'Contact',
  PhoneClick: 'Contact',
  EnquiryFormOpen: 'ViewContent',
  EnquirySubmit: 'Lead',
}

type DataLayerWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>
  fbq?: (...args: unknown[]) => void
  gtag?: (...args: unknown[]) => void
}

/** True when at least one analytics destination is configured. */
export function trackingEnabled(): boolean {
  return hasMetaPixel || hasGoogleAnalytics
}

export function track(event: TrackEvent): void {
  if (!trackingEnabled() || typeof window === 'undefined') return

  const win = window as DataLayerWindow

  if (hasMetaPixel && typeof win.fbq === 'function') {
    win.fbq('track', metaEvents[event.name], event)
  }

  if (hasGoogleAnalytics && typeof win.gtag === 'function') {
    win.gtag('event', event.name, { ...event, name: undefined })
  }

  // dataLayer is always pushed, so a tag manager can pick events up later
  // without any of this being rewritten.
  if (Array.isArray(win.dataLayer)) {
    win.dataLayer.push({ event: event.name, ...event })
  }
}
