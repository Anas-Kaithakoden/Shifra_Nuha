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
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div
            className={
              centered
                ? 'mx-auto max-w-2xl text-center'
                : `grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16 ${
                    intro ? '' : 'lg:grid-cols-1'
                  }`
            }
          >
            <div className={centered ? '' : 'max-w-2xl'}>
              {eyebrow ? (
                <div className={`mb-4 flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
                  <span aria-hidden="true" className="h-px w-8 bg-brand-600" />
                  <p className={`text-[11px] font-semibold tracking-[0.2em] uppercase ${tone.eyebrow}`}>
                    {eyebrow}
                  </p>
                </div>
              ) : null}
              {/*
                A section heading is a fixed size. The brief asks for a clear
                hierarchy and no excessively huge typography, and the only way to
                get that consistently is to stop letting the title's own length
                change the type size.
              */}
              <h2 className="font-display text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.02] font-normal tracking-[-0.025em] text-balance text-ink-950">
                {title}
              </h2>
            </div>
            {intro ? (
              <p
                className={`max-w-lg text-base leading-relaxed text-pretty sm:text-lg ${tone.body} ${
                  centered ? 'mx-auto mt-4' : 'lg:justify-self-end'
                }`}
              >
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
