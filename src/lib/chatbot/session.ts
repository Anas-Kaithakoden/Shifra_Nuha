import { WELCOME_MESSAGE } from '../../data/chatbot'
import type { ChatMessage, ChatRole } from './types'

/**
 * ---------------------------------------------------------------------------
 * CHAT SESSION
 * ---------------------------------------------------------------------------
 * The conversation is held in `sessionStorage`, not `localStorage`.
 *
 * That is a deliberate privacy choice: a chat about a business's registration
 * or tax position should not still be sitting on a shared computer next week.
 * Closing the tab ends the session. The server keeps nothing at all.
 *
 * Every read is defensive because sessionStorage is user-editable, can be full,
 * and throws in private modes on some browsers. A corrupt value must produce a
 * clean welcome screen, never a blank panel or a runtime error.
 */

const STORAGE_KEY = 'shifra-nuha-chat-v1'
const MAX_STORED_MESSAGES = 60
const MAX_STORED_CONTENT = 4000

export type ChatSession = {
  messages: ChatMessage[]
  serviceInterest: string | null
}

function isRole(value: unknown): value is ChatRole {
  return value === 'user' || value === 'assistant'
}

function isMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<ChatMessage>
  return (
    typeof candidate.id === 'string' &&
    candidate.id.length > 0 &&
    isRole(candidate.role) &&
    typeof candidate.content === 'string' &&
    candidate.content.trim().length > 0 &&
    candidate.content.length <= MAX_STORED_CONTENT &&
    typeof candidate.createdAt === 'number' &&
    Number.isFinite(candidate.createdAt) &&
    (candidate.status === undefined || candidate.status === 'sent' || candidate.status === 'failed')
  )
}

/** A stable id without assuming `crypto.randomUUID` exists in every browser. */
export function createMessageId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

export function createWelcomeMessage(): ChatMessage {
  return {
    id: createMessageId(),
    role: 'assistant',
    content: WELCOME_MESSAGE,
    createdAt: Date.now(),
    status: 'sent',
  }
}

export function createSession(): ChatSession {
  return {
    messages: [createWelcomeMessage()],
    serviceInterest: null,
  }
}

export function loadSession(): ChatSession {
  if (typeof window === 'undefined') return createSession()

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return createSession()

    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object') return createSession()

    const candidate = parsed as { messages?: unknown; serviceInterest?: unknown }
    const messages = Array.isArray(candidate.messages)
      ? candidate.messages.filter(isMessage).slice(-MAX_STORED_MESSAGES)
      : []

    // A saved session without a welcome message is not a conversation. It is
    // safer to start clean than to show a panel whose first bubble is missing.
    if (!messages.length) return createSession()

    return {
      messages,
      serviceInterest:
        typeof candidate.serviceInterest === 'string' && /^[a-z0-9-]{1,80}$/.test(candidate.serviceInterest)
          ? candidate.serviceInterest
          : null,
    }
  } catch {
    return createSession()
  }
}

export function saveSession(session: ChatSession): void {
  if (typeof window === 'undefined') return

  try {
    const messages = session.messages
      .filter(
        (message) =>
          message.content.trim().length > 0 && message.content.length <= MAX_STORED_CONTENT,
      )
      .slice(-MAX_STORED_MESSAGES)

    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        messages,
        serviceInterest: session.serviceInterest,
      }),
    )
  } catch {
    // A full or unavailable storage area must not break the chat. Persistence
    // is a convenience, not a requirement for the conversation to work.
  }
}

export function clearSession(): void {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // Nothing useful to do. The in-memory state is cleared by the caller.
  }
}
