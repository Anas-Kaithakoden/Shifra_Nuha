import {
  getChatConfig,
  getProviderConfigs,
  type ProviderConfig,
  type ProviderName,
} from './config'
import {
  buildProviderMessages,
  enforcePricingGuard,
  sanitiseReply,
  type ProviderMessage,
} from './prompt'
import type { ChatRequestBody, Env } from './types'

/**
 * ---------------------------------------------------------------------------
 * PROVIDER FALLBACK
 * ---------------------------------------------------------------------------
 * The order is fixed: OpenRouter, then Groq, then Gemini. Each provider is
 * wrapped in its own timeout, and a failure falls through to the next one.
 * The visitor sees one answer or one honest failure - never a provider name, an
 * HTTP status or a key.
 *
 * The two API shapes are handled separately rather than through an adapter
 * library. OpenRouter and Groq both speak the OpenAI chat-completions shape;
 * Gemini has its own. A handful of fetch calls is less code than a dependency,
 * and it keeps the bundle inside the Cloudflare Pages Functions size limits.
 */

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models'

export class ProviderError extends Error {
  readonly provider: ProviderName
  readonly status?: number
  readonly reason: string

  constructor(provider: ProviderName, reason: string, status?: number) {
    super(`${provider}: ${reason}`)
    this.name = 'ProviderError'
    this.provider = provider
    this.reason = reason
    this.status = status
  }
}

export class NoProvidersError extends Error {
  constructor() {
    super('No chat provider is configured.')
    this.name = 'NoProvidersError'
  }
}

export class AllProvidersFailedError extends Error {
  constructor() {
    super('Every configured chat provider failed.')
    this.name = 'AllProvidersFailedError'
  }
}

type OpenAIChatResponse = {
  choices?: Array<{
    message?: {
      content?: unknown
    }
  }>
}

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: unknown }>
    }
  }>
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json()
  } catch {
    return null
  }
}

async function callOpenAICompatible(
  config: ProviderConfig,
  messages: ProviderMessage[],
  signal: AbortSignal,
): Promise<string> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${config.apiKey}`,
    'Content-Type': 'application/json',
  }

  if (config.name === 'openrouter') {
    // Optional attribution headers. Neither is required, and neither is secret.
    if (config.siteUrl) headers['HTTP-Referer'] = config.siteUrl
    if (config.appName) headers['X-Title'] = config.appName
  }

  const response = await fetch(config.name === 'openrouter' ? OPENROUTER_URL : GROQ_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: config.model,
      messages,
      temperature: 0.35,
      top_p: 0.9,
      max_tokens: 600,
      stream: false,
    }),
    signal,
  })

  if (!response.ok) {
    throw new ProviderError(config.name, 'http error', response.status)
  }

  const data = (await readJson(response)) as OpenAIChatResponse | null
  const content = data?.choices?.[0]?.message?.content

  if (typeof content !== 'string' || !content.trim()) {
    throw new ProviderError(config.name, 'empty response')
  }

  return content
}

async function callGemini(
  config: ProviderConfig,
  messages: ProviderMessage[],
  signal: AbortSignal,
): Promise<string> {
  const system = messages
    .filter((message) => message.role === 'system')
    .map((message) => message.content)
    .join('\n\n')

  const contents = messages
    .filter((message) => message.role !== 'system')
    .map((message) => ({
      role: message.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: message.content }],
    }))

  const model = config.model.replace(/^models\//, '')

  const response = await fetch(`${GEMINI_URL}/${encodeURIComponent(model)}:generateContent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // The key goes in a header, not the query string, so it cannot end up in
      // an access log or an error report that captures the URL.
      'x-goog-api-key': config.apiKey,
    },
    body: JSON.stringify({
      systemInstruction: system ? { parts: [{ text: system }] } : undefined,
      contents,
      generationConfig: {
        temperature: 0.35,
        topP: 0.9,
        maxOutputTokens: 600,
      },
    }),
    signal,
  })

  if (!response.ok) {
    throw new ProviderError(config.name, 'http error', response.status)
  }

  const data = (await readJson(response)) as GeminiResponse | null
  const text = (data?.candidates?.[0]?.content?.parts ?? [])
    .map((part) => (typeof part.text === 'string' ? part.text : ''))
    .join('')
    .trim()

  if (!text) {
    throw new ProviderError(config.name, 'empty response')
  }

  return text
}

async function callProvider(
  config: ProviderConfig,
  messages: ProviderMessage[],
  signal: AbortSignal,
): Promise<string> {
  return config.name === 'gemini'
    ? callGemini(config, messages, signal)
    : callOpenAICompatible(config, messages, signal)
}

async function withTimeout(
  config: ProviderConfig,
  timeoutMs: number,
  task: (signal: AbortSignal) => Promise<string>,
): Promise<string> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    return await task(controller.signal)
  } catch (error) {
    if (controller.signal.aborted) {
      throw new ProviderError(config.name, 'timeout')
    }
    if (error instanceof ProviderError) throw error
    throw new ProviderError(
      config.name,
      error instanceof Error ? error.name : 'network error',
    )
  } finally {
    clearTimeout(timer)
  }
}

export type GenerationResult = {
  reply: string
  provider: ProviderName
  priceGuardApplied: boolean
}

/**
 * Calls providers in order until one returns usable text. Nothing from the
 * prompt, the visitor's message or the reply is logged: only the provider, an
 * HTTP status, a short reason and elapsed time.
 */
export async function generateReply(
  env: Env,
  body: ChatRequestBody,
): Promise<GenerationResult> {
  const config = getChatConfig(env)
  const providers = getProviderConfigs(env)

  if (!providers.length) throw new NoProvidersError()

  const messages = buildProviderMessages(body)

  for (const provider of providers) {
    const startedAt = Date.now()

    try {
      const raw = await withTimeout(provider, config.providerTimeoutMs, (signal) =>
        callProvider(provider, messages, signal),
      )

      const cleaned = sanitiseReply(raw)
      if (!cleaned) throw new ProviderError(provider.name, 'empty response')

      const guarded = enforcePricingGuard(cleaned)
      if (guarded.blocked) {
        console.warn(
          `[chat] price_guard provider=${provider.name} amounts=${guarded.blockedAmounts.join(',')}`,
        )
      }

      return {
        reply: guarded.reply,
        provider: provider.name,
        priceGuardApplied: guarded.blocked,
      }
    } catch (error) {
      const status = error instanceof ProviderError ? error.status : undefined
      const reason =
        error instanceof ProviderError
          ? error.reason
          : error instanceof Error
            ? error.name
            : 'unknown'

      console.warn(
        `[chat] provider_failed provider=${provider.name} status=${status ?? 'n/a'} ` +
          `reason=${reason} elapsed_ms=${Date.now() - startedAt}`,
      )
    }
  }

  throw new AllProvidersFailedError()
}
