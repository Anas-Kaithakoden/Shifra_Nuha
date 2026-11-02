import { onRequest } from '../functions/api/chat'
import { getChatConfig } from '../functions/_lib/config'
import { isPricingQuestion, unlistedPricingReply } from '../functions/_lib/pricing'
import {
  APPROVED_PRICE_AMOUNTS,
  buildSystemPrompt,
  enforcePricingGuard,
  findUnapprovedAmounts,
} from '../functions/_lib/prompt'
import { resetRateLimits } from '../functions/_lib/rateLimit'
import { parseChatRequest } from '../functions/_lib/validation'
import { UNLISTED_PRICING_RESPONSE } from '../src/data/knowledgeBase'
import { buildEnquiryMessage } from '../src/lib/chatbot/enquiry'
import { detectServiceInterest } from '../src/lib/chatbot/serviceInterest'
import type { ChatErrorResponse, ChatSuccessResponse } from '../functions/_lib/types'
import type { ChatMessage } from '../src/lib/chatbot/types'

/**
 * ---------------------------------------------------------------------------
 * CHAT BACKEND TESTS
 * ---------------------------------------------------------------------------
 * Exercises the real handler with a mocked `fetch`, so the tests cover the
 * code that ships: validation order, provider fallback, timeouts, the price
 * guard, rate limiting and the no-provider failure.
 *
 * They do not call a live provider and they do not need a key. A test that
 * requires a paid API is a test that only runs on one machine.
 */

let failures = 0

function check(name: string, condition: boolean, detail = ''): void {
  if (condition) {
    console.log(`PASS  ${name}`)
    return
  }
  failures += 1
  console.error(`FAIL  ${name}${detail ? ` - ${detail}` : ''}`)
}

async function withQuiet<T>(task: () => Promise<T>): Promise<T> {
  const log = console.log
  const warn = console.warn
  const error = console.error

  console.log = () => undefined
  console.warn = () => undefined
  console.error = () => undefined

  try {
    return await task()
  } finally {
    console.log = log
    console.warn = warn
    console.error = error
  }
}

const originalFetch = globalThis.fetch
let fetchMock: typeof fetch = originalFetch
let ipCounter = 0

function nextIp(): string {
  ipCounter += 1
  return `203.0.113.${ipCounter}`
}

const baseEnv = {
  OPENROUTER_API_KEY: 'test-openrouter-key',
  OPENROUTER_MODEL: 'test-openrouter-model',
  GROQ_API_KEY: 'test-groq-key',
  GROQ_MODEL: 'test-groq-model',
  GEMINI_API_KEY: 'test-gemini-key',
  GEMINI_MODEL: 'test-gemini-model',
  CHAT_RATE_LIMIT: '100',
  CHAT_RATE_WINDOW_SECONDS: '600',
  CHAT_REQUEST_TIMEOUT_MS: '1000',
} as const

function openAIReply(content: string): Response {
  return new Response(
    JSON.stringify({ choices: [{ message: { content } }] }),
    { status: 200, headers: { 'content-type': 'application/json' } },
  )
}

function geminiReply(content: string): Response {
  return new Response(
    JSON.stringify({ candidates: [{ content: { parts: [{ text: content }] } }] }),
    { status: 200, headers: { 'content-type': 'application/json' } },
  )
}

function failedProvider(status = 500): Response {
  return new Response(JSON.stringify({ error: { message: 'provider failed' } }), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

type ChatOptions = {
  env?: Record<string, string>
  ip?: string
  method?: string
  contentType?: string
  rawBody?: string
}

async function postChat(body: unknown, options: ChatOptions = {}): Promise<Response> {
  const method = options.method ?? 'POST'
  const headers: Record<string, string> = {
    'cf-connecting-ip': options.ip ?? nextIp(),
  }

  const contentType = options.contentType ?? 'application/json'
  if (contentType) headers['content-type'] = contentType

  const request = new Request('https://shifranuhata.test/api/chat', {
    method,
    headers,
    body:
      method === 'GET' || method === 'HEAD'
        ? undefined
        : (options.rawBody ?? JSON.stringify(body)),
  })

  return onRequest({
    request,
    env: options.env ?? { ...baseEnv },
    params: {},
    waitUntil: () => undefined,
  })
}

function installFetch(mock: typeof fetch): void {
  fetchMock = mock
  globalThis.fetch = ((input: RequestInfo | URL, init?: RequestInit) =>
    fetchMock(input, init)) as typeof fetch
}

resetRateLimits()

// ===========================================================================
// 1. Validation
// ===========================================================================

await (async () => {
  const response = await withQuiet(() => postChat({ message: 'Hello' }, { method: 'GET' }))
  check('GET is rejected with 405', response.status === 405)
  check('405 advertises POST', response.headers.get('allow') === 'POST')

  const badJson = await withQuiet(() =>
    postChat(null, { rawBody: '{"message":' }),
  )
  check('invalid JSON is rejected with 400', badJson.status === 400)

  const missing = await withQuiet(() => postChat({ history: [] }))
  check('missing message is rejected with 400', missing.status === 400)

  const tooLong = await withQuiet(() => postChat({ message: 'x'.repeat(1001) }))
  check('message over 1000 characters is rejected', tooLong.status === 400)

  const tooMuchHistory = await withQuiet(() =>
    postChat({
      message: 'Hello',
      history: Array.from({ length: 21 }, () => ({ role: 'user', content: 'Hi' })),
    }),
  )
  check('history over 20 messages is rejected', tooMuchHistory.status === 400)

  const wrongType = await withQuiet(() =>
    postChat({ message: 'Hello' }, { contentType: 'text/plain' }),
  )
  check('non-JSON content type is rejected with 415', wrongType.status === 415)

  const empty = await withQuiet(() => postChat({ message: '   ' }))
  check('blank message is rejected', empty.status === 400)

  const parsed = await parseChatRequest(
    new Request('https://example.test/api/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ message: '  Hello \u0000 there  ' }),
    }),
  )
  check('control characters are stripped from messages', parsed.message === 'Hello  there')
})()

// ===========================================================================
// 2. Prompt and pricing rules
// ===========================================================================

{
  const prompt = buildSystemPrompt()
  check('system prompt names the business', prompt.includes('Shifra Nuha Technologies'))
  check('system prompt includes the approved LLP total', prompt.includes('₹9,900'))
  check('system prompt includes the approved Private Limited total', prompt.includes('₹13,200'))
  check('system prompt includes the LLP component sum', prompt.includes('₹9,899'))
  check('system prompt includes the Private Limited component sum', prompt.includes('₹13,199'))
  check(
    'system prompt includes the exact unlisted-pricing sentence',
    prompt.includes(UNLISTED_PRICING_RESPONSE),
  )
  check('system prompt names the fallback order explicitly by rule', prompt.includes('WhatsApp'))
}

// ===========================================================================
// 3. Deterministic unlisted pricing
// ===========================================================================

{
  check(
    'website pricing is answered with the exact sentence',
    unlistedPricingReply('How much does a website cost?') === UNLISTED_PRICING_RESPONSE,
  )
  check(
    'logo pricing is answered with the exact sentence',
    unlistedPricingReply('What is the price of a logo design?') === UNLISTED_PRICING_RESPONSE,
  )
  check(
    'general fee question is answered with the exact sentence',
    unlistedPricingReply('How much do you charge?') === UNLISTED_PRICING_RESPONSE,
  )
  check(
    'LLP pricing is allowed through to the model',
    unlistedPricingReply('What is the price of LLP registration?') === null,
  )
  check(
    'Private Limited pricing is allowed through to the model',
    unlistedPricingReply('What does private limited company registration cost?') === null,
  )
  check(
    'a documents question is not treated as a pricing question',
    unlistedPricingReply('What documents are required for LLP registration?') === null,
  )
  check(
    'a general services question is not treated as a pricing question',
    unlistedPricingReply('What services do you offer?') === null,
  )
  check('pricing detection is case-insensitive', isPricingQuestion('WHAT IS THE COST?'))
}

// ===========================================================================
// 4. Server-side price guard
// ===========================================================================

{
  const llp = enforcePricingGuard(
    'For two partners, LLP registration is ₹9,900. The listed components add up to ₹9,899.',
  )
  check('approved LLP amounts pass the price guard', !llp.blocked)

  const privateLimited = enforcePricingGuard(
    'Private Limited registration is ₹13,200 for two directors; the components total ₹13,199.',
  )
  check('approved Private Limited amounts pass the price guard', !privateLimited.blocked)

  const components = enforcePricingGuard(
    'Service charge ₹2,999, DSC ₹2,000 per person, government charges ₹900, stamp paper ₹1,000 and certification ₹1,000.',
  )
  check('approved component amounts pass the price guard', !components.blocked)

  for (const unsafe of [
    'A website costs ₹24,999.',
    'That service is Rs. 4,999.',
    'Expect around INR 15,000.',
    'The fee is 5000 rupees.',
  ]) {
    const result = enforcePricingGuard(unsafe)
    check(
      `unapproved amount is blocked: ${unsafe}`,
      result.blocked && result.reply === UNLISTED_PRICING_RESPONSE,
    )
  }

  check(
    'unapproved amounts are reported',
    findUnapprovedAmounts('₹9,900 or ₹12,345').includes(12345),
  )
  check(
    'approved amount set contains both package totals',
    APPROVED_PRICE_AMOUNTS.has(9900) && APPROVED_PRICE_AMOUNTS.has(13200),
  )
  check(
    'approved amount set contains both component sums',
    APPROVED_PRICE_AMOUNTS.has(9899) && APPROVED_PRICE_AMOUNTS.has(13199),
  )
}

// ===========================================================================
// 5. Service detection and WhatsApp draft
// ===========================================================================

{
  check('detects LLP interest', detectServiceInterest('I need LLP registration') === 'llp-registration')
  check(
    'detects Private Limited interest',
    detectServiceInterest('Tell me about private limited company registration') ===
      'private-limited-registration',
  )
  check('detects GST interest', detectServiceInterest('I need GST filing help') === 'gst')
  check(
    'detects website interest',
    detectServiceInterest('I want a new website for my business') === 'website-development',
  )
  check('detects branding interest', detectServiceInterest('I need a logo and branding') === 'branding')

  const draft = buildEnquiryMessage({
    serviceInterest: 'llp-registration',
    messages: [
      {
        id: '1',
        role: 'user',
        content: 'How much is LLP registration, and what documents do I need?',
        createdAt: Date.now(),
      } satisfies ChatMessage,
    ],
  })

  check('WhatsApp draft names LLP registration', /LLP registration/i.test(draft))
  check('WhatsApp draft includes the visitor question', /what documents/i.test(draft))
  check('WhatsApp draft is editable-length', draft.length > 40 && draft.length <= 1200)
}

// ===========================================================================
// 6. Deterministic endpoint answer does not call a provider
// ===========================================================================

{
  let calls = 0
  installFetch((async () => {
    calls += 1
    return openAIReply('should not be called')
  }) as typeof fetch)

  const response = await withQuiet(() =>
    postChat({ message: 'How much does a website cost?' }),
  )
  const body = (await response.json()) as ChatSuccessResponse

  check('unlisted pricing endpoint returns 200', response.status === 200)
  check('unlisted pricing endpoint returns the exact sentence', body.reply === UNLISTED_PRICING_RESPONSE)
  check('unlisted pricing endpoint does not call a provider', calls === 0)
}

// ===========================================================================
// 7. Provider success and fallback order
// ===========================================================================

{
  let calls = 0
  installFetch((async (input: RequestInfo | URL) => {
    calls += 1
    check('OpenRouter is the first provider', String(input).includes('openrouter.ai'))
    return openAIReply('We can help with LLP registration.')
  }) as typeof fetch)

  const response = await withQuiet(() =>
    postChat({ message: 'Tell me about LLP registration.' }),
  )
  const body = (await response.json()) as ChatSuccessResponse

  check('OpenRouter success returns 200', response.status === 200)
  check('OpenRouter reply is passed through', body.reply === 'We can help with LLP registration.')
  check('OpenRouter is called once', calls === 1)
}

{
  let calls = 0
  installFetch((async (input: RequestInfo | URL) => {
    calls += 1
    if (String(input).includes('openrouter.ai')) return failedProvider(500)
    if (String(input).includes('api.groq.com')) return openAIReply('Groq answered this one.')
    return failedProvider(500)
  }) as typeof fetch)

  const response = await withQuiet(() =>
    postChat({ message: 'Tell me about GST registration.' }),
  )
  const body = (await response.json()) as ChatSuccessResponse

  check('Groq fallback returns 200 after OpenRouter fails', response.status === 200)
  check('Groq fallback reply is used', body.reply === 'Groq answered this one.')
  check('Groq fallback makes two provider calls', calls === 2)
}

{
  let calls = 0
  installFetch((async (input: RequestInfo | URL) => {
    calls += 1
    if (String(input).includes('generativelanguage.googleapis.com')) {
      return geminiReply('Gemini answered this one.')
    }
    return failedProvider(500)
  }) as typeof fetch)

  const response = await withQuiet(() =>
    postChat({ message: 'Tell me about branding services.' }),
  )
  const body = (await response.json()) as ChatSuccessResponse

  check('Gemini fallback returns 200 after two failures', response.status === 200)
  check('Gemini fallback reply is used', body.reply === 'Gemini answered this one.')
  check('Gemini fallback makes three provider calls', calls === 3)
}

{
  installFetch((async () => failedProvider(500)) as typeof fetch)

  const response = await withQuiet(() =>
    postChat({ message: 'Tell me about your services.' }),
  )
  const body = (await response.json()) as ChatErrorResponse
  const serialised = JSON.stringify(body)

  check('all providers failing returns 503', response.status === 503)
  check('all providers failing returns a safe reply', typeof body.reply === 'string' && body.reply.length > 20)
  check('all providers failing does not name a provider', !/openrouter|groq|gemini/i.test(serialised))
  check('all providers failing does not leak a key', !serialised.includes('test-'))
}

// ===========================================================================
// 8. Price guard applied to a model reply
// ===========================================================================

{
  installFetch((async () => openAIReply('A business website usually costs ₹24,999.')) as typeof fetch)

  const response = await withQuiet(() =>
    postChat({ message: 'Tell me what a website involves.' }),
  )
  const body = (await response.json()) as ChatSuccessResponse

  check('unapproved model price is replaced', body.reply === UNLISTED_PRICING_RESPONSE)
  check('price-guarded reply still returns 200', response.status === 200)
}

// ===========================================================================
// 9. Timeout falls through, then fails safely
// ===========================================================================

{
  installFetch((async (_input: RequestInfo | URL, init?: RequestInit) => {
    return new Promise<Response>((_resolve, reject) => {
      init?.signal?.addEventListener('abort', () => {
        reject(new DOMException('Aborted', 'AbortError'))
      })
    })
  }) as typeof fetch)

  const response = await withQuiet(() =>
    postChat(
      { message: 'Tell me about your services.' },
      {
        env: {
          ...baseEnv,
          GROQ_API_KEY: '',
          GEMINI_API_KEY: '',
          CHAT_REQUEST_TIMEOUT_MS: '100',
        },
      },
    ),
  )
  const body = (await response.json()) as ChatErrorResponse

  check('provider timeout returns 503', response.status === 503)
  check('provider timeout returns a safe reply', typeof body.reply === 'string')
  check('provider timeout does not leak a key', !JSON.stringify(body).includes('test-'))
}

// ===========================================================================
// 10. Rate limiting
// ===========================================================================

{
  resetRateLimits()
  installFetch((async () => openAIReply('Hello.')) as typeof fetch)

  const options: ChatOptions = {
    ip: '198.51.100.77',
    env: {
      ...baseEnv,
      CHAT_RATE_LIMIT: '1',
      CHAT_RATE_WINDOW_SECONDS: '600',
    },
  }

  const first = await withQuiet(() => postChat({ message: 'Tell me about GST.' }, options))
  const second = await withQuiet(() => postChat({ message: 'Tell me about GST.' }, options))
  const secondBody = (await second.json()) as ChatErrorResponse

  check('first request inside the limit succeeds', first.status === 200)
  check('second request is rate limited', second.status === 429)
  check('rate limit response has Retry-After', Number(second.headers.get('retry-after')) > 0)
  check('rate limit response is the documented error code', secondBody.error === 'rate_limited')
  check('rate limit response does not leak a provider', !/openrouter|groq|gemini/i.test(JSON.stringify(secondBody)))
}

// ===========================================================================
// 11. No provider configured
// ===========================================================================

{
  resetRateLimits()
  const response = await withQuiet(() =>
    postChat(
      { message: 'Tell me about your services.' },
      {
        env: {
          OPENROUTER_API_KEY: '',
          GROQ_API_KEY: '',
          GEMINI_API_KEY: '',
        },
      },
    ),
  )
  const body = (await response.json()) as ChatErrorResponse

  check('missing providers returns 503', response.status === 503)
  check('missing providers returns a safe reply', typeof body.reply === 'string')
  check('missing providers does not name a provider', !/openrouter|groq|gemini/i.test(JSON.stringify(body)))
}

// ===========================================================================
// 12. Configuration defaults are bounded
// ===========================================================================

{
  const defaults = getChatConfig({})
  check('default timeout is bounded', defaults.providerTimeoutMs >= 1000)
  check('default rate limit is bounded', defaults.rateLimit > 0)
  check('default rate window is bounded', defaults.rateWindowMs >= 10_000)

  const clamped = getChatConfig({
    CHAT_REQUEST_TIMEOUT_MS: '999999',
    CHAT_RATE_LIMIT: '-5',
    CHAT_RATE_WINDOW_SECONDS: '1',
  })
  check('timeout is clamped to the maximum', clamped.providerTimeoutMs === 30_000)
  check('rate limit is clamped to the minimum', clamped.rateLimit === 1)
  check('rate window is clamped to the minimum', clamped.rateWindowMs === 10_000)
}

globalThis.fetch = originalFetch

if (failures > 0) {
  console.error(`\n${failures} chat test(s) failed.`)
  process.exitCode = 1
} else {
  console.log('\nAll chat tests passed.')
}
