import { Link } from 'react-router-dom'
import type { ComponentProps, ReactNode } from 'react'

export type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp'
export type Size = 'md' | 'lg'

/**
 * ---------------------------------------------------------------------------
 * BUTTONS
 * ---------------------------------------------------------------------------
 * Border radius is 10px. The brief asks for 8–12px on buttons and 12–16px on
 * cards, and for anything pill-shaped to be reserved for small badges. A
 * 10px radius reads as a considered, professional control rather than either a
 * sharp-edged utility or a rounded pill.
 *
 * Every button is a solid fill with a single flat colour. There are no
 * gradients, no glass and no glow here, and no shadow deeper than the one line
 * that lifts a filled button off the page by a pixel or two.
 */
const variants: Record<Variant, string> = {
  primary: 'bg-ink-950 text-white hover:bg-ink-800 active:bg-ink-900 shadow-xs',
  secondary: 'bg-white text-ink-900 ring-1 ring-ink-300 hover:bg-paper-100 hover:ring-ink-300',
  ghost: 'text-ink-700 hover:text-ink-950 hover:bg-ink-100',
  /**
   * WhatsApp's own green, darkened slightly so a full-width button does not
   * shout. Used only for the WhatsApp CTA, where the colour is a recognisable
   * signal a visitor is looking for rather than decoration. The brand accent is
   * a blue, so this is the only green anywhere on the site.
   */
  whatsapp: 'bg-[#128c7e] text-white hover:bg-[#0f7065] active:bg-[#0b5a51] shadow-xs shadow-[#0b5a51]/15',
}

const sizes: Record<Size, string> = {
  // min-h-11 keeps every button comfortably tappable on mobile
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-12 px-6 text-base',
}

/**
 * `text-left` is load-bearing, not cosmetic. `body` sets `text-align: justify`
 * for prose, `text-align` is inherited, and a label is not prose. On a narrow
 * phone a long label such as "Get Started on WhatsApp" wraps to a second line
 * inside the button, and the justified first line stretched the gap between its
 * words. `justify-center` above already centres the icon-and-label group
 * horizontally, so this only governs lines *within* the label once it wraps.
 */
const base =
  'inline-flex items-center justify-center gap-2 rounded-[10px] text-left font-semibold tracking-tight transition-colors duration-150 select-none'

type CommonProps = {
  variant?: Variant
  size?: Size
  children: ReactNode
  className?: string
}

type ButtonAsLink = CommonProps & Omit<ComponentProps<typeof Link>, 'className' | 'children'>

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<'button'>, 'className' | 'children'> & { type?: 'button' | 'submit' }

type ButtonAsAnchor = CommonProps &
  Omit<ComponentProps<'a'>, 'className' | 'children'> & { href: string }

const classes = (variant: Variant, size: Size, extra?: string) =>
  `${base} ${variants[variant]} ${sizes[size]} ${extra ?? ''}`

export function ButtonLink({ variant = 'primary', size = 'md', className, children, ...rest }: ButtonAsLink) {
  return (
    <Link className={classes(variant, size, className)} {...rest}>
      {children}
    </Link>
  )
}

export function Button({ variant = 'primary', size = 'md', className, children, ...rest }: ButtonAsButton) {
  return (
    <button className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  )
}

export function ButtonAnchor({ variant = 'primary', size = 'md', className, children, ...rest }: ButtonAsAnchor) {
  return (
    <a className={classes(variant, size, className)} {...rest}>
      {children}
    </a>
  )
}
