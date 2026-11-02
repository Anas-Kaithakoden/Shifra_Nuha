/**
 * ---------------------------------------------------------------------------
 * SERVER TYPES
 * ---------------------------------------------------------------------------
 * The Cloudflare Pages Function is a Web-standard handler, so these types are
 * deliberately small: no Node types, no framework, nothing that would not run
 * in a Worker.
 */

export type Env = {
  OPENROUTER_API_KEY?: string
  OPENROUTER_MODEL?: string
  OPENROUTER_SITE_URL?: string
  OPENROUTER_APP_NAME?: string

  GROQ_API_KEY?: string
  GROQ_MODEL?: string

  GEMINI_API_KEY?: string
  GEMINI_MODEL?: string

  /** Optional tuning. All have safe defaults; none are required. */
  CHAT_RATE_LIMIT?: string
  CHAT_RATE_WINDOW_SECONDS?: string
  CHAT_REQUEST_TIMEOUT_MS?: string
}

export type ChatRole = 'user' | 'assistant'

export type ChatHistoryItem = {
  role: ChatRole
  content: string
}

export type ChatRequestBody = {
  message: string
  history?: ChatHistoryItem[]
  serviceInterest?: string
}

export type ChatSuccessResponse = {
  reply: string
  serviceInterest?: string
}

export type ChatErrorCode = 'invalid_request' | 'rate_limited' | 'provider_error' | 'server_error'

export type ChatErrorResponse = {
  error: ChatErrorCode
  message: string
  reply?: string
}

export type PagesContext = {
  request: Request
  env: Env
  params?: Record<string, string>
  waitUntil?: (promise: Promise<unknown>) => void
  next?: () => Promise<Response>
  data?: unknown
}

export type PagesFunction = (context: PagesContext) => Response | Promise<Response>
