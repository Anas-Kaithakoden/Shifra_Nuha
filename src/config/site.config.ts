/**
 * ---------------------------------------------------------------------------
 * PLACEHOLDER CONFIGURATION — single source of truth
 * ---------------------------------------------------------------------------
 * Everything the company has not confirmed yet is blank, so nothing is invented
 * and no fake contact detail, price or tracking ID is ever published.
 *
 * Values come from `VITE_*` environment variables (see `.env.example`) and fall
 * back to an empty string. Fill one in and it flows through the whole site:
 * WhatsApp and Call CTAs, the header/footer contact blocks, canonical URLs,
 * Open Graph, structured data, the XML sitemap, robots.txt and the analytics
 * loader all read from here. No component hard-codes a phone number or a pixel.
 *
 * `WEBSITE_DOMAIN` builds the absolute URLs used for canonical tags, the
 * sitemap and robots.txt. Enter it with or without a scheme, for example
 * `shifranuha.com` or `https://www.shifranuha.com`.
 *
 * Behaviour while a value is empty:
 *  - PHONE_NUMBER / WHATSAPP_NUMBER — the matching button links to the contact
 *    page, prefilled with a relevant message, so the funnel still works.
 *  - EMAIL — a labelled placeholder is shown instead of a link.
 *  - ADDRESS — the address line is omitted rather than shown half-written.
 *  - WEBSITE_DOMAIN — canonical/og:url tags and sitemap.xml are skipped.
 *  - META_PIXEL_ID / GOOGLE_ANALYTICS_ID — the corresponding script is not
 *    loaded at all, and no request is ever made to a third party.
 */

const env = import.meta.env as Record<string, string | undefined>

export const siteConfig = {
  COMPANY_NAME: env.VITE_COMPANY_NAME?.trim() || 'Shifra Nuha Technologies',
  /** Display format, e.g. `+91 98765 43210`. Used for `tel:` links. */
  PHONE_NUMBER: env.VITE_PHONE_NUMBER?.trim() ?? '',
  /** International format without `+` or spaces, e.g. `919876543210`. */
  WHATSAPP_NUMBER: env.VITE_WHATSAPP_NUMBER?.trim() ?? '',
  EMAIL: env.VITE_EMAIL?.trim() ?? '',
  /** Registered office, as one display line. Left blank until confirmed. */
  ADDRESS: env.VITE_ADDRESS?.trim() ?? '',
  WEBSITE_DOMAIN: env.VITE_WEBSITE_DOMAIN?.trim() ?? '',
  META_PIXEL_ID: env.VITE_META_PIXEL_ID?.trim() ?? '',
  GOOGLE_ANALYTICS_ID: env.VITE_GOOGLE_ANALYTICS_ID?.trim() ?? '',
} as const

/**
 * Short alias. Components that only read a value use `CONFIG.X`; the helpers
 * below are for anything that has to build a link rather than display text.
 */
export const CONFIG = siteConfig

/** Strips formatting so `+91 98765 43210` becomes `919876543210`. */
export const toDialNumber = (value: string) => value.replace(/\D/g, '')

/** The WhatsApp number as bare digits, or an empty string while unconfigured. */
export const whatsappDigits = () => toDialNumber(siteConfig.WHATSAPP_NUMBER)

/** The phone number as bare digits, or an empty string while unconfigured. */
export const phoneDigits = () => toDialNumber(siteConfig.PHONE_NUMBER)

/** Preserves a leading `+` for `tel:` links, dropping spaces and dashes. */
export const toTelHref = (value: string) => `tel:${value.trim().replace(/[^\d+]/g, '')}`

/** Absolute site origin, or an empty string while the domain is unconfirmed. */
export const siteOrigin = (() => {
  const domain = siteConfig.WEBSITE_DOMAIN
  if (!domain) return ''
  const withScheme = /^https?:\/\//i.test(domain) ? domain : `https://${domain}`
  return withScheme.replace(/\/+$/, '')
})()

/**
 * Absolute URL for a path, or an empty string when the domain is unknown. Every
 * consumer checks for the empty string rather than publishing a broken link.
 */
export const absoluteUrl = (path = '/') => {
  if (!siteOrigin) return ''
  return `${siteOrigin}${path.startsWith('/') ? path : `/${path}`}`
}

export const hasPhone = siteConfig.PHONE_NUMBER.length > 0
export const hasWhatsapp = siteConfig.WHATSAPP_NUMBER.length > 0
export const hasEmail = siteConfig.EMAIL.length > 0
export const hasAddress = siteConfig.ADDRESS.length > 0
export const hasMetaPixel = siteConfig.META_PIXEL_ID.length > 0
export const hasGoogleAnalytics = siteConfig.GOOGLE_ANALYTICS_ID.length > 0
