import { useId, useState } from 'react'
import type { FaqItem } from '../content/services'
import { IconChevron } from './icons'

/**
 * ---------------------------------------------------------------------------
 * FAQ ACCORDION
 * ---------------------------------------------------------------------------
 * A button-and-panel accordion rather than native `<details>`, because the
 * brief asks for a smooth open and close and `<details>` has no animatable
 * height in any browser.
 *
 * It is still keyboard-native: every question is a real button, the panel is
 * labelled by it, `aria-expanded` follows the state, and the collapse uses a
 * grid row transition so the answer stays in the document for search engines
 * while taking no visual space. Closed panels are marked `aria-hidden` and made
 * inert, so a keyboard user never tabs into hidden content.
 *
 * Only one answer is open at a time. That keeps a long FAQ scannable and means
 * the reader never loses track of the question they are on.
 */
export function Faq({ items, className = '' }: { items: FaqItem[]; className?: string }) {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (items.length === 0) return null

  return (
    <div className={`border-t border-paper-200 ${className}`}>
      {items.map((item, index) => {
        const open = openIndex === index
        const buttonId = `${baseId}-question-${index}`
        const panelId = `${baseId}-answer-${index}`

        return (
          <div key={item.question} className="border-b border-paper-200">
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="group flex min-h-16 w-full items-center justify-between gap-5 py-4 text-left transition-colors hover:text-brand-700 sm:gap-8"
              >
                <span className="flex items-baseline gap-4 sm:gap-6">
                  <span className="shrink-0 text-[10px] font-semibold tracking-[0.12em] text-ink-400 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-sans text-[15px] leading-snug font-semibold tracking-[-0.005em] text-ink-900 text-pretty group-hover:text-brand-700 sm:text-base">
                    {item.question}
                  </span>
                </span>
                <IconChevron
                  width={17}
                  height={17}
                  className={`shrink-0 text-ink-400 transition-transform duration-300 ${
                    open ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!open}
              {...(!open ? { inert: '' } : {})}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-6 pl-8 text-sm leading-relaxed text-pretty text-ink-600 sm:pl-12">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
