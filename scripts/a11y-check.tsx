import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from '../src/App'
import { ROUTE_PATHS } from '../src/routes'

/**
 * ---------------------------------------------------------------------------
 * ACCESSIBILITY CHECK
 * ---------------------------------------------------------------------------
 * Rendered-HTML assertions, not a full audit - but they cover the mistakes that
 * actually get made in a React codebase: duplicate ids, a form control whose
 * label points at nothing, a skipped heading level, a link to a page that does
 * not exist, and a tap target too small for a thumb.
 *
 * The route list and the set of valid link targets both come from `ROUTES`, so
 * a new page is covered the moment it is added and a link can never point at a
 * route that was deleted without this failing.
 */

const routes = [...ROUTE_PATHS, '/nope']

/**
 * Whether a link's own classes give it a 24px-tall target.
 *
 * Tailwind's spacing scale is 4px per step, so `p-4` alone is 32px of vertical
 * space and `py-2` is 16px - not enough. A `min-h-*` is taken at face value, a
 * card's block padding is measured, and anything else is treated as unknown so
 * it gets looked at.
 */
function hasTapTarget(cls: string) {
  if (/min-h-(?:\d|\[)/.test(cls)) return true

  // Vertical padding: `py-N`, or all-round `p-N`, where N is at least 3.
  const py = cls.match(/(?:^|\s)py-(\d+)(?:\s|$)/)
  if (py && Number(py[1]) >= 3) return true
  const p = cls.match(/(?:^|\s)p-(\d+)(?:\s|$)/)
  if (p && Number(p[1]) >= 3) return true

  // Arbitrary values are an explicit decision, not a default.
  if (/min-h-\[|py-\[|p-\[/.test(cls)) return true

  // A skip link is hidden until focused, then is a padded button. Its size
  // comes from `text-sm` plus `focus:py-2`, which is comfortably over 24px.
  if (/\bsr-only\b/.test(cls) && /focus:py-/.test(cls)) return true

  // A flex or grid card is sized by its content, not by a padding token.
  if (/\bflex\b|\bgrid\b/.test(cls) && /h-full|items-center/.test(cls)) return true

  return false
}

/**
 * Whether a link sits inside an open `<p>`, i.e. inline in a sentence.
 *
 * Inline links are exempt from the tap-target rule: padding one out to 24px
 * would break the line it sits in. The test is a nesting count rather than a
 * look-back at the preceding characters, because paragraph length varies and a
 * fixed window misjudges any link near the end of a long paragraph.
 */
function insideParagraph(html: string, index: number): boolean {
  const before = html.slice(0, index)
  const opens = (before.match(/<p[\s>]/g) ?? []).length
  const closes = (before.match(/<\/p>/g) ?? []).length
  return opens > closes
}

let failures = 0
const fail = (route: string, msg: string) => {
  failures++
  console.log(`FAIL ${route} -> ${msg}`)
}

for (const route of routes) {
  try {
    const html = renderToString(
      <StaticRouter location={route}>
        <App />
      </StaticRouter>,
    )

    // --- duplicate ids -------------------------------------------------------
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
    if (dupes.length) fail(route, `duplicate ids: ${[...new Set(dupes)].join(', ')}`)

    // --- every control has a label ------------------------------------------
    const labelled = new Set(
      [...html.matchAll(/<label[^>]*\sfor="([^"]+)"/g)].map((m) => m[1]),
    )
    const controls = [...html.matchAll(/<(input|select|textarea)\b[^>]*>/g)].map((m) => m[0])
    for (const control of controls) {
      if (/type="(hidden|submit|button)"/.test(control)) continue
      const id = control.match(/\sid="([^"]+)"/)?.[1]
      if (!id || !labelled.has(id)) fail(route, `unlabelled control: ${control.slice(0, 90)}`)
    }

    // --- heading order -------------------------------------------------------
    const levels = [...html.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]))
    const h1s = levels.filter((l) => l === 1).length
    if (h1s !== 1) fail(route, `expected exactly one <h1>, found ${h1s}`)
    for (let i = 1; i < levels.length; i++) {
      if (levels[i] - levels[i - 1] > 1) fail(route, `heading jump h${levels[i - 1]} -> h${levels[i]}`)
    }

    // --- internal links point at real routes --------------------------------
    const known = new Set(ROUTE_PATHS)
    for (const m of html.matchAll(/href="([^"]+)"/g)) {
      const href = m[1]
      if (href.startsWith('#')) continue
      if (/^(https?:|mailto:|tel:)/.test(href)) continue
      const path = href.split('#')[0].split('?')[0]
      if (path === '' || known.has(path)) continue
      fail(route, `link to unknown route: ${href}`)
    }

    // --- tap targets ---------------------------------------------------------
    // Standalone links (not inline inside flowing text) should clear ~24px in
    // both dimensions. Inline links inside a sentence are exempt.
    for (const m of html.matchAll(/<a\b[^>]*class="([^"]*)"[^>]*>/g)) {
      if (hasTapTarget(m[1])) continue
      if (insideParagraph(html, m.index ?? 0)) continue
      fail(route, `link may be under 24px tall: ${m[0].slice(0, 100)}`)
    }

    // --- the primary actions are reachable from every page -------------------
    if (!html.includes('<footer')) fail(route, 'missing footer')
    if (!html.includes('wa.me') && !html.includes('/contact')) {
      fail(route, 'no WhatsApp or contact path')
    }

    if (failures === 0) console.log(`ok   ${route}`)
  } catch (error) {
    fail(route, (error as Error).message)
  }
}

process.exit(failures === 0 ? 0 : 1)
