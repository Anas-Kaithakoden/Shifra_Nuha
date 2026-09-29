/**
 * ---------------------------------------------------------------------------
 * THE ACQUISITION OFFER — LLP & Company Registration from ₹2,999
 * ---------------------------------------------------------------------------
 * This is the offer the ads promise, so it lives in one file and every place
 * that shows a price reads from here. The hero, the "what we help with" block,
 * the FAQ, the closing CTA and the two registration service pages all render
 * the same figure and the same qualifier, because a price that is written out
 * differently in two places is a price somebody will eventually quote wrongly.
 *
 * EDITORIAL RULES FOR THIS FILE
 *
 *  - The wording is "starting at ₹2,999 + applicable charges", never
 *    "everything for ₹2,999". The professional fee is only ever the starting
 *    point; government fees, stamp duty and any other applicable charges are
 *    additional and are always named.
 *  - `includes` lists only what the business actually does. It is not a promise
 *    of approval, of a timeline, or of anything the visitor does not control.
 *  - Nothing here may be used to imply a guarantee, a processing time, a
 *    success rate or a client count. Those claims have to be true before they
 *    are made, and they are not true yet.
 */

/** The bare figure, so nothing has to re-type it and get a comma wrong. */
const AMOUNT = '2,999'

/** Rendered with the rupee sign. */
const PRICE = `₹${AMOUNT}`

export const registrationOffer = {
  /** The service the figure refers to. */
  label: 'LLP & Company Registration',

  /** The bare amount, digits and comma only. */
  amount: AMOUNT,

  /** The amount with its currency sign. */
  price: PRICE,

  /**
   * The full offer line, used wherever there is room for one line of type.
   * `+ applicable charges` is part of the offer, not a footnote.
   */
  headline: `Starting at ${PRICE} + applicable charges`,

  /**
   * The price on its own, for a layout that sets the qualifier as a separate
   * line underneath. The qualifier is always rendered next to it — never
   * dropped to make the number look better on its own.
   */
  priceFrom: `Starting at ${PRICE}`,
  priceOnly: PRICE,
  qualifier: '+ applicable charges',

  /**
   * The small print. The brief is explicit that this has to sit with the price
   * and not be buried, because a starting price without it is misleading.
   *
   * Written as ordinary sentences with ordinary spaces rather than as a
   * slash-separated list of charge types, because a run like
   * "government/professional/other" has no break opportunity in it and a browser
   * cannot wrap it on a 320px screen.
   */
  note:
    'Government fees, stamp duty and any other applicable charges are payable in addition to this fee, and vary with the registration type and your requirements. We tell you what applies to your case before you start.',

  /**
   * "What we help with" — the things included alongside the starting fee. Each
   * one is something the business does as part of guiding a registration, and
   * none of them is a guarantee about the authority's decision or timing.
   */
  includes: [
    'Documentation guidance',
    'Application preparation',
    'Registration process assistance',
    'Communication and support during the process',
    'Status updates',
  ] as const,

  /**
   * The prefilled WhatsApp message, per the brief. It names the offer so the
   * first reply can be a real reply rather than "how can I help". `encodeURIComponent`
   * is applied by the link helper, never here.
   */
  whatsappMessage: `Hi, I'm interested in LLP/Company registration. I saw your ${PRICE} offer and would like to know more.`,

  /** The eyebrow above the price in the hero. */
  eyebrow: 'Registration starting at',
} as const

/**
 * The price line for a service page: the offer headline followed by that
 * service's own pricing note, or just the note for a service the offer does not
 * cover.
 *
 * The two functions of this are to keep "+ applicable charges" attached to the
 * figure everywhere, and to keep the service pages and the homepage telling the
 * same story.
 */
export function offerPriceLine(hasOffer: boolean, pricingNote: string): string {
  return hasOffer ? `${registrationOffer.headline}. ${pricingNote}` : pricingNote
}

/**
 * The services the offer applies to. The homepage's registration cards and the
 * service pages both resolve their price through this, so adding a service to
 * the offer is a one-line change rather than an edit in four components.
 */
export const OFFERED_SERVICE_SLUGS = ['llp-registration', 'company-registration'] as const

export const isOfferedService = (slug: string) =>
  (OFFERED_SERVICE_SLUGS as readonly string[]).includes(slug)
