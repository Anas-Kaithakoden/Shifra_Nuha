import type { ReactNode } from 'react'
import { callLink, onPhoneClick, onWhatsappClick, whatsappLink } from '../lib/contactLinks'
import { useLocale } from '../i18n/LocaleProvider'
import { ButtonAnchor, type Size, type Variant } from './Button'
import { IconPhone, IconWhatsApp } from './icons'

/**
 * ---------------------------------------------------------------------------
 * CTA BUTTONS
 * ---------------------------------------------------------------------------
 * WhatsApp and Call, in that order, everywhere on the site. The advertising is
 * a Malayalam Meta ad; a visitor on a phone who has decided to act should never
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
}

export function WhatsAppButton({
  place,
  message,
  size = 'lg',
  variant = 'whatsapp',
  className,
  label,
  note,
}: LinkProps) {
  const { t } = useLocale()
  const link = whatsappLink(message)
  const target = link.ready
    ? { href: link.href, target: '_blank', rel: 'noreferrer noopener' as const }
    : { href: link.href }

  return (
    <ButtonAnchor
      {...target}
      onClick={onWhatsappClick(place, message)}
      variant={variant}
      size={size}
      className={className}
      title={link.ready ? undefined : t('placeholder.ctaFallback')}
    >
      <IconWhatsApp width={18} height={18} className="shrink-0" />
      {label ?? t('cta.whatsapp')}
      {note ? <span className="sr-only"> — {note}</span> : null}
    </ButtonAnchor>
  )
}

type CallProps = Common & { variant?: Variant }

export function CallButton({ place, size = 'lg', variant = 'secondary', className, label, note }: CallProps) {
  const { t } = useLocale()
  const link = callLink()
  const target = link.ready
    ? { href: link.href, title: undefined }
    : { href: link.href, title: t('placeholder.ctaFallback') }

  return (
    <ButtonAnchor
      {...target}
      onClick={onPhoneClick(place)}
      variant={variant}
      size={size}
      className={className}
    >
      <IconPhone width={18} height={18} className="shrink-0" />
      {label ?? t('cta.call')}
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
  callVariant = 'onDark',
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
