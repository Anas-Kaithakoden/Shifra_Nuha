/**
 * ---------------------------------------------------------------------------
 * ENQUIRY SUBMISSION
 * ---------------------------------------------------------------------------
 * The secondary CTA, and deliberately the slowest one.
 *
 * There is no backend in this repository and no third-party form service wired
 * up, because no endpoint has been confirmed. Rather than pretend — post to a
 * URL that does not exist, or hang a fake "message sent" state on a request
 * that never leaves the browser — `submitEnquiry` builds a WhatsApp message
 * from what the visitor typed and opens it, which is the same destination the
 * primary CTA already uses.
 *
 * The practical result is that a filled-in form produces a complete, readable
 * message in WhatsApp, ready to send. Nothing is lost, and no claim is made
 * that we received something we did not receive.
 *
 * To move to a real endpoint: replace the body of `submitEnquiry` with a `fetch`
 * to your own URL and return a message reflecting the real outcome. The
 * component only reads `{ ok, message }`, so nothing above this line changes.
 */

import { whatsappLink } from './contactLinks'

export type Enquiry = {
  name: string
  phone: string
  email: string
  businessName: string
  businessType: string
  need: string
  message: string
}

export type EnquiryResult = {
  ok: boolean
  /** Shown back to the visitor, so it must describe what actually happened. */
  message: string
}

const empty = (): Enquiry => ({
  name: '',
  phone: '',
  email: '',
  businessName: '',
  businessType: '',
  need: '',
  message: '',
})

/** The same shape the form starts from, for the reset button. */
export const emptyEnquiry = empty

/** Renders the enquiry as a readable WhatsApp message, skipping blank fields. */
export function enquiryToMessage(enquiry: Enquiry): string {
  const lines = [
    'Enquiry from the website',
    '',
    `Name: ${enquiry.name.trim() || '—'}`,
    `Phone / WhatsApp: ${enquiry.phone.trim() || '—'}`,
  ]

  if (enquiry.email.trim()) lines.push(`Email: ${enquiry.email.trim()}`)
  if (enquiry.businessName.trim()) lines.push(`Business: ${enquiry.businessName.trim()}`)
  if (enquiry.businessType.trim()) lines.push(`Type of business: ${enquiry.businessType.trim()}`)
  if (enquiry.need.trim()) lines.push(`Service needed: ${enquiry.need.trim()}`)
  if (enquiry.message.trim()) lines.push('', enquiry.message.trim())

  return lines.join('\n')
}

export async function submitEnquiry(enquiry: Enquiry): Promise<EnquiryResult> {
  const link = whatsappLink(enquiryToMessage(enquiry))

  if (!link.ready) {
    return {
      ok: false,
      message:
        'Thank you. Our WhatsApp number has not been published yet, so the message could not be opened automatically. Please note down your enquiry and send it to us when the number appears on the site.',
    }
  }

  window.open(link.href, '_blank', 'noopener,noreferrer')

  return {
    ok: true,
    message:
      'Your details are ready to send. WhatsApp should have opened in a new tab with your enquiry written out — press send there and it will come straight to us.',
  }
}
