import { enquiryTemplateFor, enquiryTemplates } from '../../data/whatsappTemplates'

/**
 * ---------------------------------------------------------------------------
 * SERVICE INTEREST DETECTION
 * ---------------------------------------------------------------------------
 * A tiny keyword matcher, used for two things only:
 *
 *  1. Choosing a sensible starting point for the editable WhatsApp message.
 *  2. Telling the server which service the visitor has been discussing, so its
 *     system prompt can stay focused.
 *
 * It is not an answer engine. The model answers from the knowledge base; this
 * function only decides which of the enquiry templates is the least wrong
 * starting point. A false negative costs nothing - the default template is
 * perfectly polite - so the matcher is intentionally conservative.
 */

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function normalise(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Returns the service id whose keywords best match the message, or null.
 *
 * The score is the length of the longest keyword matched, not the number of
 * matches. "I need a website and GST help" contains two interests; the longer,
 * more specific phrase wins rather than the template that happens to list more
 * generic synonyms.
 */
export function detectServiceInterest(text: string): string | null {
  if (!text.trim()) return null
  const haystack = normalise(text)

  let best: { serviceId: string; score: number } | null = null

  for (const template of enquiryTemplates) {
    for (const keyword of template.keywords) {
      const needle = normalise(keyword)
      if (!needle) continue

      // Word boundaries matter here: "llp" must not match inside another word,
      // while multi-word phrases are matched as a phrase.
      const pattern = new RegExp(`(?:^|[^a-z0-9])${escapeRegExp(needle)}(?:$|[^a-z0-9])`, 'i')
      if (!pattern.test(haystack)) continue

      if (!best || needle.length > best.score) {
        best = { serviceId: template.serviceId, score: needle.length }
      }
    }
  }

  return best?.serviceId ?? null
}

/** Keeps the most recent confirmed interest when a message is ambiguous. */
export function mergeServiceInterest(previous: string | null, text: string): string | null {
  return detectServiceInterest(text) ?? previous
}

/** The human label used in the WhatsApp handoff header. */
export function serviceInterestLabel(serviceId: string | null): string {
  return enquiryTemplateFor(serviceId).label
}
