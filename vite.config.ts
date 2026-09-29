import { defineConfig, type Plugin, type ResolvedConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seoFiles()],
  server: {
    port: 5173,
  },
})

/**
 * ---------------------------------------------------------------------------
 * SEO FILES
 * ---------------------------------------------------------------------------
 * Emits `sitemap.xml` and `robots.txt` at the end of a production build.
 *
 * This is a deliberately small hand-rolled plugin rather than a dependency. It
 * does one thing — read the route list from `src/routes.ts` and write two
 * files — and doing it here means the sitemap can never disagree with the
 * router, because both read the same array. A sitemap plugin would take its
 * route list from a glob or a hand-maintained list instead, which is exactly
 * the drift that produces 404s in search results.
 *
 * Both files are conditional on the domain being configured, for the same
 * reason the canonical tag is: an absolute URL has to point somewhere real.
 * With no domain the build still succeeds and simply does not publish a
 * sitemap, rather than publishing one full of invented addresses.
 */
function seoFiles(): Plugin {
  let config: ResolvedConfig
  let isSsr = false

  return {
    name: 'shifranuha-seo-files',
    apply: 'build',

    configResolved(resolved) {
      config = resolved
      isSsr = Boolean(resolved.build.ssr)
    },

    /**
     * --- robots meta -------------------------------------------------------
     * `index.html` ships a static `robots` tag, because a crawler that does not
     * run JavaScript would otherwise find none. But the correct value depends
     * on the domain, so the tag is rewritten here at build time: with no
     * confirmed domain the whole site is `noindex, follow`, matching the
     * `useDocumentMeta` fallback in `src/lib/seo.ts`. Left static, a build
     * deployed before the domain was set would advertise itself as indexable
     * under an address that does not exist.
     *
     * Only the robots tag is touched. A static canonical is deliberately *not*
     * injected: every route of this SPA serves the same `index.html`, so a
     * hard-coded canonical would tell a crawler that all nine service pages are
     * the homepage. `useDocumentMeta` sets the correct canonical per route once
     * it knows the origin.
     */
    transformIndexHtml(html) {
      if (isSsr) return html

      const content = siteOrigin(config)
        ? 'index, follow, max-image-preview:large'
        : 'noindex, follow'

      return html.replace(
        /(<meta\s+name="robots"\s+content=")[^"]*(")/,
        (_match, open: string, close: string) => `${open}${content}${close}`,
      )
    },

    // --- sitemap.xml ------------------------------------------------------
    async generateBundle() {
      if (isSsr) return

      const { INDEXABLE_ROUTES } = await import('./src/routes')
      const origin = siteOrigin(config)
      if (!origin) {
        this.warn(
          'VITE_WEBSITE_DOMAIN is not set, so sitemap.xml was not generated. Canonical URLs stay hidden for the same reason.',
        )
        return
      }

      const lastmod = new Date().toISOString().slice(0, 10)
      const urls = INDEXABLE_ROUTES.map((route) => {
        const loc = `${origin}${route.path === '/' ? '/' : route.path}`
        return [
          '  <url>',
          `    <loc>${loc}</loc>`,
          `    <lastmod>${lastmod}</lastmod>`,
          `    <changefreq>monthly</changefreq>`,
          `    <priority>${route.priority.toFixed(1)}</priority>`,
          '  </url>',
        ].join('\n')
      })

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...urls,
          '</urlset>',
          '',
        ].join('\n'),
      })

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: [
          'User-agent: *',
          'Allow: /',
          '',
          // The 404 is a catch-all route, so there is no fixed path to exclude.
          // It is kept out of the index by a `noindex` meta tag instead, which
          // the NotFound page sets through `useDocumentMeta`.
          `Sitemap: ${origin}/sitemap.xml`,
          '',
        ].join('\n'),
      })
    },
  }
}

/**
 * The confirmed origin, or an empty string while the domain is unknown. Accepts
 * the value with or without a scheme, matching `src/config/site.config.ts`.
 */
function siteOrigin(config: ResolvedConfig): string {
  const domain = (config.env.VITE_WEBSITE_DOMAIN as string | undefined)?.trim() ?? ''
  if (!domain) return ''
  const withScheme = /^https?:\/\//i.test(domain) ? domain : `https://${domain}`
  return withScheme.replace(/\/+$/, '')
}
