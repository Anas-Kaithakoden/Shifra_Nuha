import type {
  ChatErrorCode,
  ChatErrorResponse,
  ChatRequestBody,
  ChatSuccessResponse,
} from './types'

/**
 * ---------------------------------------------------------------------------
 * CHAT API CLIENT
 * ---------------------------------------------------------------------------
 * One `fetch` call, one typed error, and a timeout that is shorter than a
 * visitor's patience. The browser never learns which provider answered, and it
 * never sees an API key: both live entirely in the Cloudflare Function.
 */

const REQUEST_TIMEOUT_MS = 30_000

export class ChatApiError extends Error {
  readonly code: ChatErrorCode
  readonly status: number
  readonly retryable: boolean

  constructor(message: string, code: ChatErrorCode, status: number, retryable: boolean) {
    super(message)
    this.name = 'ChatApiError'
    this.code = code
    this.status = status
    this.retryable = retryable
  }
}

function fallbackMessage(status: number): string {
  if (status === 429) {
    return 'You have sent several messages in a short time. Please wait a moment and try again.'
  }
  if (status >= 500) {
    return "I'm having trouble connecting right now. Please try again, or continue on WhatsApp."
  }
  return 'That message could not be sent. Please check it and try again.'
}

async function readError(response: Response): Promise<ChatApiError> {
  let body: Partial<ChatErrorResponse> | null = null

  try {
    body = (await response.json()) as Partial<ChatErrorResponse>
  } catch {
    body = null
  }

  const code: ChatErrorCode =
    body?.error === 'rate_limited' ||
    body?.error === 'provider_error' ||
    body?.error === 'server_error' ||
    body?.error === 'invalid_request'
      ? body.error
      : response.status === 429
        ? 'rate_limited'
        : response.status >= 500
          ? 'provider_error'
          : 'invalid_request'

  const message =
    typeof body?.message === 'string' && body.message.trim()
      ? body.message.trim()
      : fallbackMessage(response.status)

  return new ChatApiError(
    message,
    code,
    response.status,
    response.status === 429 || response.status >= 500,
  )
}

export type RequestChatOptions = {
  signal?: AbortSignal
  timeoutMs?: number
}

export async function requestChatReply(
  payload: ChatRequestBody,
  options: RequestChatOptions = {},
): Promise<ChatSuccessResponse> {
  const controller = new AbortController()
  const timeoutMs = options.timeoutMs ?? REQUEST_TIMEOUT_MS
  let timedOut = false

  const timeout = window.setTimeout(() => {
    timedOut = true
    controller.abort()
  }, timeoutMs)

  const onExternalAbort = () => controller.abort()
  options.signal?.addEventListener('abort', onExternalAbort, { once: true })

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    if (!response.ok) throw await readError(response)

    const body = (await response.json()) as Partial<ChatSuccessResponse>
    const reply = typeof body.reply === 'string' ? body.reply.trim() : ''

    if (!reply) {
      throw new ChatApiError(
        "I couldn't form a reply just now. Please try again, or continue on WhatsApp.",
        'provider_error',
        502,
        true,
      )
    }

    return {
      reply,
      serviceInterest:
        typeof body.serviceInterest === 'string' && /^[a-z0-9-]{1,80}$/.test(body.serviceInterest)
          ? body.serviceInterest
          : undefined,
    }
  } catch (error) {
    if (error instanceof ChatApiError) throw error

    if (error instanceof DOMException && error.name === 'AbortError') {
      if (options.signal?.aborted && !timedOut) {
        throw new ChatApiError('The message was cancelled.', 'invalid_request', 499, false)
      }
      throw new ChatApiError(
        'The assistant took too long to reply. Please try again.',
        'provider_error',
        504,
        true,
      )
    }

    throw new ChatApiError(
      "I can't reach the assistant right now. Check your connection and try again, or continue on WhatsApp.",
      'provider_error',
      503,
      true,
    )
  } finally {
    window.clearTimeout(timeout)
    options.signal?.removeEventListener('abort', onExternalAbort)
  }
}
