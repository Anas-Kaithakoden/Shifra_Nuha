import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

/**
 * ---------------------------------------------------------------------------
 * SECTION
 * ---------------------------------------------------------------------------
 * Three surfaces in the whole site, and the brief is explicit that not every
 * section should be a different colour:
 *
 *   `page`    the warm off-white the document already sits on
 *   `plain`   white, for a section that should read as a raised plane
 *   `muted`   the warm neutral, for the sections that step back
 *
 * Section rhythm comes from whitespace, a hairline and a heading — not from
 * alternating background colours, decorative shapes or a card grid. A section
 * here is a column of type with an optional grid inside it.
 */
type Surface = 'page' | 'plain' | 'muted'

type Props = {
  id?: string
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'center'
  surface?: Surface
  /** Adds a hairline divider above the section. */
  divided?: boolean
  className?: string
  children?: ReactNode
}

const surfaces: Record<Surface, { bg: string; body: string; eyebrow: string }> = {
  page: { bg: '', body: 'text-ink-600', eyebrow: 'text-brand-700' },
  plain: { bg: 'bg-white', body: 'text-ink-600', eyebrow: 'text-brand-700' },
  muted: { bg: 'bg-paper-100', body: 'text-ink-600', eyebrow: 'text-brand-700' },
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  align = 'left',
  surface = 'plain',
  divided = false,
  className = '',
  children,
}: Props) {
  const centered = align === 'center'
  const tone = surfaces[surface]

  return (
    <section
      id={id}
      className={`scroll-mt-20 py-16 sm:py-20 lg:py-24 ${tone.bg} ${
        divided ? 'border-t border-paper-200' : ''
      } ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
            {eyebrow ? (
              <p className={`mb-3 text-xs font-semibold tracking-[0.16em] uppercase ${tone.eyebrow}`}>
                {eyebrow}
              </p>
            ) : null}
            {/*
              A section heading is a fixed size. The brief asks for a clear
              hierarchy and no excessively huge typography, and the only way to
              get that consistently is to stop letting the title's own length
              change the type size.
            */}
            <h2 className="text-2xl leading-[1.2] font-semibold tracking-tight text-balance text-ink-950 sm:text-3xl">
              {title}
            </h2>
            {intro ? (
              <p className={`mt-4 text-base leading-relaxed text-pretty sm:text-lg ${tone.body}`}>
                {intro}
              </p>
            ) : null}
          </div>
        </Reveal>
        {children ? <div className="mt-10 sm:mt-12">{children}</div> : null}
      </div>
    </section>
  )
}
