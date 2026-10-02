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
     * --- robots meta, and absolute share-image URLs ------------------------
     * `index.html` ships a static `robots` tag, because a crawler that does not
     * run JavaScript would otherwise find none. But the correct value depends
     * on the domain, so the tag is rewritten here at build time: with no
     * confirmed domain the whole site is `noindex, follow`, matching the
     * `useDocumentMeta` fallback in `src/lib/seo.ts`. Left static, a build
     * deployed before the domain was set would advertise itself as indexable
     * under an address that does not exist.
     *
     * `og:image` and `twitter:image` get the same treatment, for a different
     * reason. They are declared as root-relative paths in `index.html` because
     * the origin is not known when that file is written. `useDocumentMeta` does
     * resolve them to absolute URLs, but only in the browser — and the crawlers
     * that consume these tags are precisely the ones that do not run JavaScript.
     * Facebook, LinkedIn and WhatsApp all fetch `index.html` as plain text, so a
     * runtime fix never reaches the link unfurl it was written for. Rewriting
     * them here is what makes the share card actually appear.
     *
     * Only the robots tag is conditional on the domain being set. The share
     * images are only rewritten when there is an origin to rewrite them to;
     * with no domain they keep their relative paths, and `useDocumentMeta`
     * upgrades them later if one appears.
     *
     * A static canonical is deliberately *not* injected: every route of this SPA
     * serves the same `index.html`, so a hard-coded canonical would tell a
     * crawler that all nine service pages are the homepage. `useDocumentMeta`
     * sets the correct canonical per route once it knows the origin.
     */
    transformIndexHtml(html) {
      if (isSsr) return html

      const origin = siteOrigin(config)
      const content = origin
        ? 'index, follow, max-image-preview:large'
        : 'noindex, follow'

      let out = html.replace(
        /(<meta\s+name="robots"\s+content=")[^"]*(")/,
        (_match, open: string, close: string) => `${open}${content}${close}`,
      )

      if (origin) {
        // A root-relative path becomes an absolute URL against the origin. Both
        // tags are handled because a share is read from whichever one the
        // receiving platform looks at first — hence the global flag, since there
        // is one `og:image` and one `twitter:image` and both must be rewritten.
        out = out.replace(
          /(<meta\s+(?:property|name)="(?:og:image|twitter:image)"\s+content=")(\/[^"]*)(")/g,
          (_match, open: string, path: string, close: string) => `${open}${origin}${path}${close}`,
        )
      }

      return out
    },

    // --- sitemap.xml ------------------------------------------------------
    async generateBundle() {
      if (isSsr) return

      /**
       * Names every launch-critical variable that is not set. This matters more
       * on a host like Cloudflare Pages than it does locally, because `.env` is
       * gitignored and never reaches the build: the values have to be entered in
       * the dashboard as environment variables instead, and a forgotten one
       * produces a build that succeeds and a site that quietly does the wrong
       * thing — no sitemap, `noindex` on every page, and dead contact buttons.
       * A build is the last cheap moment to notice that.
       */
      const launchVars = [
        'VITE_WEBSITE_DOMAIN',
        'VITE_PHONE_NUMBER',
        'VITE_WHATSAPP_NUMBER',
        'VITE_EMAIL',
        'VITE_ADDRESS',
      ] as const
      const missing = launchVars.filter((key) => !(config.env[key] as string | undefined)?.trim())
      if (missing.length) {
        this.warn(
          `Unset environment variables: ${missing.join(', ')}. ` +
            `Without VITE_WEBSITE_DOMAIN this build ships no sitemap, no canonical URLs ` +
            `and noindex on every page; without the rest, the contact CTAs fall back ` +
            `to the enquiry form. Set them in the host's environment before building.`,
        )
      }

      const { INDEXABLE_ROUTES } = await import('./src/routes')
      const origin = siteOrigin(config)
      if (!origin) return

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
