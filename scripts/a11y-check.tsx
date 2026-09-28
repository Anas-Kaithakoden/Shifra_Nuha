import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from '../src/App'

const routes = ['/', '/services', '/about', '/contact', '/privacy', '/nope']

let failures = 0
const fail = (route: string, msg: string) => {
  failures++
  console.log(`FAIL ${route} -> ${msg}`)
}

for (const route of routes) {
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
  const known = new Set(['/', '/services', '/about', '/contact', '/privacy'])
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
    const cls = m[1]
    const hasTarget = /min-h-/.test(cls) || /py-\d/.test(cls) || /py-\[/.test(cls)
    if (hasTarget) continue
    // Check it is not nested inside a <p>: look at the 200 chars before it.
    const start = m.index ?? 0
    const before = html.slice(Math.max(0, start - 220), start)
    if (/<p[\s\S]*$/.test(before)) continue
    fail(route, `link may be under 24px tall: ${m[0].slice(0, 100)}`)
  }

  if (failures === 0) console.log(`ok   ${route}`)
}

process.exit(failures === 0 ? 0 : 1)
