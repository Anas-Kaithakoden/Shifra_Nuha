import { hasGoogleAnalytics, hasMetaPixel } from '../config/site.config'

/**
 * ---------------------------------------------------------------------------
 * TRACKING
 * ---------------------------------------------------------------------------
 * One funnel, one vocabulary, three destinations.
 *
 * Every meaningful action on this site is one of three things: someone arrived
 * on a page, someone opened WhatsApp, or someone called. Naming those three
 * explicitly — rather than letting each component invent its own event name —
 * is what makes the ad reports readable and the funnel measurable end to end.
 *
 * There is deliberately no form submission event, because there is no form. The
 * contact strategy is WhatsApp-first: the ad sends people to a chat, and the
 * only two conversions worth counting are the tap that opens the chat and the
 * tap that opens the dialler.
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

/** What each event means to Meta, as a standard conversion event. */
const metaEvents: Record<TrackEvent['name'], string> = {
  PageView: 'PageView',
  WhatsAppClick: 'Contact',
  PhoneClick: 'Contact',
}

/**
 * What each event is called in GA4.
 *
 * `PageView` maps to Google's own built-in `page_view`, not to a custom event
 * of the same meaning: every standard GA4 report — Pages and screens, Landing
 * pages, the Engagement overview — is built from `page_view` and its
 * parameters, so a custom event never reaches them however often it fires.
 * The click events follow GA4's snake_case convention. Meta keeps receiving
 * the camelCase names above, unchanged.
 */
const gaEvents: Record<TrackEvent['name'], string> = {
  PageView: 'page_view',
  WhatsAppClick: 'whatsapp_click',
  PhoneClick: 'phone_click',
}

/**
 * The parameters GA4 expects for each event.
 *
 * `page_view` is keyed on `page_location` + `page_title`, the pair the Pages
 * and screens and Landing pages reports group by. `path` alone would be a
 * custom parameter those reports cannot read, and `window.location.href` is
 * the full URL they need. The click events keep their own `place` and `label`,
 * so a report can be broken down by the button that was pressed.
 */
function gaParams(event: TrackEvent): Record<string, unknown> {
  if (event.name === 'PageView') {
    return {
      page_location: window.location.href,
      page_title: event.title ?? document.title,
    }
  }

  const { name, ...params } = event
  return params
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
    win.gtag('event', gaEvents[event.name], gaParams(event))
  }

  // dataLayer is always pushed, so a tag manager can pick events up later
  // without any of this being rewritten. It uses the GA4 name so a tag
  // written against `page_view` matches what GA4 itself receives.
  if (Array.isArray(win.dataLayer)) {
    win.dataLayer.push({ event: gaEvents[event.name], ...event })
  }
}
