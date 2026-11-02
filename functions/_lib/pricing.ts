import { UNLISTED_PRICING_RESPONSE } from '../../src/data/knowledgeBase'
import { detectServiceInterest } from '../../src/lib/chatbot/serviceInterest'

/**
 * ---------------------------------------------------------------------------
 * DETERMINISTIC PRICING GUARD
 * ---------------------------------------------------------------------------
 * The brief is unambiguous: for a service without approved pricing, the reply
 * is one fixed sentence. A model cannot be trusted to produce "exactly" that
 * sentence on every call, so the common case is answered here without calling a
 * provider at all.
 *
 * This also removes the most expensive failure mode: a plausible-looking price
 * for a website, a logo or a GST filing. The check is intentionally conservative
 * - any pricing question that is not clearly about one of the two approved
 * packages gets the fixed sentence.
 */

const APPROVED_PRICING_SERVICES = new Set(['llp-registration', 'private-limited-registration'])

const PRICING_QUESTION =
  /\b(?:price|pricing|cost|costs|fee|fees|charge|charges|how\s+much|quotation|quote|rate|rates|budget)\b/i

export function isPricingQuestion(message: string): boolean {
  return PRICING_QUESTION.test(message)
}

/**
 * Returns the exact reply for an unapproved pricing question, or null when the
 * message should go to the model.
 */
export function unlistedPricingReply(message: string): string | null {
  if (!isPricingQuestion(message)) return null

  const interest = detectServiceInterest(message)
  if (interest && APPROVED_PRICING_SERVICES.has(interest)) return null

  return UNLISTED_PRICING_RESPONSE
}
