import { useEffect } from 'react'
import { brand, site } from '../content/site'

type Meta = {
  title: string
  description?: string
  /** Path only, e.g. `/services`. Used to build the canonical + og:url. */
  path?: string
  type?: 'website'
}

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** The real domain is not confirmed yet, so canonical URLs are opt-in. */
const absolute = (path: string) => (site.url ? `${site.url.replace(/\/$/, '')}${path}` : '')

/**
 * Minimal SEO handling without pulling in a head-management library.
 * Sets the document title, description, canonical URL and Open Graph tags.
 */
export function useDocumentMeta({ title, description = site.description, path = '/', type = 'website' }: Meta) {
  useEffect(() => {
    document.title = title

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)

    // Share images are declared relative in index.html, which crawlers reject.
    // Once the real domain is known, rewrite them to absolute URLs.
    const ogImage = absolute(brand.ogImage)
    setMeta('property', 'og:image', ogImage || brand.ogImage)
    setMeta('property', 'og:image:alt', brand.ogImageAlt)
    setMeta('name', 'twitter:image', ogImage || brand.ogImage)
    setMeta('name', 'twitter:image:alt', brand.ogImageAlt)

    // Only emit absolute URLs once the real domain has been confirmed.
    const url = absolute(path)
    if (url) {
      setMeta('property', 'og:url', url)
      let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.appendChild(canonical)
      }
      canonical.href = url
    }
  }, [title, description, path, type])
}
