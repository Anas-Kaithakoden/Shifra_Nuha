import type { ReactNode } from 'react'
import { Reveal } from '../components/Reveal'

/** Consistent page frame: a light intro header followed by a light content area. */
export function PageShell({ children }: { children: ReactNode }) {
  return <div className="bg-paper-50">{children}</div>
}

export function PageIntro({
  eyebrow,
  title,
  intro,
  meta,
  children,
}: {
  eyebrow: string
  title: string
  intro: string
  /** Rendered as a small line under the intro, e.g. a pricing note. */
  meta?: string
  children?: ReactNode
}) {
  return (
    /*
     * A light surface with a hairline, matching the hero. These pages used to
     * open on a near-black band with a grid and a blurred glow behind it, which
     * is the exact "AI-generated" look the redesign removes; the inner pages
     * now read as the same document as the home page.
     */
    <section className="border-b border-paper-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.16em] text-brand-700 uppercase">{eyebrow}</p>
            <h1 className="mt-4 text-3xl leading-[1.12] font-semibold tracking-tight text-balance text-ink-950 sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-pretty text-ink-600 sm:text-lg">
              {intro}
            </p>
            {meta ? <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-500">{meta}</p> : null}
            {children}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** Two-column content block used across the inner pages. */
export function ContentBlock({
  title,
  children,
  aside,
}: {
  title: string
  children: ReactNode
  aside?: ReactNode
}) {
  return (
    <section className="py-14 sm:py-16">
      <Reveal>
        <div className={`grid gap-8 ${aside ? 'lg:grid-cols-[1.4fr_1fr] lg:gap-14' : ''}`}>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-balance text-ink-950 sm:text-3xl">
              {title}
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-600">{children}</div>
          </div>
          {aside ? <div className="lg:pt-1">{aside}</div> : null}
        </div>
      </Reveal>
    </section>
  )
}
