import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Delay in ms, useful for staggering siblings. */
  delay?: number
  /** Render as a different element, e.g. "li" inside an ordered list. */
  as?: ElementType
  className?: string
}

/**
 * ---------------------------------------------------------------------------
 * REVEAL
 * ---------------------------------------------------------------------------
 * A single, restrained scroll reveal: the block fades from nothing to opaque
 * once, when it first comes into view, and never moves again.
 *
 * There is no translation, no parallax, no stagger cascade beyond a short
 * delay, and no motion at all once the transition has run. The brief allows
 * "fade-in sections" and "very subtle entrance animations" and rules out
 * flying cards, parallax and constant movement, so this is the whole of it.
 * A block that has faded in stays exactly where it is.
 *
 * Fully disabled when the visitor prefers reduced motion, in which case the
 * content is simply rendered as visible.
 */
export function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.04 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={shown ? undefined : { transitionDelay: `${delay}ms` }}
      className={`transition-opacity duration-500 ease-out ${shown ? 'opacity-100' : 'opacity-0'} ${className}`}
    >
      {children}
    </Tag>
  )
}
