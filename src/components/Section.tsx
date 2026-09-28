import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Surface = 'white' | 'subtle' | 'dark'

type Props = {
  id?: string
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'center'
  /** Background + text colour scheme. */
  surface?: Surface
  /** Adds a hairline divider above the section. */
  divided?: boolean
  className?: string
  children?: ReactNode
}

const surfaces: Record<Surface, { bg: string; heading: string; body: string; eyebrow: string }> = {
  white: { bg: 'bg-white', heading: 'text-ink-950', body: 'text-ink-600', eyebrow: 'text-brand-700' },
  subtle: { bg: 'bg-ink-50', heading: 'text-ink-950', body: 'text-ink-600', eyebrow: 'text-brand-700' },
  dark: { bg: 'bg-ink-950 text-white', heading: 'text-white', body: 'text-ink-300', eyebrow: 'text-brand-300' },
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  align = 'left',
  surface = 'white',
  divided = false,
  className = '',
  children,
}: Props) {
  const centered = align === 'center'
  const tone = surfaces[surface]

  return (
    <section
      id={id}
      className={`scroll-mt-24 py-20 sm:py-24 lg:py-28 ${tone.bg} ${
        divided ? 'border-t border-ink-200' : ''
      } ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
            {eyebrow ? (
              <p className={`mb-4 text-xs font-semibold tracking-[0.18em] uppercase ${tone.eyebrow}`}>{eyebrow}</p>
            ) : null}
            <h2
              className={`text-3xl leading-[1.15] font-semibold tracking-tight text-balance sm:text-4xl ${tone.heading}`}
            >
              {title}
            </h2>
            {intro ? (
              <p className={`mt-5 text-base leading-relaxed text-pretty sm:text-lg ${tone.body}`}>{intro}</p>
            ) : null}
          </div>
        </Reveal>
        {children ? <div className="mt-12 sm:mt-16">{children}</div> : null}
      </div>
    </section>
  )
}
