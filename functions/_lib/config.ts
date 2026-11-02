import type { Env } from './types'

/**
 * ---------------------------------------------------------------------------
 * SERVER CONFIGURATION
 * ---------------------------------------------------------------------------
 * Provider order is fixed in code: OpenRouter, then Groq, then Gemini. A
 * provider is only attempted when its API key is present, so a deployment can
 * run with one provider, two, or all three without changing anything else.
 *
 * Model names are deployment configuration, not code. Providers retire models
 * on their own schedule; putting the names in environment variables means a
 * model change is a dashboard edit rather than a redeploy of this repository.
 *
 * None of these values are ever sent to the browser.
 */

export const DEFAULT_MODELS = {
  openrouter: 'meta-llama/llama-3.3-70b-instruct',
  groq: 'llama-3.3-70b-versatile',
  gemini: 'gemini-2.5-flash',
} as const

export const LIMITS = {
  maxMessageLength: 1000,
  maxHistoryMessages: 20,
  maxHistoryContent: 2000,
  maxBodyBytes: 24_000,
  /** Sent to a provider, not the full conversation the browser may hold. */
  maxPromptHistory: 12,
} as const

export type ProviderName = 'openrouter' | 'groq' | 'gemini'

export type ProviderConfig = {
  name: ProviderName
  apiKey: string
  model: string
  /** OpenRouter attribution headers. Optional and never secret. */
  siteUrl?: string
  appName?: string
}

export type ChatConfig = {
  providerTimeoutMs: number
  rateLimit: number
  rateWindowMs: number
}

function readInt(value: string | undefined, fallback: number, min: number, max: number): number {
  const parsed = Number.parseInt(value ?? '', 10)
  if (!Number.isFinite(parsed)) return fallback
  return Math.min(max, Math.max(min, parsed))
}

export function getChatConfig(env: Env): ChatConfig {
  const rateWindowSeconds = readInt(env.CHAT_RATE_WINDOW_SECONDS, 600, 10, 3600)
  return {
    providerTimeoutMs: readInt(env.CHAT_REQUEST_TIMEOUT_MS, 12_000, 100, 30_000),
    rateLimit: readInt(env.CHAT_RATE_LIMIT, 12, 1, 100),
    rateWindowMs: rateWindowSeconds * 1000,
  }
}

export function getProviderConfigs(env: Env): ProviderConfig[] {
  const configs: ProviderConfig[] = []

  const openrouterKey = env.OPENROUTER_API_KEY?.trim()
  if (openrouterKey) {
    configs.push({
      name: 'openrouter',
      apiKey: openrouterKey,
      model: env.OPENROUTER_MODEL?.trim() || DEFAULT_MODELS.openrouter,
      siteUrl: env.OPENROUTER_SITE_URL?.trim() || undefined,
      appName: env.OPENROUTER_APP_NAME?.trim() || undefined,
    })
  }

  const groqKey = env.GROQ_API_KEY?.trim()
  if (groqKey) {
    configs.push({
      name: 'groq',
      apiKey: groqKey,
      model: env.GROQ_MODEL?.trim() || DEFAULT_MODELS.groq,
    })
  }

  const geminiKey = env.GEMINI_API_KEY?.trim()
  if (geminiKey) {
    configs.push({
      name: 'gemini',
      apiKey: geminiKey,
      model: env.GEMINI_MODEL?.trim() || DEFAULT_MODELS.gemini,
    })
  }

  return configs
}
