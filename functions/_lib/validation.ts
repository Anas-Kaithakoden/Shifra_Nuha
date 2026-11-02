import { LIMITS } from './config'
import type { ChatErrorCode, ChatHistoryItem, ChatRequestBody } from './types'

/**
 * ---------------------------------------------------------------------------
 * REQUEST VALIDATION
 * ---------------------------------------------------------------------------
 * Everything here is about reducing what reaches a paid provider and making a
 * malformed request fail cheaply. The endpoint is public, so it has to assume
 * that some traffic is not the chat widget:
 *
 *  - wrong method and wrong content type are rejected before any parsing;
 *  - oversized bodies are rejected before JSON parsing;
 *  - history is bounded and role-checked, so a caller cannot spend a provider's
 *    context window with one request;
 *  - control characters are removed from text that will be shown in a bubble.
 */

export class HttpError extends Error {
  readonly status: number
  readonly code: ChatErrorCode

  constructor(status: number, code: ChatErrorCode, message: string) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.code = code
  }
}

const CONTROL_CHARACTERS = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g

function cleanText(value: string): string {
  return value
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(CONTROL_CHARACTERS, '')
    .trim()
}

function isHistoryItem(value: unknown): value is ChatHistoryItem {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<ChatHistoryItem>
  return (
    (candidate.role === 'user' || candidate.role === 'assistant') &&
    typeof candidate.content === 'string'
  )
}

export async function parseChatRequest(request: Request): Promise<ChatRequestBody> {
  if (request.method !== 'POST') {
    throw new HttpError(405, 'invalid_request', 'Method not allowed.')
  }

  const contentType = request.headers.get('content-type')?.toLowerCase() ?? ''
  if (!contentType.includes('application/json')) {
    throw new HttpError(415, 'invalid_request', 'Send the message as JSON.')
  }

  const declaredLength = Number(request.headers.get('content-length') ?? '0')
  if (Number.isFinite(declaredLength) && declaredLength > LIMITS.maxBodyBytes) {
    throw new HttpError(413, 'invalid_request', 'That message is too large.')
  }

  let raw: string
  try {
    raw = await request.text()
  } catch {
    throw new HttpError(400, 'invalid_request', 'The request could not be read.')
  }

  if (!raw.trim()) {
    throw new HttpError(400, 'invalid_request', 'The request was empty.')
  }

  if (new TextEncoder().encode(raw).length > LIMITS.maxBodyBytes) {
    throw new HttpError(413, 'invalid_request', 'That message is too large.')
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    throw new HttpError(400, 'invalid_request', 'The request was not valid JSON.')
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new HttpError(400, 'invalid_request', 'The request body must be an object.')
  }

  const candidate = parsed as {
    message?: unknown
    history?: unknown
    serviceInterest?: unknown
  }

  if (typeof candidate.message !== 'string') {
    throw new HttpError(400, 'invalid_request', 'A message is required.')
  }

  const message = cleanText(candidate.message)
  if (!message) {
    throw new HttpError(400, 'invalid_request', 'A message is required.')
  }
  if (message.length > LIMITS.maxMessageLength) {
    throw new HttpError(
      400,
      'invalid_request',
      `Please keep the message under ${LIMITS.maxMessageLength} characters.`,
    )
  }

  let history: ChatHistoryItem[] | undefined
  if (candidate.history !== undefined) {
    if (!Array.isArray(candidate.history)) {
      throw new HttpError(400, 'invalid_request', 'The conversation history is malformed.')
    }
    if (candidate.history.length > LIMITS.maxHistoryMessages) {
      throw new HttpError(400, 'invalid_request', 'The conversation history is too long.')
    }

    history = []
    for (const item of candidate.history) {
      if (!isHistoryItem(item)) {
        throw new HttpError(400, 'invalid_request', 'The conversation history is malformed.')
      }
      const content = cleanText(item.content)
      if (!content || content.length > LIMITS.maxHistoryContent) continue
      history.push({ role: item.role, content })
    }
  }

  const serviceInterest =
    typeof candidate.serviceInterest === 'string' &&
    /^[a-z0-9-]{1,80}$/.test(candidate.serviceInterest)
      ? candidate.serviceInterest
      : undefined

  return { message, history, serviceInterest }
}
