import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from '../src/App'
import { CONFIG } from '../src/config/site.config'
import { coreServices, featuredServices, serviceBySlug } from '../src/content/services'
import { contact, social } from '../src/content/site'
import { INDEXABLE_ROUTES, ROUTES } from '../src/routes'
import { ui } from '../src/content/ui'

/**
 * ---------------------------------------------------------------------------
 * SMOKE TEST
 * ---------------------------------------------------------------------------
 * Every page is rendered to HTML and checked for the things that silently break
 * a site: a missing heading, a footer that did not render, a variable that came
 * out as the literal text "undefined".
 *
 * It renders `ROUTES` rather than a hand-written list, so a page that is added
 * to the site is automatically covered. The content assertions exist for the
 * other failure mode that is harder to spot by eye: the site quietly claiming
 * something untrue. Prices, timelines, ratings, client counts and contact
 * details are all checked to be absent, because those are the claims that
 * would cost the business its credibility with an owner who checks.
 */

let failures = 0
const fail = (scope: string, message: string) => {
  failures++
  console.log(`FAIL ${scope} -> ${message}`)
}
const pass = (scope: string, message: string) => console.log(`ok   ${scope} (${message})`)

// ===========================================================================
// 1. Every route renders
// ===========================================================================

const pages: { path: string; html: string }[] = []

/**
 * The document language is declared once, on `<html>` in `index.html` — the site
 * is single-language, so there is no runtime locale that could disagree with it.
 * The shell is the real file rather than the rendered fragment, which never
 * contains the document element at all. It is read from the project root because
 * this bundle is emitted into `node_modules/.tmp`, not next to the source.
 */
const indexHtml = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8')
const documentLang = /<html[^>]*\slang="([a-z]{2})/i.exec(indexHtml)?.[1]
if (!documentLang) {
  fail('index.html', 'the <html> element has no lang attribute')
} else if (documentLang !== 'en') {
  fail('index.html', `declared lang is "${documentLang}", expected "en"`)
}

for (const route of [...ROUTES.map((r) => r.path), '/this-route-does-not-exist']) {
  try {
    const html = renderToString(
      <StaticRouter location={route}>
        <App />
      </StaticRouter>,
    )
    pages.push({ path: route, html })

    const issues: string[] = []
    if (html.includes('undefined')) issues.push('contains literal "undefined"')
    if (html.includes('NaN')) issues.push('contains "NaN"')
    if (!html.includes('<h1')) issues.push('missing <h1>')
    if (!html.includes('<footer')) issues.push('missing footer')
    // The two primary CTAs. While the numbers are unset these fall back to the
    // enquiry form, but the buttons themselves must always be present.
    if (!html.includes('wa.me') && !html.includes('/contact')) {
      issues.push('no WhatsApp or contact path')
    }

    if (issues.length) fail(route, issues.join(', '))
    else pass(route, `${html.length} chars`)
  } catch (error) {
    fail(route, (error as Error).message)
  }
}

// ===========================================================================
// 2. Exactly one H1 per page
// ===========================================================================

for (const { path, html } of pages) {
  const h1s = [...html.matchAll(/<h1\b/g)].length
  if (h1s !== 1) fail(path, `expected exactly one <h1>, found ${h1s}`)
}

// ===========================================================================
// 3. The nine core services
// ===========================================================================

if (coreServices.length !== 9) fail('services', `expected 9 core services, found ${coreServices.length}`)

const seenPaths = new Set<string>()
for (const service of coreServices) {
  const where = `service ${service.slug}`
  const required: [string, unknown][] = [
    ['name', service.name],
    ['navLabel', service.navLabel],
    ['summary', service.summary],
    ['seo.title', service.seo.title],
    ['seo.description', service.seo.description],
    ['whatsapp', service.whatsapp],
    ['pricingNote', service.pricingNote],
  ]
  for (const [field, value] of required) {
    if (typeof value !== 'string' || !value.trim()) fail(where, `missing ${field}`)
  }

  // The landing page needs enough substance to be worth a page of its own.
  const counts: [string, number, number][] = [
    ['explanation', service.explanation.length, 1],
    ['whoNeeds', service.whoNeeds.length, 2],
    ['includes', service.includes.length, 3],
    ['process', service.process.length, 2],
    ['documents', service.documents.length, 3],
    ['caveats', service.caveats.length, 1],
    ['faqs', service.faqs.length, 2],
    ['related', service.related.length, 1],
  ]
  for (const [field, actual, minimum] of counts) {
    if (actual < minimum) {
      fail(where, `has ${actual} ${field}, expected at least ${minimum}`)
    }
  }

  // Every process step needs a title and a body, not a stub.
  for (const step of service.process) {
    if (!step.title?.trim() || !step.body?.trim()) fail(where, 'a process step is empty')
  }
  for (const block of service.explanation) {
    if (!block.heading?.trim() || !block.paragraphs.length) fail(where, 'an explanation block is empty')
  }
  for (const faq of service.faqs) {
    if (!faq.question?.trim() || !faq.answer?.trim()) fail(where, 'an FAQ entry is empty')
  }

  // Related services must point at services that exist, or the page 404s.
  for (const slug of service.related) {
    if (slug !== service.slug && !serviceBySlug[slug]) fail(where, `related service "${slug}" does not exist`)
  }

  // Uniqueness: a page whose title is the same as another's competes with it.
  if (seenPaths.has(service.path)) fail(where, `duplicate path ${service.path}`)
  seenPaths.add(service.path)
}

const titles = coreServices.map((s) => s.seo.title)
const dupTitles = titles.filter((t, i) => titles.indexOf(t) !== i)
if (dupTitles.length) fail('services', `duplicate seo titles: ${[...new Set(dupTitles)].join(', ')}`)

const slugs = coreServices.map((s) => s.slug)
const dupSlugs = slugs.filter((s, i) => slugs.indexOf(s) !== i)
if (dupSlugs.length) fail('services', `duplicate slugs: ${[...new Set(dupSlugs)].join(', ')}`)

pass('services', `${coreServices.length} services, routes + content complete`)

// ===========================================================================
// 4. No invented values
// ===========================================================================

// Contact details and social profiles stay blank until real ones are supplied.
const invented = [
  contact.phone,
  contact.whatsapp,
  contact.email,
  contact.address,
  contact.hours,
  social.linkedin,
  social.facebook,
  social.instagram,
  social.x,
].filter((v) => v && v !== CONFIG.COMPANY_NAME)

if (invented.length) fail('config', `invented contact/social values: ${invented.join(', ')}`)

// Tracking IDs must never be baked in; they only come from the environment.
for (const key of ['META_PIXEL_ID', 'GOOGLE_ANALYTICS_ID'] as const) {
  if (CONFIG[key] && !process.env[`VITE_${key}`]) fail('config', `${key} is set but not from the environment`)
}

if (CONFIG.PHONE_NUMBER && !/^[+\d][\d\s()-]{5,}$/.test(CONFIG.PHONE_NUMBER)) {
  fail('config', 'PHONE_NUMBER is not a displayable phone number')
}
if (CONFIG.WHATSAPP_NUMBER && !/^\d{10,15}$/.test(CONFIG.WHATSAPP_NUMBER)) {
  fail('config', 'WHATSAPP_NUMBER must be bare international digits')
}
if (CONFIG.EMAIL && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(CONFIG.EMAIL)) {
  fail('config', 'EMAIL is not a valid address')
}
if (!invented.length) pass('config', 'no invented contact, social or tracking values')

// ===========================================================================
// 5. No unsubstantiated claims anywhere on the site
// ===========================================================================

/**
 * Patterns for the things a business site is tempted to claim and must not
 * until they are true.
 *
 * These are patterns rather than a list of words because the site has to be
 * able to *say* it does not guarantee anything: "we do not guarantee approval"
 * is honest copy and must not trip the guarantee check. So a match is only
 * reported when it is not negated - see `isNegated` below.
 */
const forbidden: [string, RegExp][] = [
  [
    'a price',
    // Strict and unnegotiable. This site publishes no figure at all — not a
    // headline, not a "starting from", not a struck-through original — so there
    // is nothing to allow-list and no string to scrub before the scan. Every
    // price on the page would be a figure invented somewhere in the codebase.
    /(?:₹|\bINR\s?|\bRs\.?\s)\s?\d/,
  ],
  ['a processing time', /\b\d+\s*(?:-|–)?\s*(?:working\s*)?(?:days?|hours?|weeks?|months?)\b|\b(?:same[- ]day|same[- ]week|24[- ]hours?|48[- ]hours?|instantly|immediately)\b/i],
  ['a guarantee', /\b(?:guarantee[ds]?|guaranteeing|assured|100\s*%\s*(?:success|approval))\b/i],
  ['a rating or award', /\b\d(?:\.\d)?\s*(?:star|rated|stars)\b|\baward[- ]winning\b|\b#1\b/i],
  ['a client or years figure', /\b\d[\d,]*\+?\s*(?:happy\s+)?(?:clients?|customers?|businesses (?:served|helped)|years? of experience)\b/i],
  ['a testimonial', /\b(?:testimonials?|what our clients say|customer reviews|rated \d)\b/i],
  ['a statistic', /\b\d{2,}\s*(?:%|percent)\b/],
  // Naming a government body as the authority a filing is made with is a fact,
  // not a claim of affiliation. What must not appear is *we* are approved by
  // one.
  ['a government affiliation', /\b(?:government|govt\.?)[- ]?(?:approved|registered|recogni[sz]ed|certified|partnered|accredited)\b|\bwe (?:are|re) (?:a )?(?:government|govt)\b/i],
]

/**
 * Negations that turn a claim into a denial of it. Single words plus a few
 * phrases, because "rather than a guaranteed date" and "we do not guarantee
 * approval" are both required by the editorial rules rather than violations.
 */
const NEGATORS =
  /\b(?:no|not|never|nothing|nobody|without|cannot|can't|don't|doesn't|didn't|isn't|aren't|won't|neither|nor|rather than|instead of|other than|apart from|as opposed to)\b/gi

/** How far back a negation can reach. Long enough to cover a three-item list. */
const NEGATION_SCOPE = 240

/**
 * True when the sentence a match sits in negates it. A claim is only a claim if
 * it stands on its own, so the search is scoped to the sentence - a negation in
 * the previous sentence must not excuse the next claim.
 */
function isNegated(text: string, at: number) {
  const before = text.slice(Math.max(0, at - NEGATION_SCOPE), at)
  const boundary = Math.max(
    before.lastIndexOf('. '),
    before.lastIndexOf('! '),
    before.lastIndexOf('? '),
    before.lastIndexOf('; '),
  )
  const sentence = before.slice(boundary + 1)
  NEGATORS.lastIndex = 0
  return NEGATORS.test(sentence)
}

/** `matchAll` needs the global flag; the flag is not part of the pattern's meaning. */
const globalOf = (pattern: RegExp) => new RegExp(pattern.source, `${pattern.flags.replace('g', '')}g`)

for (const { path, html } of pages) {
  // Strip the tags and decode the handful of entities that appear, so the
  // checks read the words a visitor reads rather than the markup.
  //
  // `<script>` bodies come out first. JSON-LD is machine-readable metadata that
  // nobody reads on the page, and it quotes the same values as the visible copy,
  // so leaving it in would double every claim the checks report.
  const text = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')

  for (const [label, pattern] of forbidden) {
    for (const match of text.matchAll(globalOf(pattern))) {
      if (isNegated(text, match.index ?? 0)) continue
      const context = text.slice(Math.max(0, (match.index ?? 0) - 60), (match.index ?? 0) + 60)
      fail(path, `claims ${label}: "...${context.trim()}..."`)
    }
  }
}
pass('claims', `no prices, timelines, guarantees, ratings or statistics in ${pages.length} pages`)

/**
 * The Tier 1 grid on the homepage is built from `featuredServices`, and the count
 * is pinned here rather than left implicit. Eight is a decision: it is what fits
 * two clean rows at four across, and it is the set a business actually needs.
 * Changing the grid is a content change that has to come through here.
 */
if (featuredServices.length !== 8) {
  fail('services', `expected 8 featured services, found ${featuredServices.length}`)
} else if (featuredServices.some((service) => !service.featured)) {
  fail('services', 'a service is in the featured grid but not flagged as featured')
} else {
  const unlisted = coreServices.filter((service) => !featuredServices.includes(service))
  pass(
    'services',
    `8 featured services in the Tier 1 grid; ${unlisted.map((s) => s.slug).join(', ') || 'none'} offered in text`,
  )
}

/**
 * And the converse of the price check: the homepage has to actually answer the
 * cost question, because a site that simply never mentions cost reads as though
 * it is hiding one. The visible text is checked for the honest answer rather than
 * a figure — "depends", "quotation", "itemised" — so that removing the pricing
 * policy fails here instead of passing quietly.
 */
{
  const home = pages.find((page) => page.path === '/')?.html ?? ''
  const required: [string, RegExp][] = [
    ['what the cost depends on', /\bdepends on\b/i],
    ['the word "quotation"', /\bquotation\b/i],
    ['government fees shown separately', /government fees[^.]{0,120}(separately|itemised)/i],
  ]
  const missing = required.filter(([, pattern]) => !pattern.test(home)).map(([label]) => label)
  if (missing.length) fail('/', `the cost answer is incomplete: missing ${missing.join(', ')}`)
  else pass('costs', 'no figure published; what drives the fee is stated on the homepage')
}

// The brief's own placeholder token must never reach a visitor.
for (const { path, html } of pages) {
  if (/\[PRICE\]|\bTBD\b|\bLorem ipsum\b|\bTODO\b/i.test(html)) {
    fail(path, 'a placeholder token leaked into the page')
  }
}

// ===========================================================================
// 5b. No horizontal overflow on the narrowest supported screen
// ===========================================================================

/**
 * The brief requires no horizontal overflow from 320px upwards, and 320px is
 * where it breaks: the narrowest real handset, minus the page's own `px-5`
 * gutter on each side, leaves 280px of content box. Anything wider than that has
 * to be either deliberately scrollable in its own right, or a bug.
 *
 * This runs over the rendered markup rather than a real layout engine, so it
 * cannot measure anything. What it can do is catch the three ways a horizontal
 * scrollbar actually appears in a Tailwind codebase — a hard-coded pixel width,
 * `whitespace-nowrap`, and an unbreakable run of text — and it does that on every
 * route, so a regression cannot hide on the page nobody looks at.
 */
const NARROW_CONTENT_BOX = 280

/** Classes that let a child scroll or clip within its own box. Legitimate. */
const SELF_SCROLLING = /\boverflow-x-(?:auto|scroll|hidden)\b/
const WRAPPING_ALLOWED = /\b(?:break-words|break-all|break-keep-all|hyphens-auto|truncate)\b/

/** Visible text only: no tags, no attributes, no SVG path data, no JSON-LD. */
const visibleText = (html: string) =>
  html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')

const overflowBefore = failures

for (const { path, html } of pages) {
  // --- Markup hazards -------------------------------------------------------
  // A hard pixel width at or above the content box. A `w-4` icon is fine; a
  // `w-[320px]` panel is not.
  for (const match of html.matchAll(globalOf(/(?:^|\s)(?:min-)?w-\[(\d+)px\]/))) {
    if (Number(match[1]) < NARROW_CONTENT_BOX) continue
    const openTag = html.lastIndexOf('<', match.index ?? 0)
    fail(path, `may overflow 320px: fixed width w-[${match[1]}px] in <${html.slice(openTag).split('>')[0].slice(0, 60)}>`)
  }

  for (const match of html.matchAll(globalOf(/(?:^|\s)whitespace-nowrap(?:\s|$)/))) {
    const openTag = html.lastIndexOf('<', match.index ?? 0)
    const tag = html.slice(openTag).split('>')[0]
    if (SELF_SCROLLING.test(tag)) continue
    fail(path, `may overflow 320px: whitespace-nowrap in <${tag.slice(0, 60)}>`)
  }

  // --- Unbreakable text -----------------------------------------------------
  // The character class excludes `&` and `;` so a run can never straddle an
  // HTML entity, which keeps the text offsets equal to the markup offsets.
  const text = visibleText(html)
  for (const match of text.matchAll(/[^\s"'<>&;]{28,}/g)) {
    const run = match[0]
    // Every occurrence is checked, not just the first: the same word can be
    // wrapped in one place on the page and un-wrapped in another.
    let at = html.indexOf(run)
    while (at !== -1) {
      const near = html.slice(Math.max(0, at - 260), at + run.length + 60)
      if (!WRAPPING_ALLOWED.test(near) && !SELF_SCROLLING.test(near)) {
        fail(path, `may overflow 320px: unbreakable "${run.slice(0, 40)}"`)
        break
      }
      at = html.indexOf(run, at + 1)
    }
  }
}

if (failures === overflowBefore) {
  pass('overflow', `no fixed-width, nowrap or unbreakable-text hazards at 320px across ${pages.length} pages`)
}

// ===========================================================================
// 6. Route table sanity
// ===========================================================================

const routePaths = new Set(ROUTES.map((r) => r.path))
for (const required of ['/', '/services', '/about', '/contact', '/privacy', '/terms', '/disclaimer']) {
  if (!routePaths.has(required)) fail('routes', `missing route ${required}`)
}
for (const service of coreServices) {
  if (!routePaths.has(service.path)) fail('routes', `service ${service.slug} has no route`)
}
if (INDEXABLE_ROUTES.length >= ROUTES.length) fail('routes', 'legal pages should be excluded from the sitemap')
pass('routes', `${ROUTES.length} routes, ${INDEXABLE_ROUTES.length} indexable`)

// ===========================================================================
// 7. Interface strings
// ===========================================================================

for (const [key, value] of Object.entries(ui)) {
  if (!value.trim()) fail('ui', `key ${key} has no string`)
}
pass('ui', `${Object.keys(ui).length} interface keys`)

if (documentLang === 'en') pass('index.html', 'document language declared as English')

// ===========================================================================

console.log(failures === 0 ? '\nAll smoke checks passed.' : `\n${failures} smoke check(s) failed.`)
process.exit(failures === 0 ? 0 : 1)
