import { Link } from 'react-router-dom'
import type { ComponentProps, ReactNode } from 'react'

export type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark' | 'onDarkGhost' | 'whatsapp'
export type Size = 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary:
    'bg-ink-950 text-white hover:bg-brand-700 active:bg-brand-800 shadow-sm shadow-ink-950/10',
  secondary:
    'bg-white text-ink-900 ring-1 ring-ink-200 hover:bg-ink-50 hover:ring-ink-300 active:bg-ink-100',
  ghost: 'text-ink-700 hover:text-ink-950 hover:bg-ink-50',
  onDark: 'bg-white text-ink-950 hover:bg-brand-50 active:bg-brand-100',
  onDarkGhost: 'text-white ring-1 ring-white/25 hover:bg-white/10 hover:ring-white/45',
  /**
   * WhatsApp's own green, slightly darkened so a full-width button does not
   * shout. Used only for the WhatsApp CTA, where the colour is a recognisable
   * signal rather than decoration.
   */
  whatsapp: 'bg-[#128c7e] text-white hover:bg-[#0f7065] active:bg-[#0b5a51] shadow-sm shadow-[#0b5a51]/20',
}

const sizes: Record<Size, string> = {
  // min-h-11 keeps every button comfortably tappable on mobile
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-12 px-6 text-base',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold tracking-tight transition-colors duration-200 select-none'

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
