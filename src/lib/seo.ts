import { useEffect } from 'react'
import { absoluteUrl, siteConfig } from '../config/site.config'
import { brand, site } from '../content/site'
import type { FaqItem } from '../content/services'

type Meta = {
  title: string
  description?: string
  /** Path only, e.g. `/services`. Used to build the canonical + og:url. */
  path?: string
  /** Keep the page out of the index. Used by the 404. */
  noindex?: boolean
}

/**
 * ---------------------------------------------------------------------------
 * PAGE METADATA
 * ---------------------------------------------------------------------------
 * Title, description, canonical URL, robots directive and Open Graph, per route.
 * Every page passes its own values, so nothing is duplicated and nothing is
 * generic. Canonical and og:url are withheld until the real domain is confirmed
 * rather than pointing at an address that does not exist.
 */
export function useDocumentMeta({ title, description = site.description, path = '/', noindex = false }: Meta) {
  useEffect(() => {
    document.title = title

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:locale', site.locale)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)

    // Robots. Only the 404 is excluded from the index for its own sake. The
    // rest of the site is also `noindex, follow` while the origin is blank, so
    // a build that has not been given a real domain cannot be indexed under an
    // address that does not exist. Setting `VITE_WEBSITE_DOMAIN` is what makes
    // every page `index, follow` — see `siteOrigin` below.
    setMeta(
      'name',
      'robots',
      noindex ? 'noindex, follow' : siteOrigin ? 'index, follow, max-image-preview:large' : 'noindex, follow',
    )

    // Share images are declared relative in index.html, which crawlers reject.
    const ogImage = absoluteUrl(brand.ogImage) || brand.ogImage
    setMeta('property', 'og:image', ogImage)
    setMeta('property', 'og:image:alt', brand.ogImageAlt)
    setMeta('name', 'twitter:image', ogImage)
    setMeta('name', 'twitter:image:alt', brand.ogImageAlt)

    const url = absoluteUrl(path)
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (url) {
      setMeta('property', 'og:url', url)
      if (canonical) {
        canonical.href = url
      } else {
        const link = document.createElement('link')
        link.rel = 'canonical'
        link.href = url
        document.head.appendChild(link)
      }
    } else {
      // The domain is not confirmed yet, so remove any canonical left over from
      // a previous render rather than keeping a wrong one in place.
      setMeta('property', 'og:url', '')
      document.head.querySelector('link[rel="canonical"]')?.remove()
    }
  }, [title, description, path, noindex])
}

/** The live origin, or an empty string until the domain is confirmed. */
const siteOrigin = absoluteUrl('/').replace(/\/$/, '')

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * ---------------------------------------------------------------------------
 * STRUCTURED DATA
 * ---------------------------------------------------------------------------
 * Only describes what is actually on the page and verifiable. Contact details
 * are included only once they are real, and nothing claims a rating, a review,
 * a client count or a price. While the domain is unconfirmed the `url` fields
 * are omitted rather than pointed at a placeholder address.
 */
export function organisationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.name,
    description: site.description,
    ...(siteOrigin ? { url: siteOrigin } : {}),
    logo: absoluteUrl(brand.logo) || brand.logo,
    image: absoluteUrl(brand.ogImage) || brand.ogImage,
    areaServed: { '@type': 'State', name: site.region, country: 'IN' },
    knowsLanguage: ['en'],
    ...(siteConfig.EMAIL ? { email: siteConfig.EMAIL } : {}),
    ...(siteConfig.PHONE_NUMBER ? { telephone: siteConfig.PHONE_NUMBER } : {}),
  }
}

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

/**
 * Injects JSON-LD for the current page and removes it again on unmount, so a
 * client-side navigation never leaves a previous page's schema behind.
 */
export function useJsonLd(data: unknown, deps: unknown[] = []) {
  useEffect(() => {
    if (!data) return

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.generated = 'true'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
