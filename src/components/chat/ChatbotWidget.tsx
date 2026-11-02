import { lazy, Suspense, useCallback, useRef, useState } from 'react'
import { IconChat, IconClose, IconSpinner } from '../icons'

/**
 * ---------------------------------------------------------------------------
 * CHATBOT WIDGET
 * ---------------------------------------------------------------------------
 * The launcher is tiny and always present; the panel is a separate chunk loaded
 * on the first click. That split matters for a marketing site: a visitor who
 * never opens the chat pays for one button, not for the panel, the knowledge
 * base, the FAQ list or the API client.
 *
 * The panel is not mounted at all until first use. That is also what keeps the
 * server-rendered page free of inputs and forms for the smoke tests - the site
 * still has no contact form, and no hidden one is shipped to visitors who never
 * ask for it.
 */

const ChatPanel = lazy(() => import('./ChatPanel'))

function PanelSkeleton({ onClose }: { onClose: () => void }) {
  return (
    <div
      id="chat-panel"
      role="dialog"
      aria-modal="true"
      aria-label="Loading chat"
      className="fixed inset-x-3 top-3 bottom-3 z-50 flex items-center justify-center rounded-xl border border-paper-200 bg-white shadow-[0_30px_80px_-30px_rgba(7,29,43,0.55)] sm:inset-x-auto sm:top-auto sm:right-6 sm:bottom-6 sm:h-[min(650px,calc(100dvh-3rem))] sm:w-[400px]"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close chat"
        className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-paper-100 hover:text-ink-950 focus-visible:outline-brand-600"
      >
        <IconClose width={18} height={18} />
      </button>
      <div role="status" className="flex items-center gap-2 text-[13px] text-ink-500">
        <IconSpinner width={18} height={18} className="animate-spin" />
        Opening chat…
      </div>
    </div>
  )
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const launcherRef = useRef<HTMLButtonElement>(null)

  const openChat = useCallback(() => {
    setHasOpened(true)
    setOpen(true)
  }, [])

  const closeChat = useCallback(() => {
    setOpen(false)
    // The launcher is remounted when the panel closes, so wait for that render
    // before returning focus to it. Without this, keyboard focus is lost to the
    // document body when the dialog disappears.
    window.setTimeout(() => launcherRef.current?.focus(), 0)
  }, [])

  return (
    <>
      {hasOpened ? (
        <Suspense fallback={<PanelSkeleton onClose={closeChat} />}>
          <ChatPanel open={open} onClose={closeChat} />
        </Suspense>
      ) : null}

      {!open ? (
        <div className="fixed right-4 bottom-20 z-50 md:right-6 md:bottom-6">
          <button
            ref={launcherRef}
            type="button"
            onClick={openChat}
            aria-expanded={open}
            aria-controls="chat-panel"
            aria-label="Chat with Shifra Nuha Technologies"
            className="group inline-flex h-14 items-center gap-2.5 rounded-full border border-ink-950 bg-ink-950 pr-5 pl-4 text-[12px] font-semibold tracking-[0.02em] text-white shadow-[0_16px_34px_-18px_rgba(7,29,43,0.7)] transition-all duration-200 hover:border-brand-700 hover:bg-brand-700 focus-visible:outline-brand-600"
          >
            <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600">
              <IconChat width={16} height={16} />
              <span
                aria-hidden="true"
                className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-ink-950 bg-brand-300"
              />
            </span>
            Chat with us
          </button>
        </div>
      ) : null}
    </>
  )
}
