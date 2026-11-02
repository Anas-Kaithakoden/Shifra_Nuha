import { detectServiceInterest } from '../../src/lib/chatbot/serviceInterest'
import { getChatConfig } from '../_lib/config'
import { unlistedPricingReply } from '../_lib/pricing'
import {
  AllProvidersFailedError,
  generateReply,
  NoProvidersError,
} from '../_lib/providers'
import { checkRateLimit, clientKey } from '../_lib/rateLimit'
import type {
  ChatErrorResponse,
  ChatSuccessResponse,
  PagesContext,
  PagesFunction,
} from '../_lib/types'
import { HttpError, parseChatRequest } from '../_lib/validation'

/**
 * ---------------------------------------------------------------------------
 * POST /api/chat
 * ---------------------------------------------------------------------------
 * The only server-side route on the site.
 *
 * Secrets live here and nowhere else. The browser posts a message and receives
 * a reply; it never learns which provider answered, which model was used, or
 * whether a fallback happened.
 *
 * Request:
 *   { message: string, history?: [{ role, content }], serviceInterest?: string }
 *
 * Responses:
 *   200 { reply, serviceInterest? }
 *   400/405/413/415 { error, message }
 *   429 { error, message, reply? }
 *   500/503 { error, message, reply? }
 *
 * The function keeps no conversation state. The transcript lives in the
 * visitor's `sessionStorage`, and each request carries the history it wants the
 * model to see.
 */

const UNAVAILABLE_REPLY =
  "I'm having trouble connecting right now. Please try again in a moment, or contact our team on WhatsApp and we'll help you directly."

const NOT_CONFIGURED_REPLY =
  'The assistant is not available right now. Please contact our team on WhatsApp and we will help you directly.'

function json(
  body: ChatSuccessResponse | ChatErrorResponse,
  status = 200,
  headers: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...headers,
    },
  })
}

function logFailure(error: unknown): void {
  if (error instanceof Error) {
    console.error(`[chat] unhandled error=${error.name}`)
    return
  }
  console.error('[chat] unhandled error=unknown')
}

export const onRequest: PagesFunction = async ({ request, env }: PagesContext) => {
  const startedAt = Date.now()

  try {
    const body = await parseChatRequest(request)
    const config = getChatConfig(env)
    const rate = checkRateLimit(clientKey(request), config.rateLimit, config.rateWindowMs)

    const rateHeaders: Record<string, string> = {
      'X-RateLimit-Limit': String(rate.limit),
      'X-RateLimit-Remaining': String(rate.remaining),
      'X-RateLimit-Reset': String(Math.ceil(rate.resetAt / 1000)),
    }

    if (!rate.allowed) {
      return json(
        {
          error: 'rate_limited',
          message:
            'You have sent several messages in a short time. Please wait a moment and try again.',
          reply:
            'You have sent several messages in a short time. Please wait a moment, or continue on WhatsApp and the team will help you.',
        },
        429,
        { ...rateHeaders, 'Retry-After': String(rate.retryAfterSeconds) },
      )
    }

    /*
     * The exact unlisted-pricing sentence is enforced before a provider is
     * called. This is the one case where a deterministic answer is strictly
     * better than a generated one: it cannot be paraphrased into a new price.
     */
    const deterministicPricingReply = unlistedPricingReply(body.message)
    if (deterministicPricingReply) {
      return json(
        {
          reply: deterministicPricingReply,
          serviceInterest:
            detectServiceInterest(body.message) ?? body.serviceInterest ?? undefined,
        },
        200,
        rateHeaders,
      )
    }

    const result = await generateReply(env, body)
    const serviceInterest =
      detectServiceInterest(body.message) ?? body.serviceInterest ?? undefined

    console.log(
      `[chat] reply_sent provider=${result.provider} price_guard=${
        result.priceGuardApplied ? 'yes' : 'no'
      } elapsed_ms=${Date.now() - startedAt}`,
    )

    return json({ reply: result.reply, serviceInterest }, 200, rateHeaders)
  } catch (error) {
    if (error instanceof HttpError) {
      return json(
        { error: error.code, message: error.message },
        error.status,
        error.status === 405 ? { Allow: 'POST' } : undefined,
      )
    }

    if (error instanceof NoProvidersError) {
      console.error('[chat] no provider configured')
      return json(
        {
          error: 'provider_error',
          message: NOT_CONFIGURED_REPLY,
          reply: NOT_CONFIGURED_REPLY,
        },
        503,
      )
    }

    if (error instanceof AllProvidersFailedError) {
      console.warn(`[chat] all_providers_failed elapsed_ms=${Date.now() - startedAt}`)
      return json(
        {
          error: 'provider_error',
          message: UNAVAILABLE_REPLY,
          reply: UNAVAILABLE_REPLY,
        },
        503,
      )
    }

    logFailure(error)
    return json(
      {
        error: 'server_error',
        message: 'Something went wrong. Please try again, or continue on WhatsApp.',
      },
      500,
    )
  }
}
