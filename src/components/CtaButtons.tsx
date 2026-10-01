import type { ReactNode } from 'react'
import { enquiry } from '../content/site'
import { ui } from '../content/ui'
import { callLink, onPhoneClick, onWhatsappClick, whatsappLink } from '../lib/contactLinks'
import { ButtonAnchor, type Size, type Variant } from './Button'
import { IconPhone, IconWhatsApp } from './icons'

/**
 * ---------------------------------------------------------------------------
 * CTA BUTTONS
 * ---------------------------------------------------------------------------
 * WhatsApp and Call, in that order, everywhere on the site. Most of the traffic
 * is a mobile ad click; a visitor on a phone who has decided to act should never
 * have to work out how. Both are one tap, both open something the visitor
 * already knows how to use, and neither requires an account or a form.
 *
 * The enquiry form exists, but it is the third choice and it is described as
 * such. That ordering is the single most important conversion decision on the
 * site, so it is expressed by this one component rather than re-decided in each
 * page.
 *
 * Every button fires a tracked event through `onClick`, because the `place`
 * prop is the only way to tell a navbar click from a sticky-bar click from a
 * service-page click once they have all become "Contact" in the ad platform.
 *
 * While a number is unconfirmed both buttons fall back to the enquiry form, so
 * the funnel works on day one and gets sharper when the config is filled in.
 *
 * The prefilled message defaults to the generic enquiry text in
 * `content/site.ts`, which names no service and asks a question. A service
 * landing page overrides it with a message about that specific service, so the
 * first reply is always about what the visitor actually asked about.
 */

type Common = {
  /**
   * Where in the interface the button sits, for analytics. Keep it stable and
   * low-cardinality: `hero`, `navbar`, `footer`, `service-page`, `sticky-bar`.
   */
  place: string
  size?: Size
  className?: string
  label?: ReactNode
  /** Rendered as a sub-line under the label on larger buttons. */
  note?: ReactNode
}

type LinkProps = Common & {
  /** When the number is set, a wa.me link is used; otherwise the enquiry form. */
  message?: string
  variant?: Variant
  /**
   * Show the WhatsApp mark with no visible text. Used only in the header, where
   * a full label does not fit beside the logo and the menu button on a 320px
   * screen. The label is kept as the accessible name and the tooltip, so the
   * button is never a mystery — and it stays a 44px square either way.
   */
  iconOnly?: boolean
}

export function WhatsAppButton({
  place,
  message = enquiry.whatsappMessage,
  size = 'lg',
  variant = 'whatsapp',
  className,
  label,
  note,
  iconOnly = false,
}: LinkProps) {
  const link = whatsappLink(message)
  const target = link.ready
    ? { href: link.href, target: '_blank', rel: 'noreferrer noopener' as const }
    : { href: link.href }
  const text = label ?? ui['cta.whatsapp']
  /*
   * `text` is a `ReactNode` because callers may pass rich content, but an
   * `aria-label` and a `title` must be plain strings. Nothing passes a node
   * here today, so the node is rendered to text rather than refused.
   */
  const accessibleText = typeof text === 'string' ? text : ui['cta.whatsapp']

  return (
    <ButtonAnchor
      {...target}
      onClick={onWhatsappClick(place, message)}
      variant={variant}
      size={size}
      className={iconOnly ? `w-11 shrink-0 !px-0 ${className ?? ''}` : className}
      aria-label={iconOnly ? accessibleText : undefined}
      title={iconOnly ? accessibleText : link.ready ? undefined : ui['placeholder.ctaFallback']}
    >
      <IconWhatsApp width={iconOnly ? 20 : 18} height={iconOnly ? 20 : 18} className="shrink-0" />
      {iconOnly ? null : text}
      {note ? <span className="sr-only"> — {note}</span> : null}
    </ButtonAnchor>
  )
}

type CallProps = Common & { variant?: Variant }

export function CallButton({ place, size = 'lg', variant = 'secondary', className, label, note }: CallProps) {
  const link = callLink()
  const target = link.ready
    ? { href: link.href, title: undefined }
    : { href: link.href, title: ui['placeholder.ctaFallback'] }

  return (
    <ButtonAnchor
      {...target}
      onClick={onPhoneClick(place)}
      variant={variant}
      size={size}
      className={className}
    >
      <IconPhone width={18} height={18} className="shrink-0" />
      {label ?? ui['cta.call']}
      {note ? <span className="sr-only"> — {note}</span> : null}
    </ButtonAnchor>
  )
}

/**
 * The pair, in the order that matters. Stacks full-width on a phone, where
 * almost all of the traffic lands, and sits side by side from `sm` upwards.
 */
export function CtaPair({
  place,
  message,
  size = 'lg',
  whatsappVariant = 'whatsapp',
  callVariant = 'secondary',
  stack = true,
  className,
  whatsappLabel,
  callLabel,
}: Common & {
  message?: string
  whatsappVariant?: Variant
  /** false only where there is genuinely no room for two buttons. */
  stack?: boolean
  callVariant?: Variant
  callLabel?: ReactNode
  whatsappLabel?: ReactNode
}) {
  return (
    <div
      className={`flex w-full flex-col gap-3 ${stack ? 'sm:max-w-md sm:flex-row' : 'flex-row items-center'} ${className ?? ''}`}
    >
      <WhatsAppButton
        place={`${place}-whatsapp`}
        message={message}
        size={size}
        variant={whatsappVariant}
        className="w-full"
        label={whatsappLabel}
      />
      <CallButton
        place={`${place}-call`}
        size={size}
        variant={callVariant}
        className="w-full"
        label={callLabel}
      />
    </div>
  )
}
