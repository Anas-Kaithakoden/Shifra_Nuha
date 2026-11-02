import { useCallback, useEffect, useRef, useState } from 'react'
import { businessFaqs } from '../../data/faqs'
import {
  followUpQuickReplies,
  initialQuickReplies,
  type QuickReply,
} from '../../data/chatbot'
import { whatsappLink } from '../../lib/contactLinks'
import { ChatApiError, requestChatReply } from '../../lib/chatbot/api'
import { buildEnquiryMessage } from '../../lib/chatbot/enquiry'
import { mergeServiceInterest, serviceInterestLabel } from '../../lib/chatbot/serviceInterest'
import {
  clearSession,
  createMessageId,
  createSession,
  loadSession,
  saveSession,
} from '../../lib/chatbot/session'
import type { ChatMessage } from '../../lib/chatbot/types'
import { track } from '../../lib/tracking'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import {
  IconClose,
  IconHelp,
  IconReset,
  IconSend,
  IconSpinner,
  IconWhatsApp,
} from '../icons'

/**
 * ---------------------------------------------------------------------------
 * CHAT PANEL
 * ---------------------------------------------------------------------------
 * The panel is deliberately a dialog rather than an inline panel:
 *
 *  - On a phone it takes the screen, because a half-height chat over a page
 *    that still scrolls is worse than either full screen or no chat.
 *  - On desktop it is a 400px column, which is wide enough for a sentence and
 *    narrow enough to leave the page visible behind it.
 *  - Focus is trapped while it is open, Escape closes it, and focus returns to
 *    the launcher. Body scrolling is locked on small screens only.
 *
 * The conversation itself lives in `sessionStorage` (see `session.ts`). The
 * server stores nothing, and the visitor can clear the conversation at any
 * time with the reset button.
 *
 * THINGS IT MUST NOT DO
 *  - Open WhatsApp without an explicit button press. The handoff screen exists
 *    precisely so the visitor reads and edits the message first.
 *  - Claim a human is online. The subtitle says "AI assistant"; the closing
 *    note says replies come from the service guide.
 *  - Invent a price. The UI shows approved figures only; the server applies a
 *    second price guard to anything the model returns.
 */

const MAX_INPUT_LENGTH = 1000
const MAX_HANDOFF_LENGTH = 1200
const MAX_HISTORY_MESSAGES = 16
const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

type ChatPanelProps = {
  open: boolean
  onClose: () => void
}

type QuickReplies = readonly QuickReply[]

function isAbort(error: unknown): boolean {
  return error instanceof ChatApiError && error.status === 499
}

function MessageText({ content }: { content: string }) {
  const paragraphs = content.split(/\n{2,}/)

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="whitespace-pre-line">
          {paragraph}
        </p>
      ))}
    </>
  )
}

export default function ChatPanel({ open, onClose }: ChatPanelProps) {
  const [initialSession] = useState(loadSession)
  const [messages, setMessages] = useState<ChatMessage[]>(initialSession.messages)
  const [serviceInterest, setServiceInterest] = useState<string | null>(
    initialSession.serviceInterest,
  )
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [failedText, setFailedText] = useState<string | null>(null)
  const [showFaqs, setShowFaqs] = useState(false)
  const [showHandoff, setShowHandoff] = useState(false)
  const [handoffText, setHandoffText] = useState('')
  const [confirmingClear, setConfirmingClear] = useState(false)
  const [announcement, setAnnouncement] = useState('')

  const reducedMotion = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const handoffRef = useRef<HTMLTextAreaElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  const hasUserMessage = messages.some((message) => message.role === 'user')
  const quickReplies: QuickReplies = hasUserMessage ? followUpQuickReplies : initialQuickReplies
  const handoffLink = whatsappLink(handoffText.trim() || undefined)

  /* Persist after every change. `saveSession` is defensive about storage being
     unavailable, so a quota error cannot take the chat down with it. */
  useEffect(() => {
    saveSession({ messages, serviceInterest })
  }, [messages, serviceInterest])

  /* Auto-scroll the message list, not the page. `scrollIntoView` would also
     move the document behind a full-screen mobile panel. */
  useEffect(() => {
    if (!open) return
    const element = listRef.current
    if (!element) return

    const frame = window.requestAnimationFrame(() => {
      element.scrollTo({
        top: element.scrollHeight,
        behavior: reducedMotion ? 'auto' : 'smooth',
      })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [messages, sending, error, showFaqs, showHandoff, open, reducedMotion])

  /* Move focus into the dialog when it opens. The close button is a safe first
     stop: it does not open the mobile keyboard the way focusing the input
     would, and a keyboard user can tab forward from there. */
  useEffect(() => {
    if (!open) return
    const frame = window.requestAnimationFrame(() => closeButtonRef.current?.focus())
    return () => window.cancelAnimationFrame(frame)
  }, [open])

  /* Lock the page behind the panel on phones. Desktop leaves the page
     scrollable, because the panel is a column rather than a full screen. */
  useEffect(() => {
    if (!open) return
    const media = window.matchMedia('(max-width: 767px)')
    const previous = document.body.style.overflow

    const apply = () => {
      document.body.style.overflow = media.matches ? 'hidden' : previous
    }

    apply()
    media.addEventListener?.('change', apply)

    return () => {
      media.removeEventListener?.('change', apply)
      document.body.style.overflow = previous
    }
  }, [open])

  /* Abort an in-flight request when the panel is unmounted or the conversation
     is cleared. A reply that arrives after a clear would be confusing. */
  useEffect(() => {
    return () => abortRef.current?.abort()
  }, [])

  /* Grow the composer with its content, up to roughly four lines. */
  useEffect(() => {
    const element = inputRef.current
    if (!element) return
    element.style.height = 'auto'
    element.style.height = `${Math.min(element.scrollHeight, 116)}px`
  }, [input])

  const announce = (message: string) => {
    setAnnouncement('')
    window.setTimeout(() => setAnnouncement(message), 20)
  }

  const focusInput = useCallback(() => {
    window.requestAnimationFrame(() => inputRef.current?.focus())
  }, [])

  async function submit(
    rawText: string,
    options: {
      appendUser?: boolean
      history?: ChatMessage[]
      interest?: string | null
    } = {},
  ) {
    const text = rawText.trim()
    if (!text || sending) return

    const appendUser = options.appendUser !== false
    const historyMessages = options.history ?? messages
    const interest = options.interest ?? serviceInterest

    if (appendUser) {
      const userMessage: ChatMessage = {
        id: createMessageId(),
        role: 'user',
        content: text,
        createdAt: Date.now(),
        status: 'sent',
      }
      setMessages((current) => [...current, userMessage])
    }

    setInput('')
    setError(null)
    setFailedText(null)
    setShowFaqs(false)
    setSending(true)

    const controller = new AbortController()
    abortRef.current?.abort()
    abortRef.current = controller

    const history = historyMessages
      .slice(-MAX_HISTORY_MESSAGES)
      .filter((message) => message.content.trim().length > 0)
      .map((message) => ({ role: message.role, content: message.content }))

    try {
      const response = await requestChatReply(
        {
          message: text,
          history,
          serviceInterest: interest ?? undefined,
        },
        { signal: controller.signal },
      )

      const reply: ChatMessage = {
        id: createMessageId(),
        role: 'assistant',
        content: response.reply,
        createdAt: Date.now(),
        status: 'sent',
      }

      setMessages((current) => [...current, reply])
      setServiceInterest((current) =>
        response.serviceInterest ?? mergeServiceInterest(current, text),
      )
      announce('Reply received.')
    } catch (caught) {
      if (isAbort(caught)) return

      const message =
        caught instanceof ChatApiError
          ? caught.message
          : "I can't reach the assistant right now. Please try again, or continue on WhatsApp."

      setError(message)
      setFailedText(text)
      announce('The reply failed. A retry button is available.')
    } finally {
      if (abortRef.current === controller) abortRef.current = null
      setSending(false)
    }
  }

  function handleQuickReply(reply: QuickReply) {
    if (reply.serviceId) {
      setServiceInterest((current) => reply.serviceId ?? current)
    }
    void submit(reply.message, { interest: reply.serviceId ?? serviceInterest })
  }

  function handleFaq(question: string) {
    setShowFaqs(false)
    void submit(question)
  }

  function retry() {
    if (!failedText || sending) return

    const lastIndex = messages.map((message) => message.content).lastIndexOf(failedText)
    const lastMessage = messages[lastIndex]
    const history =
      lastIndex >= 0 && lastMessage?.role === 'user'
        ? messages.slice(0, lastIndex)
        : messages

    void submit(failedText, { appendUser: false, history })
  }

  function clearConversation() {
    abortRef.current?.abort()
    abortRef.current = null
    clearSession()

    const fresh = createSession()
    setMessages(fresh.messages)
    setServiceInterest(fresh.serviceInterest)
    setInput('')
    setError(null)
    setFailedText(null)
    setShowFaqs(false)
    setShowHandoff(false)
    setConfirmingClear(false)
    setSending(false)
    announce('Conversation cleared. A new conversation has started.')
    focusInput()
  }

  function openHandoff() {
    const draft = buildEnquiryMessage({ serviceInterest, messages })
    setHandoffText(draft)
    setShowFaqs(false)
    setShowHandoff(true)
    setConfirmingClear(false)
    window.requestAnimationFrame(() => {
      handoffRef.current?.focus()
      handoffRef.current?.setSelectionRange(draft.length, draft.length)
    })
  }

  function closeHandoff() {
    setShowHandoff(false)
    focusInput()
  }

  function handlePanelKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.stopPropagation()
      if (showHandoff) {
        closeHandoff()
        return
      }
      if (showFaqs) {
        setShowFaqs(false)
        return
      }
      onClose()
      return
    }

    if (event.key !== 'Tab') return

    const panel = panelRef.current
    if (!panel) return

    const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (element) =>
        element.offsetWidth > 0 ||
        element.offsetHeight > 0 ||
        element.getClientRects().length > 0,
    )

    if (!focusable.length) {
      event.preventDefault()
      return
    }

    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const active = document.activeElement

    if (event.shiftKey) {
      if (active === first || !panel.contains(active)) {
        event.preventDefault()
        last.focus()
      }
      return
    }

    if (active === last) {
      event.preventDefault()
      first.focus()
    }
  }

  function handleComposerKeyDown(event: ReactKeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== 'Enter' || event.shiftKey) return
    if (event.nativeEvent.isComposing) return
    event.preventDefault()
    if (!sending && input.trim()) void submit(input)
  }

  const serviceLabel = serviceInterest ? serviceInterestLabel(serviceInterest) : 'your requirement'

  return (
    <div
      ref={panelRef}
      id="chat-panel"
      role="dialog"
      aria-modal={open ? true : undefined}
      aria-labelledby="chat-panel-title"
      aria-hidden={!open}
      onKeyDown={handlePanelKeyDown}
      className={`fixed inset-x-3 top-3 bottom-3 z-50 min-w-0 flex-col overflow-hidden rounded-xl border border-paper-200 bg-white shadow-[0_30px_80px_-30px_rgba(7,29,43,0.55)] sm:inset-x-auto sm:top-auto sm:right-6 sm:bottom-6 sm:h-[min(650px,calc(100dvh-3rem))] sm:w-[400px] ${
        open ? 'flex panel-enter' : 'hidden'
      }`}
    >
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>

      {/* ---------------------------------------------------------------- */}
      {/* Header                                                            */}
      {/* ---------------------------------------------------------------- */}
      <header className="flex shrink-0 items-start justify-between gap-3 bg-ink-950 px-4 py-3.5 text-white">
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-500/50 bg-brand-700 text-[12px] font-semibold tracking-[0.08em] text-white"
          >
            SN
          </span>
          <div className="min-w-0">
            <h2
              id="chat-panel-title"
              className="truncate font-display text-[17px] leading-tight text-white"
            >
              Shifra Nuha Assistant
            </h2>
            <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-ink-200">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-300" />
              AI assistant · service guide
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => setConfirmingClear((current) => !current)}
            aria-label="Clear conversation"
            aria-expanded={confirmingClear}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-white"
          >
            <IconReset width={17} height={17} />
          </button>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-white"
          >
            <IconClose width={18} height={18} />
          </button>
        </div>
      </header>

      {confirmingClear ? (
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-paper-200 bg-paper-100 px-4 py-2.5">
          <p className="text-[12px] font-medium text-ink-700">Clear this conversation?</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={clearConversation}
              className="min-h-9 rounded-md bg-ink-950 px-3 text-[12px] font-semibold text-white hover:bg-brand-700"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setConfirmingClear(false)}
              className="min-h-9 rounded-md border border-paper-300 px-3 text-[12px] font-semibold text-ink-700 hover:border-ink-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      {/* ---------------------------------------------------------------- */}
      {/* Conversation                                                      */}
      {/* ---------------------------------------------------------------- */}
      <div
        ref={listRef}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-paper-50 px-3.5 py-4"
        aria-busy={sending}
      >
        <div
          role="log"
          aria-live="polite"
          aria-relevant="additions text"
          aria-label="Conversation with the Shifra Nuha assistant"
          className="flex min-w-0 flex-col gap-3"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex min-w-0 items-start gap-2 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' ? (
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-950 text-[9px] font-semibold tracking-[0.06em] text-white"
                >
                  SN
                </span>
              ) : null}

              <div
                className={`max-w-[86%] min-w-0 rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed break-words ${
                  message.role === 'user'
                    ? 'rounded-tr-sm bg-ink-950 text-white'
                    : 'rounded-tl-sm border border-paper-200 bg-white text-ink-800'
                }`}
              >
                <span className="sr-only">
                  {message.role === 'user' ? 'You said: ' : 'Shifra Nuha assistant said: '}
                </span>
                <div className="space-y-2">
                  <MessageText content={message.content} />
                </div>
              </div>
            </div>
          ))}

          {sending ? (
            <div className="flex items-start gap-2" role="status">
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-950 text-[9px] font-semibold tracking-[0.06em] text-white"
              >
                SN
              </span>
              <div className="rounded-xl rounded-tl-sm border border-paper-200 bg-white px-3.5 py-3">
                <span className="sr-only">Assistant is typing</span>
                <span aria-hidden="true" className="flex items-center gap-1">
                  <span className="chat-typing-dot h-1.5 w-1.5 rounded-full bg-ink-400" />
                  <span
                    className="chat-typing-dot h-1.5 w-1.5 rounded-full bg-ink-400"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="chat-typing-dot h-1.5 w-1.5 rounded-full bg-ink-400"
                    style={{ animationDelay: '300ms' }}
                  />
                </span>
              </div>
            </div>
          ) : null}
        </div>

        {error ? (
          <div
            role="alert"
            className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-[12px] leading-relaxed text-red-800"
          >
            <p>{error}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {failedText ? (
                <button
                  type="button"
                  onClick={retry}
                  disabled={sending}
                  className="min-h-8 rounded-md bg-red-800 px-2.5 text-[11px] font-semibold text-white hover:bg-red-900 disabled:opacity-60"
                >
                  Try again
                </button>
              ) : null}
              <button
                type="button"
                onClick={openHandoff}
                className="min-h-8 rounded-md border border-red-300 px-2.5 text-[11px] font-semibold text-red-800 hover:bg-red-100"
              >
                Continue on WhatsApp
              </button>
            </div>
          </div>
        ) : null}

        {showFaqs ? (
          <section className="mt-4 rounded-xl border border-paper-200 bg-white p-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-[15px] text-ink-950">Common questions</h3>
              <button
                type="button"
                onClick={() => {
                  setShowFaqs(false)
                  focusInput()
                }}
                className="min-h-8 rounded-md px-2 text-[11px] font-semibold text-brand-700 hover:bg-brand-50"
              >
                Back to chat
              </button>
            </div>
            <ul className="mt-2 divide-y divide-paper-200">
              {businessFaqs.map((faq) => (
                <li key={faq.id}>
                  <button
                    type="button"
                    onClick={() => handleFaq(faq.question)}
                    className="w-full py-2.5 text-left text-[12px] leading-snug font-medium text-ink-700 hover:text-brand-700"
                  >
                    {faq.question}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {!sending && !showFaqs && !showHandoff ? (
          <div className="mt-4">
            <p className="mb-2 text-[10px] font-semibold tracking-[0.12em] text-ink-400 uppercase">
              {hasUserMessage ? 'Ask next' : 'Start with a topic'}
            </p>
            <div className="flex flex-wrap gap-1.5" aria-label="Suggested messages">
              {quickReplies.map((reply) => (
                <button
                  key={reply.id}
                  type="button"
                  onClick={() => handleQuickReply(reply)}
                  disabled={sending}
                  className="min-h-8 max-w-full rounded-full border border-paper-300 bg-white px-3 text-left text-[11px] leading-tight font-medium text-ink-700 transition-colors hover:border-brand-500 hover:text-brand-700 disabled:opacity-60"
                >
                  {reply.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {showHandoff ? (
          <section className="mt-4 rounded-xl border border-brand-200 bg-white p-3">
            <div className="flex items-start gap-2">
              <span
                aria-hidden="true"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#128c7e] text-white"
              >
                <IconWhatsApp width={14} height={14} />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-[15px] leading-tight text-ink-950">
                  Send an enquiry on WhatsApp
                </h3>
                <p className="mt-1 text-[11px] leading-relaxed text-ink-500">
                  Review and edit this message. WhatsApp will open only when you tap the button.
                </p>
              </div>
            </div>

            <p className="mt-2 text-[10px] font-semibold tracking-[0.1em] text-brand-700 uppercase">
              About {serviceLabel}
            </p>

            <label htmlFor="chat-whatsapp-message" className="sr-only">
              WhatsApp enquiry message
            </label>
            <textarea
              ref={handoffRef}
              id="chat-whatsapp-message"
              value={handoffText}
              onChange={(event) => setHandoffText(event.target.value.slice(0, MAX_HANDOFF_LENGTH))}
              rows={7}
              maxLength={MAX_HANDOFF_LENGTH}
              className="mt-1.5 w-full resize-none rounded-lg border border-paper-300 bg-paper-50 px-3 py-2.5 text-[12px] leading-relaxed text-ink-800 outline-none focus:border-brand-600 focus-visible:outline-brand-600"
            />

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <a
                href={handoffLink.href}
                {...(handoffLink.ready
                  ? { target: '_blank', rel: 'noreferrer noopener' }
                  : {})}
                onClick={() => {
                  track({ name: 'WhatsAppClick', place: 'chatbot-handoff', label: handoffText })
                }}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-md bg-[#128c7e] px-3 text-[12px] font-semibold text-white hover:bg-[#0f766e]"
              >
                <IconWhatsApp width={15} height={15} />
                {handoffLink.ready ? 'Open WhatsApp' : 'Open contact page'}
              </a>
              <button
                type="button"
                onClick={closeHandoff}
                className="min-h-9 rounded-md border border-paper-300 px-3 text-[12px] font-semibold text-ink-700 hover:border-ink-300"
              >
                Back to chat
              </button>
            </div>
          </section>
        ) : null}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Composer                                                          */}
      {/* ---------------------------------------------------------------- */}
      <div className="shrink-0 border-t border-paper-200 bg-white">
        <div className="flex items-center justify-between gap-2 px-3 pt-2">
          <button
            type="button"
            onClick={() => {
              setShowFaqs((current) => !current)
              setShowHandoff(false)
              setConfirmingClear(false)
            }}
            aria-expanded={showFaqs}
            className="inline-flex min-h-8 items-center gap-1.5 rounded-md px-2 text-[11px] font-semibold text-ink-600 hover:bg-paper-100 hover:text-ink-950"
          >
            <IconHelp width={14} height={14} />
            Common questions
          </button>
          <button
            type="button"
            onClick={openHandoff}
            className="inline-flex min-h-8 items-center gap-1.5 rounded-md px-2 text-[11px] font-semibold text-[#128c7e] hover:bg-[#128c7e]/10"
          >
            <IconWhatsApp width={14} height={14} />
            WhatsApp enquiry
          </button>
        </div>

        {showHandoff ? (
          <p className="px-4 pt-2 pb-3 text-[11px] leading-relaxed text-ink-500">
            Use the review box above to prepare your message. Nothing is sent until you press
            send inside WhatsApp.
          </p>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault()
              if (!sending && input.trim()) void submit(input)
            }}
            className="px-3 pt-1.5 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
          >
            <label htmlFor="chat-message" className="sr-only">
              Message the Shifra Nuha assistant
            </label>
            <div className="flex min-w-0 items-end gap-2 rounded-xl border border-paper-300 bg-paper-50 p-1.5 focus-within:border-brand-600">
              <textarea
                ref={inputRef}
                id="chat-message"
                value={input}
                onChange={(event) => setInput(event.target.value.slice(0, MAX_INPUT_LENGTH))}
                onKeyDown={handleComposerKeyDown}
                rows={1}
                maxLength={MAX_INPUT_LENGTH}
                placeholder="Ask about registration, tax, websites or branding…"
                aria-describedby="chat-composer-help"
                className="max-h-[116px] min-h-9 w-full min-w-0 resize-none bg-transparent px-2 py-1.5 text-[13px] leading-relaxed text-ink-900 outline-none placeholder:text-ink-400"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                aria-label={sending ? 'Waiting for a reply' : 'Send message'}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink-950 text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-brand-600"
              >
                {sending ? (
                  <IconSpinner width={16} height={16} className="animate-spin" />
                ) : (
                  <IconSend width={16} height={16} />
                )}
              </button>
            </div>
            <div
              id="chat-composer-help"
              className="mt-1.5 flex items-center justify-between gap-2 px-1 text-[10px] text-ink-400"
            >
              <span>Enter to send · Shift + Enter for a new line</span>
              {input.length > MAX_INPUT_LENGTH - 150 ? (
                <span>
                  {input.length}/{MAX_INPUT_LENGTH}
                </span>
              ) : null}
            </div>
            <p className="mt-1 px-1 text-[10px] leading-relaxed text-ink-400">
              AI assistant · replies come from our service guide. Verify important details with the
              team.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}


