import { enquiryTemplateFor } from '../../data/whatsappTemplates'
import { createWhatsAppUrl } from '../contactLinks'
import type { ChatMessage } from './types'

/**
 * ---------------------------------------------------------------------------
 * WHATSAPP ENQUIRY MESSAGE
 * ---------------------------------------------------------------------------
 * The handoff is a review screen, not a redirect. This function produces the
 * first draft of that message; the visitor can edit every word of it before
 * pressing the button that actually opens WhatsApp.
 *
 * The draft carries:
 *  - the service they were discussing, in the business's own words;
 *  - the visitor's last question, shortened, so the team has context;
 *  - a short closing line.
 *
 * It deliberately does not include the whole transcript. A WhatsApp message is
 * a first message, not a support ticket, and copying a conversation into it
 * would make people less likely to send it.
 */

const MAX_CONTEXT_LENGTH = 220
const MAX_MESSAGE_LENGTH = 1200

function shorten(text: string): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= MAX_CONTEXT_LENGTH) return clean
  return `${clean.slice(0, MAX_CONTEXT_LENGTH - 1).trimEnd()}…`
}

export type EnquiryDraftInput = {
  serviceInterest: string | null
  messages: ChatMessage[]
}

export function buildEnquiryMessage({ serviceInterest, messages }: EnquiryDraftInput): string {
  const template = enquiryTemplateFor(serviceInterest)

  const lastUserMessage = [...messages]
    .reverse()
    .find((message) => message.role === 'user' && message.content.trim().length > 0)

  const context = lastUserMessage ? shorten(lastUserMessage.content) : ''

  const lines = [template.intro]

  if (context) {
    lines.push('', `I was asking about: ${context}`)
  }

  lines.push('', template.closing)

  return lines.join('\n').slice(0, MAX_MESSAGE_LENGTH).trim()
}

/**
 * Only called from the explicit "Open WhatsApp" button. Nothing in the chat
 * opens WhatsApp on its own: the visitor has to review the draft and press the
 * button, which is the difference between a handoff and an ambush.
 */
export function buildEnquiryWhatsAppUrl(message: string): string {
  return createWhatsAppUrl(message)
}
