/**
 * ---------------------------------------------------------------------------
 * CHATBOT TYPES
 * ---------------------------------------------------------------------------
 * The wire contract between the browser and `functions/api/chat.ts`. These are
 * deliberately plain types rather than a schema library: the same shapes are
 * validated by hand at the edge, and adding a runtime dependency for four
 * objects would be more machinery than the endpoint is worth.
 */

export type ChatRole = 'user' | 'assistant'

export type ChatMessageStatus = 'sent' | 'failed'

export type ChatMessage = {
  id: string
  role: ChatRole
  content: string
  /** Unix milliseconds. Used only for stable React keys and persistence. */
  createdAt: number
  /** A user message that did not receive a reply can be retried. */
  status?: ChatMessageStatus
}

export type ChatHistoryItem = {
  role: ChatRole
  content: string
}

export type ChatRequestBody = {
  message: string
  history?: ChatHistoryItem[]
  /** A service id from the knowledge base, when the UI already knows it. */
  serviceInterest?: string
}

export type ChatSuccessResponse = {
  reply: string
  serviceInterest?: string
}

export type ChatErrorCode = 'invalid_request' | 'rate_limited' | 'provider_error' | 'server_error'

export type ChatErrorResponse = {
  error: ChatErrorCode
  /** Safe to show to a visitor. Never contains provider names or keys. */
  message: string
  /** A complete fallback bubble, when the server can offer one. */
  reply?: string
}
