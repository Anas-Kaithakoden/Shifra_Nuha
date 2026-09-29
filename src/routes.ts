import { coreServices } from './content/services'

/**
 * ---------------------------------------------------------------------------
 * ROUTES
 * ---------------------------------------------------------------------------
 * The canonical list of every page on the site, in one place.
 *
 * Three consumers read it: the router, the XML sitemap the build emits, and the
 * smoke and accessibility tests. That is the point. When these were separate
 * lists they drifted — a service got a page but not a sitemap entry, a test
 * passed while a link 404'd — and the only reliable fix is to have one list
 * they all share.
 *
 * `servicePages` is generated from `coreServices`, so a service cannot exist in
 * the content without existing as a route.
 */

export type Route = {
  path: string
  /** `sitemap.xml` only. Legal pages are linked but not worth indexing. */
  indexable: boolean
  /** `sitemap.xml` only. The homepage is the most important page on the site. */
  priority: number
}

const STATIC_ROUTES: Route[] = [
  { path: '/', indexable: true, priority: 1.0 },
  { path: '/services', indexable: true, priority: 0.9 },
  { path: '/about', indexable: true, priority: 0.6 },
  { path: '/contact', indexable: true, priority: 0.8 },
  // Legal pages are reachable from every footer, but they are not landing pages
  // for anything and are kept out of the index.
  { path: '/privacy', indexable: false, priority: 0.2 },
  { path: '/terms', indexable: false, priority: 0.2 },
  { path: '/disclaimer', indexable: false, priority: 0.2 },
]

/** The nine service landing pages, generated from the services themselves. */
const serviceRoutes: Route[] = coreServices.map((service) => ({
  path: service.path,
  indexable: true,
  priority: 0.8,
}))

/** Every route, in sitemap order. */
export const ROUTES: Route[] = [...STATIC_ROUTES, ...serviceRoutes]

/** Only the routes that belong in `sitemap.xml`. */
export const INDEXABLE_ROUTES: Route[] = ROUTES.filter((route) => route.indexable)

/** Path → sitemap priority, for the build plugin. */
export const ROUTE_PRIORITY: Record<string, number> = Object.fromEntries(
  ROUTES.map((route) => [route.path, route.priority]),
)

/** Every path, as a set. The a11y test uses it to validate internal links. */
export const ROUTE_PATHS: string[] = ROUTES.map((route) => route.path)
