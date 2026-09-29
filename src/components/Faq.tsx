import { useId } from 'react'
import type { FaqItem } from '../content/services'
import { IconChevron } from './icons'

/**
 * ---------------------------------------------------------------------------
 * FAQ
 * ---------------------------------------------------------------------------
 * A plain `<details>`/`<summary>` accordion, one per question.
 *
 * Native disclosure is used deliberately: it is keyboard accessible and
 * correctly announced by every screen reader with no ARIA to maintain, it works
 * with JavaScript switched off, and it is what search engines expect for FAQ
 * content. The markup below adds nothing but styling and the chevron.
 *
 * The answers are long — these are real questions about cost, timelines and
 * documents, and one-line answers would be the kind of overpromising the brief
 * rules out — so the closed state stays closed by default and a visitor reads
 * only what they came for.
 */
export function Faq({ items, className = '' }: { items: FaqItem[]; className?: string }) {
  const base = useId()

  if (items.length === 0) return null

  return (
    <div className={`divide-y divide-paper-200 overflow-hidden rounded-xl border border-paper-200 bg-white ${className}`}>
      {items.map((item, index) => {
        const id = `${base}-${index}`
        return (
          <details key={item.question} className="group">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-base font-semibold tracking-tight text-ink-950 transition-colors hover:bg-paper-100 sm:px-6 [&::-webkit-details-marker]:hidden">
              {/* `text-left` opts the question out of the justified body copy:
                  it is a label, not prose, and a two-line question would
                  otherwise stretch its inter-word gap. The answer below stays
                  justified. */}
              <span className="text-left text-pretty">{item.question}</span>
              <IconChevron
                width={18}
                height={18}
                className="shrink-0 text-ink-400 transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <div id={id} className="px-5 pb-5 text-sm leading-relaxed text-ink-600 sm:px-6 sm:pb-6">
              <p className="text-pretty">{item.answer}</p>
            </div>
          </details>
        )
      })}
    </div>
  )
}
